import LoginForm from "../../components/LoginForm";
import { FlexContainer, Div, Title, TitleSpan, Text, SignUpLink, LoginImg, SignContainer } from './styled';

import CinemaImg from '../../assets/images/LoginPage/cinemaAttribute.svg';

const LoginPage = () => {
// TODO: повесить ссылку на главную на название
 return (
   <FlexContainer>
      <Div>
         <Title>
            С возвращением в <TitleSpan>CINEMAX</TitleSpan>!
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