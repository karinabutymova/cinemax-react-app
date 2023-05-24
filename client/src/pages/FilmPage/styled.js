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
   font-size: calc(3vw + 2vh + 1vmin);
   /* line-height: 94px; */

   color: #FFFFFF;

   margin: 16px 0 40px 0;

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

export const RatingFlexDiv = styled.div`
   display: flex;
   justify-content: space-between;

   @media (max-width: 767px) {
      margin-top: 40px;
   }
`;

export const DeleteRating = styled.div`
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;

   color: #BABABA;
   margin-top: 40px;

   cursor: pointer;

   transition: color 0.2s;
   
   &:hover{
      color: #FFFFFF;
   }

   @media (max-width: 992px) {
      margin-top: 0;
   }
   @media screen and (max-width: 576px){
      font-size: 16px;
   }

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

export const ReviewBtnFlex = styled.div`
   display: flex;
   gap: 16px;
   background: transparent;
`;

export const PrimaryButton = styled(Button)`
   background: #8D1BCD;
   border-color: #8D1BCD;

   transition: all 0.25s;

   &:hover{
      color: #FFFFFF;
      border-color: #FFFFFF;
      background: rgba(141, 27, 205, 0.9);
   }
`;

export const SecondaryButton = styled(Button)`
   background: transparent;
   border: 1px solid #8D1BCD;
   color: #8D1BCD;
   width: 200px;

   transition: all 0.25s;

   &:hover{
      border-color: #FFFFFF;
      color: #FFFFFF;
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

export const ReviewFormError = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 12px;
   line-height: 14px;

   width:100%;

   color: #EB5757;
   background-color: transparent;
   padding: 0;
   margin-top: 4px;

   font-feature-settings: 'pnum' on, 'lnum' on;
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

export const ReviewsFlex = styled.div`
   display: flex;
   gap: 16px;

   margin-bottom: 32px;
   margin-top: 120px;
`;

export const ReviewsIcon = styled.img`
   width: 20px;
   height: 20px;
`;

export const ReviewsTitle = styled.h3`
   font-style: normal;
   font-weight: 600;
   font-size: 20px;
   line-height: 23px;

   color: #FFFFFF;

   text-align: ${props => props.center ? 'center' : 'left'};
`;

export const ReviewsFormDiv = styled.div`
   display: flex;
   justify-content: center;

   margin-bottom: 48px;
`;

export const ReviewsForm = styled.form`
   background-color: rgba(57, 55, 65, 0.5);
   padding: 32px;
   width: 100%;

   border-radius: 8px;

   @media (max-width: 992px) {
      padding: 24px;
   }

   @media (max-width: 576px) {
      padding: 16px;
   }

`;

export const ReviewsTextarea = styled.textarea`
   padding: 14px;
   width: 100%;
   height: 240px;
   resize: none;
   border-radius: 4px;


   border-width: 1px;
   border-color:${props => props.error ? '#EB5757' : 'rgba(57, 55, 65, 0.5)'};

   font-size: 16px;
`;

export const ReviewsUser = styled.p`
   padding: 0;
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;

   background: transparent;

   color: #FFFFFF;
`;

export const ReviewsUserFlex = styled.div`
   display: flex;
   gap: 16px;

   align-items: center;

   background: transparent;

   margin-bottom: 16px;
`;

export const ReviewsUserCircle = styled.div`
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background-color: #7A24B7;

   display: flex;
   align-items: center;
   justify-content: center;
`;

export const PaginationBtn = styled.div`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;

   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   text-decoration-line: underline;

   color: #757575;

   &:hover{
      cursor: pointer;
      text-decoration: none;
   }
`;

export const NumberDiv = styled.div`
   display: flex;
   font-style: normal;
   font-weight: 600;
   font-size: 13px;
   line-height: 15px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   gap: 17px; 
   margin-left: 11px;
`;

export const NumberSpan = styled.span`
   color: #757575;
`;


