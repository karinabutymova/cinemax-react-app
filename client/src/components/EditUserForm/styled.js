import styled from "styled-components";
import {
   SelectContainer as SelCont,
   Form as SelectForm,
   PrimaryButton as Primary,
   SecondaryButton as Secondary,
   ErrorTextGenres,
   Label as FormLabel,
   Flex as FormFlex
} from "../AddFilmForm/styled";

export const Form = styled(SelectForm)``;
export const Label = styled(FormLabel)``;
export const SelectContainer = styled(SelCont)``;
export const ErrorText = styled(ErrorTextGenres)``;
export const Flex = styled(FormFlex)``;
export const PrimaryButton = styled(Primary)``;
export const SecondaryButton = styled(Secondary)``;

export const NoUserMess = styled.p`
   background-color: transparent;
   margin-bottom: 24px;
   color: #2D2B35;

   font-size: 20px;
   font-weight: 500;
`;

export const UserInfo = styled.p`
   background-color: transparent;
   color: #2D2B35;
   font-weight: 400;
`;
