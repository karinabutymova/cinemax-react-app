import styled from "styled-components";

export const Button = styled.button`
   width: ${props => props.width || "386px"};
   height: 48px;

   background: #8D1BCD;
   border-radius: 8px;
   border: 0px;

   color: #FFFFFF;

   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 16px;

   margin: 8px 0;

   transition: all 0.3s;

   @media screen and (min-width: 992px) {
      &:hover{
         border: 1px solid #8D1BCD;
         background-color: transparent;
         color: #8D1BCD;
         cursor: pointer;
      }
      
   }

   &:active{
         border: 1px solid #8D1BCD;
         background-color: #44006A;;
         color: #FFFFFF;
      }
      
   @media screen and (max-width: 576px){
      width: 100%;
      padding: 12px 0;
   }
`;