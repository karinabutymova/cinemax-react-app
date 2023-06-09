import styled from "styled-components";
import { Button } from "../../components/PrimaryButton/styled";
import { ModalContainer as ModalCon, ModalHeader as ModalHead, ModalBtnFlex as ModalButtons } from "../../components/ReviewCard/styled";
import { SecondaryButton as SecondBtn } from "../../components/SeatsChoice/styled";


export const ModalContainer = styled(ModalCon)`
   padding: 54px;

   @media (max-width: 768px) {
      padding: 48px;
   }

   @media (max-width: 576px) {
      padding: 32px;
   }
`;
export const ModalHeader = styled(ModalHead)`
   font-weight: 700;
   font-size: 26px;
   line-height: 30px;

   margin-bottom: 24px;
`;

export const ModalBtnFlex = styled(ModalButtons)``;

export const PrimaryButton = styled(SecondBtn)`
   background-color: #8D1BCD;
   color: #FFFFFF !important;

   &:hover{
      background-color: #8D1BCD;
   }
`;

export const SecondaryButton = styled(SecondBtn)`
   color: #8D1BCD;
`;

export const PageTitle = styled.h1`
   font-style: normal;
   font-weight: 700;
   font-size: 40px;
   line-height: 47px;

   color: #FFFFFF;

   margin-top: 64px;

   @media (max-width: 576px) {
      font-size: 32px;
      line-height: 38px;
      margin-top: 104px;
   }

`;

export const UserInfoDiv = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 24px;
   gap: 20px;

   border: 2px solid #8D1BCD;
   border-radius: 8px;

   margin-top: -40px;
   
   @media (max-width: 992px) {
      margin-top: 42px;
   }

   @media (max-width: 576px) {
      gap: 42px;
      margin-top: 32px;
   }
`;

export const Icon = styled.img`
   width: 32px;
   height: 32px;
`;

export const UserInfoColumnDiv = styled.div`
   display: flex;
   flex-direction: column;
   gap: 24px;
`;

export const UserName = styled.p`
   font-style: normal;
   font-weight: 600;
   font-size: 18px;
   line-height: 20px;

   color: #FFFFFF;
`;
export const BtnDiv = styled.div`
   display: flex;
   gap: 32px;
`;

export const UserInfoBtn = styled.div`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;
   display: flex;
   align-items: center;
   text-decoration-line: underline;

   color: #FFFFFF;

   &:hover{
      cursor: pointer;
      text-decoration: none;
   }
`;

export const BonusDiv = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 19px 40px;
   gap: 16px;

   background: #FFFFFF;
   border-radius: 8px;

   margin-top: -40px;

   @media (max-width: 992px) {
      margin-top: 42px;
   }

   @media (max-width: 768px) {
      margin-top: 24px;
   }

`;

export const BonusTitle = styled.p`
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 19px;
   color: #2D2B35;

   background: transparent;
`;

export const BonusCountDiv = styled.div`
   display: flex;
   gap: 8px;

   background: transparent;

   align-items: end;
`;

export const BonusCount = styled.p`
   padding: 0;
   font-style: normal;
   font-weight: 500;
   font-size: 32px;
   line-height: 38px;
   background: transparent;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #8D1BCD;
`;

export const BonusMoney = styled.p`
   padding: 0;
   background: transparent;

   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #939393;
`;

export const BonusHistoryDiv = styled.div`
   display: flex;
   width: 100%;
   gap: 8px;
   align-items: center;
   justify-content: center;

   margin-top: 16px;
`;

export const BonusHistory = styled.div`
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;

   color: rgba(255, 255, 255, 0.5);

   &:hover{
      cursor: pointer;
      text-decoration: underline;
   }
`;

export const BonusHistoryIcon = styled.img`
   width: 18px;
   height: 18px;
`;

export const FilterContainer = styled.div`
   display: flex;
   width: 100%;
   gap: 48px;
   position: relative;

   margin-top: 80px;
   margin-bottom: 42px;

   @media (max-width: 576px) {
      justify-content: flex-start;
      overflow-x: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;

      &::-webkit-scrollbar { /* WebKit */
         width: 0;
         height: 0;
      } 
   }
`;

export const FilterItem = styled.p`
   font-style: normal;
   font-weight: 700;
   font-size: 20px;
   line-height: 21px;


   color: #FFFFFF;
   opacity: ${props => props.active ? '1' : '0.5'};

   padding: 0;
   white-space: nowrap;
   display: inline;

   transition: all 0.25s;

   &:hover{
      opacity: 1;
      cursor: pointer;
   }
`;

export const NullArrayText = styled.div`
   width: 100%;
   text-align: center;

   margin: 72px 0 32px 0;

   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 32px;

   color: #FFFFFF;
   opacity: 0.5;

   padding-top: 32px;
`;

export const PaginationBtn = styled(Button)`
   color: #FFFFFF;
   background-color: transparent;
   border: 1px solid #FFFFFF;
   max-width: 320px;

   margin: 48px 0;

   &:hover{
      color: #8D1BCD;
      border: 1px solid #8D1BCD;
   }

`;
