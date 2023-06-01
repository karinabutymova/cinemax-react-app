import styled from "styled-components";
import {
   Form as FilmForm,
   Label as FilmLabel,
   Flex as FilmFlex,
   PrimaryButton as Primary,
   SecondaryButton as Secondary,
   ErrorText as FilmErrorText,
   FileInput as FilmFileInput
} from "../AddFilmForm/styled";

export const Form = styled(FilmForm)``;
export const FileInput = styled(FilmFileInput)`
   margin-bottom: 12px;
`;
export const Label = styled(FilmLabel)``;
export const Flex = styled(FilmFlex)`
   margin-top: 24px;
`;
export const PrimaryButton = styled(Primary)``;
export const SecondaryButton = styled(Secondary)``;
export const ErrorText = styled(FilmErrorText)``;

export const TemplateBtnDiv = styled.div`
   background-color: transparent;

   display: flex;
   gap: 8px;

   margin-bottom: 8px;
`;

export const TemplateBtn = styled.button`
   width: 180px;
   height: 32px;

   
   border: 1px solid ${props => props.template === props.id ? '#8D1BCD' : '#929292'};
   color: ${props => props.template === props.id ? '#8D1BCD' : '#929292'};
   border-radius: 4px;
   background-color: transparent;
   cursor: pointer;

   font-size: 14px;
   font-weight: 500;
`;

export const ImgContainer = styled.div`
   display: flex;
   gap: 8px;

   @media (max-width: 576px) {
      flex-wrap: wrap;
   }

   background-color: transparent;
`;

export const ImgDiv = styled.div`
   width: 200px;
   height: 200px;

   background-repeat:no-repeat;
   background-position: center center;
   background-size: contain;

   & p{
      text-align: right;
      padding-right: 8px;

      font-size: 32px;

      cursor: pointer;
   }
`;

