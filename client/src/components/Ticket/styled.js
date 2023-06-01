import styled from "styled-components";
import {
   FilmTitle as Title,
   OptionDiv as ODiv,
   OptionTitle as OTitle,
   OptionValue as OValue
} from "../UserTickets/styled";

export const ShowTicketsConatainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   gap: 32px;
   align-items: center;
   justify-content: center;
   padding: 90px 0 40px 0;

   margin-top: -50px;

   background: ${props => props.isOver ? '#353439' : '#E7E7E7'};
   border-radius: 16px;

   @media (max-width: 992px) {
     padding: 90px 32px 40px 32px;
   }

   @media (max-width: 576px) {
     padding: 90px 16px 40px 16px;
   }
`;

export const SingleTicketContainer = styled.div`
   display: flex;
   gap: 24px;
   min-width: 70%;

   justify-content: center;

   background: ${props => props.isOver ? '#424242' : '#FFFFFF'};
   border-radius: 16px;
   padding: 32px;

   align-items: center;

   @media (max-width: 992px) {
     flex-wrap: wrap;
     justify-content: center;
   }
  
`;

export const PosterContainer = styled.div`
   max-width: 234px;
   position: relative;
   margin: 0;
`;

export const PosterLink = styled.div`
   max-height: 288px;
   border-radius: 8px;
   margin: 0;
   overflow: hidden;
`;

export const FilmTitle = styled(Title)``;

export const ImgLink = styled.img`
   object-fit: cover;
   width: 100%;
   height: 288px;
  
   opacity: ${props => props.isOver ? '0.4' : '1'};
`;

export const FlexDiv = styled.div`
   display: flex;
   gap: 32px;
`;

export const FilmInfoDiv = styled.div`
   display: flex;
   flex-direction: column;

   width: 50%;

   gap: 24px;
`;

export const OptionTitle = styled(OTitle)` `;

export const OptionValue = styled(OValue)`
   /* color: ${props => props.isOver ? '#FFFFFF' : '#2D2B35'} !important; */
`;

export const OptionDiv = styled(ODiv)``;

export const QRContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const IsOverMark = styled.p`
   position: absolute;
   top: 45%;
   left: 15%;

   font-style: normal;
   font-weight: 700;
   font-size: 20px;
   line-height: 23px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   opacity: 1;

   transform: rotate(-30deg);
`;