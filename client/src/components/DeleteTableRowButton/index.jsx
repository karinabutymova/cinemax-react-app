import React, { useLayoutEffect, useState } from 'react';
import { EditRowBtn } from '../TableUsers/styled';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as Styled from '../ReviewCard/styled';

const DeleteTableRowButton = ({ value, setDeleteUser, setDeleteFilm, setDeleteFilmShow, setDeleteNews }) => {
   const [text, setText] = useState('');

   useLayoutEffect(() => {
      if (setDeleteUser) {
         setText('Уверены, что хотите удалить пользователя?');
      } else if (setDeleteFilm) {
         setText('Уверены, что хотите удалить фильм?');
      } else if (setDeleteFilmShow) {
         setText('Уверены, что хотите удалить сеанс?');
      } else if (setDeleteNews) {
         setText('Уверены, что хотите удалить новость?');
      }
   }, [])


   const deleteRow = () => {
      if (setDeleteUser) {
         setDeleteUser(value);
      } else if (setDeleteFilm) {
         setDeleteFilm(value);
      } else if (setDeleteFilmShow) {
         setDeleteFilmShow(value);
      } else if (setDeleteNews) {
         setDeleteNews(value);
      }
   }

   return (
      <>
         <Popup
            trigger={
               <EditRowBtn>Удалить</EditRowBtn>}
            modal
            nested>
            {close => (
               <Styled.ModalContainer style={{ widht: '100px' }}>
                  <Styled.ModalHeader> {text}</Styled.ModalHeader>
                  <Styled.ModalBtnFlex>
                     <Styled.PrimaryButton
                        onClick={() => {
                           deleteRow();
                           close();
                        }}>
                        Удалить
                     </Styled.PrimaryButton>
                     <Styled.SecondaryButton
                        onClick={() => {
                           close();
                        }}>
                        Отмена
                     </Styled.SecondaryButton>
                  </Styled.ModalBtnFlex>
               </Styled.ModalContainer>
            )}
         </Popup>

      </>
   )
}

export default DeleteTableRowButton;