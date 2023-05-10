import styled from "styled-components";

export const FlexContainer = styled.div`
   display: flex;
   gap: 64px;
   align-items: center;

   margin: 104px 0 24px 0;

   overflow-x: scroll;
   scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;

    &::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
   }
`;

export const SortTitleDiv = styled.div`
   display: flex;
   gap: 16px;
   align-items: center;
`;

export const SortTabsDiv = styled.div`
   display: flex;
   align-items: center;
   gap: 64px;

   position: relative;
`;

export const SortIcon = styled.img`
   width: 24px;
   height: 24px;
`;

export const SortTitle = styled.h2`
   font-style: normal;
   font-weight: 500;
   font-size: 20px;
   line-height: 23px;

   color: #FFFFFF;
`;

export const SorOption = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 21px;
   position: relative;

   display: inline;
   white-space: nowrap;

   color: ${props => props.active ? '#8D1BCD' : '#FFFFFF'};
   opacity: ${props => props.active ? '#1' : '0.5'};
   cursor: pointer;

   transition: all 0.25s;

   &:hover{
      opacity: 1;
   }

   &::after {
      position: absolute;
      content: "";
      display: block;
      opacity: ${props => props.active ? '1' : '0'};
      width: 8px;
      height: 8px;

      background: #8D1BCD;
      border-radius: 2px;
      top: 4px;
      left: -16px;
      margin-top: 2px;
   }

`;