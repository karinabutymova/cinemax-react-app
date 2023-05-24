import styled from "styled-components";

import { PrevArrow } from "../SliderPrevArrow/styled";

export const NextArrow = styled.div`
   width: 36px;
   height: 36px;

   display: flex;
   align-items: center;
   justify-content: center;

   background: linear-gradient(257.33deg, #8D1BCD 2.79%, #44006A 93.67%) !important;
   border-radius: 8px;

   position: absolute;
   right: 1%;
   top: ${props => props.top ? props.top : '20%'};
   z-index: 1;

   opacity: 0.6;

   transition: opacity 0.2s;

   &:hover{
      opacity: 1;
   }

   @media (max-width: 992px) {
      display: none;
   }
`;

export const ArrowIcon = styled.img`
   height: 24px;
   width: 24px;
   background: transparent;

   transform: rotateY(180deg);
`;