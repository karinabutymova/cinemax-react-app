import styled from "styled-components";
import { Button } from "../../components/PrimaryButton/styled";

export const PageTitle = styled.h1`
   font-style: normal;
   font-weight: 600;
   font-size: 48px;
   line-height: 56px;

   color: #FFFFFF;

   margin-top: 112px;
`;

export const NotFound = styled.span`

   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 56px;

   color: #FFFFFF;

   margin: 112px 16px;
   width: 100%;
   
   text-align: center;

`;

export const PaginationBtn = styled(Button)`
   color: #FFFFFF;
   background-color: transparent;
   border: 1px solid #FFFFFF;
   max-width: 320px;

   margin: 48px 0;

   &:hover{
      color: #8D1BCD;
      border: 1px solid #8D1BCD;
   }

`;