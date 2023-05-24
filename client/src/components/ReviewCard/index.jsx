import React, { useEffect, useState } from 'react';
import * as Styled from './styled';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ReviewCard = ({ review, user, getFilmReviews, reviewToEdit }) => {

   const [dateCreate, setDateCreate] = useState(review.created_at);
   const [longText, setLongText] = useState(true);

   useEffect(() => {
      let options = { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(dateCreate);
      setDateCreate(date.toLocaleDateString("ru", options));
   }, []);

   const LongText = () => {
      setLongText(!longText);
   }

   const reviewNotification = (mess) => Store.addNotification({
      title: mess,
      type: "success",
      insert: "top",
      container: "bottom-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: 1000,
      },
      onRemoval: (id, removedBy) => {
         getFilmReviews(review.film_id);
      }
   });

   const setReviewToEdit = () => {
      reviewToEdit({ id: review.id, text: review.review_text });
   }

   const deleteReview = async () => {
      try {
         const response = await axios.get('http://localhost:3001/deteleReview', {
            params: {
               reviewId: review.id
            },
         },
            { withCredentials: true }
         );

         if (response.data)
            reviewNotification('Отзыв удалён');

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   return (
      <>
         <Styled.ReviewDiv>
            <Styled.Flex>
               <Styled.UserFlex>
                  <Styled.UserCircle>{review['reviews_user.lastname'][0].toUpperCase()}</Styled.UserCircle>
                  <Styled.User>{review['reviews_user.lastname']} {review['reviews_user.firstname']}</Styled.User>
                  <Styled.ReviewDate>{dateCreate}</Styled.ReviewDate>
               </Styled.UserFlex>
               <Styled.ReviewActionFlex>
                  {(user > 0 && user === review.user_id) &&
                     <Styled.DeleteReviewBtn onClick={setReviewToEdit}>Редактировать</Styled.DeleteReviewBtn>
                  }
                  {(user > 0 && user === review.user_id) &&
                     <Popup
                        trigger={
                           <Styled.DeleteReviewBtn>Удалить</Styled.DeleteReviewBtn>}
                        modal
                        nested>
                        {close => (
                           <Styled.ModalContainer>
                              <Styled.ModalHeader> Вы уверены, что хотите удалить отзыв?</Styled.ModalHeader>
                              <Styled.ModalBtnFlex>
                                 <Styled.PrimaryButton
                                    onClick={() => {
                                       deleteReview();
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
                     </Popup>}
               </Styled.ReviewActionFlex>
            </Styled.Flex>
            {review.review_text.length > 300 ?
               <Styled.ReviewText long={longText}>{review.review_text}
                  <Styled.ReviewReadMore onClick={LongText}>{longText ? 'Читать далее' : 'Скрыть'}</Styled.ReviewReadMore>
               </Styled.ReviewText>
               : <Styled.ReviewText>{review.review_text}</Styled.ReviewText>}

         </Styled.ReviewDiv>
      </>
   )
}

export default ReviewCard;