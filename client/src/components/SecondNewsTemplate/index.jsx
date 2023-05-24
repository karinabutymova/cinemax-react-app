import { useLayoutEffect, useState } from 'react';
import * as Styled from "./styled";
import { Container, Row, Col } from "styled-bootstrap-grid";
import { DateFormat } from '../FirstNewsTemplate/functions';
import Slider from "react-slick";
import SliderPrevArrow from '../SliderPrevArrow';
import SliderNextArrow from '../SliderNextArrow';


const SecondNewsTemplate = ({ news }) => {
   const [newsCreatedate, setNewsCreatedate] = useState('');
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <SliderPrevArrow />,
      nextArrow: <SliderNextArrow />,
      appendDots: dots => (
         <Styled.CustomUl> {dots} </Styled.CustomUl>
      )
   };

   useLayoutEffect(() => {
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
            <Row>
               <Col>
                  <Slider {...settings}>
                     {news.news_images.split(', ').map((img, index) => {
                        try {
                           return <Styled.SliderDiv key={index}>
                              <Styled.NewsImg
                                 style={{ backgroundImage: 'url(' + require(`../../assets/images/News/${img}`) + ')' }}>
                              </Styled.NewsImg>
                           </Styled.SliderDiv>
                        } catch (error) {
                           return true;
                        }
                     })}
                  </Slider>
               </Col>
            </Row>
            <Row>
               <Col xl="8" lg="8" md="12" sm="12" xs="12">
                  <Styled.NewsBody dangerouslySetInnerHTML={{ __html: news.news_body }} />
               </Col>
            </Row>
         </Container >
      </>
   );
}

export default SecondNewsTemplate;