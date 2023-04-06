import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import * as Styled from './styled';
import Preloader from '../../components/Preloader';
import triangle from '../../assets/images/Icons/triangle.svg';

import { DateFormat } from './functions';

const FilmPage = () => {
   let { filmId } = useParams();
   const [film, setFilm] = useState([]);
   const [toDateRent, setToDateRent] = useState();
   const [isWishlist, setIsWishlist] = useState();

   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const [userId, setUserId] = useState('');
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   useLayoutEffect(() => {
      refreshToken();
      GetFilmById(filmId);
   }, []);

   useEffect(() => {
      if (userId) getWishlist();
   }, [userId]);

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

   const GetFilmById = async (filmId) => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/getfilm', {
            params: {
               filmId: filmId,
            }
         },
            { withCredentials: true }
         );
         setFilm(response.data);
         DateFormat(response.data, setToDateRent);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(300);
         setIsLoading(false);
      }
   }

   const AddToWhishlist = () => {
      if (userId) {
         if (isWishlist) {
            setIsWishlist(false);
            deleteWishlist();
         } else {
            setIsWishlist(true);
            setWishlist();
         }
      } else {
         alert('Не авторизованный пользователь');
      }
   }

   const getWishlist = async () => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/filmWishlist', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
               filmId: filmId,
            },
         });
         response.data ? setIsWishlist(true) : setIsWishlist(false);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const setWishlist = async () => {
      try {
         await axiosJWT.get('http://localhost:3001/setWishlist', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
               filmId: film.id,
            },
         });
         getWishlist();
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const deleteWishlist = async () => {
      try {
         await axiosJWT.get('http://localhost:3001/deleteWishlistByUserId', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
               filmId: film.id
            },
         });
         getWishlist();

      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const redirectYouTube = () => {
      film.trailer_link ?
         window.open(film.trailer_link, '_blank') : alert('Упс.. Ссылки на трейлер нет');
   }

   return (
      <>
         {(!isLoading && film.id) &&
            <Styled.Section
               style={{ backgroundImage: 'url(' + require(`../../assets/images/Posters/${film.photo_path}`) + ')' }}>
            </Styled.Section>
         }
         <Header />
         <Container>
            {isLoading && <Preloader />}
            {!isLoading &&
               <Styled.MainScreen>
                  <Row justifyContent='around' style={{ flexDirection: 'row-reverse' }} className='row'>
                     <Col xl="4" lg="4" md="4" sm="6">
                        <Styled.ColunmFlex>
                           <Styled.Rating>
                              {film.avg_rating && <Styled.RatingNumber>{Number(film.avg_rating).toFixed(1)}</Styled.RatingNumber>}
                              {film.avg_rating && <span>Рейтинг фильма</span>}
                           </Styled.Rating>
                           <Styled.PlayBtn onClick={redirectYouTube}>
                              <Styled.PlayBtnImg src={triangle} />
                           </Styled.PlayBtn>
                        </Styled.ColunmFlex>
                     </Col>
                     <Col xl="5" lg="5" md="8" sm="12" >
                        <Styled.InfoColunmFlex>
                           <Styled.FilmInfo>В прокате {toDateRent}</Styled.FilmInfo>
                           <Styled.Flex>
                              <Styled.FilmInfo>{film.genres}</Styled.FilmInfo>
                              <Styled.FilmInfo>|</Styled.FilmInfo>
                              <Styled.FilmInfo>{film.film_runtime} мин</Styled.FilmInfo>
                           </Styled.Flex>
                           <Styled.FilmTitle>{film.film_title}</Styled.FilmTitle>
                           <Styled.Flex gap="20px">
                              <Styled.PrimaryButton>Купить билет</Styled.PrimaryButton>
                              <Styled.InWishlist isWish={isWishlist} onClick={AddToWhishlist} viewBox="0 0 48 48">
                                 <rect width="48" height="48" rx="8" fill="#EBEBEB" />
                                 <path d="M32.7699 16.2706C32.2474 15.7462 31.6264 15.3302 30.9427 15.0463C30.2589 14.7624 29.5259 14.6162 28.7856 14.6162C28.0452 14.6162 27.3122 14.7624 26.6285 15.0463C25.9447 15.3302 25.3238 15.7462 24.8012 16.2706L23.9991 17.0831L23.197 16.2706C22.6744 15.7462 22.0535 15.3302 21.3698 15.0463C20.686 14.7624 19.953 14.6162 19.2127 14.6162C18.4723 14.6162 17.7393 14.7624 17.0556 15.0463C16.3718 15.3302 15.7509 15.7462 15.2283 16.2706C13.0199 18.479 12.8845 22.2081 15.6658 25.0415L23.9991 33.3748L32.3324 25.0415C35.1137 22.2081 34.9783 18.479 32.7699 16.2706Z" stroke="#8D1BCD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </Styled.InWishlist>
                           </Styled.Flex>
                        </Styled.InfoColunmFlex>
                     </Col>
                  </Row>
               </Styled.MainScreen>
            }
            {!isLoading &&
               <Row justifyContent='between'>
                  <Col xl="4" lg="4" md="6" sm="12">
                     <Styled.InfoTitle>Инфо</Styled.InfoTitle>
                     <Styled.InfoDiv>
                        <Styled.InfoSpan>Страна</Styled.InfoSpan>
                        <Styled.InfoSpan>{film.country}</Styled.InfoSpan>
                     </Styled.InfoDiv>
                     <Styled.Line />
                     <Styled.InfoDiv>
                        <Styled.InfoSpan>Год выпуска</Styled.InfoSpan>
                        <Styled.InfoSpan>{film.year}</Styled.InfoSpan>
                     </Styled.InfoDiv>
                     <Styled.Line />
                     <Styled.InfoDiv>
                        <Styled.InfoSpan>Продолжительность</Styled.InfoSpan>
                        <Styled.InfoSpan>{film.ilm_runtime} мин</Styled.InfoSpan>
                     </Styled.InfoDiv>
                     <Styled.Line />
                     <Styled.InfoDiv>
                        <Styled.InfoSpan>Возраст</Styled.InfoSpan>
                        <Styled.InfoSpan>{film.age_limit}+</Styled.InfoSpan>
                     </Styled.InfoDiv>
                     <Styled.Line />
                     <Styled.InfoDiv>
                        <Styled.InfoSpan>Режиссёр</Styled.InfoSpan>
                        <Styled.InfoSpan>{film.creators}</Styled.InfoSpan>
                     </Styled.InfoDiv>
                  </Col>
                  <Col xl="5" lg="5" md="6" sm="12">
                     <Styled.InfoTitle>Описание</Styled.InfoTitle>
                     <Styled.DescriptionSpan>{film.description}</Styled.DescriptionSpan>
                  </Col>
                  <Col xl="2" lg="2" md="0" sm="0">
                     <Styled.InfoTitle />
                     <Styled.GenresFlex>
                        {film.genres && film.genres.split(',').map((genre) => <Styled.InfoSpan>{genre}</Styled.InfoSpan>)}
                     </Styled.GenresFlex>

                  </Col>
               </Row>
            }
            {!isLoading &&
               <Row justifyContent='between'>
                  <Col xl="4" lg="4" md="6" sm="12">
                     <Styled.InfoActorTitle>Актёрский состав</Styled.InfoActorTitle>
                     <Styled.InfoSpan>{film.actors}</Styled.InfoSpan>
                     <Styled.TrailerButton onClick={redirectYouTube}>Трейлер</Styled.TrailerButton>

                  </Col>
                  <Col xl="5" lg="5" md="6" sm="12">
                     {(film.from_rent_date < new Date().toDateString()) &&
                        <div>
                           <Styled.InfoActorTitle>Ваша оценка</Styled.InfoActorTitle>
                        </div>
                     }
                  </Col>
                  <Col xl="2" lg="2" md="0" sm="0">
                  </Col>
               </Row>
            }
         </Container >
      </>
   )
}

export default FilmPage;