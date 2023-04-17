import { useState, useEffect } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import * as Styled from './styled';
import axios from 'axios';

import SelectedSeats from '../SelectedSeats';


const Payment = ({ showHall, selectedSeats, step, userId, userName }) => {

   const [userBonuses, setUserBonuses] = useState(0);
   const [bonusInUse, setBonusInUse] = useState(0);
   const [active, setActive] = useState(true);
   const [error, setError] = useState('');

   useEffect(() => {
      if (userId) getUserBonuses();
   }, [])


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
               console.log(tickets.data)

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

                     console.log(bonus.data);
                     if (bonus.data) window.location.reload();
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
      // TODO:: проверка на дробное число и не более 50% от суммы

      console.log(e.target.value);
      if (parseInt(e.target.value) > parseInt(userBonuses)) {
         setError('Больше количества доступных вам бонусов');
         setActive(false);
         setBonusInUse(0);
      } else {
         setBonusInUse(e.target.value);
         setError('');
         setActive(true);
      }
   }

   return (
      <>
         <Row justifyContent='start' mdJustifyContent='center'>
            <Col xl="6" lg="6" md="8" xs="12">
               {(userId > 0 && userName.length > 0) &&
                  <Styled.BonusDiv>
                     {userName.split(' ')[1]}, забронированные билеты отобразятся в вашем профиле
                     {userBonuses > 0 && <p>Доступные бонусы: {userBonuses}</p>}
                     {!(userBonuses > 0) && <p>У вас пока нет доступных бонусов</p>}
                     {userBonuses > 0 &&
                        <Styled.InputDiv>
                           <Styled.BonusLabel>Бонусы*</Styled.BonusLabel>
                           <Styled.BonusInput type="number" placeholder='Введите кол-во бонусов' onChange={bonusCount} />
                           {error.length > 0 && <Styled.BonusError>{error}</Styled.BonusError>}
                           <Styled.BonusMark>*Оплатить можно до 50% от общей стоимости. При использовании бонусных баллов, бонусы за текущую покупку начисляться не будут.</Styled.BonusMark>
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