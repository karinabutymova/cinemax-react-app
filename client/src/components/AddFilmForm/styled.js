import styled from "styled-components";
import { PrimaryButton as Primary, SecondaryButton as Secondary } from "../Payment/styled";

export const PrimaryButton = styled(Primary)`
   pointer-events: auto;
   background-color: #8D1BCD !important;

   transition: all 0.25s;
   &:hover{
     opacity: 0.8;
   }
`;
export const SecondaryButton = styled(Secondary)`
   transition: all 0.25s;
   &:hover{
      border-color: #2D2B35;
      color: #2D2B35 !important;
   }
`;

export const ErrorText = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 12px;
   line-height: 14px;

   width:100%;

   color: #EB5757;
   background-color: #FFFFFF;
   padding: 0;
   margin-top: -8px;
   margin-bottom: 16px;
   font-feature-settings: 'pnum' on, 'lnum' on;
`;

export const FileInput = styled.input`
   background-color: #FFFFFF;
   color: #000000;
   margin-bottom: 8px;
`;

export const ErrorTextGenres = styled(ErrorText)`
   margin-top: 8px;
`;

export const Form = styled.form`
   width: 100%;

   background-color: #FFFFFF;
   padding: 32px;

   margin-top: 24px;
   border-radius: 8px;

`;

export const SelectContainer = styled.div`
   margin: 16px 0;
   background-color: #FFFFFF;

   width: 386px;

   @media screen and (max-width: 576px){
      width: 100%;
   }

   & *{
      background-color: transparent;
   }
`;

export const Flex = styled.div`
   display: flex;
   gap: 8px;

   background-color: #FFFFFF;
`;

export const Label = styled.p`
   background-color: #FFFFFF;
   transition: all 0.25s;
   padding: 0 2px;
   z-index: 1;
   pointer-events: none;
   margin-bottom: 16px;

   font-weight: 500;
   
   color: ${props => props.inputColor || "#2D2B35"};
`;

export const TextArea = styled.textarea`
   background-color: #FFFFFF;
   border-radius: 8px;
   outline: none;

   width: 100%;
   padding: 16px;

   background-color: #FFFFFF;
   color: #2D2B35;

   border: 1px solid #BDBDBD;

   margin-bottom: 16px;

   resize: vertical;

   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;
   outline: none;
   transition: all 0.25s;

   width: 386px;

   @media screen and (max-width: 576px){
      width: 100%;
   }
   
   &:focus{
      border: 1px solid #8D1BCD;
   }

`;

export const SelectStyle = {
   container: (baseStyles) => ({
      ...baseStyles,
      borderColor: '#bdbdbd',
      background: '#FFFFFF'
   }),
   menu: (baseStyles) => ({
      ...baseStyles,
      background: "#FFFFFF",

      zIndex: '999',
   }),
   control: (baseStyles) => ({
      ...baseStyles,
      color: "#2D2B35",
      borderColor: '#bdbdbd',
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      width: '100%',
      height: '48px',
      boxShadow: 'none',
      ':active': {
         ...baseStyles[':active'],
         backgroundColor: '#FFFFFF',
         border: 'none'
      },
      ':hover': {
         ...baseStyles[':hover'],
         borderColor: '#424242',
         cursor: 'pointer'
      }
   }),
   option: (baseStyles) => ({
      ...baseStyles,
      border: `0px`,
      height: '42px',
      background: '#FFFFFF',
      color: '#2D2B35',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      ':active': {
         ...baseStyles[':active'],
         backgroundColor: '#FFFFFF',
      },
      ':hover': {
         ...baseStyles[':hover'],
         backgroundColor: '#d4d4d4',
         cursor: 'pointer',
      }
   }),
   singleValue: (baseStyles) => ({
      ...baseStyles,
      border: `0px`,
      color: "#2D2B35",
      background: 'transparent'
   }),
   valueContainer: (baseStyles) => ({
      ...baseStyles,
      border: `0px`,
      color: "#FFFFFF",
      background: 'transparent'
   }),
   input: (baseStyles) => ({
      ...baseStyles,
      color: "#2D2B35",
   }),
   dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      'svg': {
         fill: "#8D1BCD",
      }
   }),
   clearIndicator: (baseStyles) => ({
      ...baseStyles,
      'svg': {
         fill: "#8D1BCD",
      }
   }),
}