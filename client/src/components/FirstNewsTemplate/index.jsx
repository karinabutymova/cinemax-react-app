import { useLayoutEffect, useState } from 'react';
import * as Styled from "./styled";

import { Container, Row, Col } from "styled-bootstrap-grid";

import { DateFormat } from './functions';


const FirstNewsTemplate = ({ news }) => {
   const [imagePath, setImagePath] = useState(null);
   const [newsCreatedate, setNewsCreatedate] = useState('');


   useLayoutEffect(() => {
      try {
         setImagePath(require(`../../assets/images/News/${news.news_images.split(',')[0]}`));
      } catch (error) {
         setImagePath(null);
      }
      DateFormat(news.created_at, setNewsCreatedate);
   }, []);

   return (
      <>
         <Container style={{ marginBottom: '72px' }}>
            <Row>
               <Col xl="8" lg="8" md="12" sm="12" xs="12">
                  <Styled.BreadCrumbs>Новости</Styled.BreadCrumbs>
                  <Styled.PageTitle>{news.news_title}</Styled.PageTitle>
               </Col>
            </Row>
            <Row>
               <Col col="12">
                  <Styled.NewsCreateDate>{newsCreatedate}</Styled.NewsCreateDate>
               </Col>
            </Row>
            {imagePath !== null &&
               <Row>
                  <Col col="12">
                     <Styled.NewsImg
                        style={{ backgroundImage: `url(${imagePath})` }}>
                     </Styled.NewsImg>
                  </Col>
               </Row>
            }
            <Row>
               <Col xl="8" lg="8" md="12" sm="12" xs="12">
                  <Styled.NewsBody dangerouslySetInnerHTML={{ __html: news.news_body }} />
               </Col>
            </Row>
         </Container >
      </>
   );
}

export default FirstNewsTemplate;