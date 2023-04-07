import React, { useEffect, useState } from 'react';
import * as Styled from './styled';
import { Col } from 'styled-bootstrap-grid';
import { useLayoutEffect } from 'react';
import { DateFormat } from '../../pages/FilmPage/functions';

// TODO:: вывод - дата отзыва 
const ReviewCard = ({ review }) => {

   const [dateCreate, setDateCreate] = useState();
   const [longText, setLongText] = useState(true);

   const LongText = () => {
      setLongText(!longText);
   }

   return (
      <>
         <Styled.ReviewDiv>
            <Styled.UserFlex>
               <Styled.UserCircle>{review['reviews_user.lastname'][0].toUpperCase()}</Styled.UserCircle>
               <Styled.User>{review['reviews_user.lastname']} {review['reviews_user.firstname']}</Styled.User>
            </Styled.UserFlex>
            {review.review_text.length > 300 ?
               <Styled.ReviewText long={longText}>{review.review_text}
                  <Styled.ReviewReadMore onClick={LongText}>{longText ? 'Читать далее' : 'Скрыть'}</Styled.ReviewReadMore>
               </Styled.ReviewText>
               : <Styled.ReviewText>{review.review_text}</Styled.ReviewText>}

         </Styled.ReviewDiv>
      </>
   )
}

export default ReviewCard;