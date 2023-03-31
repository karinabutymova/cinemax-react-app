import {  keyframes } from "styled-components";
import styled from "styled-components";

export const Box = styled.div`
   margin: 160px 0;
   width: 100%;
   display: flex;
   justify-content: center;
`;

export const Circle = styled.span`
`;

const grow = keyframes`
   from {
      transform: scale(0,0); 
      opacity: 0;
   }

   to {
      transform: scale(1,1); 
      opacity: 1;
   }
`;

const move = keyframes`
   from {
      transform: translateX(0px);
   }

   to {
      transform: translateX(45px);
   }
`;
export const ContainerBox = styled.div`
   height: 15px;
   width: 110px;
   display: flex;
   position: relative;

   & ${Circle}{
         width: 15px;
         height: 15px;
         border-radius: 50%;
         background-color: #8D1BCD;
         animation: ${move} 500ms linear 0ms infinite;
         margin-right: 30px;

      &:first-child{
         position: absolute;
         top:0;
         left:0;
         animation: ${grow} 500ms linear 0ms infinite;
      }

      &:last-child{
         position: absolute;
         top: 0;
         right: 0;
         margin-right: 0;
         animation: ${grow} 500ms linear 0s infinite reverse;
      }
   }
`;


