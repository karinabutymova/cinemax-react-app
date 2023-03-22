import { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, FlexContainer, Title, GoogleLogin, GoogleLogo, Text, Line, ForgorPasswordLink } from "../LoginForm/styled";
import GoogleIcon from '../../assets/images/LoginPage/googleIcon.png';
import InputField from "../InputField";
import PrimaryButton from "../PrimaryButton";

// TODO: ссылка на Забыли пароль
// TODO: изменить логику регистарции (это пробный функционал)

const SignForm = () =>{
   const navigate = useNavigate();
   const [lastname, setLastName] = useState('');
   const [firstname, setFirstName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confPassword, setConfPassword] = useState('');
   const [errors, setErrors] = useState({});

  const Register = async (e) => {
   e.preventDefault();
   try {
       await axios.post('http://localhost:3001/users', {
           lastname: lastname,
           firstname: firstname,
           email: email,
           password: password,
           confPassword: confPassword
       },
       { withCredentials: true });
       navigate("/profile");
   } catch (error) {
       if (error.response) {
         setErrors(error.response.data);
         console.log(error.response.data);
       }
   }
}
   
   return(
      <Form onSubmit = { Register }>
         <Title> Регистрация </Title>
         {/* <GoogleLogin><GoogleLogo src={GoogleIcon} alt="googleIcon"/>Зарегистрироваться через Google</GoogleLogin>
         <FlexContainer>
           <Text>или</Text>
         </FlexContainer> */}
         <InputField
            type="text"
            placeholder="Введите фамилию"
            label="Фамилия"
            setLastName ={setLastName}
         />
         <InputField
            type="text"
            placeholder="Введите имя"
            label="Имя"
            setFirstName ={setFirstName}
         />
         <InputField
            type="text"
            placeholder="Введите email"
            label="Email"
            setEmail ={setEmail}
            error={errors.email_invalid}
         />
         <InputField
            inputType="password"
            placeholder="Введите пароль"
            label="Пароль"
            setPassword ={setPassword}
            error={errors.error_password}
         />
         <InputField
            inputType="password"
            placeholder="Повторите пароль"
            label="Подтвердите пароль"
            setConfPassword ={setConfPassword}
            error={errors.password_do_not_match}
         />
         <PrimaryButton btnText="Создать аккаунт" type="submit"/>
      </Form>
   );

}

export default SignForm;