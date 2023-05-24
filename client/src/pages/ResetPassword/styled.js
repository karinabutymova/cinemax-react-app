import styled from "styled-components";
import { FormLogoText as LogoText } from "../../pages/ForgotPassword/styled";
import { PasswordReq as Password } from "../../components/SignForm/styled";

export const FormLogoText = styled(LogoText)`
   @media screen and (max-width: 576px){
      margin-top: 120px;
   }
`;

export const PasswordReq = styled(Password)``;