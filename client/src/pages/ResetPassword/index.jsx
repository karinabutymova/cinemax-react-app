import { useState, useLayoutEffect } from 'react'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

import { Form, FlexContainer, Title, SecondText, LogoText  } from "../../pages/ForgotPassword/styled";
import { FormLogoText } from "./styled";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

// TODO : (на будущее) Добавить popup о том что пароль обновлён
// TODO : (на будущее) Ограничить количество обновления пароля на время
// TODO : (на будущее) Лоадер (пока приходит ответ)

const ResetPassword = () =>{
   const {token} = useParams();
   const [password, setPassword] = useState('');
   const [confPassword, setConfPassword] = useState('');
   const [errors, setErrors] = useState({});
   const navigate = useNavigate();

   useLayoutEffect(() => {
      const resetPassword = async () => {
         try {
            await axios.get('http://localhost:3001/resetPassword', {
               params: {
                  resetToken: token,
               },
            },
            { withCredentials: true }) 
   
        } catch (error) {
            if (error.response) {
               if(error.response.data.token_error)navigate("/404");
            }
        }
     }
      resetPassword();

   }, []);
   
   
   const changePassword = async (e) => {
      e.preventDefault();
      try {
         await axios.put('http://localhost:3001/changePassword', {
            password: password,
            confPassword: confPassword,
            resetToken: token
         },
         { withCredentials: true }
         );
         navigate("/auth");
     } catch (error) {
         if (error.response) {
            setErrors(error.response.data);
         }
     }
  }
   
   return(
      <FlexContainer>
         <Form onSubmit = { changePassword }>
            <Title> Сброс пароля </Title>
            <SecondText> Пароль должен быть длинной не менее 8 символов, <br/>
               содержать минимум одну заглавную букву и цифру</SecondText>
            <InputField
               inputType="password"
               placeholder="Введите пароль"
               label="Пароль"
               onChange ={setPassword}
               error={errors.error_password}
            />
            <InputField
               inputType="password"
               placeholder="Повторите пароль"
               label="Подтвердите пароль"
               onChange ={setConfPassword}
               error={errors.password_do_not_match}
            />
            <PrimaryButton btnText="Сменить пароль" type="submit"/>
            <FormLogoText>CINEMAX</FormLogoText>
         </Form>
         <LogoText>CINEMAX</LogoText>
      </FlexContainer>
   );
}

export default ResetPassword;