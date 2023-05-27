import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import * as Styled from './styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Preloader from '../../components/Preloader';
import TableUsers from '../../components/TableUsers';
import TableFilms from '../../components/TableFilms';
import AddFilmForm from '../../components/AddFilmForm';
import AddFilmShowForm from '../../components/AddFilmShowForm';
import TableFilmShows from '../../components/TableFilmShows';
import EditUserForm from '../../components/EditUserForm';
import TableNews from '../../components/TableNews';
import AddNewsForm from '../../components/AddNewsForm';


const AdminPage = () => {

   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams({ filter: 'users' });
   const [activeTab, setActiveTab] = useState(searchParams.get('filter'));

   const [users, setUsers] = useState([]);
   const [films, setFilms] = useState([]);
   const [filmShows, setFilmShows] = useState([]);
   const [news, setNews] = useState([]);

   const [userId, setUserId] = useState(0);
   const [userRole, setUserRole] = useState('');
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');

   const [editUser, setEditUser] = useState();
   const [deleteUser, setDeleteUser] = useState();
   const [deleteFilm, setDeleteFilm] = useState();
   const [deleteFilmShow, setDeleteFilmShow] = useState();
   const [deleteNews, setDeleteNews] = useState();

   const [isLoading, setIsLoading] = useState(false);
   const [isAddFilm, setIsAddFilm] = useState(false);
   const [isAddFilmShow, setIsAddFilmShow] = useState(false);
   const [isAddNews, setIsAddNews] = useState(false);

   useEffect(() => {
      document.title = 'Панель администратора - Cinemax';

      refreshToken();
   }, []);

   useEffect(() => {
      if (userRole === 'user') navigate('/notFoundPage')
   }, [userRole]);

   useEffect(() => {
      setFilter();
      setIsAddFilm(false);
      setIsAddFilmShow(false);
   }, [activeTab, userId]);


   useEffect(() => {
      if (deleteUser) {
         deleteUserById();
      }
   }, [deleteUser]);

   useEffect(() => {
      if (deleteFilm) {
         deleteFilmById();
      }
   }, [deleteFilm]);

   useEffect(() => {
      if (deleteFilmShow) {
         deleteFilmShowById();
      }
   }, [deleteFilmShow]);

   useEffect(() => {
      if (deleteNews) {
         deleteNewsById();
      }
   }, [deleteNews]);


   const refreshToken = async () => {
      try {
         const response = await axios.get('http://localhost:3001/token',
            { withCredentials: true }
         );
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setUserId(decoded.userId);
         setExpire(decoded.exp);
         setUserRole(decoded.role);
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
         setUserRole(decoded.role);
      }
      return config;
   }, (error) => {
      return Promise.reject(error);
   });

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
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

   const setFilter = () => {
      if (activeTab && userId) {
         switch (searchParams.get('filter')) {
            case 'users':
               getAllUsers();
               break;

            case 'films':
               getAllFilms();
               break;

            case 'filmShows':
               getAllFilmsShows();
               break;

            case 'news':
               getAllNews();
               break;

            default:
               break;
         }
      }
   }

   const getAllUsers = async (req, res) => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/users', {
            headers: {
               Authorization: `Bearer ${token}`,
            }
         });
         setUsers(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const deleteUserById = async (req, res) => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/deleteUser', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               id: deleteUser
            }
         });
         if (response.data)
            getAllUsers();
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const getAllFilms = async (req, res) => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/films', {
            headers: {
               Authorization: `Bearer ${token}`,
            }
         });
         setFilms(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const deleteFilmById = async (req, res) => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/deleteFilm', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               id: deleteFilm
            }
         });
         if (response.data)
            getAllFilms();
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const goToAddFilm = async () => {
      setIsLoading(true);
      setIsAddFilm(true);
      await timeout(300);
      setIsLoading(false);
   }

   const goToAddFilmShow = async () => {
      setIsLoading(true);
      setIsAddFilmShow(true);
      await timeout(300);
      setIsLoading(false);
   }

   const getAllFilmsShows = async (req, res) => {
      try {
         const response = await axios.get('http://localhost:3001/getAllFilmsShows');
         setFilmShows(response.data);
         console.log(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const deleteFilmShowById = async (req, res) => {
      try {
         const response = await axiosJWT.get('http://localhost:3001/deleteFilmShow', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               id: deleteFilmShow
            }
         });
         if (response.data)
            getAllFilmsShows();
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const getAllNews = async (req, res) => {
      try {
         const response = await axios.get('http://localhost:3001/getAllNews');
         setNews(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const deleteNewsById = async (req, res) => {
      try {
         const response = await axios.get('http://localhost:3001/deleteNews', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               id: deleteNews
            }
         });
         if (response.data)
            getAllNews();
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const goToAddNews = async () => {
      setIsLoading(true);
      setIsAddNews(true);
      await timeout(300);
      setIsLoading(false);
   }

   return (
      <>
         <Header />
         <Container>
            <Row>
               <Col col="12">
                  <Styled.PageTitle>Панель администратора</Styled.PageTitle>
               </Col>
            </Row>
            <Row>
               <Col xl="6" lg="6" md="8" sm="12">
                  <Styled.FilterContainer>
                     <Styled.FilterItem
                        active={activeTab === 'users' && true}
                        onClick={() => ActiveFilter('users')}>
                        Пользователи
                     </Styled.FilterItem>
                     <Styled.FilterItem
                        active={activeTab === 'films' && true}
                        onClick={() => ActiveFilter('films')}>
                        Фильмы
                     </Styled.FilterItem>
                     <Styled.FilterItem
                        active={activeTab === 'filmShows' && true}
                        onClick={() => ActiveFilter('filmShows')}>
                        Сеансы
                     </Styled.FilterItem>
                     <Styled.FilterItem
                        active={activeTab === 'news' && true}
                        onClick={() => ActiveFilter('news')}>
                        Новости
                     </Styled.FilterItem>
                  </Styled.FilterContainer>
               </Col>
            </Row>

            {isLoading && <Preloader />}
            {(activeTab === 'users' && !searchParams.get('editUser') && !isLoading && userId > 0) &&

               <Row>
                  <Col col="12">
                     <TableUsers data={users} userId={userId} setDeleteUser={setDeleteUser} />
                  </Col>
               </Row>
            }
            {(activeTab === 'users' && searchParams.get('editUser') > 0 && !isLoading && userId > 0) &&
               <>
                  <Row>
                     <Col col="12">
                        <Styled.Title>Редактирование пользователя</Styled.Title>
                     </Col>
                  </Row>
                  <Row>
                     <EditUserForm userId={searchParams.get('editUser')} getAllUsers={getAllUsers} />
                  </Row>
               </>
            }
            {(activeTab === 'users' && !isLoading && userId === 0) &&
               <Row>
                  <Col col="12">
                     <Styled.NullArrayText>Список пользователей пуст</Styled.NullArrayText>
                  </Col>
               </Row>
            }
            {(activeTab === 'films' && !isLoading && films.length > 0) &&
               <>
                  {(films.length > 0 && !isAddFilm) &&
                     <>
                        <Row>
                           <Col xl="3" lg="3" md="4" sx="12">
                              <Styled.PrimaryButton onClick={goToAddFilm}>+ Добавить фильм</Styled.PrimaryButton>
                           </Col>
                        </Row>
                        <Row>
                           <Col col="12">
                              <TableFilms data={films} setDeleteFilm={setDeleteFilm} />
                           </Col>
                        </Row>
                     </>
                  }

                  {isAddFilm &&
                     <>
                        <Row>
                           <Col col="12">
                              <Styled.Title>Добавление фильма</Styled.Title>
                           </Col>
                        </Row>
                        <Row>
                           <AddFilmForm setIsAddFilm={setIsAddFilm} />
                        </Row>
                     </>
                  }

               </>
            }

            {(activeTab === 'films' && !isLoading && films.length === 0) &&
               <Row>
                  <Col col="12">
                     <Styled.NullArrayText>Список фильмов пуст</Styled.NullArrayText>
                  </Col>
               </Row>
            }

            {(activeTab === 'filmShows' && !isLoading && filmShows.length === 0) &&
               <Row>
                  <Col col="12">
                     <Styled.NullArrayText>Список сеансов пуст</Styled.NullArrayText>
                  </Col>
               </Row>
            }
            {(activeTab === 'filmShows' && !isLoading && filmShows.length > 0) &&
               <>
                  {(filmShows.length > 0 && !isAddFilmShow) &&
                     <>
                        <Row>
                           <Col xl="3" lg="3" md="4" sx="12">
                              <Styled.PrimaryButton onClick={goToAddFilmShow}>+ Добавить сеанс</Styled.PrimaryButton>
                           </Col>
                        </Row>
                        <Row>
                           <Col col="12">
                              <TableFilmShows data={filmShows} setDeleteFilmShow={setDeleteFilmShow} />
                           </Col>
                        </Row>
                     </>
                  }

                  {isAddFilmShow &&
                     <>
                        <Row>
                           <Col col="12">
                              <Styled.Title>Добавление сеанса</Styled.Title>
                           </Col>
                        </Row>
                        <Row>
                           <AddFilmShowForm setIsAddFilmShow={setIsAddFilmShow} />
                        </Row>
                     </>
                  }

               </>
            }

            {(activeTab === 'news' && !isLoading && news.length === 0) &&
               <Row>
                  <Col col="12">
                     <Styled.NullArrayText>Список новостей пуст</Styled.NullArrayText>
                  </Col>
               </Row>
            }
            {(activeTab === 'news' && !isLoading && news.length > 0) &&
               <>
                  {(news.length > 0 && !isAddNews) &&
                     <>
                        <Row>
                           <Col xl="3" lg="3" md="4" sx="12">
                              <Styled.PrimaryButton onClick={goToAddNews}>+ Добавить новость</Styled.PrimaryButton>
                           </Col>
                        </Row>
                        <Row>
                           <Col col="12">
                              <TableNews data={news} setDeleteNews={setDeleteNews} />
                           </Col>
                        </Row>
                     </>
                  }
                  {isAddNews &&
                     <>
                        <Row>
                           <Col col="12">
                              <Styled.Title>Добавление новости</Styled.Title>
                           </Col>
                        </Row>
                        <Row>
                           <AddNewsForm setIsAddNews={setIsAddNews} />
                        </Row>
                     </>
                  }
               </>
            }
         </Container>
      </>
   )
}

export default AdminPage;