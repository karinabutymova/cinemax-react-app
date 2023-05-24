import styled from "styled-components";
import { ReviewsUserCircle, ReviewsUser, ReviewsUserFlex } from "../../pages/FilmPage/styled";
import { PrimaryButton as Primary } from "../../pages/FilmPage/styled";
import { SecondaryButton as Second } from "../SeatsChoice/styled";

export const PrimaryButton = styled(Primary)`
   width: 40%;
`;

export const SecondaryButton = styled(Second)`
   width: 40%;
`;

export const ModalContainer = styled.div`
   border-radius: 8px;
   padding: 32px;
`;

export const ModalHeader = styled.div`
   text-align: center;

   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 28px;

   color: #FFFFFF;

   margin-bottom: 24px;
`;

export const ModalBtnFlex = styled.div`
   display: flex;
   gap: 16px;
   justify-content: center;
`;

export const UserFlex = styled(ReviewsUserFlex)`
   align-items: baseline;
`;

export const User = styled(ReviewsUser)`
`;

export const UserCircle = styled(ReviewsUserCircle)`

`;

export const ReviewActionFlex = styled.div`
   display: flex;
   gap: 16px;

   background: transparent;

   @media (max-width: 768px) {
      width: 100%;
      justify-content: flex-end;
   }
`;

export const Flex = styled.div`
   display: flex;
   background: transparent;

   justify-content: space-between;
   align-items: baseline;

   @media (max-width: 768px) {
      flex-wrap: wrap-reverse;
   }
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

export const DeleteReviewBtn = styled.p`
    padding: 0;

   font-style: normal;
   font-weight: 400;
   font-size: 12px;
   line-height: 14px;

   color: #FFFFFF;
   background: transparent;
   cursor: pointer;

   opacity: 0.5;
   transition: opacity 0.2s;
   position: relative;

   &:hover{
      opacity: 1;
   }

`;