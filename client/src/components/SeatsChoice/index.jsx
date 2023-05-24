import { useState, useEffect } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import * as Styled from './styled';
import axios from 'axios';

import screenIcon from '../../assets/images/Icons/screen.svg';
import Seat from '../Seat';
import SelectedSeats from '../SelectedSeats';

const SeatsChoice = ({ showHall, step, selectedSeats, setSelectedSeats }) => {

   const [active, setActive] = useState(false);
   const [unavailableSeats, setUnavailableSeats] = useState([]);

   useEffect(() => {
      getUnavailableSeats();
   }, [])

   useEffect(() => {
      if (selectedSeats.length > 0) {
         setActive(true);
      } else {
         setActive(false);
      }
   }, [selectedSeats])

   const getUnavailableSeats = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getUnavailableSeats', {
            params: {
               showHall: showHall.id
            }
         },
            { withCredentials: true }
         );
         setUnavailableSeats(response.data);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const nextStep = () => {
      step(3);
   }
   const previousStep = () => {
      step(1);
   }


   return (
      <>
         <Row justifyContent='start' mdJustifyContent='center'>
            <Col xl="6" lg="6" md="8" xs="12">
               <Styled.ScreenDiv>
                  <Styled.ScreenImg src={screenIcon} />
                  <Styled.ScreenTitle>Экран</Styled.ScreenTitle>
                  {[showHall['halls.rows_number']].map((number) => {
                     let rows = [];
                     for (let row = 1; row <= number; row++) {

                        rows.push(<Styled.RowSeatsDiv key={row}>
                           <Styled.RowNumber>{row}</Styled.RowNumber>
                           <Styled.SeatsContainer>
                              {[showHall['halls.row_seats_number']].map((seatNumber) => {
                                 let seats = [];
                                 for (let index = 1; index <= seatNumber; index++) {
                                    seats.push(
                                       <Seat key={index}
                                          seat={index}
                                          row={row}
                                          unavailableSeats={unavailableSeats}
                                          selectedSeats={selectedSeats}
                                          setSelectedSeats={setSelectedSeats} />
                                    );
                                 }
                                 return seats;
                              })}
                           </Styled.SeatsContainer>
                        </Styled.RowSeatsDiv>)

                     }
                     return rows;
                  })}

                  <Styled.SeatDescriptionDiv>
                     <Styled.SeatDescription>
                        <Styled.DisableSeat />
                        <Styled.Description>— место недоступно</Styled.Description>
                     </Styled.SeatDescription>
                     <Styled.SeatDescription>
                        <Styled.AvailableSeat />
                        <Styled.Description>— свободное место</Styled.Description>
                     </Styled.SeatDescription>

                  </Styled.SeatDescriptionDiv>
               </Styled.ScreenDiv>
            </Col>
            <Col mdOffset={0} lgOffset={1} xl="5" lg="5" md="8" xs="12">
               <SelectedSeats showHall={showHall} selectedSeats={selectedSeats} key={step} />
            </Col>
         </Row>
         <Row xlJustifyContent="start" lgJustifyContent="start" mdJustifyContent='center' >
            <Col xl="6" lg="6" md="8" xs="12">
               <Styled.ButtonsDiv>
                  <Styled.SecondaryButton onClick={previousStep}>Назад</Styled.SecondaryButton>
                  <Styled.PrimaryButton active={active} onClick={nextStep}>Далее</Styled.PrimaryButton>
               </Styled.ButtonsDiv>
            </Col>
         </Row>
      </>
   );
}




export default SeatsChoice;