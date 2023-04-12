import React, { useEffect, useState } from 'react';
import * as Styled from './styled';

const ReviewCard = ({ review }) => {

   const [dateCreate, setDateCreate] = useState(review.created_at);
   const [longText, setLongText] = useState(true);

   useEffect(() => {
      let options = { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(dateCreate);
      setDateCreate(date.toLocaleDateString("ru", options));
   }, []);

   const LongText = () => {
      setLongText(!longText);
   }

   return (
      <>
         <Styled.ReviewDiv>
            <Styled.UserFlex>
               <Styled.UserCircle>{review['reviews_user.lastname'][0].toUpperCase()}</Styled.UserCircle>
               <Styled.User>{review['reviews_user.lastname']} {review['reviews_user.firstname']}</Styled.User>
               <Styled.ReviewDate>{dateCreate}</Styled.ReviewDate>
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