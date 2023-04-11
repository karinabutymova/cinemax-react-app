import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Container, Col, Row } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import Preloader from '../../components/Preloader';
import PosterCard from '../../components/PosterCard';
import * as Styled from './styled';

import userIcon from '../../assets/images/Icons/user.svg';
import layersIcon from '../../assets/images/Icons/layers.svg';


// TODO: редактирование профиля
// TODO: история бонусов
// TODO: popup 

// TODO: переход к большому отзыву 
// TODO: на странице фильма показывать сначала отзывы юзера

const ProfilePage = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams({ filter: 'tickets' });
   const [activeTab, setActiveTab] = useState(searchParams.get('filter'));
   const [userId, setUserId] = useState('');
   const [name, setName] = useState('');
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');

   const [tickets, setTickets] = useState([]);
   const [userWishlist, setUserWishlist] = useState([]);
   const [reviews, setReviews] = useState([]);

   const [isLoading, setIsLoading] = useState(false);
   const [wishlistCount, setWishkistCount] = useState(4);
   const [wishlistPagination, setWishlistPagination] = useState(false);

   useEffect(() => {
      refreshToken();
   }, []);

   useEffect(() => {
      setFilter();
   }, [activeTab, userId]);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   const setFilter = () => {
      if (activeTab && userId) {
         switch (searchParams.get('filter')) {
            case 'tickets':
               console.log('tickets');
               break;

            case 'wishlist':
               getWishlist();
               console.log('wishlist');
               break;

            case 'reviews':
               getReviews();
               console.log('reviews');
               break;

            default:
               break;
         }
      }
   }

   const getWishlist = async () => {
      setIsLoading(true);
      try {
         const response = await axiosJWT.get('http://localhost:3001/getUserWishlist', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
            },
         });

         let posters = [];
         response.data.forEach(el => {
            let poster = {
               id: el.film_id,
               photo_path: el['wishlist.photo_path'],
               film_runtime: el['wishlist.film_runtime'],
               film_title: el['wishlist.film_title'],
               genres: el['wishlist.genres'],
               from_rent_date: el['wishlist.from_rent_date'],
               to_rent_date: el['wishlist.to_rent_date'],
               isWish: { id: el.id }
            };
            posters.push(poster);
         });

         if (posters.length > 4) setWishlistPagination(true);

         setUserWishlist(posters);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      } finally {
         await timeout(250);
         setIsLoading(false);
      }
   }

   const getReviews = async () => {
      setIsLoading(true);
      try {
         const response = await axiosJWT.get('http://localhost:3001/getAllUserReviews', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
            },
         });
         setReviews(response.data);

         console.log(response.data);

         // if (posters.length > 4) setWishlistPagination(true);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      } finally {
         await timeout(250);
         setIsLoading(false);
      }
   }

   const refreshToken = async () => {
      try {
         const response = await axios.get('http://localhost:3001/token',
            { withCredentials: true }
         );
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setUserId(decoded.userId);
         setName(decoded.name);
         setExpire(decoded.exp);
      } catch (error) {
         if (error.response) {
            navigate("/auth");
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
         setName(decoded.name);
         setExpire(decoded.exp);
      }
      return config;
   }, (error) => {
      return Promise.reject(error);
   });

   const Logout = async () => {
      try {
         await axios.delete('http://localhost:3001/logout', { withCredentials: true });
         navigate("/auth");
      } catch (error) {
         console.log(error);
      }
   }

   const ActiveFilter = async (filter) => {
      if (filter !== activeTab) {
         setIsLoading(true);
         setActiveTab(filter);
         searchParams.set('filter', filter);
         setSearchParams(searchParams);
         await timeout(300);
         setIsLoading(false);
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

      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const showMoreWishlist = () => {
      setWishkistCount(wishlistCount + 4);
      if (userWishlist.length <= wishlistCount + 4) setWishlistPagination(false);
   }

   return (
      <>
         <Header />
         <Container>
            <Row>
               <Col col="12">
                  <Styled.PageTitle>Профиль</Styled.PageTitle>
               </Col>
            </Row>
            <Row justifyContent='end' >
               <Col xl="3" lg="3" md="6" sm="12">
                  <Styled.UserInfoDiv>
                     <Styled.Icon src={userIcon} />
                     <Styled.UserInfoColumnDiv>
                        <Styled.UserName>{name}</Styled.UserName>
                        <Styled.BtnDiv>
                           {/* <Styled.UserInfoBtn>Редактировать</Styled.UserInfoBtn> */}
                           <Styled.UserInfoBtn onClick={Logout}>Выйти</Styled.UserInfoBtn>
                        </Styled.BtnDiv>
                     </Styled.UserInfoColumnDiv>
                  </Styled.UserInfoDiv>
               </Col>
               <Col xl="3" lg="3" md="6" sm="12">
                  <Styled.BonusDiv>
                     <Styled.BonusTitle>Бонусные баллы</Styled.BonusTitle>
                     <Styled.BonusCountDiv>
                        <Styled.BonusCount>140</Styled.BonusCount>
                        <Styled.BonusMoney>1.4BYN</Styled.BonusMoney>
                     </Styled.BonusCountDiv>
                  </Styled.BonusDiv>
                  <Styled.BonusHistoryDiv>
                     <Styled.BonusHistoryIcon src={layersIcon} />
                     <Styled.BonusHistory>История накопления</Styled.BonusHistory>
                  </Styled.BonusHistoryDiv>
               </Col>
            </Row>
            {isLoading && <Preloader />}
            {!isLoading &&
               <Row>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.FilterContainer>
                        <Styled.FilterItem
                           active={activeTab === 'tickets' && true}
                           onClick={() => ActiveFilter('tickets')}>
                           Билеты
                        </Styled.FilterItem>
                        <Styled.FilterItem
                           active={activeTab === 'wishlist' && true}
                           onClick={() => ActiveFilter('wishlist')}>
                           Избранное
                        </Styled.FilterItem>
                        <Styled.FilterItem
                           active={activeTab === 'reviews' && true}
                           onClick={() => ActiveFilter('reviews')}>
                           Отзывы и оценки
                        </Styled.FilterItem>
                     </Styled.FilterContainer>
                  </Col>
               </Row>
            }
            {(!isLoading && activeTab === 'tickets') &&
               <Row>
                  {!tickets.length &&
                     <Col col="12">
                        <Styled.NullArrayText>Список ваших билетов пуст</Styled.NullArrayText>
                     </Col>
                  }
               </Row>
            }
            {(!isLoading && activeTab === 'wishlist') &&
               <Row>
                  {!userWishlist.length &&
                     <Col col="12">
                        <Styled.NullArrayText>Ваш список избранного пуст</Styled.NullArrayText>
                     </Col>
                  }
                  {userWishlist.length > 0 && userWishlist.map((poster, index) => {
                     return index < wishlistCount ? <PosterCard key={poster.id} poster={poster}
                        filter={activeTab} userId={userId}
                        isWish={poster.isWish}
                        setWishlist={setWishlist}
                        deleteWishlist={deleteWishlist}
                     /> : false
                  })}
               </Row>
            }
            {(!isLoading && userWishlist.length > 4 && wishlistPagination) &&
               <Row Row justifyContent='center'>
                  <Styled.PaginationBtn onClick={showMoreWishlist}> Показать больше</Styled.PaginationBtn>
               </Row>
            }
            {(!isLoading && activeTab === 'reviews') &&
               <Row>
                  {!reviews.length &&
                     <Col col="12">
                        <Styled.NullArrayText>Список ваших отзывов и оценок пуст</Styled.NullArrayText>
                     </Col>
                  }
                  {reviews.length > 0 &&
                     <Col xl="8" lg="8" md="12" sm="12" style={{ marginTop: '48px' }}>
                        {reviews.map((review) => <Styled.ReviewDiv>
                           <Styled.FilmInfoFlex>
                              <Styled.FilmInfoTitle>{review['reviews_film.film_title']}</Styled.FilmInfoTitle>
                              <Styled.FilmLink to={`/film/${review.film_id}`}>Перейти к фильму</Styled.FilmLink>
                           </Styled.FilmInfoFlex>
                           {review.review_text.length > 300 ?
                              <Styled.ReviewText long={true}>{review.review_text}
                                 <Styled.ReviewReadMore >Читать полностью</Styled.ReviewReadMore>
                              </Styled.ReviewText>
                              : <Styled.ReviewText>{review.review_text}</Styled.ReviewText>}
                        </Styled.ReviewDiv>)}
                     </Col>
                  }
               </Row>
            }
         </Container >
         <Footer />
      </>
   )
}

export default ProfilePage