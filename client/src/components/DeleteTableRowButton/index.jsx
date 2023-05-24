import React from 'react';
import { EditRowBtn } from '../TableUsers/styled';

const DeleteTableRowButton = ({ value, setDeleteUser, setDeleteFilm, setDeleteFilmShow, setDeleteNews }) => {

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
      } else if (setDeleteNews) {
         let isDelete = window.confirm('Уверены, что хотите удалить новость?');
         if (isDelete) {
            setDeleteNews(value);
         }
      }
   }

   return (
      <>
         <EditRowBtn onClick={deleteUser}>Удалить</EditRowBtn>
      </>
   )
}

export default DeleteTableRowButton;