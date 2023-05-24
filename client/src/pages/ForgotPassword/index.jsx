import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Line } from "../../components/LoginForm/styled";
import { Form, FlexContainer, Title, SecondText, LogoText, FormLogoText, ForgorPasswordLink } from "./styled";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { Container } from 'styled-bootstrap-grid';
import Preloader from '../../components/Preloader';

const ForgotPassword = () => {
   const [email, setEmail] = useState('');
   const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      document.title = 'Забыли пароль? - Cinemax';
   }, []);

   function timeout(delay) {
      return new Promise(res => setTimeout(res, delay));
   }

   const sendEmail = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         await axios.post('http://localhost:3001/forgotPassword', {
            email: email,
         }, { withCredentials: true })
            .then((response) => {
               setIsLoading(false);
               if (response.data.success) navigate("/emailsend");
            });

      } catch (error) {
         if (error.response) {
            setErrors(error.response.data);
         }
      } finally {
         await timeout(150);
         setIsLoading(false);
      }
   }

   return (
      <>
         {isLoading &&
            <Container>
               <Preloader />
            </Container>
         }
         {!isLoading &&
            <FlexContainer>
               <Form onSubmit={sendEmail}>
                  <Title> Забыли пароль? </Title>
                  <SecondText>
                     Введите почту для получения инструкции<br />сброса пароля
                  </SecondText>
                  <InputField
                     type="text"
                     placeholder="Введите email"
                     label="Email"
                     onChange={setEmail}
                     error={errors.email_invalid}
                  />
                  <PrimaryButton btnText="Сбросить пароль" type="submit" />
                  <Line />
                  <ForgorPasswordLink to="/auth">Вернуться к авторизации</ForgorPasswordLink>
                  <FormLogoText>CINEMAX</FormLogoText>
               </Form>
               <LogoText>CINEMAX</LogoText>
            </FlexContainer>
         }
      </>
   );

}

export default ForgotPassword;