import styled from "styled-components";
import { PrimaryButton as Button } from "../../pages/FilmPage/styled";

export const HallsListDiv = styled.div`
   width: 100%;
   margin: 78px 0;
`;

export const HallDiv = styled.div`
   display: flex;
   align-items: center;
   gap: 40px;
`;

export const TimeFlexDiv = styled.div`
   display: flex;
   gap: 24px;
   padding: 32px 0;
   flex-wrap: wrap;
`;

export const HallTitle = styled.h3`
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 19px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
   min-width: 200px;
`;


export const PrimaryButton = styled(Button)`
   background-color: ${props => props.active ? '#8D1BCD' : 'gray'};
   width: 200px;
   
   pointer-events: ${props => props.active ? 'auto' : 'none'};

   @media (max-width: 576px) {
      width: 100%;
   }
`;

