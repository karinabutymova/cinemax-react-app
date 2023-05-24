import styled from "styled-components";
import { Flex as FlexContainer, LinkToPage as Link, LinkToPageMobile as LinkMobile } from "../MainPage/styled";

export const SectionTitle = styled.h2`
   font-style: normal;
   font-weight: 600;
   font-size: 28px;
   line-height: 32px;

   color: #FFFFFF;

   @media screen and (max-width: 576px){
      font-size: 24px;
      line-height: 23px;
   }

`;

export const Flex = styled(FlexContainer)``;

export const LinkToPage = styled(Link)``;

export const LinkToPageMobile = styled(LinkMobile)``;

