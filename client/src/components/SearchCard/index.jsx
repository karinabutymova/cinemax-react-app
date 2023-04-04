import React, { useEffect, useState } from 'react';
import * as Styled from './styled';
import { Col } from 'styled-bootstrap-grid';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: переход на страницу фильма
const SearchCard = ({ film }) => {

   const [toDateRent, setToDateRent] = useState();
   const navigate = useNavigate();

   useLayoutEffect(() => {
      DateFormat();
   }, []);

   const DateFormat = () => {
      let monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
         "июля", "августа", "сентября", "октября", "ноября", "декабря"];

      let dateStr = '';
      if (new Date(film.from_rent_date) <= new Date()) {
         let dateDay = new Date(film.to_rent_date).getDate().toString();
         let dateMounth = monthNames[new Date(film.to_rent_date).getMonth().toString()];
         dateStr = 'до ' + dateDay + ' ' + dateMounth;
      } else {
         let dateDay = new Date(film.from_rent_date).getDate().toString();
         let dateMounth = monthNames[new Date(film.from_rent_date).getMonth().toString()];
         dateStr = 'c ' + dateDay + ' ' + dateMounth;
      }

      setToDateRent(dateStr);
   }

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