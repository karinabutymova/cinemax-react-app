import styled from "styled-components";

import { ButtonsDiv as BtnDiv, PrimaryButton as FirstBtn, SecondaryButton as SecondBtn } from "../SeatsChoice/styled";

export const ButtonsDiv = styled(BtnDiv)`
`;

export const PrimaryButton = styled(FirstBtn)`
`;

export const SecondaryButton = styled(SecondBtn)`
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
`;

export const BonusInput = styled.input`
   width: 250px;
   height: 40px;
   padding: 8px;

   font-weight: 400;
   font-size: 14px;
   line-height: 14px;

   background-color: #FFFFFF;
   color: #000000;

   font-feature-settings: 'pnum' on, 'lnum' on;

   border: 1px solid #CCCCCC;
   filter: drop-shadow(0px 0px 10px rgba(20, 25, 24, 0.05));
   border-radius: 4px;
`;

export const BonusMark = styled.p`
   font-style: italic;
   font-weight: 400;
   font-size: 12px;
   line-height: 14px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;
