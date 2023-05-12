import styled from "styled-components";
import { Button as Primary } from "../../components/PrimaryButton/styled";
import { Link } from "react-router-dom";

export const PrimaryButton = styled(Primary)`
   margin-top: 24px;
   width: 100%;
   background-color: #8D1BCD !important;
   
   &:hover{
      background: transparent !important;
   }
`;

export const MainSection = styled.section`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  padding: 0 10px;
  transition: 0.1s linear;
  z-index: 0;
`;

export const MainScreen = styled.div`
   background: transparent;

   & *{
      background: transparent;
   }

   margin-bottom: ${props => props.bottom || "0"}px;
`;

export const Div = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-end;
   height: 100%;
`;

export const MarginDiv = styled.div`
   margin-top: 180px;

   @media screen and (max-width: 768px){
      margin-top: 112px;
   }

   @media screen and (max-width: 576px){
      margin-top: 80px;
   }
`;

export const MainFilmTitle = styled.h1`
   font-style: normal;
   font-weight: 600;
   font-size: 40px;
   line-height: 47px;

   color: #FFFFFF;

   margin-bottom: 16px;

   @media screen and (max-width: 768px){
      font-size: 34px;
      line-height: 40px;
   }
   
   @media screen and (max-width: 576px){
      font-size: 28px;
      line-height: 32px;
   }

`;

export const MainFilmDescription = styled.p`
   font-style: normal;
   font-weight: 300;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;
`;

export const Flex = styled.div`
   display: flex;
   align-items: center;
   width: ${props => props.width || "auto"};
   gap: ${props => props.gap || "0"};
   justify-content: ${props => props.jContent || "flex-start"};

   margin-top: ${props => props.top || "0"}px;

   background: transparent;

   & *{
      background: transparent;
   }

   @media screen and (max-width: 576px){
      flex-wrap: wrap;
   }
`;

export const LinkToPage = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;

   text-decoration-line: underline;

   color: #FFFFFF;
   opacity: 0.6;

   padding: 4px 0;

   cursor: pointer;

   transition: opacity 0.2s;

   &:hover{
      opacity: 1;
   }

   @media screen and (max-width: 576px){
     display: none;
   }
`;

export const LinkToPageMobile = styled(LinkToPage)`

   display: none; 
   text-align: center;

   @media screen and (max-width: 576px){
      display: block;
      margin-top: 40px;
   }
`;

export const SectionTitle = styled.h2`
   font-style: normal;
   font-weight: 600;
   font-size: 28px;
   line-height: 32px;

   color: #FFFFFF;

   @media screen and (max-width: 576px){
      font-size: 20px;
      line-height: 23px;
   }

`;

export const CinemaTitle = styled.p`
   font-family: 'Azonix';
   font-style: normal;
   font-weight: 400;
   font-size: 46px;
   line-height: 46px;

   background: transparent;

   color: #FFFFFF;

   margin-bottom: 32px;

   @media screen and (max-width: 992px){
      font-size: 36px;
      line-height: 42px;
      text-align: center;
   }
   
   @media screen and (max-width: 576px){
      text-align: center;
      font-size: 20px;
      line-height: 23px;
      margin-bottom: 16px;
   }
`;

export const CinemaSlogan = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 46px;
   line-height: 52px;

   background: transparent;

   color: #FFFFFF;

   @media screen and (max-width: 992px){
      font-size: 36px;
      line-height: 36px;
      text-align: center;
   }
   
   @media screen and (max-width: 576px){
      text-align: center;
      font-size: 26px;
      line-height: 26px;
   }
`;

export const CinemaDivReverse = styled.div`
   display: flex;
   flex-direction: column;

   @media screen and (max-width: 992px){
      flex-direction: column-reverse;
   }
`;

export const CinemaDescription = styled.p`
   font-family: 'Raleway';
   font-style: normal;
   font-weight: 400;
   font-size: 20px;
   line-height: 23px;

   color: #FFFFFF;

   margin-top: 56px;
   background: transparent;

   @media screen and (max-width: 992px){
      text-align: center;
      font-size: 18px;
      line-height: 21px;
   }
   
   @media screen and (max-width: 576px){
      margin-top: 32px;
      font-size: 16px;
      line-height: 19px;
      text-align: left;
   }
`;

export const AboutDiv = styled.div`
   @media screen and (max-width: 992px){
      width: 50%;
   }

   @media screen and (max-width: 576px){
      width: 100%;
   }
`;

export const AboutDivFlex = styled.div`
   width: 100%;
   display: flex;
`;


export const AboutTile = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 21px;

   color: #FFFFFF;

   margin-bottom: 16px;

   @media screen and (max-width: 576px){
      margin-top: ${props => props.top || "0"}px;
   }
`;

export const AboutDescription = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   min-height: 88px;

   color: #AAAAAA;

`;

export const AboutLinkBtn = styled.div`

   background-color: transparent;

   display: inline-block;
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 40px;

   padding: 0 48px;
   color: #FFFFFF;

   z-index: 1;

   position: relative;
   cursor: pointer;

   @media screen and (max-width: 992px){
      background-color: rgba(141, 27, 205, 0.5);
      border-radius: 8px;
      line-height: 48px;
      width: 100%;
      padding: 0;

      text-align: center;
   }

   @media screen and (min-width: 992px){
      &::before{

         content:'→';
         font-size: 26px;
         text-align: center;
         line-height: 38px;

         display: block;
         position: absolute;
         top: 0;
         left: 0;

         height: 40px;
         width: 40px;
         border-radius: 20px;

         z-index: -1;
         background-color: rgba(141, 27, 205, 0.5);
         transition: width 0.2s;
      }

      &:is(:hover, :focus)::before{
         width: 100%;
         text-align: right;
         padding-right: 8px;
      }
   }
   
`;

export const AboutImgDiv = styled.div`
   width: 100%;
`;

export const AboutImg = styled.img`
   width: 100%;
   margin-top: 16px;
   z-index: 0;

   @media screen and (min-width: 992px){
      position: absolute;
      width: auto;
      left: -40%;
      margin-top: -9%;
   }

   @media screen and (min-width: 1140px){
      left: -35%;
   }
`;

export const SliderContainerDiv = styled.div`
   max-width: 1680px;
   margin: 0 auto;
   max-height: 700px;
   margin-top: 32px;
   margin-bottom: -180px;

   @media screen and (max-width: 1140px){
      height: 600px;
   }

   @media screen and (max-width: 768px){
      margin-bottom: -112px;
      height: 500px;
   }

   @media screen and  (max-width: 576px) {
      height: 400px;
      margin-bottom: -80px;
   }

   & .slick-slide{
      margin: 0 12px;

      @media (max-width: 576px) {
         margin: 0 8px;
      }
   }
`;
