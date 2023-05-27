import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Styled from './styled';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'styled-bootstrap-grid';
import { BonusInput } from '../Payment/styled';
import Preloader from '../Preloader';
import { Store } from 'react-notifications-component';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { ModalBtnFlex, PrimaryButton, ModalHeader, ModalContainer, SecondaryButton } from '../../pages/ProfilePage/styled';

const EditProfile = ({ userId, setActiveTab }) => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [isLoading, setIsLoading] = useState(false);
   const [lastname, setLastname] = useState('');
   const [firstname, setFirstname] = useState('');
   const [password, setPassword] = useState('');
   const [repeatPassword, setRepeatPassword] = useState('');

   const [errors, setErrors] = useState({});
   const [passwordErrors, setPasswordErrors] = useState({});
   const [token, setToken] = useState('');
   const [expire, setExpire] = useState('');

   useEffect(() => {
      refreshToken();
   }, [])

   useEffect(() => {
      getUserById();
   }, [userId])


   const notification = (mess, isAuth) => Store.addNotification({
      title: mess,
      type: "success",
      insert: "top",
      container: "bottom-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: 1000,
         onScreen: true
      },
      onRemoval: (id, removedBy) => {

         isAuth ? navigate('/auth') : window.location.reload();
      }
   });

   const refreshToken = async () => {
      try {
         const response = await axios.get('http://localhost:3001/token',
            { withCredentials: true }
         );
         setToken(response.data.accessToken);
         const decoded = jwt_decode(response.data.accessToken);
         setExpire(decoded.exp);
      } catch (error) {
         if (error.response) {
            navigate("/auth");
            window.scrollTo(0, 0);
         }
      }
   }
   const axiosJWT = axios.create({ withCredentials: true });

   axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
         const response = await axios.get('http://localhost:3001/token',
            { withCredentials: true }
         );
         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
         setToken(response.data.accessToken);

      }
      return config;
   }, (error) => {
      return Promise.reject(error);
   });

   const getUserById = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getUserById', {
            params: {
               id: userId,
            }
         },
            { withCredentials: true }
         );

         setLastname(response.data.lastname);
         setFirstname(response.data.firstname);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const changeUserPassword = async (e) => {
      e.preventDefault();

      if (password && repeatPassword) {
         try {
            await axios.post('http://localhost:3001/userChangePassword', {
               password: password,
               confPassword: repeatPassword,
               userId: userId
            },
               { withCredentials: true }
            );

            notification('Пароль обновлён', true);

         } catch (error) {
            if (error.response) {
               if (error.response.data.error_password) {
                  setPasswordErrors({ password: error.response.data.error_password });
               }
               if (error.response.data.password_do_not_match) {
                  setPasswordErrors({ repeatPassword: error.response.data.password_do_not_match });
               }
            }
         }
      } else {
         let er = {};
         if (!password)
            er.password = 'Заполните поле';

         if (!repeatPassword)
            er.repeatPassword = 'Заполните поле';

         setPasswordErrors(er);
      }

   }

   const editUser = async (e) => {
      e.preventDefault();
      if (firstname.length && lastname.length) {
         try {
            const response = await axios.post('http://localhost:3001/editUserName', {
               lastname: lastname,
               firstname: firstname,
               userId: userId
            });

            notification('Данные изменены');
         } catch (error) {
            if (error.response) {
               console.log(error.response);
            }
         }
      } else {
         let er = {};
         if (!lastname)
            er.lastname = 'Обязательно для заполнения';

         if (!firstname)
            er.firstname = 'Обязательно для заполнения';

         setErrors(er);
      }
   }

   const deleteUserById = async (req, res) => {
      try {
         const response = await axios.get('http://localhost:3001/deleteUser', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               id: userId
            }
         });

         notification('Пользователь удалён', true);
      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const changeName = (e) => {
      if (e.target.value) {
         let er = errors;
         er.firstname = '';
         setErrors(er);
      }
      setFirstname(e.target.value);
   }

   const changeLastName = (e) => {
      if (e.target.value) {
         let er = errors;
         er.lastname = '';
         setErrors(er);
      }
      setLastname(e.target.value);
   }

   const changePassword = (e) => {
      if (e.target.value) {
         let er = passwordErrors;
         er.password = '';
         setPasswordErrors(er);
      }
      setPassword(e.target.value);
   }

   const changeRepeatPassword = (e) => {
      if (e.target.value) {
         let er = passwordErrors;
         er.repeatPassword = '';
         setPasswordErrors(er);
      }
      setRepeatPassword(e.target.value);
   }

   const ExitEditMode = () => {
      searchParams.set('filter', 'tickets')
      setSearchParams(searchParams);
      setActiveTab('tickets');
   }

   return (
      <>
         {isLoading && <Preloader />}
         {!isLoading && <>
            <Row>
               <Col col="12">
                  <Styled.SectionTitleDiv>
                     <Styled.SectionTitle>Редактирование профиля</Styled.SectionTitle>
                     <Styled.ExitIcon onClick={ExitEditMode}>×</Styled.ExitIcon>
                  </Styled.SectionTitleDiv>
               </Col>
            </Row >
            <Row style={{ borderBottom: '1px solid #424242' }}>
               <Col col="12">
                  <Styled.SubSectionTitle>Мои данные</Styled.SubSectionTitle>
                  <Styled.NameForm onSubmit={editUser}>
                     <Styled.NameInputsDiv>
                        <Styled.InputDiv>
                           <Styled.Label>Фамилия:*</Styled.Label>
                           <Styled.BonusInput type="text" placeholder='Введите фамилию'
                              onChange={changeLastName}
                              value={lastname} />
                           {(errors.lastname && errors.lastname.length > 0) && <Styled.Error>{errors.lastname}</Styled.Error>}
                        </Styled.InputDiv>
                        <Styled.InputDiv>
                           <Styled.Label>Имя:*</Styled.Label>
                           <Styled.BonusInput type="text" placeholder='Введите имя'
                              onChange={changeName}
                              value={firstname} />
                           {(errors.firstname && errors.firstname.length > 0) && <Styled.Error>{errors.firstname}</Styled.Error>}
                        </Styled.InputDiv>
                     </Styled.NameInputsDiv>
                     <Styled.Mark>*указаны обязательные поля</Styled.Mark>
                     <Styled.NameFormBtn type='submit'>Сохранить изменения</Styled.NameFormBtn>
                  </Styled.NameForm>
               </Col>
            </Row >
            <Row style={{ borderBottom: '1px solid #424242' }}>
               <Col col="12">
                  <Styled.SubSectionTitle>Смена пароля</Styled.SubSectionTitle>
                  <Styled.P>Используйте запоминающиеся пароли. Хороший пароль от&nbsp;8 до&nbsp;16 символов и&nbsp;содержать только латинские символы, а&nbsp;также хотя бы одну цифру.</Styled.P>
                  <Styled.NameForm onSubmit={changeUserPassword}>
                     <Styled.BonusInput type="password" placeholder='Придумайте пароль'
                        onChange={changePassword} />
                     {(passwordErrors.password && passwordErrors.password.length > 0) && <Styled.PaswordError>{passwordErrors.password}</Styled.PaswordError>}
                     <Styled.BonusInput type="password" placeholder='Повторите пароль'
                        onChange={changeRepeatPassword} />
                     {(passwordErrors.repeatPassword && passwordErrors.repeatPassword.length > 0) && <Styled.PaswordError>{passwordErrors.repeatPassword}</Styled.PaswordError>}
                     <Styled.NameFormBtn type='submit'>Изменить пароль</Styled.NameFormBtn>
                  </Styled.NameForm>
               </Col>
            </Row>
            <Row>
               <Col col="12">
                  <Styled.SubSectionTitle>Удаление профиля</Styled.SubSectionTitle>
                  <Popup
                     trigger={
                        <Styled.NameFormBtn type='button'>Удалить мой профиль</Styled.NameFormBtn>}
                     modal
                     nested>
                     {close => (
                        <ModalContainer>
                           <ModalHeader> Вы уверены, что хотите удалить профиль?</ModalHeader>
                           <ModalBtnFlex>
                              <PrimaryButton
                                 onClick={() => {
                                    deleteUserById();
                                    close();
                                 }}>
                                 Удалить
                              </PrimaryButton>
                              <SecondaryButton
                                 onClick={() => {
                                    close();
                                 }}>
                                 Отмена
                              </SecondaryButton>
                           </ModalBtnFlex>
                        </ModalContainer>
                     )}
                  </Popup>

               </Col>
            </Row >
         </>}

      </>
   );
}

export default EditProfile;