import styled from "styled-components";
import { PageTitle as Title } from "../ProfilePage/styled";
import { PrimaryButton as Primary } from "../ProfilePage/styled";
import { BonusInput as Input } from "../../components/EditProfile/styled";
import { ReviewsTextarea } from "../FilmPage/styled";
import { BonusError } from "../../components/Payment/styled";


export const PageTitle = styled(Title)`
   margin-bottom: 88px;

   @media (max-width: 576px) {
      margin-bottom: 56px;
   }
`;

export const Error = styled(BonusError)``;

export const SectionContainer = styled.div`
   margin-bottom: 88px;

   @media (max-width: 576px) {
      margin-bottom: 56px;
   }
`;

export const SectionTitle = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 28px;
   line-height: 33px;

   color: #FFFFFF;

   cursor: default;

   margin-bottom: 32px;

   @media (max-width: 576px) {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
   }
`;

export const FeedBackSectionTitle = styled(SectionTitle)`
   @media (max-width: 992px) {
      text-align: center;
   }
`;

export const WhiteContainer = styled.div`
   background: #FFFFFF;
   border-radius: 8px;
   padding: 32px;

   width: 100%;

   @media (max-width: 768px) {
      padding: 40px;
   }

   @media (max-width: 576px) {
      padding: 32px 16px;
   }
`;


export const BonusFlex = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 48px;

   background: transparent;
   & *{
      background: transparent;
   }

   @media (max-width: 768px) {
      flex-wrap: wrap;
   }
`;

export const BonusDivContainer = styled.div`

   display: flex;
   flex-direction: column;
   gap: 32px;
   align-items: center;

   @media (max-width: 768px) {
      gap: 16px;
   }
   
`;

export const BonusIcon = styled.img``;

export const BonusMarkDiv = styled.div`
   display: flex;
   gap: 16px;
   align-items: center;

`;

export const BonusText = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #2D2B35;

   @media (max-width: 768px) {
      text-align: center;
   }

`;

export const BonusMarkContent = styled.p`
   font-weight: 600;
   font-size: 20px;
   line-height: 23px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #2D2B35;

   @media (max-width: 576px) {
      font-size: 16px;
      line-height: 19px;
   }
`;

export const BonusMarkSpan = styled.span`
   color: #8D1BCD;
`;

export const TicketWhiteContainer = styled(WhiteContainer)`
   padding: 16px;
   & *{
      background: transparent;
   }
`;

export const TicketContainer = styled(WhiteContainer)`
   padding: 0;

   display: flex;
   align-items: center;
   justify-content: center;
   gap: 12px;

   @media (max-width: 1199px) {
      flex-wrap: wrap;
   }

   @media (max-width: 992px) {
      flex-direction: column;
   }
`;

export const ReturnTicketDiv = styled.div`
   display: flex;
   flex-direction: column;
   gap: 32px;
   justify-content: center;
   align-items: center;

   min-width: 170px;

   margin-top: 24px;

   @media (max-width: 1199px) {
      margin-top: 0;
      width: 49%;
   }

   position: relative;

   height: 160px;

`;

export const ReturnTicketText = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;
   text-align: center;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #2D2B35;
`;

export const TicketIcon = styled.img`
`;

export const ArrowRoundIcon = styled(TicketIcon)`
   margin-bottom: 32px;

   @media (max-width: 1199px) {
      display: none;
   }
`;

export const ArrowStraightIcon = styled(TicketIcon)`
   display: none;
   @media (max-width: 992px) {
      display: block;
   }
`;

export const Step = styled.p`
   position: absolute;
   left: 8px;
   top: -12px;

   display: none;

   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #000000;

   @media (max-width: 1199px) {
      display: block;
   }

   @media (max-width: 992px) {
      display: none;
   }
`;

export const TicketMark = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 12px;
   line-height: 14px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #2D2B35;

   width: 100%;

   margin-top: 24px;

   @media (max-width: 992px) {
      text-align: center;
   }
`;

export const FeedBackText = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;

   color: #FFFFFF;

   @media (max-width: 992px) {
      text-align: center;

      margin-bottom: 32px;
   }
`;

export const FeedBackForm = styled.form`
   width: 100%;

   background: #342F3B;
   border-radius: 8px;

   padding: 24px 40px;

   & * {
      background: transparent;
   }

   @media (max-width: 576px) {
      padding: 24px;
   }
`;

export const FullNameDiv = styled.div`
   display: flex;
   gap: 40px;

   @media (max-width: 1199px) {
      gap: 16px;
      flex-wrap: wrap;
   }

   @media (max-width: 992px) {
      flex-wrap: nowrap;
   }

   @media (max-width: 576px) {
      flex-wrap: wrap;
   }
`;

export const InputContainer = styled.div`
   display: flex;
   gap: 8px;
   flex-direction: column;
   width: 100%;

   margin-bottom: 24px;
   @media (max-width: 576px) {
      margin-bottom: 16px;
   }
`;

export const InputLabel = styled.p`
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;

export const PrimaryButton = styled(Primary)`
   background-color:#8D1BCD !important;
`;

export const BonusInput = styled(Input)`
   background: #2D2B35;

   @media (max-width: 1199px) {
      gap: 16px;
      width: 100%;
   }
`;

export const Textarea = styled(ReviewsTextarea)`
   background: #2D2B35;

   border: 1px solid #747474;
   border-radius: 4px;

   outline:none;
`;

export const Article = styled.article`
   background: transparent;
   width: 100%;
   border-radius: 10px;
`;