import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useBack } from "use-back";
import { Form, FlexContainer, Title, GoogleLogin, GoogleLogo, Text, Line, ForgorPasswordLink } from "./styled";
import GoogleIcon from '../../assets/images/LoginPage/googleIcon.png';
import InputField from "../InputField";
import PrimaryButton from "../PrimaryButton";

// TODO: возврат на страницу с которой пришел, но проверку надо
const LoginForm = () => {
   const { hasBack, handleBack } = useBack();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({});
   const navigate = useNavigate();

   const goToPage = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }

   const AuthUser = async (e) => {
      e.preventDefault();
      try {
         await axios.post('http://localhost:3001/login', {
            email: email,
            password: password
         },
            { withCredentials: true }
         );
         // handleBack();
         goToPage('/profile');
      } catch (error) {
         if (error.response) {
            setErrors(error.response.data);
            console.log(error.response.data);
         }
      }
   }

   return (
      <Form onSubmit={AuthUser}>
         <Title> Авторизация </Title>
         {/* <GoogleLogin><GoogleLogo src={GoogleIcon} alt="googleIcon"/>Войти с помощью Google</GoogleLogin>
         <FlexContainer>
           <Text>или</Text>
         </FlexContainer> */}
         <InputField
            type="text"
            placeholder="Введите email"
            label="Email"
            onChange={setEmail}
            error={errors.no_email}
         />
         <InputField
            inputType="password"
            placeholder="Введите пароль"
            label="Пароль"
            onChange={setPassword}
            error={errors.wrong_password}
         />
         <PrimaryButton btnText="Войти" type="submit" />
         <Line />
         <ForgorPasswordLink to="/forgotpassword">Забыли пароль?</ForgorPasswordLink>
      </Form>
   );

}

export default LoginForm;