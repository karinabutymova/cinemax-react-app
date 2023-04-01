import React, { useEffect, useState } from 'react';
import * as Styled from './styled';
import { Col } from 'styled-bootstrap-grid';
import { useLayoutEffect } from 'react';

// TODO: переход на страницу фильма
const PosterCard = ({ poster, filter, userId, isWish, setWishlist, deleteWishlist }) => {

   const [toDateRent, setToDateRent] = useState();
   const [isWishlist, setIsWishlist] = useState(isWish);

   useLayoutEffect(() => {
      DateFormat();
   }, []);

   const DateFormat = () => {
      let monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
         "июля", "августа", "сентября", "октября", "ноября", "декабря"];

      let dateStr = '';
      if (filter === 'now') {
         let dateDay = new Date(poster.to_rent_date).getDate().toString();
         let dateMounth = monthNames[new Date(poster.to_rent_date).getMonth().toString()];
         dateStr = 'до ' + dateDay + ' ' + dateMounth;
      } else {
         let dateDay = new Date(poster.from_rent_date).getDate().toString();
         let dateMounth = monthNames[new Date(poster.from_rent_date).getMonth().toString()];
         dateStr = 'c ' + dateDay + ' ' + dateMounth;
      }

      setToDateRent(dateStr);
   }

   const AddToWhishlist = () => {
      if (userId) {
         if (isWishlist) {
            console.log('unclick');
            setIsWishlist(false);
            deleteWishlist(isWish.id);
         } else {
            console.log('click');
            setIsWishlist(true);
            setWishlist(poster.id);
         }
      } else {
         console.log('Не авторизованный');
      }
   }

   return (
      <>
         <Col xl="3" lg="3" md="4" sm="6" xs="6">
            <Styled.CardContainer>
               {filter !== 'now' && <Styled.SoonDate>{toDateRent}</Styled.SoonDate>}
               {(filter === 'now' && poster.rate) && <Styled.SoonDate>{Number(poster.rate).toFixed(1)}</Styled.SoonDate>}
               <Styled.PosterLink>
                  <Styled.ImgLink src={require(`../../assets/images/Posters/${poster.photo_path}`)} />
               </Styled.PosterLink>
               <Styled.DateRent>
                  {filter === 'now' && toDateRent}
                  {filter === 'soon' && poster.film_runtime + ' мин'}
                  <Styled.Wishlist viewBox="0 0 24 24" isWish={isWishlist} onClick={AddToWhishlist}>
                     <path d="M20.4201 4.57996C19.9184 4.07653 19.3223 3.67709 18.6659 3.40455C18.0095 3.132 17.3058 2.9917 16.5951 2.9917C15.8844 2.9917 15.1806 3.132 14.5243 3.40455C13.8679 3.67709 13.2718 4.07653 12.7701 4.57996L12.0001 5.35996L11.2301 4.57996C10.7284 4.07653 10.1323 3.67709 9.47591 3.40455C8.81953 3.132 8.1158 2.9917 7.40509 2.9917C6.69437 2.9917 5.99065 3.132 5.33427 3.40455C4.67789 3.67709 4.08177 4.07653 3.58009 4.57996C1.46009 6.69996 1.33009 10.28 4.00009 13L12.0001 21L20.0001 13C22.6701 10.28 22.5401 6.69996 20.4201 4.57996Z" stroke="white" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
                  </Styled.Wishlist>
               </Styled.DateRent>
               <Styled.FilmTitle>
                  {poster.film_title}
               </Styled.FilmTitle>
               <Styled.FilmGenre>
                  {poster.genres}
               </Styled.FilmGenre>
            </Styled.CardContainer>
         </Col>
      </>
   )
}

export default PosterCard;