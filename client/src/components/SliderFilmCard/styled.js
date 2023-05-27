import styled from "styled-components";
import { FilmGenre as Genre, DateRent as Date, FilmTitle as Title, SoonDate as Rating } from "../PosterCard/styled";

export const SliderDiv = styled.div`
   width: 100%;
   height: 200px;
   background-color: #FFFFFF !important;
`;

export const CardContainer = styled.div`
   width: 100%;
   position: relative;
`;

export const PosterLink = styled.div`
   width: 100%;
   max-height: 440px;
   border-radius: 8px;

   overflow: hidden;
`;

export const ImgLink = styled.img`
   height:${props => props.imgHeight ? props.imgHeight : '440px'};
   width: 100%;
   object-fit: cover;
   object-position: center;

   transition: all 0.35s;

   &:hover{
      transform: scale(1.1, 1.1);
      cursor: pointer;
   }

   @media (max-width: 1140px) {
      height:${props => props.imgHeight ? props.imgHeight : '380px'};
      height: 380px;
   }

   @media (max-width: 992px) {
      height: 326px;
   }

   @media (max-width: 576px) {
      height: 220px;
      height:${props => props.imgHeight ? '266px' : '220px'};
   }

`;

export const DateRent = styled(Date)`
`;

export const FilmGenre = styled(Genre)`
`;

export const FilmTitle = styled(Title)`
`;

export const Rate = styled(Rating)`
   position: absolute;
   top: 8px;
   left: 8px;

   min-width: 50px;

   z-index: 999;
`;