import { Form, FlexContainer, Title, SecondText, LogoText } from "./styled";
import { IconImg } from "./styled";
import { useNavigate } from 'react-router-dom';
import PrimaryButton from "../../components/PrimaryButton";
import iconSuccess from "../../assets/images/Icons/success.svg";

// TODO: ограничить доступ к этой странице
const EmailSend = () =>{
   const navigate = useNavigate();

   const goToMainPage = (e) => {
      e.preventDefault();
      navigate("/");
   }

   return(
      <FlexContainer>
         <IconImg src={iconSuccess}/>
         <Title> Сообщение для сброса пароля отправлено</Title>
         <SecondText>
            Сообщение было отправлено на вас email адрес. Следуйте инструкциям в сообщении, чтобы сбросить пароль.
         </SecondText>
         <Form onSubmit = { goToMainPage }>
            <PrimaryButton btnText="Вернуться на главную" width="260px" type="submit"/>
         </Form>
         <LogoText>CINEMAX</LogoText>
      </FlexContainer>
   );

}

export default EmailSend;