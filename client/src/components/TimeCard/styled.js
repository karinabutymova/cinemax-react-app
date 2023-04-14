import styled from "styled-components";

export const Price = styled.div`
   display: ${props => props.active === props.id ? 'block' : 'none'};
   position: absolute;
   width: 68px;
   height: 24px;

   right: -14px;
   top: -18px;
   z-index: 99;

   background-color: #FFFFFF;

   color: #000000;
   line-height: 24px;

`;

export const TimeDiv = styled.div`
   width: 68px;
   height: 32px;
   position: relative;
   display: block;

   transition: all 0.25s;
   background-color: ${props => props.active === props.id ? '#8D1BCD' : 'transparent'};
   border: ${props => props.active === props.id ? '1px solid #8D1BCD' : '1px solid #C4C4C4'};
 
   text-align: center;
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 32px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   &:hover{
      cursor: pointer;
   }
     
   &:hover ${Price}{

      display: block;
   }
`;


