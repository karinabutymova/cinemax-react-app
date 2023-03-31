import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import * as Styled from './styled';
import TabHeader from '../../components/TabHeader';
import PosterCard from '../../components/PosterCard';
import Preloader from '../../components/Preloader';

// TODO: переход на страницу фильма
const PosterPage = () => {
   // const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams({ filter: 'now' });
   const [posters, setPosters] = useState([]);
   const [postersCount, setPostersCount] = useState(4);
   const [isPagination, setIsPagination] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [activeTab, setActiveTab] = useState(Object.fromEntries(searchParams).filter);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   useEffect(() => {
      getPosters();
   }, [activeTab]);


   const getPosters = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/posters', {
            params: {
               filter: activeTab,
            },
         }, { withCredentials: true });

         let res = response.data.reduce((a, i) => a.concat(i, i), []);
         // let res = response.data;
         if (res.length > 4) setIsPagination(true);
         setPosters(res);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      } finally {
         await timeout(300);
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
                     setSearchParams={setSearchParams}
                  />
               </Col>
            </Row>
            {isLoading && <Preloader />}
            {!isLoading &&
               <Row>
                  {posters && posters.map((poster, index) => {
                     if (index < postersCount) {
                        return <PosterCard key={poster.id} poster={poster} filter={activeTab} />
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
      </>
   )
}

export default PosterPage;