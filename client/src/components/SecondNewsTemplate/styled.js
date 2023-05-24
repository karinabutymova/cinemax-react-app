import styled from "styled-components";
import {
   PageTitle as Title,
   NewsCreateDate as CreateDate,
   NewsBody as Body,
   NewsImg as Img,
   BreadCrumbs as Bread
} from "../FirstNewsTemplate/styled";

export const BreadCrumbs = styled(Bread)``;
export const PageTitle = styled(Title)``;
export const NewsCreateDate = styled(CreateDate)``;
export const NewsBody = styled(Body)``;

export const SliderDiv = styled.div``;
export const NewsImg = styled(Img)``;

export const CustomUl = styled.ul`
   z-index: 1;

   & li button:before {
      color: #8D1BCD;
      opacity: 0.4;
   }

   & li.slick-active button:before {
      color: #8D1BCD;
      opacity: 1;
   }
`;