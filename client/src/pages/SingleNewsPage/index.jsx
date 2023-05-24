import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as Styled from "./styled";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "styled-bootstrap-grid";
import NewsCard from "../../components/NewsCard";
import Preloader from "../../components/Preloader";
import FirstNewsTemplate from '../../components/FirstNewsTemplate';
import SecondNewsTemplate from '../../components/SecondNewsTemplate';

const SingleNewsPage = () => {
   const { newsId } = useParams();
   const navigate = useNavigate();
   const [news, setNews] = useState({});
   const [lastNews, setLastNews] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useLayoutEffect(() => {
      GetNewsById(newsId);
      getLastNews();
   }, []);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   const goToPage = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }

   const GetNewsById = async (filmId) => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/getNewsById', {
            params: {
               newsId: newsId,
            }
         },
            { withCredentials: true }
         );
         if (!response.data) {
            goToPage('/notFoundPage');
         }
         setNews(response.data);
         console.log(response.data);

         document.title = response.data.news_title + ' - Cinemax';
         // DateFormat(response.data, setToDateRent);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(300);
         setIsLoading(false);
      }
   }

   const getLastNews = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/getOtherLastNews', {
            params: {
               newsId: newsId,
            }
         },
            { withCredentials: true }
         );
         setLastNews(response.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(300);
         setIsLoading(false);
      }
   }


   return (
      <>
         <Header />
         {isLoading && <Preloader />}
         {(!isLoading && Object.keys(news).length !== 0) &&
            <>
               {
                  {
                     '1': <FirstNewsTemplate news={news} />,
                     '2': <SecondNewsTemplate news={news} />
                  }[news.news_template] || goToPage('/notFoundPage')
               }
            </>
         }


         {(lastNews.length > 0 && !isLoading) &&
            <Container>
               <Row>
                  <Col col={12}>
                     <Styled.Flex jContent="space-between">
                        <Styled.SectionTitle>Читайте также</Styled.SectionTitle>
                        <Styled.LinkToPage onClick={() => goToPage('/news')}>Все новости</Styled.LinkToPage>
                     </Styled.Flex>
                  </Col>
               </Row>
               <Row>
                  {lastNews.map((oneNews, index) => { return index < 3 ? <NewsCard key={oneNews.id} news={oneNews} /> : false })}
               </Row>
               <Row>
                  <Col col={12}>
                     <Styled.LinkToPageMobile onClick={() => goToPage('/news')}>Все новости</Styled.LinkToPageMobile>
                  </Col>
               </Row>
            </Container >
         }


         <Footer />
      </>

   );
}

export default SingleNewsPage;