import { useState, useEffect } from 'react';
import * as Styled from './styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'styled-bootstrap-grid';
import Ticket from '../Ticket';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Store } from 'react-notifications-component';
import { ModalBtnFlex, PrimaryButton, ModalHeader, ModalContainer, SecondaryButton } from '../../pages/ProfilePage/styled';

const UserTickets = ({ tickets }) => {
   const navigate = useNavigate();
   const [show, setShow] = useState(false);
   const [ticketsShow, setTicketsShow] = useState([]);

   const timeOptions = { hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' };
   const [dateTime, setDateTime] = useState();

   const [isOver, setIsOver] = useState(false);

   useEffect(() => {
      let date = new Date(tickets.film_datetime);
      date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
      setDateTime(date.toLocaleTimeString('ru', timeOptions));

      if (date < new Date().getTime() - 3 * 60 * 60 * 1000)
         setIsOver(true);

      console.log(tickets);
   }, [])

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
         window.location.reload();
      }
   });

   const showTickets = () => {
      if (!show && ticketsShow.length === 0) {
         GetUserShowTickets();
      }
      setShow(!show);
   }

   const GetUserShowTickets = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getUserShowTickets', {
            params: {
               orderNumber: tickets.order_number,
            },
         });

         setTicketsShow(response.data);
         console.log(response.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   const ReturnTicket = async () => {
      try {
         await axios.get('http://localhost:3001/returnUserTicket', {
            params: {
               order_number: tickets.order_number,
            },
         });

         await axios.get('http://localhost:3001/returnBonus', {
            params: {
               order_number: tickets.order_number,
            },
         });
         notification('Возврат билетов завершён успешно');

      } catch (error) {
         if (error.response) {
            console.log(error.response);
         }
      }
   }

   return (
      <>
         <Row>
            <Col xl="10" lg="10" md="12" sm="12" xs="12">
               <Styled.TicketsConatainer>
                  <Styled.TicketsIntro onClick={showTickets} isOver={isOver}>
                     <Styled.OptionDiv>
                        <Styled.FilmTitle isOver={isOver} onClick={() => navigate(`/film/${tickets.film_id}`)}>{tickets.film_title}</Styled.FilmTitle>
                        <Styled.OptionTitle>Кол-во билетов: {tickets.tickets_count}</Styled.OptionTitle>
                     </Styled.OptionDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Сеанс</Styled.OptionTitle>
                        <Styled.OptionValue isOver={isOver}>{dateTime}</Styled.OptionValue>
                     </Styled.OptionDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Общая стоимость</Styled.OptionTitle>
                        <Styled.OptionValue isOver={isOver}>
                           {tickets.price * tickets.tickets_count} BYN
                        </Styled.OptionValue>
                     </Styled.OptionDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Бонусы</Styled.OptionTitle>
                        <Styled.BonusCount>
                           {tickets.operation_type > 0 && '-'}
                           {tickets.operation_type === 0 && '+'}
                           {tickets.amount}
                        </Styled.BonusCount>
                     </Styled.OptionDiv>
                     <Styled.BtnDiv>
                        <Styled.ShowHideBtn onClick={showTickets}>{show ? 'Свернуть' : 'Развернуть'}</Styled.ShowHideBtn>
                        {isOver && <Styled.ReturnTicketsBtn style={{ cursor: 'default', opacity: '0.3' }}>Событие прошло</Styled.ReturnTicketsBtn>}
                        {!isOver && <Popup
                           trigger={
                              <Styled.ReturnTicketsBtn>Возврат билетов</Styled.ReturnTicketsBtn>}
                           modal
                           nested>
                           {close => (
                              <ModalContainer style={{ widht: '100px' }}>
                                 <ModalHeader>Уверены, что хотите вернуть билеты?</ModalHeader>
                                 <ModalBtnFlex>
                                    <PrimaryButton
                                       onClick={() => {
                                          ReturnTicket();
                                          close();
                                       }}>
                                       Вернуть
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
                        </Popup>}
                     </Styled.BtnDiv>
                  </Styled.TicketsIntro>
                  {show &&
                     ticketsShow.map((ticket) =>
                        <Ticket key={ticket.id} ticket={ticket} isOver={isOver} />
                     )
                  }
               </Styled.TicketsConatainer>
            </Col>
         </Row >
      </>
   );
}




export default UserTickets;