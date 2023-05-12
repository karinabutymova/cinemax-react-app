import { useEffect } from "react";
import SignForm from "../../components/SignForm";
import { useNavigate } from 'react-router-dom';
import { FlexContainer, Div, TitleSpan, Text, SignUpLink, LoginImg, SignContainer } from '../LoginPage/styled';
import { SignTitle } from './styled';

import CinemaImg from '../../assets/images/LoginPage/cinemaAttribute.svg';

const SignPage = () => {
   const navigate = useNavigate();

   useEffect(() => {
      document.title = 'Регистрация - Cinemax';
   }, []);

   return (
      <FlexContainer>
         <Div>
            <SignTitle>
               Добро пожаловать в <TitleSpan onClick={() => navigate('/')}>CINEMAX</TitleSpan>!
            </SignTitle>
            <FlexContainer>
               <Text>Есть аккаунт?</Text>
               <SignUpLink to="/auth">Войти</SignUpLink>
            </FlexContainer>
            <LoginImg src={CinemaImg} />
         </Div>
         <Div color="#FFFFFF">
            <SignForm />
            <SignContainer>
               <Text>Есть аккаунт?</Text>
               <SignUpLink to="/auth">Войти</SignUpLink>
            </SignContainer>
         </Div>
      </FlexContainer>
   );
}

export default SignPage;