import styled from "styled-components";
import { Button } from "../../components/PrimaryButton/styled";

export const Section = styled.section`
   position: absolute;
   top: 0;
   left: 0;
   background-size: cover;
   background-repeat: no-repeat; 
   background-position: 50% 15%; 
   height: 100vh;
   width: 100%;
   opacity: 0.5;

   z-index: 0;
`;

export const MainScreen = styled.div`
   height: 100vh;

   & *{
      background: transparent;
   }

   @media (max-width: 764px) {
      & .row{
         justify-content: flex-start !important;
      }
   }

`;

export const FilmTitle = styled.h1`
   font-style: normal;
   font-weight: 900;
   font-size: 80px;
   line-height: 94px;

   color: #FFFFFF;

   margim: 16px 0 40px 0;

   @media (max-width: 992px) {
      font-size: 60px;
      line-height: 68px;
   }
   @media (max-width: 576px) {
      font-size: 32px;
      line-height: 38px;
   }
`;

export const Flex = styled.div`
   display: flex;
   width: 100%;
   align-items: center;
   gap: ${props => props.gap || "4px"};
`;

export const ColunmFlex = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-end;

   height: 70vh;
   justify-content: space-between;

   padding: 42px 0;

   @media (max-width: 992px) {
      justify-content: space-around;
   }

`;

export const InfoColunmFlex = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 75vh;
   justify-content: flex-end;

   @media (max-width: 764px) {
      justify-content: flex-start;
   }

`;

export const PlayBtn = styled.div`
   width: 70px;
   height: 70px;

   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 50%;

   background: rgba(255, 255, 255, 0.9);

   &:hover{
      cursor: pointer;
   }

   @media (max-width: 576px) {
      display: none;
   }
`;

export const Rating = styled.div`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #CACACA;

   & span{
      color: #CACACA;
   }

   text-align: center;
`;

export const RatingNumber = styled.div`
   font-style: normal;
   font-weight: 900;
   font-size: 100px;
   line-height: 117px;
   color: transparent;

   -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #FFFFFF;

   font-feature-settings: 'pnum' on, 'lnum' on;

   @media (max-width: 576px) {
      font-size: 75px;
      line-height: 85px;
   }

`;

export const PlayBtnImg = styled.img`
   margin: 2px 0 0 4px;
`;

export const FilmInfo = styled.p`
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;
   color: #DBDBDB;

   padding: 0; 
   margin-top: 8px;
`;

export const PrimaryButton = styled(Button)`
   background: #8D1BCD;

   transition: all 0.25s;

   &:hover{
      color: #FFFFFF;
      border-color: #FFFFFF;
      background: rgba(141, 27, 205, 0.9);
   }
`;

export const TrailerButton = styled(Button)`
   background: transparent;
   color: #8D1BCD;
   border: 1px solid #8D1BCD;

   transition: all 0.25s;

   display: none;

   margin: 32px 0;

   &:hover{
      color: #FFFFFF;
      border-color: #FFFFFF;
   }

   @media (max-width: 576px) {
      display: block;
   }
`;

export const InWishlist = styled.svg`
   width: 48px;
   height: 48px;

   @media (max-width: 576px) {
      width: 56px;
      height: 56px;
   }

   &:hover {
      cursor: pointer;
   }

   & path{
      fill: ${props => props.isWish ? '#8D1BCD' : '#EBEBEB'};
   }

   &:hover path{
      fill: #8D1BCD;
   }
`;

export const InfoTitle = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   margin-bottom: 24px;

   @media (max-width: 992px) {
      margin-top: 32px;
   }
`;

export const InfoActorTitle = styled(InfoTitle)`
   margin-top: 40px;

   @media (max-width: 992px) {
      margin-top: 0;
   }
`;

export const InfoDiv = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;

   margin: 16px 0;
`;
export const InfoSpan = styled.span`
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;

   color: #BABABA;
`;

export const DescriptionSpan = styled(InfoSpan)`
   color: #FFFFFF;

`;

export const Line = styled.p`
   border: 1px solid #4F4F4F;
   width: 100%;
`;

export const GenresFlex = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-end;

   gap: 24px;

   @media (max-width: 992px) {
      display: none;
   }

`;



