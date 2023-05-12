import styled from "styled-components";
import { Link } from "react-router-dom";

export const Footer = styled.div`
   margin-top: 180px;
`;

export const Logo = styled.h4`
   font-family: 'Azonix';
   font-style: normal;
   font-weight: 400;
   font-size: 24px;
   line-height: 24px;

   text-transform: uppercase;

   color: #FFFFFF;

   @media (max-width: 768px) {
      text-align: center;
      margin-bottom: 42px;
   }
`;

export const Line = styled.div`
   width: 100%;
   height: 1px;

   border: 1px solid #4B4B4B;

   margin: 42px 0 24px 0;
`;

export const Policy = styled.p`
   padding: 0;
   margin-bottom: 48px;

   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #F3F3F3;

   @media (max-width: 576px) {
      text-align: center;
      width: 100%;
   }
`;

export const LinksFlexDiv = styled.div`
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   align-items: flex-start;

   gap: 56px;

   @media (max-width: 576px) {
      flex-direction: column;
      gap: 32px;
      text-align: center;
      align-items: center;
   }
   @media (max-width: 992px) {

      justify-content: space-between;
   }
`;

export const LinkContainer = styled.div`
   display: flex;
   flex-direction: column;

   gap: 16px;

`;

export const MainLink = styled(Link)`
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   text-decoration: none;
   background: transparent;
`;

export const SecondMainLink = styled(MainLink)`
   display: none;

   @media (max-width: 576px) {
      display: block;
   }
`;

export const ContactLink = styled(MainLink)`
  pointer-events: none;
  cursor: default;

   @media (max-width: 576px) {
      display: none;
   }
`;

export const SecondLink = styled(Link)`
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #CDCDCD;

   text-decoration: none;
   background: transparent;

   @media (max-width: 576px) {
      display: none;
   }
`;

export const ContactFlexDiv = styled.div`
   display: flex;
   gap: 8px;
   align-items: center;
`;

export const ContactSecondLink = styled(SecondLink)`
  pointer-events: none;
  cursor: default;

  display: block;

  font-feature-settings: 'pnum' on, 'lnum' on;
`;

export const Icon = styled.img`
   width: 20px;
   height: 20px;
`;

export const LargeIcon = styled.img`
   width: 24px;
   height: 24px;
`;

export const SocialLinks = styled.div`
   display: flex;
   gap: 32px;
`;

export const SocialIconLink = styled(Link)`

`;