import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import * as Styled from './styled';
import TabHeader from '../../components/TabHeader';
import PosterCard from '../../components/PosterCard';
 
const PosterPage = () => {
   // const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams({filter: 'now'});
   const [posters, setPosters] = useState([]);
   const [activeTab, setActiveTab] = useState(Object.fromEntries(searchParams).filter);

   useEffect(() => {
      getPosters();
   }, [activeTab]);


   const getPosters = async () => {
      try {
         const response = await axios.get('http://localhost:3001/posters', {
            params: {
               filter: activeTab,
            },
         },{ withCredentials: true });
         setPosters(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }

   }

   return (
      <>
      <Header/>
         <Container>
            <Row justifyContent='between'>
               <Col xl="2" lg="2" md="12">
                  <Styled.PageTitle>Афиша</Styled.PageTitle>
               </Col>
               <Col xl="7" lg="7" md="12">
                  <TabHeader activeId={activeTab} 
                     setActiveTab ={setActiveTab}
                     setSearchParams ={setSearchParams}
                  />
               </Col>
            </Row>
            <Row>
               {posters && posters.map((poster) => <PosterCard key={poster.id} poster={poster} filter={activeTab}/>)}
            </Row>
         </Container>
      </>
   )
}
 
export default PosterPage;