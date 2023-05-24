import styled from "styled-components";
import { PageTitle as Title } from "../../pages/ProfilePage/styled";

export const PageTitle = styled(Title)`
   font-size: 34px;
   line-height: 38px;

   color: #FFFFFF;
   margin: 0;
   cursor: default;

   @media (max-width: 576px) {
      font-size: 24px;
      line-height: 24px;
   }
`;


export const NewsCreateDate = styled.p`
   padding: 0;

   font-weight: 400;
   font-size: 15px;
   line-height: 18px;

   color: #A7A7A7;
   font-feature-settings: 'pnum' on, 'lnum' on;

   margin-top: 24px;
   margin-bottom: 32px;
`;

export const BreadCrumbs = styled(NewsCreateDate)`
   margin-bottom: 16px;
   
   margin-top: 64px;
   cursor: default;

   @media (max-width: 576px) {
      margin-top: 80px;
   }
`;

export const NewsImg = styled.div`
   background-size: cover;
   background-repeat: no-repeat; 
   background-position: 50% 15%; 
   width: 100%;
   height: 500px;
   border-radius: 8px;

   @media screen and (max-width: 768px){
      height: 400px;
   }
   @media screen and (max-width: 576px) {
      height: 300px;
   }

`;

export const NewsBody = styled.div`
   width: 100%;

   font-weight: 400;
   font-size: 16px;
   line-height: 20px;

   margin-top: 32px;
   margin-bottom: 48px;
`;