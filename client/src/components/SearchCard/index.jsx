import React, { useState } from 'react';
import * as Styled from './styled';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateFormat } from '../../pages/FilmPage/functions';

const SearchCard = ({ film }) => {

   const [toDateRent, setToDateRent] = useState();
   const navigate = useNavigate();

   useLayoutEffect(() => {
      DateFormat(film, setToDateRent);
   }, []);

   const goToFilmPage = () => {
      navigate(`/film/${film.id}`);
   }

   return (
      <>
         <Styled.CardContainer onClick={goToFilmPage}>
            <Styled.ImgContainer>
               <Styled.Img src={require(`../../assets/images/Posters/${film.photo_path}`)} />
            </Styled.ImgContainer>
            <Styled.Flex>
               <Styled.FilmTitle>{film.film_title}</Styled.FilmTitle>
               <Styled.FilmGenre>{film.genres}</Styled.FilmGenre>
               <Styled.SoonDate>{toDateRent}</Styled.SoonDate>
            </Styled.Flex>
         </Styled.CardContainer>
      </>
   )
}

export default SearchCard;