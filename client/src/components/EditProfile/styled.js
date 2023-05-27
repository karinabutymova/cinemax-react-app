import styled from "styled-components";
import { BonusInput as Input, BonusError, BonusLabel, BonusMark } from "../Payment/styled";

export const SectionTitle = styled.h1`
   line-height: 40px;
`;

export const ExitIcon = styled.p`
   font-size: 42px;
   font-weight: 500;

   cursor: pointer;

   opacity: 0.5;

   transition: opacity 0.2s;

   &:hover{
      opacity: 1;
   }
`;

export const SectionTitleDiv = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;

   border-bottom: 1px solid #ffffff;
   padding-bottom: 16px;

   margin-top: 48px;
`;
export const SubSectionTitle = styled.h2`
   margin-bottom: 16px;
   margin-top: 48px;
`;

export const NameForm = styled.form`
   display: flex;
   gap: 16px;
   flex-direction: column;

   margin-bottom: 56px;
`;

export const NameInputsDiv = styled.div`
   display: flex;
   gap: 8px;
   flex-wrap: wrap;

      
   @media (max-width: 576px) {
      width: 100%;
   }
`;

export const NameFormBtn = styled.button`
   width: 200px;
   height: 40px;

   background-color: transparent;
   border: 2px solid #8D1BCD;

   border-radius: 8px;
   color: #FFFFFF;

   transition: all 0.2s;

   cursor: pointer;
   &:hover{
      background-color: #8D1BCD;
      color: #FFFFFF;
   }

   
   @media (max-width: 576px) {
      width: 100%;
   }

`;

export const BonusInput = styled(Input)`
   height: 40px;

   font-size: 14px;

   @media (max-width: 576px) {
      width: 100%;
   }
`;

export const Error = styled(BonusError)``;
export const PaswordError = styled(Error)`
   max-width: 340px;
`;
export const Label = styled(BonusLabel)``;
export const Mark = styled(BonusMark)``;

export const InputDiv = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;

   @media (max-width: 576px) {
      width: 100%;
   }
`;

export const P = styled.p`
   font-size: 16px;
   cursor: pointer;
   width: 70%;

   font-feature-settings: 'pnum' on, 'lnum' on;

   margin-bottom: 16px;

   @media (max-width: 576px) {
      font-size: 14px;
      width: 100%;
   }
`;