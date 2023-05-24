import styled from "styled-components";
import { Seat } from "../Seat/styled";

export const SelectedSeats = styled.div`
   padding: 32px;
   min-width: 368px;

   background: #424242;
   border-radius: 8px;

   @media (max-width: 992px) {
      margin-top: 42px;
   }

   @media (max-width: 576px) {
      width: 100%;
   }
`;

export const SeletedTitle = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 21px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   margin-bottom: 16px;
`;


export const SeatDescriptionDiv = styled.div`
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: center;
   gap: 64px;

   margin-top: 56px;
`;

export const SelectedSeatDiv = styled.div`
   width: 100%;
   display: flex;
   padding: 16px 0;

   border-bottom: 1px solid #5B5B5B;
   align-items: center;
   justify-content: space-between;
`;

export const SelectSeatDiv = styled.div`
   display: flex;
   gap: 16px;
   align-items: center;
`;

export const SelectSeatPosition = styled.p`
   padding: 0;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;

export const ShowPrice = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;

export const TotalPriceDiv = styled(SeatDescriptionDiv)`
   border: none;
   justify-content: space-between;
   margin-top: 16px;
`;

export const TotalPrice = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;

export const TotalBonus = styled(TotalPrice)`
   font-weight: 400;
`;

export const TotalBonusCount = styled(TotalPrice)`
   font-weight: 400;
   color: #DB86FD;
`;

export const SelectSeat = styled(Seat)`
   background-color: #8D1BCD !important;
`;