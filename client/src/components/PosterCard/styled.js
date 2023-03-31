import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardContainer = styled.div`
   width: 100%;
   margin-top: 48px;
   position: relative;
 
`;

export const PosterLink = styled.div`
   width: 100%;
   max-height: 370px;
   border-radius: 8px;

   overflow: hidden;

`;


export const DateRent = styled.p`
   padding: 0;
   margin-top: 16px;

   font-style: normal;
   font-weight: 300;
   font-size: 14px;
   line-height: 16px;
   text-transform: uppercase;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #757575;
   position: relative;

`;

export const FilmGenre = styled.p`
   padding: 0;

   font-weight: 400;
   font-size: 15px;
   line-height: 18px;

   color: #A7A7A7;
`;

export const ImgLink = styled.img`

   object-fit: cover;
   width: 100%;
   height: 370px;

   transition: all 0.35s;

   &:hover{
      transform: scale(1.1, 1.1);
      cursor: pointer;
   }

   @media (max-width: 992px) {
      height: 326px;
   }
   @media (max-width: 576px) {
      height: 266px;
   }

`;

export const FilmTitle = styled.p`
   padding: 0;
   font-style: normal;
   font-weight: 600;
   font-size: 20px;
   line-height: 23px;

   color: #FFFFFF;
   margin: 16px 0 8px 0;

`;

export const SoonDate = styled.div`
   position: absolute;
   left: 16px;
   top: 16px;
   z-index: 99999;

   padding: 6px 16px;

   background-color: #44006A;

   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #F3F3F3;
   border-radius: 4px;

   @media (max-width: 576px) {
      left: 8px;
      top: 8px;
   }
`;

export const Rate = styled(SoonDate)`
   padding: 6px 12px;
`;

export const Wishlist = styled.svg`
   position: absolute;
   right: 8px;
   top: -4px;
   width: 26px;
   height: 26px;
   transition: all 0.25s;
   fill: none;

   &:hover{
      fill: #8D1BCD;
      cursor: pointer;
   }

   &:hover path{
      stroke: #8D1BCD;
   }
`;