import { useState, useEffect } from 'react';
import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import QRCodeCanvas from 'qrcode.react';

const Ticket = ({ ticket }) => {
   const navigate = useNavigate();

   const [date, setDate] = useState('');
   const [time, setTime] = useState('');

   const dateOptions = { month: 'long', day: 'numeric' };
   const timeOptions = { hour: 'numeric', minute: 'numeric' };

   useEffect(() => {
      let onlyDate = ticket.film_datetime.substring(0, 10);
      setDate(new Date(onlyDate).toLocaleDateString("ru", dateOptions));

      let onlyTime = new Date(ticket.film_datetime);
      onlyTime.setTime(onlyTime.getTime() - 3 * 60 * 60 * 1000);
      setTime(onlyTime.toLocaleTimeString('ru', timeOptions));
   }, [])

   const goToPage = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }


   return (
      <>
         <Styled.ShowTicketsConatainer>
            <Styled.SingleTicketContainer>
               <Styled.PosterContainer>
                  <Styled.PosterLink>
                     <Styled.ImgLink src={require(`../../assets/images/Posters/${ticket.photo_path}`)} />
                  </Styled.PosterLink>
               </Styled.PosterContainer>
               <Styled.FilmInfoDiv>
                  <Styled.FilmTitle onClick={() => goToPage(`/film/${ticket.film_id}`)}>{ticket.film_title}</Styled.FilmTitle>
                  <Styled.FlexDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Дата</Styled.OptionTitle>
                        <Styled.OptionValue>{date}</Styled.OptionValue>
                     </Styled.OptionDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Время</Styled.OptionTitle>
                        <Styled.OptionValue>{time}</Styled.OptionValue>
                     </Styled.OptionDiv>
                  </Styled.FlexDiv>
                  <Styled.FlexDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Зал</Styled.OptionTitle>
                        <Styled.OptionValue>{ticket.hall_title}</Styled.OptionValue>
                     </Styled.OptionDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Место</Styled.OptionTitle>
                        <Styled.OptionValue>{ticket.row_number} ряд, {ticket.seat_number} место</Styled.OptionValue>
                     </Styled.OptionDiv>
                  </Styled.FlexDiv>
                  <Styled.FlexDiv>
                     <Styled.OptionDiv>
                        <Styled.OptionTitle>Стоимость</Styled.OptionTitle>
                        <Styled.OptionValue>
                           {(ticket.price % 1) === 0 ? ticket.price.toFixed(1) : ticket.price.toFixed(2)} BYN
                        </Styled.OptionValue>
                     </Styled.OptionDiv>
                  </Styled.FlexDiv>
               </Styled.FilmInfoDiv>
               <Styled.QRContainer>
                  <QRCodeCanvas value={JSON.stringify(ticket)} />
               </Styled.QRContainer>
            </Styled.SingleTicketContainer>
         </Styled.ShowTicketsConatainer>
      </>
   );
}


export default Ticket;