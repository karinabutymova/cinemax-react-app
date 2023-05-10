import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row } from "styled-bootstrap-grid";
import * as Styled from "./styled";
import { useEffect, useState } from "react";


const useParallaxBanner =
   (setScrollPosition, setScale) => {
      const handleScroll = () => {
         setScrollPosition(window.pageYOffset);
      }
      const handleResize = () => {
         if (window.innerWidth <= 576) setScale(4);
         else if (window.innerWidth >= 1200) setScale(11)
         else if (window.innerWidth >= 993) setScale(8);
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

   useEffect(() => {
      document.title = 'Cinemax';
   }, []);

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
         <Container>
            <Row>
               <Styled.MainScreen>

               </Styled.MainScreen>

            </Row>
         </Container>

         <Footer />
      </>
   );
}

export default MainPage;


