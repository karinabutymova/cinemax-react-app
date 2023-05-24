import styled from "styled-components";

export const ContainerDiv = styled.div`
   margin-bottom: 88px;
`;

export const Table = styled.table`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Td = styled.td`
   background-color: #FFFFFF;
   color: #000000;
   padding: 8px;
   width: 200px;
   text-align: center;
`;

export const Th = styled.th`
   background-color: #FFFFFF;
   color: #000000;
   padding: 4px;
   width: 200px;
`;

export const EditRowBtn = styled.button`
   height: 28px;
   padding: 0 16px;
   border-radius: 4px;
   border: 1px solid #8D1BCD;

   cursor: pointer;

   font-weight: 400;
   font-size: 14px;
   line-height: 28px;

   background-color: #8D1BCD;

   transition: all 0.2s;
   &:hover{
      background-color: transparent;
      color: #8D1BCD;
   }

`;

export const SearchInput = styled.input`
   width: 280px;
   height: 40px;

   padding: 8px 16px;

   margin-bottom: 16px;

   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   background: #424242;
   border: 1px solid #747474;
   border-radius: 4px;
`;

export const PaginationDiv = styled.div`
   margin-top: 16px;
   display: flex;
   align-items: center;
   gap: 4px;
`;

export const PaginationButton = styled.button`
   width: 24px;
   height: 24px;

   background-color: #8D1BCD;
   border: 0;
   border-radius: 4px;

   line-height: 24px;

   cursor: pointer;

   opacity: 1;

   transition: opacity 0.2s;

   &:hover{
      opacity: 0.85;
   }
`;

export const PaginationSpan = styled.span`
   font-feature-settings: 'pnum' on, 'lnum' on;
`;

export const PaginationStrong = styled.strong`
   font-feature-settings: 'pnum' on, 'lnum' on;
`;

export const PaginationSelect = styled.select`
   width: 60px;
   height: 32px;

   padding: 0 8px;

   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   background: #424242;
   border: 1px solid #747474;
   border-radius: 4px;
`;

export const PaginationOption = styled.option`
   width: 60px;
   height: 32px;

   padding: 8px 8px;

   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   background: #424242;
   border: 1px solid #747474;
   border-radius: 4px;
`;

export const PaginationInput = styled.input`
   font-feature-settings: 'pnum' on, 'lnum' on;

   width: 60px;
   height: 32px;

   padding: 8px 8px;

   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

   background: #424242;
   border: 1px solid #747474;
   border-radius: 4px;
`;