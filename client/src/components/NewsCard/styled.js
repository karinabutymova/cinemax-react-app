import styled from "styled-components";

export const CardContainer = styled.div`
   width: 100%;
   margin-top: 32px;
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 16px;

   @media (max-width: 786px) {
      flex-direction: row;
      align-items: center;
   }

`;

export const NewsLink = styled.div`
   width: 100%;
   max-height: 278px;
   border-radius: 8px;

   overflow: hidden;
`;

export const ImgLink = styled.img`
   height: 278px;
   width: 100%;
   object-fit: cover;
   object-position: center;

   transition: all 0.35s;
   cursor: pointer;

   transform: scale(1.1, 1.1);

   &:hover{
      transform: scale(1.2, 1.2);
   }

   @media (max-width: 992px) {
      height: 194px;
   }
   @media (max-width: 576px) {
      height: 160px;
   }
`;

export const NewsTitle = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   margin-bottom: 8px;
`;

export const NewsDate = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 15px;
   line-height: 18px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #A7A7A7;

   padding: 0;
`;

export const NewsInfoDiv = styled.div`
   width: 70%;
`;