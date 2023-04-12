import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReviewText as Text, ReviewReadMore as ReadMore } from "../ReviewCard/styled";


export const ReviewDiv = styled.div`
   padding: 24px 32px;
   margin-bottom: 24px;

   background-color: rgba(57, 55, 65, 0.5);
   width: 100%;

   border-radius: 8px;

   @media (max-width: 992px) {
      padding: 24px;
   }

   @media (max-width: 576px) {
      padding: 16px;
   }
`;

export const FilmInfoFlex = styled.div`
   display: flex;
   gap: 16px;
   background: transparent;
   align-items: center;

   justify-content: space-between;
`;

export const FilmRateFlex = styled.div`
   display: flex;
   gap: 16px;
   background: transparent;

   & *{
      background: transparent;
   }
   align-items: center;
   
   margin-top: 16px;
`;

export const FilmInfoTitle = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 16px;

   color: #FFFFFF;
   background: transparent;
`;

export const FilmRateTitle = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;

   color: #FFFFFF;
   opacity: 0.7;
   background: transparent;
`;

export const FilmLink = styled(Link)`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;

   text-decoration-line: underline;

   color: #757575;
   background: transparent;

   &:hover{
      cursor: pointer;
      text-decoration: none;
   }
`;

export const ReviewText = styled(Text)`
   margin-top: 24px;
`;
export const ReviewReadMore = styled(ReadMore)``;