import styled from "styled-components";
import { Title as LoginTitle, ForgorPasswordLink as LoginForgorPasswordLink} from "../../components/LoginForm/styled";

export const FlexContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   height: 100vh;

   @media screen and (max-width: 576px){
      align-items: inherit;
   }
`;

export const Form = styled.form`
   background-color: #ffffff;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 40%;
   padding: 100px 16px;
   border-radius: 8px;

   @media screen and (max-width: 992px) {
      width: 55%;
   }

   @media screen and (max-width: 770px) {
      width: 80%;
   }

   @media screen and (max-width: 576px){
      width: 100%;
      height: 100vh;
      border-radius: 0;
   }
`;

export const Title = styled(LoginTitle)`
   margin-bottom: 40px;
`;

export const SecondText = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;
   text-align: center;

   background: #FFFFFF;

   margin-bottom: 48px;

   /* Gray 3 */
   color: #828282;
`;

export const LogoText = styled.span`
   font-family: 'Azonix';
   font-style: normal;
   font-weight: 400;
   font-size: 20px;
   line-height: 30px;

   /* Gray 4 */
   color: #BDBDBD;

   margin-top: 40px;

   @media screen and (max-width: 576px){
      display: none;
   }
`;

export const FormLogoText = styled(LogoText)`
   display: none;
   @media screen and (max-width: 576px){
      display: block;
      background-color: #FFFFFF;
   }
`;

export const ForgorPasswordLink = styled(LoginForgorPasswordLink)`
`;