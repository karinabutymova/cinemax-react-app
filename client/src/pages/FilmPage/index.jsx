import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import * as Styled from './styled';
import { DateFormat } from './functions';
import ReviewCard from '../../components/ReviewCard';
import Preloader from '../../components/Preloader';
import triangle from '../../assets/images/Icons/triangle.svg';
import reviewIcon from '../../assets/images/Icons/message-square.svg';
import Footer from '../../components/Footer';
import Booking from '../../components/Booking';

// TODO: popup при добавлении/удалении лайка/рейтинга или уведомление что пользователь не авторизован
const FilmPage = () => {
   let { filmId } = useParams();
   const navigate = useNavigate();
   const [film, setFilm] = useState([]);
   const [filmReviews, setFilmReviews] = useState([]);
   const [ratingValue, setRatingValue] = useState(0);
   const [toDateRent, setToDateRent] = useState();
   const [isWishlist, setIsWishlist] = useState();

   const [reviewsCount, setReviewsCount] = useState(4);
   const [isPagination, setIsPagination] = useState(false);

   const [textReview, setTextReview] = useState('');

   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const [userId, setUserId] = useState(0);
   const [userName, setUserName] = useState('');
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');


   const StarsRating = {
      size: 30,
      count: 10,
      isHalf: false,
      value: ratingValue,
      activeColor: "#8D1BCD",
      color: "#5D2381",
      onChange: newValue => {
         userId ? SetRating(newValue) : console.log("Не авторизованный пользователь");
      }
   };

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   useLayoutEffect(() => {
      refreshToken();
      GetFilmById(filmId);
      GetFilmReviews(filmId);
   }, []);

   useEffect(() => {
      if (userId) {
         GetRating();
         getWishlist();
         GetFilmReviews(filmId);
      }
   }, [userId]);

   const refreshToken = async () => {
      try {
         const response = await axios.get('http://localhost:3001/token',
            { withCredentials: true }
         );
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setUserId(decoded.userId);
         setUserName(decoded.name);
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
         setUserName(decoded.name);
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
         if (!response.data) {
            navigate('/notFoundPage');
         }
         setFilm(response.data);
         document.title = response.data.film_title + ' - Cinemax';
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

   const SetRating = async (rating) => {
      try {
         await axiosJWT.get('http://localhost:3001/setFilmRating', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
               filmId: filmId,
               rating: rating
            },
         },
            { withCredentials: true }
         );
         setRatingValue(rating);
         GetFilmById(filmId);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const GetRating = async () => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/getFilmRating', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               userId: userId,
               filmId: filmId
            },
         },
            { withCredentials: true }
         );
         response.data ? setRatingValue(response.data.rating) : setRatingValue(0);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
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

   const sendUserReview = async () => {
      try {
         await axiosJWT.get('http://localhost:3001/sendUserReview', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               filmId: filmId,
               userId: userId,
               textReview: textReview
            },
         });
         setTextReview('');
         GetFilmReviews(filmId);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const redirectYouTube = () => {
      film.trailer_link ?
         window.open(film.trailer_link, '_blank') : alert('Упс.. Ссылка на трейлер не найдена');
   }

   const goToAuth = () => {
      navigate('/auth');
   }

   const handleOnChange = (e) => {
      setTextReview(e.target.value);
   }

   const GetFilmReviews = async (filmId) => {
      try {
         const response = await axios.get('http://localhost:3001/getAllFilmReviews', {
            params: {
               filmId: filmId,
               userId: userId
            }
         });
         setFilmReviews(response.data);
         if (response.data.length > 4) setIsPagination(true);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const sendReview = (e) => {
      e.preventDefault();
      if (textReview) {
         setError('');
         sendUserReview();
      } else {
         setError('Пустое поле');
      }
   }

   const showMore = () => {
      setReviewsCount(reviewsCount + 4);
      if (filmReviews.length <= reviewsCount + 4) setIsPagination(false);
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
                              <Styled.PrimaryButton>Забронировать билет</Styled.PrimaryButton>
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
                        {film.genres && film.genres.split(',').map((genre, index) => <Styled.InfoSpan key={index}>{genre}</Styled.InfoSpan>)}
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
                     {((new Date(film.from_rent_date) <= new Date()) && userId > 0) &&
                        <div>
                           <Styled.InfoActorTitle>Ваша оценка</Styled.InfoActorTitle>
                           <ReactStars {...StarsRating} />
                           <Styled.NumberDiv>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => <Styled.NumberSpan key={value}>{value}</Styled.NumberSpan>)}
                           </Styled.NumberDiv>
                        </div>
                     }
                  </Col>
                  <Col xl="2" lg="2" md="0" sm="0">
                  </Col>
               </Row>
            }
            {(!isLoading && !userId) &&
               <Row justifyContent='center' style={{ marginTop: '72px' }}>
                  <Col col="4">
                     <Styled.PrimaryButton onClick={goToAuth} > Авторизуйтесь, чтобы забронировать билеты</Styled.PrimaryButton>
                  </Col>
               </Row>
            }
            {(!isLoading && userId > 0) && <Booking filmId={filmId} userId={userId} userName={userName} />}

            {!isLoading &&
               <Row justifyContent='center'>
                  <Col xl="8" lg="8" md="10" sm="12">
                     <Styled.ReviewsFlex>
                        <Styled.ReviewsIcon src={reviewIcon} />
                        <Styled.ReviewsTitle>Отзывы</Styled.ReviewsTitle>
                     </Styled.ReviewsFlex>
                     <Styled.ReviewsFormDiv>
                        {!userId && <Styled.PrimaryButton onClick={goToAuth} > Авторизуйтесь, чтобы оставить отзыв</Styled.PrimaryButton>}
                        {userId > 0 &&
                           <Styled.ReviewsForm>
                              <Styled.ReviewsUserFlex>
                                 <Styled.ReviewsUserCircle>{userName[0]}</Styled.ReviewsUserCircle>
                                 <Styled.ReviewsUser>{userName}</Styled.ReviewsUser>
                              </Styled.ReviewsUserFlex>
                              <Styled.ReviewsTextarea
                                 value={textReview}
                                 placeholder="Поделись впечатлениями"
                                 onChange={handleOnChange}
                                 error={error}
                              />
                              <Styled.PrimaryButton width={'250px'} onClick={sendReview} >Отправить</Styled.PrimaryButton>
                           </Styled.ReviewsForm>
                        }
                     </Styled.ReviewsFormDiv>

                  </Col>
               </Row>
            }
            {!isLoading &&
               <Row justifyContent='center'>
                  <Col xl="8" lg="8" md="10" sm="12">
                     {filmReviews.length > 0 && filmReviews.map((review, index) => {
                        return index < reviewsCount ? <ReviewCard key={review.id} review={review} /> : false
                     })}
                     {filmReviews.length === 0 && <Styled.ReviewsTitle center={'center'}> Ваш отзыв может быть первым!</Styled.ReviewsTitle>}
                  </Col>
               </Row>
            }
            {(!isLoading && filmReviews.length > 4 && isPagination) &&
               <Row Row justifyContent='center'>
                  <Styled.PaginationBtn onClick={showMore}>Показать больше</Styled.PaginationBtn>
               </Row>
            }
         </Container >
         <Footer />
      </>
   )
}

export default FilmPage;