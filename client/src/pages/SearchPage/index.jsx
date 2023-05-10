import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import * as Styled from './styled';
import Preloader from '../../components/Preloader';

import searchIcon from '../../assets/images/Icons/search.svg';
import SearchCard from '../../components/SearchCard';
import Footer from '../../components/Footer';
import SearchNewsCard from '../../components/SearchNewsCard';


// TODO: (на будущее когда появятся новости) изменить карточку новостей 
// TODO: на главное странице когда ничего не найдено выборка по кол-ву купл.билетов и последние новости

const SearchPage = () => {
   const [searchParams, setSearchParams] = useSearchParams({ searchText: '', filter: 'all' });
   const [films, setFilms] = useState([]);
   const [news, setNews] = useState([]);
   const [lastNews, setLastNews] = useState([]);
   const [popularFilm, setPopularFilm] = useState([]);
   const [isEmpty, setIsEmpty] = useState(false);
   const [searchText, setSearchtext] = useState('');
   const [active, SetActive] = useState(searchParams.get('filter'));

   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   useEffect(() => {
      document.title = 'Поиск - Cinemax';

      let searchInput = searchParams.get('searchText');
      if (searchInput) {
         SubmitSearch(searchInput);
      } else {
         getLastNews();
         getPopularFilm();
      }

   }, []);

   const getLastNews = async () => {
      try {
         const responseLastNews = await axios.get('http://localhost:3001/getLastNews',
            { withCredentials: true }
         );
         setLastNews(responseLastNews.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(300);
         setIsLoading(false);
      }
   }

   const getPopularFilm = async () => {
      try {
         const responsePopularFilm = await axios.get('http://localhost:3001/getPopularFilm',
            { withCredentials: true }
         );
         setPopularFilm(responsePopularFilm.data);
         console.log(responsePopularFilm.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(300);
         setIsLoading(false);
      }
   }

   // обработка изменений поля ввода
   const handleOnChange = (e) => {
      setSearchtext(e.target.value);
      searchParams.set('searchText', e.target.value);
   }

   const SubmitSearch = async (searchText) => {
      try {
         const responseFilms = await axios.get('http://localhost:3001/findfilms', {
            params: {
               searchText: searchText,
            }
         },
            { withCredentials: true }
         );

         const responseNews = await axios.get('http://localhost:3001/findNews', {
            params: {
               searchText: searchText,
            }
         },
            { withCredentials: true }
         );
         setFilms(responseFilms.data);
         setNews(responseNews.data);

         !responseNews.data.length && !responseFilms.data.length ? setIsEmpty(true) : setIsEmpty(false);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(300);
         setIsLoading(false);
      }
   }

   const search = (e) => {
      e.preventDefault();
      let searchText = searchParams.get('searchText');
      if (searchText.length > 2) {
         setIsLoading(true);
         setSearchParams(searchParams);
         setError('');
         console.log(searchText);
         SubmitSearch(searchText);

      } else {
         setError('Запрос должен содержать от 2-x символов');
      }
   }

   const ActiveFilter = async (filter) => {
      if (filter !== active) {
         setIsLoading(true);
         SetActive(filter);
         searchParams.set('filter', filter);
         setSearchParams(searchParams);
         await timeout(300);
         setIsLoading(false);
      }
   }

   return (
      <>
         <Header />
         <Container>
            <Row justifyContent='center'>
               <Col xl="6" lg="6" md="8" sm="12">
                  <Styled.SearchForm onSubmit={search}>
                     <Styled.SearchInput
                        value={searchParams.get('searchText')}
                        onChange={handleOnChange}
                        type='text'
                        spellcheck='false'
                        placeholder='Поиск фильмов, новостей' />
                     {error && <Styled.ErrorText>{error}</Styled.ErrorText>}
                     <Styled.Button type="submit">
                        <Styled.SearchIcon src={searchIcon} />
                     </Styled.Button>
                  </Styled.SearchForm>
               </Col>
            </Row>
            {isLoading && <Preloader />}
            {(!isLoading && popularFilm.length > 0 && news.length === 0 && films.length === 0) &&
               <Row justifyContent='center'>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.SectionTitle>Популярное</Styled.SectionTitle>
                     <Styled.Line />
                     {popularFilm.map((film) => <SearchCard key={film.id} film={film} />)}
                  </Col>
               </Row>
            }
            {(!isLoading && lastNews.length > 0 && news.length === 0 && films.length === 0) &&
               <Row justifyContent='center'>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.SectionTitle>Последние новости</Styled.SectionTitle>
                     <Styled.Line />
                     {lastNews.map((oneNews) => <SearchNewsCard key={oneNews.id} news={oneNews} />)}
                  </Col>
               </Row>
            }
            {(!isLoading && films.length > 0 && news.length > 0) &&
               <Row justifyContent='center'>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.FilterContainer>
                        <Styled.FilterItem
                           active={active === 'all' && true}
                           onClick={() => ActiveFilter('all')}>
                           Все результаты<Styled.Span>{films.length + news.length}</Styled.Span>
                        </Styled.FilterItem>
                        <Styled.FilterItem
                           active={active === 'films' && true}
                           onClick={() => ActiveFilter('films')}>
                           Фильмы<Styled.Span>{films.length}</Styled.Span>
                        </Styled.FilterItem>
                        <Styled.FilterItem
                           active={active === 'news' && true}
                           onClick={() => ActiveFilter('news')}>
                           Новости<Styled.Span>{news.length}</Styled.Span>
                        </Styled.FilterItem>
                     </Styled.FilterContainer>
                  </Col>
               </Row>
            }
            {(!isLoading && isEmpty) && <Styled.IsEmptyText>По вашему запросу ничего не найдено</Styled.IsEmptyText>}
            {(!isLoading && films.length > 0 && active === 'all') &&
               <Row justifyContent='center'>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.SectionTitle>Фильмы</Styled.SectionTitle>
                     <Styled.Line />
                     {films.map((film, index) => { return index < 3 ? <SearchCard key={film.id} film={film} /> : false })}
                  </Col>
               </Row>
            }

            {(!isLoading && films.length > 0 && active === 'films') &&
               <Row justifyContent='center'>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.SectionTitle>Фильмы</Styled.SectionTitle>
                     <Styled.Line />
                     {films.map((film) => <SearchCard key={film.id} film={film} />)}
                  </Col>
               </Row>
            }

            {(!isLoading && news.length > 0 && active === 'all') &&
               <Row justifyContent='center'>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.SectionTitle>Новости</Styled.SectionTitle>
                     <Styled.Line />
                     {news.map((oneNews, index) => { return index < 3 ? <SearchNewsCard key={oneNews.id} news={oneNews} /> : false })}
                  </Col>
               </Row>
            }

            {(!isLoading && news.length > 0 && active === 'news') &&
               <Row justifyContent='center'>
                  <Col xl="6" lg="6" md="8" sm="12">
                     <Styled.SectionTitle>Новости</Styled.SectionTitle>
                     <Styled.Line />
                     {news.map((oneNews) => <SearchNewsCard key={oneNews.id} news={oneNews} />)}
                  </Col>
               </Row>
            }
         </Container>
         <Footer />
      </>
   )
}

export default SearchPage;