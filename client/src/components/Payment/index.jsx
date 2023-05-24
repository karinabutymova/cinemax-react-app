import { useState, useEffect } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import * as Styled from './styled';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import SelectedSeats from '../SelectedSeats';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Payment = ({ showHall, selectedSeats, step, userId, userName }) => {
   const [userBonuses, setUserBonuses] = useState(0);
   const [bonusInUse, setBonusInUse] = useState(0);
   const [active, setActive] = useState(true);
   const [error, setError] = useState('');
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (userId) getUserBonuses();
   }, [])

   const ticketNotification = (mess) => Store.addNotification({
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
         setOpen(true);
      }
   });


   const getUserBonuses = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getUserBonuses', {
            params: {
               userId: userId
            }
         },
            { withCredentials: true }
         );
         setUserBonuses(response.data.current_balance);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const submitResult = () => {
      submitSelectedSeat();
   }
   const previousStep = () => {
      step(2);
   }

   const goToPage = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }

   const submitSelectedSeat = async () => {
      if (!error.length) {
         try {
            const response = await axios.get('http://localhost:3001/setNewSeats', {
               params: {
                  hallId: showHall.hall_id,
                  selectedSeats: selectedSeats
               }
            },
               { withCredentials: true }
            );

            if (response.data.length) {
               const tickets = await axios.get('http://localhost:3001/setNewTickets', {
                  params: {
                     userId: userId,
                     filmShowId: showHall.id,
                     seats: response.data
                  }
               },
                  { withCredentials: true }
               );
               console.log(tickets.data);

               if (tickets.data.length) {
                  const orderNumber = await axios.post('http://localhost:3001/setOrder', {
                     tickets: tickets.data,
                  },
                     { withCredentials: true }
                  );

                  console.log(orderNumber.data);

                  if (orderNumber.data) {

                     let operationType = parseInt(bonusInUse) > 0 ? 1 : 0;
                     let amount = parseInt(bonusInUse) > 0 ? parseInt(bonusInUse) : parseInt(parseFloat(selectedSeats.length * showHall.price) * 5);
                     const bonus = await axios.post('http://localhost:3001/setUserBonus', {
                        userId: userId,
                        orderNumber: orderNumber.data,
                        operationType: operationType,
                        amount: amount
                     },
                        { withCredentials: true }
                     );

                     if (bonus.data) ticketNotification('Билеты забронированы!');
                  }

               }

            }

         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }
      }
   }

   const bonusCount = (e) => {
      // TODO: проверка на дробное число (если точка в самом конце???)

      console.log(e.target.value);

      if (parseInt(e.target.value) > parseInt(userBonuses)) {
         setError('Больше количества доступных вам бонусов');
         setActive(false);
         setBonusInUse(0);
      } else if (e.target.value / 100 > selectedSeats.length * showHall.price / 2) {
         setError(`Оплатить можно не более 50% от общей стоимости (т.е. не более ${selectedSeats.length * showHall.price / 2 * 100} баллов для использования)`);
         setActive(false);
         setBonusInUse(0);
      } else if (e.target.value.indexOf('.') !== -1 || e.target.value.indexOf(',') !== -1) {
         setError('Введите целое число');
         setActive(false);
         setBonusInUse(0);
      }
      else {
         setBonusInUse(e.target.value);
         setError('');
         setActive(true);
      }
   }

   return (
      <>
         <Row justifyContent='start' mdJustifyContent='center'>
            <Col xl="6" lg="6" md="8" xs="12">
               {userId > 0 &&
                  <Styled.BonusDiv>
                     {userBonuses > 0 &&
                        <>
                           <Popup
                              open={open}
                              modal
                              nested
                              onClose={() => { if (~window.location.href.indexOf("film")) window.location.reload() }}
                           >
                              {close => (
                                 <Styled.ModalContainer>
                                    <Styled.ModalHeader>Спасибо за бронирование!</Styled.ModalHeader>
                                    <Styled.ModalContent>Информация о&nbsp;купленных билетах находится в&nbsp;профиле</Styled.ModalContent>
                                    <Styled.ModalBtnFlex>
                                       <Styled.SecondaryButton
                                          onClick={() => {
                                             goToPage('/');
                                             close();
                                          }}>
                                          На главную
                                       </Styled.SecondaryButton>
                                       <Styled.PrimaryButton active={true}
                                          onClick={() => {
                                             goToPage('/profile');
                                             close();
                                          }}>
                                          Перейти в профиль
                                       </Styled.PrimaryButton>
                                    </Styled.ModalBtnFlex>
                                 </Styled.ModalContainer>
                              )}
                           </Popup>
                           <Styled.BonusTitle>Оплата бонусами</Styled.BonusTitle>
                           <Styled.BonusCountP>Доступное количество:
                              <Styled.BonusCount>{userBonuses}</Styled.BonusCount>
                              <Styled.BonusCountBYN>{userBonuses / 100}BYN</Styled.BonusCountBYN>
                           </Styled.BonusCountP>
                        </>
                     }
                     {!(userBonuses > 0) && <Styled.BonusTitle>У вас пока нет доступных бонусов</Styled.BonusTitle>}
                     {userBonuses > 0 &&
                        <Styled.InputDiv>
                           <Styled.BonusLabel>Используемые бонусные баллы:</Styled.BonusLabel>
                           <Styled.BonusInput type="number" placeholder='Введите количество' onChange={bonusCount} />
                           {error.length > 0 && <Styled.BonusError>{error}</Styled.BonusError>}
                           <Styled.BonusMark>*Оплатить можно до&nbsp;50% от&nbsp;общей стоимости.<br />При использовании бонусных баллов, бонусы за&nbsp;текущую покупку не начисляются</Styled.BonusMark>
                        </Styled.InputDiv>
                     }

                  </Styled.BonusDiv>
               }

            </Col>
            <Col mdOffset={0} lgOffset={1} xl="5" lg="5" md="8" xs="12">
               <SelectedSeats showHall={showHall} selectedSeats={selectedSeats} />
            </Col>
         </Row>
         <Row xlJustifyContent="start" lgJustifyContent="start" mdJustifyContent='center' >
            <Col xl="6" lg="6" md="8" xs="12">
               <Styled.ButtonsDiv>
                  <Styled.SecondaryButton onClick={previousStep}>Назад</Styled.SecondaryButton>
                  <Styled.PrimaryButton active={active} onClick={submitResult}>Забронировать</Styled.PrimaryButton>
               </Styled.ButtonsDiv>
            </Col>
         </Row>
      </>
   );
}




export default Payment;