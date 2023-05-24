import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import { Col } from 'styled-bootstrap-grid';
import Select from 'react-select';
import { SelectStyle } from '../AddFilmForm/styled';
import { Store } from 'react-notifications-component';


const EditUserForm = ({ userId, getAllUsers }) => {
   const navigate = useNavigate();
   const roleOptions = [
      { value: 'user', label: 'Пользователь' },
      { value: 'admin', label: 'Администратор' }
   ];

   const notification = (mess) => Store.addNotification({
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
         goBack('/adminPanel?filter=users');
         getAllUsers();
      }

   });

   const [user, setUser] = useState({});
   const [role, setRole] = useState('');
   const [defaultRole, setDefaultRole] = useState();
   const [error, setError] = useState('');

   useEffect(() => {
      getUserById();
   }, [])


   const goBack = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }

   const getUserById = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getUserById', {
            params: {
               id: userId,
            }
         },
            { withCredentials: true }
         );

         setUser(response.data);
         if (response.data.role) {
            if (response.data.role === 'user') {
               setDefaultRole(roleOptions[0]);
               setRole(roleOptions[0].value);
            } else {
               setDefaultRole(roleOptions[1]);
               setRole(roleOptions[1].value);
            }
         }

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }


   const onChangeRole = (e) => {
      if (e) {
         setRole(e.value);
         setError('');
      } else {
         setRole('');
      }
   }

   const editUser = async (e) => {
      e.preventDefault();
      if (role) {
         try {
            await axios.get('http://localhost:3001/updateUserRole', {
               params: {
                  id: userId,
                  role: role
               }
            },
               { withCredentials: true }
            );

            notification('Данные обновлены');

         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }
      } else {
         setError('Выберите роль пользователя');
      }
   }


   return (
      <>
         <Col col="12">
            <Styled.Form onSubmit={editUser}>
               {(user && Object.keys(user).length !== 0) &&
                  <>
                     <Styled.Flex>
                        <Styled.Label>Фамилия:</Styled.Label>
                        <Styled.UserInfo>{user.lastname}</Styled.UserInfo>
                     </Styled.Flex>
                     <Styled.Flex>
                        <Styled.Label>Имя:</Styled.Label>
                        <Styled.UserInfo>{user.firstname}</Styled.UserInfo>
                     </Styled.Flex>
                     <Styled.Flex>
                        <Styled.Label>Электронный адрес:</Styled.Label>
                        <Styled.UserInfo>{user.email}</Styled.UserInfo>
                     </Styled.Flex>
                     <Styled.SelectContainer>
                        <Styled.Label>Роль</Styled.Label>
                        <Select
                           name="roles"
                           noOptionsMessage={({ inputValue }) => "Ничего не найдено"}
                           placeholder="Выберите роль"
                           isClearable="true"
                           isSearchable="false"
                           options={roleOptions}
                           onChange={onChangeRole}
                           defaultValue={defaultRole}
                           styles={SelectStyle} />
                        {error.length > 0 && <Styled.ErrorText>{error}</Styled.ErrorText>}

                     </Styled.SelectContainer>

                     <Styled.Flex>
                        <Styled.PrimaryButton type="submit">Сохранить</Styled.PrimaryButton>
                        <Styled.SecondaryButton onClick={() => goBack('/adminPanel?filter=users')}>Отмена</Styled.SecondaryButton>
                     </Styled.Flex></>
               }
               {(!user || Object.keys(user).length === 0) &&
                  <>
                     <Styled.NoUserMess>Пользователь не найден</Styled.NoUserMess>
                     <Styled.PrimaryButton onClick={() => goBack('/adminPanel?filter=users')}>К списку</Styled.PrimaryButton>
                  </>
               }
            </Styled.Form>
         </Col>

      </>
   );

}

export default EditUserForm;