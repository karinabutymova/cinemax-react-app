import React from 'react';
import * as Styled from './styled';


const DeleteTableRowButton = ({ value, setDeleteUser, setDeleteFilm, setDeleteFilmShow }) => {

   const deleteUser = async () => {
      if (setDeleteUser) {
         let isDelete = window.confirm('Уверены, что хотите удалить данного пользователя?');
         if (isDelete) {
            setDeleteUser(value);
         }
      } else if (setDeleteFilm) {
         let isDelete = window.confirm('Уверены, что хотите удалить данный фильм?');
         if (isDelete) {
            setDeleteFilm(value);
         }
      } else if (setDeleteFilmShow) {
         let isDelete = window.confirm('Уверены, что хотите удалить сеанс?');
         if (isDelete) {
            setDeleteFilmShow(value);
         }
      }
   }

   return (
      <>
         <button onClick={deleteUser}>Удалить</button>
      </>
   )
}

export default DeleteTableRowButton;