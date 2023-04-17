import { useState, useEffect } from 'react';
import * as Styled from './styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'styled-bootstrap-grid';
import Ticket from '../Ticket';


// TODO: возврат билетов
const UserTickets = ({ tickets }) => {
   const navigate = useNavigate();
   const [show, setShow] = useState(false);
   const [ticketsShow, setTicketsShow] = useState([]);

   const timeOptions = { hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' };
   const [dateTime, setDateTime] = useState();

   useEffect(() => {
      let date = new Date(tickets.film_datetime);
      date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
      setDateTime(date.toLocaleTimeString('ru', timeOptions));
   }, [])

   const showTickets = () => {
      if (!show && ticketsShow.length === 0) {
         GetUserShowTickets();
      }
      setShow(!show);
   }

   const GetUserShowTickets = async () => {
      // setIsLoading(true);
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
      } finally {
         // await timeout(250);
         // setIsLoading(false);
      }
   }

   return (
      <>
         <Row>
            <Col col="12">
               <Styled.TicketsConatainer>
                  <Styled.TicketsIntro>
                     <Styled.OptionDiv>
                        <Styled.FilmTitle onClick={() => navigate(`/film/${tickets.film_id}`)}>{tickets.film_title}</Styled.FilmTitle>
                        <Styled.OptionTitle>Кол-во билетов: {tickets.tickets_count}</Styled.OptionTitle>
                     </Styled.OptionDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Сеанс</Styled.OptionTitle>
                        <Styled.OptionValue>{dateTime}</Styled.OptionValue>
                     </Styled.OptionDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Общая стоимость</Styled.OptionTitle>
                        <Styled.OptionValue>
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
                     </Styled.BtnDiv>
                  </Styled.TicketsIntro>
                  {show &&
                     ticketsShow.map((ticket) =>
                        <Ticket key={ticket.id} ticket={ticket} />
                     )
                  }
               </Styled.TicketsConatainer>
            </Col>
         </Row >
      </>
   );
}




export default UserTickets;