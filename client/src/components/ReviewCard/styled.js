import styled from "styled-components";
import { ReviewsUserCircle, ReviewsUser, ReviewsUserFlex } from "../../pages/FilmPage/styled";

export const UserFlex = styled(ReviewsUserFlex)`

`;

export const User = styled(ReviewsUser)`
`;

export const UserCircle = styled(ReviewsUserCircle)`

`;

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

export const ReviewText = styled.div`
   position: relative;
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;
   width: 100%;
   
   background: transparent;

   color: #FFFFFF;

   overflow: hidden;
   text-overflow: ellipsis;
   display: ${props => props.long ? '-webkit-box' : 'block'};
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
   
`;

export const ReviewReadMore = styled.p`
   padding: 0;
   position: absolute;
   text-decoration: underline;

   &:hover{
      cursor: pointer;
   }

   bottom: 0;
   right: 0;
   color: #F3C900;

   background-color: #393741;
`;

export const ReviewDate = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 400;
   font-size: 12px;
   line-height: 14px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #757575;
   background: transparent;
`;