import styled from "styled-components";

export const TicketsConatainer = styled.div`
   width: 100%;
   margin-bottom: 48px;

   & *{
      background: transparent;
   }
`;

export const TicketsIntro = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;

   background-color: #FFFFFF;
   background-color: ${props => props.isOver ? '#424242' : '#FFFFFF'};

   padding: 24px;
   border-radius: 16px;
   gap: 16px;

   position:relative;
   z-index: 0;

   cursor: pointer;

   @media (max-width: 576px) {
      flex-wrap: wrap;
   }
`;

export const OptionDiv = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;

   gap: 8px;
`;

export const FilmTitle = styled.h3`
   font-style: normal;
   font-weight: 700;
   font-size: 22px;
   line-height: 24px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: ${props => props.isOver ? '#FFFFFF' : '#2D2B35'};

   &:hover{
      cursor: pointer;
   }
`;

export const OptionTitle = styled.p` 
   padding: 0;
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #B0B0B0;
`;

export const OptionValue = styled.p`
   padding: 0;
   width: 100%;
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: ${props => props.isOver ? '#FFFFFF' : '#2D2B35'};
`;

export const BonusCount = styled(OptionValue)`
   color: #8D1BCD;
`;

export const BtnDiv = styled(OptionDiv)`
   justify-content: center;
   gap: 16px;
`;

export const ShowHideBtn = styled.div`
   padding: 0;

   text-align: center;

   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #8D1BCD;
   cursor: pointer;

`;

export const ReturnTicketsBtn = styled(ShowHideBtn)`
   font-size: 14px;
   line-height: 16px;

   color: #000000;

   opacity: 0.3;

   transition: opacity 0.2s;

   &:hover,&:focus {
      opacity: 0.6;
   }
`;

export const BackTicketsBtn = styled.div`
   text-align: center;
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #B0B0B0;

   &:hover{
      cursor: pointer;
      text-decoration: underline;
   }
`;

