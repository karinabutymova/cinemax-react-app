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

   background: #E7E7E7;
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

   background: #FFFFFF;
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
`;

export const FlexDiv = styled.div`
   display: flex;
   gap: 32px;
`;

export const FilmInfoDiv = styled.div`
   display: flex;
   flex-direction: column;

   gap: 24px;
`;

export const OptionTitle = styled(OTitle)` `;

export const OptionValue = styled(OValue)``;

export const OptionDiv = styled(ODiv)``;

export const QRContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;