import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "styled-bootstrap-grid";
import * as Styled from "./styled";
import { useEffect, useState } from "react";
import Preloader from '../../components/Preloader';

import { ReactComponent as Heart } from '../../assets/images/Icons/heartMainPage.svg';
import { ReactComponent as Calendar } from '../../assets/images/Icons/calendar.svg';
import { ReactComponent as News } from '../../assets/images/Icons/news.svg';
import NewsCard from '../../components/NewsCard';
import SlickSlider from '../../components/Slider';
import SliderFilmCard from '../../components/SliderFilmCard';


const useParallaxBanner =
   (setScrollPosition, setScale) => {
      const handleScroll = () => {
         setScrollPosition(window.pageYOffset);
      }
      const handleResize = () => {
         if (window.innerWidth <= 576) setScale(4);
         else if (window.innerWidth >= 1200) setScale(11)
         else if (window.innerWidth >= 993) setScale(7.5);
         else setScale(6);
      }


      useEffect(() => {
         handleResize();
         window.addEventListener(
            'scroll',
            handleScroll,
            { passive: true }
         );
         window.addEventListener(
            'resize',
            handleResize,
            { passive: true }
         );

         return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
         }

      }, []);
   }
const MainPage = () => {
   const navigate = useNavigate();

   const [news, setNews] = useState([]);
   const [bestRateFilms, setBestRateFilms] = useState([]);
   const [soonFilms, setSoonFilms] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      document.title = 'Cinemax';
   }, []);

   useEffect(() => {
      getLastNews();
      getBestRateFilms();
      getSoonFilms();
   }, []);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   const getBestRateFilms = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/getBestRateFilms',
            { withCredentials: true }
         );
         setBestRateFilms(response.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(500);
         setIsLoading(false);
      }
   }

   const getSoonFilms = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get('http://localhost:3001/getSoonFilms',
            { withCredentials: true }
         );
         setSoonFilms(response.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(500);
         setIsLoading(false);
      }
   }

   const getLastNews = async () => {
      setIsLoading(true);
      try {
         const responseNews = await axios.get('http://localhost:3001/getLastNews',
            { withCredentials: true }
         );
         setNews(responseNews.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      } finally {
         await timeout(500);
         setIsLoading(false);
      }
   }

   const goToPage = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }

   const [scrollPosition, setScrollPosition] = useState(0);
   const [scrollScale, setScale] = useState(11);

   useParallaxBanner(setScrollPosition, setScale);


   return (
      <>
         <Styled.MainSection style={{
            backgroundImage: 'url(' + require(`../../assets/images/Posters/mainPoster.png`) + ')',
            backgroundSize: `${(window.outerHeight - scrollPosition) / scrollScale}%`
         }}>
         </Styled.MainSection>
         <Header />
         <Container style={{ height: '80vh' }}>
            <Styled.Div>
               <Row alignItems='end'>
                  <Col xl="7" lg="7" md="10" sm="12" xs="12" style={{ background: 'transparent' }}>
                     <Styled.MainScreen>
                        <Styled.MainFilmTitle>Человек-паук: Нет пути домой</Styled.MainFilmTitle>
                     </Styled.MainScreen>
                  </Col>
               </Row>
               <Row>
                  <Col xl="6" lg="6" md="8" sm="12" xs="12" style={{ background: 'transparent' }}>
                     <Styled.MainScreen>
                        <Styled.MainFilmDescription>
                           Жизнь и репутация Питера Паркера оказываются под угрозой, поскольку Мистерио раскрыл всему миру тайну личности Человека-паука. Пытаясь исправить ситуацию, Питер обращается за помощью к Стивену Стрэнджу, но вскоре всё становится намного опаснее.
                        </Styled.MainFilmDescription>
                     </Styled.MainScreen>
                  </Col>
               </Row>
               <Row>
                  <Col xl="3" lg="3" md="6" sm="12" xs="12" style={{ background: 'transparent' }}>
                     <Styled.MainScreen>
                        <Styled.PrimaryButton onClick={() => goToPage('/film/12')}>Забронировать билет</Styled.PrimaryButton>
                     </Styled.MainScreen>
                  </Col>
               </Row>
            </Styled.Div>
         </Container>

         {isLoading && <Preloader />}
         {!isLoading && <>
            {bestRateFilms.length > 0 &&
               <Styled.MarginDiv>
                  <Container>
                     <Row>
                        <Col col={12}>
                           <Styled.Flex jContent="space-between">
                              <Styled.Flex gap="16px">
                                 <Heart />
                                 <Styled.SectionTitle>Рекомендуем посмотреть</Styled.SectionTitle>
                              </Styled.Flex>
                              <Styled.LinkToPage onClick={() => goToPage('/poster')}>Перейти к афише</Styled.LinkToPage>
                           </Styled.Flex>
                        </Col>
                     </Row>
                  </Container >
                  <Styled.SliderContainerDiv>
                     <SlickSlider films={bestRateFilms} />
                  </Styled.SliderContainerDiv>
                  <Container >
                     <Row>
                        <Col col={12}>
                           <Styled.LinkToPageMobile onClick={() => goToPage('/poster')}>Перейти к афише</Styled.LinkToPageMobile>
                        </Col>
                     </Row>
                  </Container >
               </Styled.MarginDiv>
            }
            {soonFilms.length > 0 &&
               <Container>
                  <Styled.MarginDiv>
                     <Row style={{ marginBottom: '32px' }}>
                        <Col col={12}>
                           <Styled.Flex jContent="space-between">
                              <Styled.Flex gap="16px">
                                 <Calendar />
                                 <Styled.SectionTitle>Календарь кинопремьер</Styled.SectionTitle>
                              </Styled.Flex>
                              <Styled.LinkToPage onClick={() => goToPage('/poster?filter=soon')}>Смотреть все</Styled.LinkToPage>
                           </Styled.Flex>
                        </Col>
                     </Row>
                     <Row justifyContent='center'>
                        {soonFilms.map((film) =>
                           <Col key={film.id} xl="3" lg="3" md="6" sm="6" xs="6">
                              <SliderFilmCard film={film} imgHeight='370px' />
                           </Col>
                        )}
                     </Row>
                     <Row>
                        <Col col={12}>
                           <Styled.LinkToPageMobile onClick={() => goToPage('/poster?filter=soon')}>Смотреть все</Styled.LinkToPageMobile>
                        </Col>
                     </Row>
                  </Styled.MarginDiv>
               </Container >
            }

            {news.length > 0 &&
               <Container>
                  <Styled.MarginDiv>
                     <Row>
                        <Col col={12}>
                           <Styled.Flex jContent="space-between">
                              <Styled.Flex gap="16px">
                                 <News />
                                 <Styled.SectionTitle>Новости</Styled.SectionTitle>
                              </Styled.Flex>
                              <Styled.LinkToPage onClick={() => goToPage('/news')}>Перейти новостям</Styled.LinkToPage>
                           </Styled.Flex>
                        </Col>

                     </Row>
                     <Row>
                        {news.map((oneNews, index) => { return index < 3 ? <NewsCard key={oneNews.id} news={oneNews} /> : false })}
                     </Row>
                     <Row>
                        <Col col={12}>
                           <Styled.LinkToPageMobile onClick={() => goToPage('/news')}>Перейти новостям</Styled.LinkToPageMobile>
                        </Col>
                     </Row>
                  </Styled.MarginDiv>
               </Container >
            }
         </>}


         <Container>
            <Styled.MarginDiv>
               <Row>
                  <Col xl="3" lg="3" md="12" sm="12" xs="12" style={{ zIndex: '1', background: 'transparent' }}>
                     <Styled.CinemaTitle>Cinemax</Styled.CinemaTitle>
                  </Col>
                  <Col xl="9" lg="9" md="12" sm="12" xs="12" style={{ zIndex: '1', background: 'transparent' }}>
                     <Styled.CinemaSlogan>Смотри мировые премьеры<br />с&nbsp;комфортом!</Styled.CinemaSlogan>
                  </Col>
               </Row>
               <Styled.CinemaDivReverse>
                  <Row>
                     <Col xs="12">
                        <Styled.AboutImgDiv>
                           <Styled.AboutImg src={require(`../../assets/images/Posters/mainAbout.png`)}></Styled.AboutImg>
                        </Styled.AboutImgDiv>
                     </Col>
                  </Row>
                  <Row style={{ background: 'transparent' }}>
                     <Col xxlOffset={5} xlOffset={5} xl="7" lgOffset={5} lg="7" md="12" sm="12" xs="12" style={{ background: 'transparent' }}>
                        <Styled.CinemaDescription>Приобретай билеты быстро и&nbsp;просто, узнавай актульные новости сферы кино и&nbsp;читай отзывы пользователей, чтобы&nbsp;точно не&nbsp;прогадать с&nbsp;выбором</Styled.CinemaDescription>
                     </Col>
                  </Row>
               </Styled.CinemaDivReverse>

               <Row style={{ background: 'transparent' }}>
                  <Col xxlOffset={5} xlOffset={5} xl="7" lgOffset={5} lg="7" md="12" sm="12" xs="12" style={{ background: 'transparent' }}>
                     <Styled.Flex jContent="space-between" gap="16px" top="32">
                        <Styled.AboutDiv>
                           <Styled.AboutTile>
                              О нас
                           </Styled.AboutTile>
                           <Styled.AboutDescription>
                              Описали преимущества Cinemax, технологии, залы, типы кресел, оставили наши контакты и&nbsp;другое
                           </Styled.AboutDescription>
                           <Styled.AboutLinkBtn onClick={() => goToPage('/about')}>
                              Узнать больше
                           </Styled.AboutLinkBtn>
                        </Styled.AboutDiv>
                        <Styled.AboutDiv>
                           <Styled.AboutTile top="32">
                              Помощь
                           </Styled.AboutTile>
                           <Styled.AboutDescription>
                              Ответили на&nbsp;часто задаваемые вопросы и&nbsp;рассказали про&nbsp;возврат билетов
                           </Styled.AboutDescription>
                           <Styled.AboutLinkBtn onClick={() => goToPage('/help')}>
                              Узнать больше
                           </Styled.AboutLinkBtn>
                        </Styled.AboutDiv>
                     </Styled.Flex>
                  </Col>
               </Row>
            </Styled.MarginDiv>
         </Container>

         <Footer />
      </>
   );
}

export default MainPage;