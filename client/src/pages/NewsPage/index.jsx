import * as Styled from "./styled";
import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "styled-bootstrap-grid";
import NewsCard from "../../components/NewsCard";
import Preloader from "../../components/Preloader";

const NewsPage = () => {
   const [news, setNews] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isPagination, setIsPagination] = useState(false);

   const [newsCount, setNewsCount] = useState(6);

   useLayoutEffect(() => {
      getNews();
   }, []);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   const getNews = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/getAllNews',
            { withCredentials: true }
         );
         setNews(response.data);
         if (response.data.length > 6) setIsPagination(true);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(300);
         setIsLoading(false);
      }
   }

   const showMore = async () => {
      setNewsCount(newsCount + 6);
      if (news.length <= newsCount + 6) setIsPagination(false);
   }


   return (
      <>
         <Header />
         <Container>
            <Row>
               <Col col="12">
                  <Styled.PageTitle>Новости</Styled.PageTitle>
               </Col>
            </Row>

            {isLoading && <Preloader />}
            {(news.length > 0 && !isLoading) &&
               <Row style={{ marginTop: '32px' }}>
                  {news.map((oneNews, index) => { return index < newsCount ? <NewsCard key={oneNews.id} news={oneNews} /> : false })}
               </Row>
            }
            {(!isLoading && isPagination) &&
               <Row justifyContent='center'>
                  <Styled.PaginationBtn onClick={showMore}>Показать больше</Styled.PaginationBtn>
               </Row>
            }

            {(news.length === 0 && !isLoading) &&
               <Row>
                  <Col col="12">
                     <Styled.NullArrayText>Список новостей пока пуст</Styled.NullArrayText>
                  </Col>
               </Row>
            }
         </Container>
         <Footer />
      </>

   );
}

export default NewsPage;