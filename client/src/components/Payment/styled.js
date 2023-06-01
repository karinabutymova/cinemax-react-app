import styled from "styled-components";
import { ModalContainer as ModalCon, ModalHeader as ModalHead, ModalBtnFlex as ModalButtons } from "../ReviewCard/styled";
import { ButtonsDiv as BtnDiv, PrimaryButton as FirstBtn, SecondaryButton as SecondBtn } from "../SeatsChoice/styled";

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

export const ModalContent = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   text-align: center;

   margin-bottom: 40px;
`;
export const ModalBtnFlex = styled(ModalButtons)``;

export const ButtonsDiv = styled(BtnDiv)`
`;

export const PrimaryButton = styled(FirstBtn)`
   background-color: ${props => props.active ? '#8D1BCD' : '#424242'} !important;
`;

export const SecondaryButton = styled(SecondBtn)`
   color: #8D1BCD;
`;

export const BonusDiv = styled.div`
   margin-bottom: 48px;
   width: 100%;

   display: flex;
   flex-direction: column;
   gap: 24px;
`;

export const InputDiv = styled(BonusDiv)`
   margin-bottom: 0;
   gap: 16px;
`;

export const BonusLabel = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;

export const BonusError = styled(BonusLabel)`
   font-size: 12px;
   color: red;

   width: 80%;
`;

export const BonusInput = styled.input`
   width: 280px;
   height: 48px;
   padding: 8px;

   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   font-feature-settings: 'pnum' on, 'lnum' on;

   background: #424242;
   border: 1px solid #747474;
   border-radius: 4px;

   outline:none;
   &::-webkit-outer-spin-button, 
   &::-webkit-inner-spin-button {
      display: none;
   }
`;

export const BonusMark = styled.p`
   font-weight: 400;
   font-size: 12px;
   line-height: 14px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
   opacity: 0.5;

`;

export const BonusTitle = styled.p`
   font-style: normal;
   font-weight: 600;
   font-size: 32px;
   line-height: 38px;

   color: #FFFFFF;
`;

export const BonusCountP = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 21px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   margin-bottom: 24px;
`;


export const BonusCount = styled.span`
   font-style: normal;
   font-weight: 500;
   font-size: 32px;
   line-height: 38px;

   font-feature-settings: 'pnum' on, 'lnum' on;
   color: #8D1BCD;
   margin-left: 8px;
`;

export const BonusCountBYN = styled.span`
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #939393;
   margin-left: 8px;
`;
