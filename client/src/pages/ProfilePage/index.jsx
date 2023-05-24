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
import { Store } from 'react-notifications-component';

import userIcon from '../../assets/images/Icons/user.svg';
import layersIcon from '../../assets/images/Icons/layers.svg';
import hammerIcon from '../../assets/images/Icons/hammer.svg';
import ReviewRateCard from '../../components/ReviewRateCard';
import UserTickets from '../../components/UserTickets';

// TODO: редактирование профиля (и удаление!)
// TODO: история бонусов
// TODO: модальное окно (уверены что ходите вернуть билеты) 
// TODO: модальное окно (уверены что хотите выйти) 
// TODO: пагинация для билетов
// TODO: состояние для билетов когда событие прошло (или удалено) + удаление таких билетов

const ProfilePage = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams({ filter: 'tickets' });
   const [activeTab, setActiveTab] = useState(searchParams.get('filter'));
   const [userId, setUserId] = useState('');
   const [userRole, setUserRole] = useState('');
   const [name, setName] = useState('');
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');

   const [ticketsCount, setTicketsCount] = useState([]);
   const [userWishlist, setUserWishlist] = useState([]);
   const [reviews, setReviews] = useState([]);
   const [userBonuses, setUserBonuses] = useState(0);

   const [isLoading, setIsLoading] = useState(false);
   const [wishlistCount, setWishlistCount] = useState(4);
   const [reviewCount, setReviewCount] = useState(4);
   const [wishlistPagination, setWishlistPagination] = useState(false);
   const [reviewPagination, setReviewPagination] = useState(false);

   useEffect(() => {
      document.title = 'Мой профиль - Cinemax';

      refreshToken();
   }, []);


   useEffect(() => {
      if (userRole && userRole === 'user') {
         setFilter();
         getUserBonuses();
      }
      // if (userRole && userRole === 'admin') {
      //    navigate('/adminPanel');
      //    window.scrollTo(0, 0);
      // }

   }, [activeTab, userId, userRole]);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   const wishlistNotification = (mess) => Store.addNotification({
      title: mess,
      type: "success",
      insert: "top",
      container: "bottom-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: 3000,
      }
   });

   const getUserTicketsCount = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/getUserTicketsCount', {
            params: {
               userId: userId
            }
         },
            { withCredentials: true }
         );
         console.log(response.data);
         setTicketsCount(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(250);
         setIsLoading(false);
      }
   }

   const getUserBonuses = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getUserBonuses', {
            params: {
               userId: userId
            }
         },
            { withCredentials: true }
         );
         setUserBonuses(response.data.current_balance);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const setFilter = () => {
      if (activeTab && userId) {
         switch (searchParams.get('filter')) {
            case 'tickets':
               getUserTicketsCount();
               break;

            case 'wishlist':
               getWishlist();
               break;

            case 'reviews':
               getReviews();
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

         if (posters.length > 4 && wishlistCount < posters.length) setWishlistPagination(true);

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

         const responseRate = await axiosJWT.get('http://localhost:3001/getUserRating', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
            },
         });

         let reviews = response.data;
         let ar = [];
         reviews.forEach(review => {
            responseRate.data.forEach(rate => {
               if (review.film_id === rate.film_id) {
                  review['rating'] = rate.rating;
                  if (ar.indexOf(rate) === -1) ar.push(rate);
               }
            });
         });

         responseRate.data.forEach(rate => {
            if (ar.indexOf(rate) === -1) reviews.push(rate);
         });

         setReviews(reviews);
         if (reviews.length > 4 && reviewCount < reviews.length) setReviewPagination(true);

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
         setUserRole(decoded.role)
      } catch (error) {
         if (error.response) {
            navigate("/auth");
            window.scrollTo(0, 0);
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
         setUserRole(decoded.role);
      }
      return config;
   }, (error) => {
      return Promise.reject(error);
   });

   const Logout = async () => {
      try {
         await axios.delete('http://localhost:3001/logout', { withCredentials: true });
         navigate("/auth");
         window.scrollTo(0, 0);
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

         wishlistNotification('Добавлено в избранное');
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
         wishlistNotification('Удалено из избранного');
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const showMoreWishlist = () => {
      setWishlistCount(wishlistCount + 4);
      if (userWishlist.length <= wishlistCount + 4) setWishlistPagination(false);
   }

   const showMoreReviews = () => {
      setReviewCount(reviewCount + 4);
      if (reviews.length <= reviewCount + 4) setReviewPagination(false);
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
               <Col xl="4" lg="4" md="6" sm="12">
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
                  <Styled.BonusHistoryDiv>
                     <Styled.BonusHistoryIcon src={hammerIcon} />
                     <Styled.BonusHistory onClick={() => navigate('/adminPanel')}>Панель администратора</Styled.BonusHistory>
                  </Styled.BonusHistoryDiv>
               </Col>
               <Col xl="3" lg="3" md="6" sm="12">
                  <Styled.BonusDiv>
                     <Styled.BonusTitle>Бонусные баллы</Styled.BonusTitle>
                     <Styled.BonusCountDiv>
                        <Styled.BonusCount>{userBonuses}</Styled.BonusCount>
                        <Styled.BonusMoney>{userBonuses / 100}BYN</Styled.BonusMoney>
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
               <>
                  {!ticketsCount.length &&
                     <Row>
                        <Col col="12">
                           <Styled.NullArrayText>Список ваших билетов пуст</Styled.NullArrayText>
                        </Col>
                     </Row>

                  }
                  {ticketsCount.length > 0 &&
                     <>
                        {ticketsCount.map((tickets) => <UserTickets key={tickets.id} tickets={tickets} />)}
                     </>
                  }
               </>
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
                        {reviews.length > 0 && reviews.map((review, index) => {
                           return index < reviewCount ? <ReviewRateCard key={review.id} review={review} /> : false
                        })}
                     </Col>
                  }
               </Row>
            }
            {(!isLoading && reviews.length > 4 && reviewPagination) &&
               <Row Row justifyContent='center'>
                  <Styled.PaginationBtn onClick={showMoreReviews}> Показать больше</Styled.PaginationBtn>
               </Row>
            }
         </Container >
         <Footer />
      </>
   )
}

export default ProfilePage