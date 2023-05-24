import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import { Col } from 'styled-bootstrap-grid';
// import { DateFormat } from '../../pages/FilmPage/functions';

const NewsCard = ({ news }) => {

   const navigate = useNavigate();

   const [imagePath, setImagePath] = useState();
   const [createdDate, setCreatedDate] = useState();

   const goToPage = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
      navigate(0);
   }

   useLayoutEffect(() => {
      try {
         setImagePath(require(`../../assets/images/News/${news.news_images.split(',')[0]}`));
      } catch (error) {
         setImagePath(null);
      }


      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(news.created_at);
      setCreatedDate(date.toLocaleDateString("ru", options).replace(/г.$/, ''));
   }, []);


   return (
      <>
         <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Styled.CardContainer>
               <Styled.NewsLink onClick={() => goToPage(`/news/${news.id}`)}>
                  {imagePath !== null &&
                     <Styled.ImgLink src={imagePath} alt={news.news_images.split(',')[0]} />
                  }
                  {imagePath === null &&
                     <Styled.ImgLink src={require(`../../assets/images/NoImage/noImage.jpg`)} alt="no-image" />
                  }
               </Styled.NewsLink>
               <Styled.NewsInfoDiv>
                  <Styled.NewsTitle>
                     {news.news_title}
                  </Styled.NewsTitle>
                  <Styled.NewsDate>
                     {createdDate}
                  </Styled.NewsDate>
               </Styled.NewsInfoDiv>

            </Styled.CardContainer>
         </Col>
      </>
   )
}

export default NewsCard;