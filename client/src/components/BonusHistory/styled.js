import styled from "styled-components";
import { SectionTitleDiv as EditSectionTitleDiv, SectionTitle as EditSectionTitle, ExitIcon as EditExitIcon } from '../EditProfile/styled';

export const SectionTitleDiv = styled(EditSectionTitleDiv)`
   margin-bottom: 48px;
`;
export const SectionTitle = styled(EditSectionTitle)``;
export const ExitIcon = styled(EditExitIcon)``;

export const NoResults = styled.div`
   text-align: center;
   width: 100%;

   margin: 80px 0 54px 0;

   font-weight: 600;
   font-size: 20px;
   line-height: 23px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #959595;
`;

export const BonusHistoryCard = styled.div`
   width: 100%;
   padding: 16px;

   background-color: #FFFFFF;

   margin-bottom: 16px;

   border-radius: 4px;

   & *{
      background: transparent;
   }
`;

export const OrderNumber = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #B0B0B0;

   margin-bottom: 12px;
`;

export const BonusInfoDiv = styled.div`
   display: flex; 
   gap: 24px;

   @media (max-width: 768px) {
      flex-wrap: wrap;
   }
`;

export const FilmTitle = styled.p`
   font-weight: 500;
   font-size: 20px;
   line-height: 23px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #2D2B35;
   
   max-width: 170px;
   width: 100%;

   @media (max-width: 768px) {
      max-width: 100%;
   }
`;

export const InfoDiv = styled.div`
   display: flex;
   gap: 8px;

   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #B0B0B0;

   width: 100%;
`;