import styled from "styled-components";
import { PrimaryButton as Button } from "../../pages/FilmPage/styled";

import { Seat, DisableSeat as DisSeat } from "../Seat/styled";

export const ButtonsDiv = styled.div`
   display: flex;
   gap: 8px;

   margin-top: 64px;
`;

export const PrimaryButton = styled(Button)`
   background-color: ${props => props.active ? '#8D1BCD' : 'gray'};
   width: 200px;
   
   pointer-events: ${props => props.active ? 'auto' : 'none'};

   @media (max-width: 768px) {
      width: 100%;
   }
`;

export const SecondaryButton = styled(Button)`
   background-color: transparent;
   width: 200px;
   color: #8D1BCD;
   border: 1px solid #8D1BCD;

   @media (max-width: 768px) {
      width: 100%;
   }

   &:hover{
      background-color: transparent;
   }
`;

export const AvailableSeat = styled(Seat)``;
export const SelectSeat = styled(Seat)`
   background-color: #8D1BCD;
`;
export const DisableSeat = styled(DisSeat)``;

export const ScreenDiv = styled.div`
   width: 100%;


   text-align: center;
`;

export const ScreenTitle = styled.p`
   padding: 0;

   margin-bottom: 64px;

   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 21px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;

export const ScreenImg = styled.img`
   width: 100%;
   height: 46px;
`;

export const RowSeatsDiv = styled.div`
   width: 100%;
   display: flex;
   gap: 48px;

   text-align: center;
`;

export const SeatsContainer = styled.div`
   width: 100%;
   display: flex;
   gap: 15px;

   justify-content: center;
   margin-left: -48px;

`;

export const RowNumber = styled.div`
   padding: 0; 
   width: 16px;

   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 21px;
   text-align: center;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   margin-bottom: 20px;
`;

export const SeatDescriptionDiv = styled.div`
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: center;
   gap: 64px;

   margin-top: 56px;
`;

export const SeatDescription = styled.div`
   display: flex;
   gap: 4px;
   align-items: center;
`;

export const Description = styled.p`
   padding: 0;
`;
