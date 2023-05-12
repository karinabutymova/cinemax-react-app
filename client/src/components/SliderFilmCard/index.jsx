import * as Styled from "./styled";
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateFormat } from '../../pages/FilmPage/functions';

const SliderFilmCard = ({ film, imgHeight }) => {
   const navigate = useNavigate();
   const [toDateRent, setToDateRent] = useState();
   const [imagePath, setImagePath] = useState();

   useLayoutEffect(() => {
      try {
         setImagePath(require(`../../assets/images/Posters/${film.photo_path}`));
      } catch (error) {
         setImagePath(null);
      }

      DateFormat(film, setToDateRent);
   }, []);


   const goToPage = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }

   return (
      <Styled.CardContainer>
         {typeof film.rate === "undefined" && <Styled.Rate>{toDateRent}</Styled.Rate>}
         {film.rate && <Styled.Rate>{Number(film.rate).toFixed(1)}</Styled.Rate>}
         <Styled.PosterLink onClick={() => goToPage(`/film/${film.id}`)}>
            {imagePath !== null &&
               <Styled.ImgLink imgHeight={imgHeight} src={imagePath} alt={film.photo_path} />
            }
            {imagePath === null &&
               <Styled.ImgLink imgHeight={imgHeight} src={require(`../../assets/images/NoImage/noImage.jpg`)} alt="no-image" />
            }
         </Styled.PosterLink>
         <Styled.DateRent>{toDateRent}</Styled.DateRent>
         <Styled.FilmTitle>{film.film_title}</Styled.FilmTitle>
         <Styled.FilmGenre>{film.genres}</Styled.FilmGenre>
      </Styled.CardContainer>

   );
}

export default SliderFilmCard;