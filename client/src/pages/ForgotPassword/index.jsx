import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Line } from "../../components/LoginForm/styled";
import { Form, FlexContainer, Title, SecondText, LogoText, FormLogoText, ForgorPasswordLink } from "./styled";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

const ForgotPassword = () =>{
   const [email, setEmail] = useState('');
   const [errors, setErrors] = useState({});
   // const navigate = useNavigate();
   

   const sendEmail = async (e) => {
      e.preventDefault();
      try {
         await axios.post('http://localhost:3001/forgotPassword', {
             email: email,
         },
         { withCredentials: true }
         );
         // navigate("/profile");
     } catch (error) {
         if (error.response) {
            setErrors(error.response.data);
            console.log(error.response.data);
         }
     }
  }
   
   return(
      <FlexContainer>
         <Form onSubmit = { sendEmail }>
            <Title> Забыли пароль? </Title>
            <SecondText>
               Введите почту для получения инструкции<br/>сброса пароля
            </SecondText>
            <InputField
               type="text"
               placeholder="Введите email"
               label="Email"
               onChange ={setEmail}
               error={errors.email_invalid}
            />
            <PrimaryButton btnText="Сбросить пароль" type="submit"/>
            <Line/>
            <ForgorPasswordLink to="/auth">Вернуться к авторизации</ForgorPasswordLink>
            <FormLogoText>CINEMAX</FormLogoText>
         </Form>
         <LogoText>CINEMAX</LogoText>
      </FlexContainer>
   );

}

export default ForgotPassword;