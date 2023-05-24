import { useState, useLayoutEffect } from 'react'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import { Form, FlexContainer, Title, SecondText, LogoText } from "../../pages/ForgotPassword/styled";
import { FormLogoText, PasswordReq } from "./styled";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { Container } from 'styled-bootstrap-grid';
import Preloader from '../../components/Preloader';

const ResetPassword = () => {
   const { token } = useParams();
   const [password, setPassword] = useState('');
   const [confPassword, setConfPassword] = useState('');
   const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   useLayoutEffect(() => {
      document.title = 'Сброс пароля - Cinemax';

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
               if (error.response.data.token_error && ~window.location.href.indexOf("resetPassword")) {
                  navigate("/404");
                  window.scrollTo(0, 0);
               }
            }
         }
      }
      resetPassword();

   }, []);

   const notification = (mess) => Store.addNotification({
      title: mess,
      type: "success",
      insert: "top",
      container: "bottom-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: 1500,
         onScreen: true
      },
      onRemoval: (id, removedBy) => {
         navigate("/auth");
         window.scrollTo(0, 0);
      }
   });

   const changePassword = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         await axios.put('http://localhost:3001/changePassword', {
            password: password,
            confPassword: confPassword,
            resetToken: token
         },
            { withCredentials: true }
         );

      } catch (error) {
         if (error.response) {
            setErrors(error.response.data);
         }
      } finally {
         notification('Пароль обновлён');
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
               <Form onSubmit={changePassword}>
                  <Title> Сброс пароля </Title>
                  <SecondText> Пароль должен быть длинной не менее 8 символов, <br />
                     содержать минимум одну заглавную букву и цифру</SecondText>
                  <InputField
                     inputType="password"
                     placeholder="Введите пароль"
                     label="Пароль"
                     onChange={setPassword}
                     error={errors.error_password}
                  />
                  {!errors.error_password &&
                     <PasswordReq>Пароль должен быть от 8 до 16 символов и содержать только латинские символы, а также хотя бы одну цифру</PasswordReq>
                  }
                  <InputField
                     inputType="password"
                     placeholder="Повторите пароль"
                     label="Подтвердите пароль"
                     onChange={setConfPassword}
                     error={errors.password_do_not_match}
                  />
                  <PrimaryButton btnText="Сменить пароль" type="submit" />
                  <FormLogoText>CINEMAX</FormLogoText>
               </Form>
               <LogoText>CINEMAX</LogoText>
            </FlexContainer>
         }

      </>
   );
}

export default ResetPassword;