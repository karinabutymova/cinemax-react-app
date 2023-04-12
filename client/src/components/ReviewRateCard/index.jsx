import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import * as Styled from './styled';

const ReviewRateCard = ({ review }) => {

   const [longText, setLongText] = useState(true);

   // useEffect(() => {
   // }, []);

   const LongText = () => {
      setLongText(!longText);
   }

   const RateStars = {
      size: 20,
      count: 10,
      isHalf: false,
      value: review.rating,
      edit: false
   };

   return (
      <>
         <Styled.ReviewDiv>
            <Styled.FilmInfoFlex>
               {review['ratings.film_title'] && <Styled.FilmInfoTitle>{review['ratings.film_title']}</Styled.FilmInfoTitle>}
               {review['reviews_film.film_title'] && <Styled.FilmInfoTitle>{review['reviews_film.film_title']}</Styled.FilmInfoTitle>}
               <Styled.FilmLink to={`/film/${review.film_id}`}>Перейти к фильму</Styled.FilmLink>
            </Styled.FilmInfoFlex>
            <Styled.FilmRateFlex>
               <Styled.FilmRateTitle>Ваша оценка: </Styled.FilmRateTitle>
               <ReactStars {...RateStars} />
            </Styled.FilmRateFlex>
            {review.review_text && review.review_text.length > 300 ?
               <Styled.ReviewText long={longText}>{review.review_text}
                  <Styled.ReviewReadMore onClick={LongText}>{longText ? 'Читать далее' : 'Скрыть'}</Styled.ReviewReadMore>
               </Styled.ReviewText>
               : review.review_text && <Styled.ReviewText>{review.review_text}</Styled.ReviewText>}
         </Styled.ReviewDiv>
      </>
   )
}

export default ReviewRateCard;