import React, { useState } from 'react';
import * as Styled from './styled';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchNewsCard = ({ news }) => {

   const [createdDate, setCreatedDate] = useState();
   const [imagePath, setImagePath] = useState();

   const navigate = useNavigate();

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

   const goToNewsPage = () => {
      navigate(`/news/${news.id}`);
   }

   return (
      <>
         <Styled.CardContainer onClick={goToNewsPage}>
            <Styled.ImgContainer>
               {imagePath !== null &&
                  <Styled.Img src={imagePath} alt={news.news_images.split(',')[0]} />
               }
               {imagePath === null &&
                  <Styled.Img src={require(`../../assets/images/NoImage/noImage.jpg`)} alt="no-image" />
               }
            </Styled.ImgContainer>
            <Styled.Flex>
               <Styled.NewsTitle>{news.news_title}</Styled.NewsTitle>
               <Styled.CreatedDate>{createdDate}</Styled.CreatedDate>
            </Styled.Flex>
         </Styled.CardContainer>
      </>
   )
}

export default SearchNewsCard;