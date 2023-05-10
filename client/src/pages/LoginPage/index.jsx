import { useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import { useNavigate } from 'react-router-dom';
import { FlexContainer, Div, Title, TitleSpan, Text, SignUpLink, LoginImg, SignContainer } from './styled';

import CinemaImg from '../../assets/images/LoginPage/cinemaAttribute.svg';

const LoginPage = () => {
   const navigate = useNavigate();

   useEffect(() => {
      document.title = 'Авторизация - Cinemax';
   }, []);

   return (
      <FlexContainer>
         <Div>
            <Title>
               С возвращением в <TitleSpan onClick={() => navigate('/poster')}>CINEMAX</TitleSpan>!
            </Title>
            <FlexContainer>
               <Text>Нет аккаунта?</Text>
               <SignUpLink to="/sign">Зарегистрироваться</SignUpLink>
            </FlexContainer>
            <LoginImg src={CinemaImg} />
         </Div>
         <Div color="#FFFFFF">
            <LoginForm />

            <SignContainer>
               <Text>Нет аккаунта?</Text>
               <SignUpLink to="/sign">Зарегистрироваться</SignUpLink>
            </SignContainer>
         </Div>
      </FlexContainer>
   );
}

export default LoginPage;