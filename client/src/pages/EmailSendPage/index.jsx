import { useEffect } from "react";
import { Form, FlexContainer, Title, SecondText, LogoText } from "./styled";
import { IconImg } from "./styled";
import { useNavigate } from 'react-router-dom';
import PrimaryButton from "../../components/PrimaryButton";
import iconSuccess from "../../assets/images/Icons/success.svg";

const EmailSend = () => {
   const navigate = useNavigate();

   useEffect(() => {
      document.title = 'Сброс пароля - Cinemax';
   }, []);

   const goToMainPage = (e) => {
      e.preventDefault();
      navigate("/");
      window.scrollTo(0, 0);
   }

   return (
      <FlexContainer>
         <IconImg src={iconSuccess} />
         <Title> Сообщение для сброса пароля отправлено</Title>
         <SecondText>
            Сообщение было отправлено на вас email адрес. Следуйте инструкциям в сообщении, чтобы сбросить пароль.
         </SecondText>
         <Form onSubmit={goToMainPage}>
            <PrimaryButton btnText="Вернуться на главную" width="260px" type="submit" />
         </Form>
         <LogoText>CINEMAX</LogoText>
      </FlexContainer>
   );

}

export default EmailSend;