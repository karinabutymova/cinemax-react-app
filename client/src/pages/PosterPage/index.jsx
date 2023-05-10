import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import jwt_decode from "jwt-decode";
import Header from '../../components/Header';
import * as Styled from './styled';
import TabHeader from '../../components/TabHeader';
import PosterCard from '../../components/PosterCard';
import Preloader from '../../components/Preloader';
import SortTabs from '../../components/SortTabs';
import Footer from '../../components/Footer';

// TODO: сделать popup когда добавляется/удаляется в избранное 
// TODO: и когда пользователь неавторизован
// TODO: адаптивную версию подправить

const PosterPage = () => {
   const [searchParams, setSearchParams] = useSearchParams({ filter: 'now', sort: 'bestRate' });
   const [posters, setPosters] = useState([]);
   const [userWishlist, setUserWishlist] = useState([]);
   const [postersCount, setPostersCount] = useState(4);
   const [isPagination, setIsPagination] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [activeTab, setActiveTab] = useState(searchParams.get('filter'));
   const [activeSort, setActiveSort] = useState(searchParams.get('sort'));

   const [userId, setUserId] = useState('');
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   useEffect(() => {
      document.title = 'Афиша - Cinemax';

      refreshToken();
   }, []);

   useEffect(() => {
      if (userId) getWishlist();
   }, [userId]);

   useEffect(() => {
      getPosters();
   }, [activeTab]);

   useEffect(() => {
      sortPosters();
   }, [posters]);


   const refreshToken = async () => {
      try {
         const response = await axios.get('http://localhost:3001/token',
            { withCredentials: true }
         );
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setUserId(decoded.userId);
         setExpire(decoded.exp);
      } catch (error) {
         if (error.response) {
            console.log('Не авторизованный пользователь');
         }
      }
   }

   const axiosJWT = axios.create({ withCredentials: true });

   axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
         const response = await axios.get('http://localhost:3001/token',
            { withCredentials: true }
         );
         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setUserId(decoded.userId);
         setExpire(decoded.exp);
      }
      return config;
   }, (error) => {
      return Promise.reject(error);
   });

   const getWishlist = async () => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/wishlist', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
            },
         });
         setUserWishlist(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const setWishlist = async (filmId) => {
      try {
         await axiosJWT.get('http://localhost:3001/setWishlist', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
               filmId: filmId,
            },
         });
         getWishlist();
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const deleteWishlist = async (wishId = false) => {
      try {
         await axiosJWT.get('http://localhost:3001/deleteWishlist', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               wishId: wishId,
            },
         });
         getWishlist();

      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const sortPosters = (postersList = posters) => {
      if (postersList) {
         switch (searchParams.get('sort')) {
            case 'bestRate':
               postersList.sort((a, b) => (b.rate != null ? b.rate : -Infinity) - (a.rate != null ? a.rate : -Infinity));
               break;

            case 'new':
               postersList.sort((a, b) => new Date(b.from_rent_date) - new Date(a.from_rent_date));
               break;

            case 'forKids':
               postersList.sort((a, b) => parseInt(a.age_limit) - parseInt(b.age_limit));
               break;

            default:
               break;
         }
         setPosters(postersList);
      }
   }


   const getPosters = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/posters', {
            params: {
               filter: activeTab,
            },
         }, { withCredentials: true });

         let res = response.data;
         if (res.length > 4) setIsPagination(true);
         setPosters(res);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      } finally {
         await timeout(250);
         setIsLoading(false);
      }

   }

   const showMore = () => {
      setPostersCount(postersCount + 4);
      if (posters.length <= postersCount + 4) setIsPagination(false);
   }

   return (
      <>
         <Header />
         <Container>
            <Row justifyContent='between'>
               <Col xl="2" lg="2" md="12">
                  <Styled.PageTitle>Афиша</Styled.PageTitle>
               </Col>
               <Col xl="7" lg="7" md="12">
                  <TabHeader activeId={activeTab}
                     setActiveTab={setActiveTab}
                     searchParams={searchParams}
                     setSearchParams={setSearchParams}
                  />
               </Col>
            </Row>
            {searchParams.get('filter') === 'now' &&
               <Row>
                  <SortTabs activeId={activeSort}
                     setActiveSort={setActiveSort}
                     searchParams={searchParams}
                     setSearchParams={setSearchParams}
                     sortPosters={sortPosters}
                  />
               </Row>
            }
            {isLoading && <Preloader />}
            {!isLoading &&
               <Row>
                  {posters && posters.map((poster, index) => {
                     if (index < postersCount) {
                        let isWish = userWishlist.find(o => o.film_id === poster.id);
                        return <PosterCard key={poster.id} poster={poster}
                           filter={activeTab} userId={userId} isWish={isWish}
                           setWishlist={setWishlist} deleteWishlist={deleteWishlist} />
                     } else {
                        return false;
                     }
                  })}
                  {!posters.length && <Styled.NotFound>Ничего не найдено :( </Styled.NotFound>}
               </Row>
            }
            {(!isLoading && posters.length > 4 && isPagination) &&
               <Row Row justifyContent='center'>
                  <Styled.PaginationBtn onClick={showMore}> Показать больше</Styled.PaginationBtn>
               </Row>
            }
         </Container>
         <Footer />
      </>
   )
}

export default PosterPage;