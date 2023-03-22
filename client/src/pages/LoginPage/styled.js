import { Link } from "react-router-dom";
import styled from "styled-components";

export const Div = styled.div`
   width: 50%;
   height: 100vh;
   background-color: ${props => props.color || "transparent"};

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   overflow: hidden;
   @media screen and (max-width: 900px){
      width: 518px;
      height: auto;
      padding: 104px 0 ;
   }

   @media screen and (max-width: 576px){
      width: 100%;
      height: 100vh;
      padding: 16px;
   }
`;

export const FlexContainer = styled.div.attrs({
      className: 'FlexContainer',
   })`
   display: flex;

   background-color: transparent;

   @media screen and (max-width: 900px){
      & > ${Div}:first-child{
         display: none;
      }
      
      margin-top: 15%;

      justify-content: center;
      align-items: center;
      
   }

   @media screen and (max-width: 576px){
     margin-top: 0;
   }
   
`;

export const SignContainer = styled.div.attrs({
      className: 'SignContainer',
   })`
   display: none;

   @media screen and (max-width: 900px){
      display: flex;
      background-color: transparent;
   }
`;

export const Title = styled.h1.attrs({
      className: 'SignupForm',
   })`
   font-style: normal;
   font-weight: 600;
   font-size: 42px;
   line-height: 49px;
   text-align: center;

   width: 350px;
   margin-bottom: 32px;
   

`;

export const TitleSpan = styled.span`
   font-family: 'Azonix';
   font-style: normal;
   font-weight: 400;
   font-size: 42px;
   line-height: 42px;
   text-align: center;

   background-color: #8D1BCD;
   border: 4px #8D1BCD solid;
`;

export const Text = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;
   
   padding: 0;
   background-color: transparent;
   margin-right: 8px;

   @media screen and (max-width: 900px){
     color: #2D2B35;
   }
`;

export const SignUpLink = styled(Link)`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;
   text-decoration-line: none;

   background-color: transparent;
   color: #8D1BCD;

   &:hover{
      text-decoration-line: underline;
   }
`;

export const LoginImg = styled.img`
   margin-top: 64px;
`;