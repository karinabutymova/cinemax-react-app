import styled from "styled-components";
import { Link } from "react-router-dom";

export const FlexContainer = styled.div`
   display: flex;
   justify-content: center;
`;

export const Form = styled.form`
   background-color: #ffffff;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
`;

export const Title = styled.h1`

   font-style: normal;
   font-weight: 600;
   font-size: 28px;
   line-height: 33px;
   text-align: center;

   background-color: #FFFFFF;
   color: #2D2B35;

   margin-bottom: 48px;
`;

export const GoogleLogin = styled.button`
   width: 386px;
   height: 48px;

   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 48px;
   text-align: center;

   background-color: #FFFFFF;
   box-shadow: 0px 4px 20px rgba(141, 27, 205, 0.08);
   border: 0px;
   border-radius: 4px;

   display: flex;
   align-items: center;
   justify-content: center;

   color: #2D2B35;
   margin-bottom: 24px;

   transition: all 0.25s;
   &:hover{
      background-color: #F5F5F5;
      cursor: pointer;
   }

   @media screen and (max-width: 576px){
      width: 100%;
   }
`;

export const GoogleLogo = styled.img`
   background-color: transparent;
   margin-right: 8px;
`;

export const Text = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;
   text-align: center;
   width: 100%;

   padding-bottom: 24px;

   color: #828282;
   background-color: #FFFFFF;

   &:before,
   &:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 170px;
      height: 1px;
      background-color: #E0E0E0;
      position: relative;

      @media screen and (max-width: 576px){
         width: 120px;
      }
   }
   &:before {
      left: -12px;
   }
   &:after {
      right: -12px;
   }
`;

export const Line = styled.div`
   width: 386px;
   height: 1px;

   background-color: #E0E0E0;

   margin: 56px 0 16px 0;
`;

export const ForgorPasswordLink = styled(Link)`
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 16px;

   text-align: center;

   color: #BDBDBD;
   background-color: #FFFFFF;

   text-decoration: none;

   transition: all 0.25s;

   &:hover{
      cursor: pointer;
      color: #8D1BCD;
   }

   @media screen and (max-width: 900px){
     margin-bottom: 56px;
   }
`;


