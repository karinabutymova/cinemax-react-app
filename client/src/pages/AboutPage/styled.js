import styled from "styled-components";
import { HashLink as Link } from 'react-router-hash-link';

export const TitleDiv = styled.div`
   position: fixed;
   top: 45%;

   /* &::before{
      content: '';
      position: absolute;
      width: 150px;
      height: 150px;
      display: inline-block;
      background: #8D1BCD;
      border-radius: 50%;
      filter: blur(70px);
      opacity: 0.5;
   } */

   @media (max-width: 992px) {
      position: relative;
      top: 0%;
      margin-top: 120px;
   }
`;



export const PageTitle = styled.h1`
   font-family: 'Azonix';
   font-style: normal;
   font-weight: 400;
   font-size: 64px;
   line-height: 65px;

   color: #FFFFFF;

   @media (max-width: 992px) {
     text-align: center;
     font-size: 50px;
     line-height: 50px;
   }
`;

export const AboutTitle = styled.h2`
   font-style: normal;
   font-weight: 600;
   font-size: 26px;
   line-height: 31px;

   color: #FFFFFF;

   margin-top: 32px;

   margin-bottom: 24px;

   @media (max-width: 992px) {
      margin-top: 120px;
   }
`;

export const AboutText = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;
   display: flex;
   align-items: center;

   color: #FFFFFF;

   margin-bottom: 12px;

   @media (max-width: 576px) {
      font-size: 14px;
      line-height: 16px;
   }
`;

export const SpecialDiv = styled.div`
   display: flex;
   gap: 8px;
   align-items: center;

   margin-bottom: 24px;
`;

export const SpecialIcon = styled.img`
   width: 20px;
   height: 20px;
`;

export const SpecialText = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   @media (max-width: 576px) {
      font-size: 14px;
      line-height: 16px;
   }
`;

export const HelpDiv = styled.div`
   display: flex;
   align-items: baseline;
   gap: 16px;
`;

export const Span = styled(Link)`
   text-decoration-line: underline;
   cursor: pointer;

   margin-left: 4px;

   &:hover{
      text-decoration-line: none;
   }
`;

export const SliderDiv = styled.div`
   margin: 32px 0;
   margin-bottom: 64px;
`;