import { useState, useEffect } from 'react';
import * as Styled from './styled';


const Seat = ({ seat, row, selectedSeats, setSelectedSeats, unavailableSeats }) => {

   const [active, setActive] = useState(false);
   const [unavailable, setUnavailable] = useState(false);

   useEffect(() => {
      setUnavailable(false);
      unavailableSeats.forEach(seatRow => {
         if (parseInt(seatRow.row_number) === parseInt(row) && parseInt(seatRow.seat_number) === parseInt(seat)) {
            setUnavailable(true);
         }
      });
   }, [unavailableSeats])

   useEffect(() => {
      setActive(false);
      selectedSeats.forEach(seatRow => {
         if (parseInt(seatRow.row) === parseInt(row) && parseInt(seatRow.seat) === parseInt(seat)) {
            setActive(true);
         }
      });
   }, [selectedSeats])

   const selectSeat = (event) => {
      let seats = document.querySelectorAll('[name^="seats"]');
      let selected = [];
      seats.forEach((seatRow, index) => {
         if (seatRow.checked) {
            selected.push(Object.assign({}, seatRow.dataset))
         }
      });

      setSelectedSeats(selected);
   }

   return (
      <>
         {!unavailable && <>
            <Styled.SeatInput data-row={row}
               data-seat={seat}
               type='checkbox'
               name="seats[]"
               id={`seat-${row}-${seat}`}
               onChange={selectSeat}
               checked={active}
               value="Y"></Styled.SeatInput>

            <Styled.Seat
               htmlFor={`seat-${row}-${seat}`}
               data-row={row}
               data-seat={seat}
               onClick={selectSeat}
               active={active}
            />
         </>}
         {unavailable && <>
            <Styled.SeatInput data-row={row}
               data-seat={seat}
               type='checkbox'
               name="seats[]"
               disabled
               id={`seat-${row}-${seat}`}
               onChange={selectSeat}
               value="Y"></Styled.SeatInput>

            <Styled.DisableSeat
               htmlFor={`seat-${row}-${seat}`}
               data-row={row}
               data-seat={seat}
               onClick={selectSeat}
               active={active}
            />
         </>}


      </>
   );
}




export default Seat;