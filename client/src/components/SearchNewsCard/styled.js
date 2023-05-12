import styled from "styled-components";
import {
   CardContainer as Container,
   ImgContainer as ImgCont,
   FilmTitle,
   SoonDate,
   Flex as FlexContainer
} from "../SearchCard/styled";

export const CardContainer = styled(Container)``;
export const ImgContainer = styled(ImgCont)``;
export const Img = styled.img`
   object-position: center;
   width: 100%;

   object-fit: cover;

   transition: all 0.35s;

   &:hover{
      transform: scale(1.1, 1.1);
   }
`;
export const NewsTitle = styled(FilmTitle)``;
export const CreatedDate = styled(SoonDate)``;
export const Flex = styled(FlexContainer)``;