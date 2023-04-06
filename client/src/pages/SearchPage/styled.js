import styled from "styled-components";

export const SearchForm = styled.form`
   display: flex;
   flex-direction: column;
   position: relative;

   width: 100%;
   margin: 80px 0 56px 0;
`;
export const SearchInput = styled.input`
   width: 100%;
   padding: 12px 24px;
   height: 48px;

   border: 1px solid #7A24B7;
   border-radius: 8px;

   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;

   outline: none;
   transition: all 0.25s;

   &:focus{
      border: 2px solid #8D1BCD;
   }
`;

export const SearchIcon = styled.img`
   width: 24px;
   height: 24px;
   position: absolute;

   right: 24px;
   top: 12px;

   opacity: 0.5;
   transition: all 0.25s;

   &:hover{
      cursor: pointer;
      opacity: 1;
   }
`;

export const ErrorText = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 12px;
   line-height: 14px;

   width:100%;

   color: #828282;
   padding: 0;
   margin-top: 8px;
`;

export const IsEmptyText = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 18px;
   line-height: 14px;
   text-align: center;

   width:100%;

   color: #828282;
   padding: 0;
   margin-top: 8px;
`;


export const Button = styled.button`
   border: 0;
`;

export const SectionTitle = styled.p`
   font-style: normal;
   font-weight: 600;
   font-size: 20px;
   line-height: 23px;

   color: #FFFFFF;

   margin-bottom: 16px;
   margin-top: 16px;
`;

export const Line = styled.p`
   border: 1px solid #4F4F4F;
   width: 100%;

   margin-bottom: 24px;
`;

export const FilterContainer = styled.div`
   display: flex;
   width: 100%;
   flex-direction: column;
   gap: 16px;
   position: absolute;
   top: 4px;
   left: -40%;

   @media (max-width: 992px) {
      position: relative;
      flex-direction: row;
      gap: 48px;

      top: 0;
      left: 0;

      margin-bottom: 48px;
      justify-content: center;

   }
   @media (max-width: 576px) {
      justify-content: flex-start;
      overflow-x: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;

      &::-webkit-scrollbar { /* WebKit */
         width: 0;
         height: 0;
      } 
   }
`;

export const FilterItem = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 20px;
   position: relative;

   color: #FFFFFF;
   opacity: ${props => props.active ? '#1' : '0.5'};

   padding: 0;
   white-space: nowrap;
   display: inline;

   &:hover{
      opacity: 1;
      cursor: pointer;
   }

   &::after {
      position: absolute;
      content: "";
      display: block;
      opacity: ${props => props.active ? '1' : '0'};
      width: 4px;
      height: 100%;

      background: #F3C900;
      top: 0;
      left: -12px;
   }
`;

export const Span = styled.span`
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 20px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #828282;
   margin-left: 8px;

`;
