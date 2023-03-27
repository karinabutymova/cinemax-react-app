import styled from "styled-components";
import { 
   FlexContainer as FGFlexContainer, 
   Title as FGTitle, 
   SecondText as FGSecondText, 
   LogoText as FGLogoText
} from "../ForgotPassword/styled";

export const IconImg = styled.img`
   width: 120px;
   height: 120px;
   margin:auto;

   margin-bottom: 24px;
`;

export const FlexContainer = styled(FGFlexContainer)`
   background-color: #2D2B35;
   height: 78vh;
`;

export const Title = styled(FGTitle)`
   background-color: #2D2B35;
   color: #FFFFFF;
   margin: 0 16px;
`;

export const SecondText = styled(FGSecondText)`
   background-color: #2D2B35;
   color: #FFFFFF;
   margin: 16px 16px 32px 16px;
`;

export const LogoText = styled(FGLogoText)`
   margin-top: 100px;
   text-align: center;
   opacity: 0.5;
   
   @media screen and (max-width: 576px){
      display: block;
   }
`;

export const Form = styled.form`
   margin: 0 16px;
`;