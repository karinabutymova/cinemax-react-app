import SignForm from "../../components/SignForm";
import { FlexContainer, Div, TitleSpan, Text, SignUpLink, LoginImg, SignContainer } from '../LoginPage/styled';
import { SignTitle } from './styled';

import CinemaImg from '../../assets/images/LoginPage/cinemaAttribute.svg';

// TODO: изменить путь ссылки

const SignPage = () => {

 return (
   <FlexContainer>
      <Div>
         <SignTitle>
            Добро пожаловать в <TitleSpan>CINEMAX</TitleSpan>!
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