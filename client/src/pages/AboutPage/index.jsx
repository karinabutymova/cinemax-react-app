import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import bedIcon from '../../assets/images/Icons/bed.svg';
import bookMarkIcon from '../../assets/images/Icons/bookMark.svg';
import starIcon from '../../assets/images/Icons/star.svg';
import fastFoodIcon from '../../assets/images/Icons/fastFood.svg';
import Slider from "react-slick";
import SliderPrevArrow from '../../components/SliderPrevArrow';
import SliderNextArrow from '../../components/SliderNextArrow';
import { NewsImg, SliderDiv, CustomUl } from '../../components/SecondNewsTemplate/styled';


const AboutPage = () => {

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <SliderPrevArrow />,
      nextArrow: <SliderNextArrow />,
      appendDots: dots => (
         <CustomUl> {dots} </CustomUl>
      )
   };
   return (
      <>
         <Header />
         <Container>
            <Row>
               <Col xl="6" lg="6" md="12" sm="12" xs="12">
                  <Styled.TitleDiv>
                     <Styled.PageTitle>Cinemax</Styled.PageTitle>
                  </Styled.TitleDiv>
               </Col>
               <Col xl="6" lg="6" md="10" sm="12" xs="12">
                  <Styled.AboutTitle>О&nbsp;кинотеатре</Styled.AboutTitle>
                  <Styled.AboutText>Cinemax -&nbsp;это один из&nbsp;лидеров кинотеатральной индустрии Минска, предоставляющий высококачественный сервис и&nbsp;неповторимые впечатления от&nbsp;просмотра фильмов.   </Styled.AboutText>
                  <Styled.AboutText>Кинотеатр оснащен  современным оборудованием, которое позволяет нам показывать фильмы в&nbsp;высоком разрешении и&nbsp;с&nbsp;чистым звуком. Мы стремимся предоставлять посетителям максимально комфортные условия для&nbsp;просмотра кино.</Styled.AboutText>
                  <Styled.AboutText>Наша команда состоит из&nbsp;профессионалов, которые любят кино и&nbsp;знают, как создать неповторимую атмосферу для&nbsp;просмотра фильмов.</Styled.AboutText>
                  <Styled.SliderDiv>
                     <Slider {...settings} style={{ height: '300px' }}>
                        {[1, 2, 3, 4, 5].map((num, index) => {
                           try {
                              return <SliderDiv key={index}>
                                 <NewsImg
                                    style={{ height: '300px', backgroundImage: 'url(' + require(`../../assets/images/AboutPage/about${num}.jpg`) + ')' }}>
                                 </NewsImg>
                              </SliderDiv>
                           } catch (error) {
                              return true;
                           }
                        })}
                     </Slider>
                  </Styled.SliderDiv>
                  <Styled.AboutTitle>Что особенного?</Styled.AboutTitle>
                  <Styled.SpecialDiv>
                     <Styled.SpecialIcon src={bedIcon} alt="bed.svg" />
                     <Styled.SpecialText>залы с&nbsp;местами повышенного комфорта и&nbsp;инновационные форматы IMAX и&nbsp;ScreenX</Styled.SpecialText>
                  </Styled.SpecialDiv>
                  <Styled.SpecialDiv>
                     <Styled.SpecialIcon src={bookMarkIcon} alt="bookMark.svg" />
                     <Styled.SpecialText>удобная и&nbsp;простая система онлайн-бронирования билетов</Styled.SpecialText>
                  </Styled.SpecialDiv>
                  <Styled.SpecialDiv>
                     <Styled.SpecialIcon src={starIcon} alt="star.svg" />
                     <Styled.SpecialText>регулярные специальные мероприятия, такие как премьеры фильмов и&nbsp;тематические вечера</Styled.SpecialText>
                  </Styled.SpecialDiv>
                  <Styled.SpecialDiv>
                     <Styled.SpecialIcon src={fastFoodIcon} alt="fastFood.svg" />
                     <Styled.SpecialText>широкий выбор закусок и&nbsp;напитков в&nbsp;кинобаре, чтобы сделать ваше посещение кинотеатра еще более приятным</Styled.SpecialText>
                  </Styled.SpecialDiv>

                  <Styled.HelpDiv>
                     <Styled.AboutTitle>Есть вопросы?</Styled.AboutTitle>
                     <Styled.AboutText>Постарались ответить на них <Styled.Span to="/help#questions">здесь</Styled.Span></Styled.AboutText>
                  </Styled.HelpDiv>

               </Col>
            </Row>
         </Container>
         <Footer />
      </>
   )
}

export default AboutPage;