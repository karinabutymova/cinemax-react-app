import styled from "styled-components";
import { Button } from "../../components/PrimaryButton/styled";

export const FlexContainer = styled.div`
   display: flex;
   align-items: flex-end;
   justify-content: center;
   height: 100%;
   
   @media (min-width: 992px) {
      height: 100vh;
   }

   @media (max-width: 992px) {
      padding-top: 32px;
   }
`;

export const PrimaryButton = styled(Button)`
   pointer-events: auto;
   background-color: #8D1BCD;

   transition: all 0.25s;
   width: 280px;

   @media screen and (max-width: 576px){
      width: 100%;
   }
`;

export const PageSlogan = styled.h1`
   font-style: normal;
   font-weight: 700;
   font-size: 52px;
   line-height: 62px;

   display:inline-block;

   color: #FFFFFF;

   margin-bottom: 24px;

   position: relative;

   &::before{
      content: "404";

      position: absolute;
      right: -10%;
      top:-38px;

      font-style: normal;
      font-weight: 500;
      font-size: 32px;
      line-height: 62px;
      font-feature-settings: 'pnum' on, 'lnum' on;

      color: #8D1BCD;
      z-index: 1;


      @media screen and (max-width: 576px){
         right: 0;
      }
   }

   
   @media (max-width: 992px) {
      margin-top: 64px;
   }
`;

export const ErrorType = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 400;
   font-size: 24px;
   line-height: 28px;

   color: #FFFFFF;

   margin-bottom: 16px;

`;

export const Description = styled.p`
   font-style: normal;
   font-weight: 300;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   margin-bottom: 48px;
   padding: 0;
`;

export const Img = styled.img`

max-width: 100%;
   @media screen and (max-width: 576px){
      width: 100%;
   }
`;