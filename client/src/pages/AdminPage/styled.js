import styled from "styled-components";
import { FilterContainer as Container, FilterItem as Item } from "../ProfilePage/styled";
import { NullArrayText as NullText } from "../ProfilePage/styled";
import { PrimaryButton as Button } from "../FilmPage/styled";

export const PageTitle = styled.h1`
   font-style: normal;
   font-weight: 700;
   font-size: 40px;
   line-height: 47px;

   color: #FFFFFF;

   margin-top: 64px;

   @media (max-width: 576px) {
      font-size: 32px;
      line-height: 38px;
      margin-top: 104px;
   }
`;

export const FilterContainer = styled(Container)``;
export const FilterItem = styled(Item)``;

export const NullArrayText = styled(NullText)``;
export const PrimaryButton = styled(Button)`
   margin-bottom: 32px;
   width: 100%;
`;

export const Title = styled(PageTitle)`
   font-weight: 500;
   font-size: 24px;
   line-height: 26px;

   margin-top: 16px;
`;

