import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkTab = styled.div`
   background-color: ${props => props.active ? '#8D1BCD' : '#4F4F4F'};
`;

export const Span = styled.span`
   background-color: transparent;
`;

export const TabsLi = styled.li`
   width: 235px;
`;

export const TabsHeader = styled.ul`
   display: table;
   width: 100%;
   list-style-type: none;

   margin-top: 112px;

   & ${TabsLi}{
      display: table-cell;
      text-align: center;
      cursor: pointer;
   }

   & ${TabsLi} > ${LinkTab}{
      display: block;
      padding: 15px;
      transition: all .2s ease-in;
      transform: skew(-42deg);
   }

   & ${TabsLi} > ${LinkTab} ${Span}{
      display: block;
      transform: skew(40deg);
   }

   & ${TabsLi} > ${LinkTab}:hover{
      background: #8D1BCD;
   }

   & ${TabsLi}.active > ${LinkTab}{
      background: #8D1BCD;
   }

`;

