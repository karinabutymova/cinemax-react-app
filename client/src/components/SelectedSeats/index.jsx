import { useState, useEffect } from 'react';
// import { Row, Col } from 'styled-bootstrap-grid';
import * as Styled from './styled';
import axios from 'axios';

const SelectedSeats = ({ showHall, selectedSeats }) => {

   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      if (selectedSeats.length > 0) {
         setTotalPrice(parseFloat(selectedSeats.length * showHall.price));
      }
   }, [selectedSeats])

   return (
      <Styled.SelectedSeats>
         <Styled.SeletedTitle>Выбранные места</Styled.SeletedTitle>
         {selectedSeats.length > 0 &&
            (() => {
               let selected = [];
               selectedSeats.map((seat) =>
                  selected.push(<Styled.SelectedSeatDiv>
                     <Styled.SelectSeatDiv>
                        <Styled.SelectSeat />
                        <Styled.SelectSeatPosition>
                           {seat.row} ряд, {seat.seat} место
                        </Styled.SelectSeatPosition>
                     </Styled.SelectSeatDiv>
                     <Styled.ShowPrice>
                        {(showHall.price % 1) === 0 ? showHall.price.toFixed(1) : showHall.price.toFixed(2)} BYN
                     </Styled.ShowPrice>
                  </Styled.SelectedSeatDiv>)
               )
               return selected;
            })()
         }
         {(selectedSeats.length > 0 && totalPrice > 0) &&
            <Styled.TotalPriceDiv>
               <Styled.TotalPrice>Итого: </Styled.TotalPrice>
               <Styled.TotalPrice>{(totalPrice % 1) === 0 ? totalPrice.toFixed(1) : totalPrice.toFixed(2)} BYN</Styled.TotalPrice>
            </Styled.TotalPriceDiv>
         }
         {(selectedSeats.length > 0 && totalPrice > 0) &&
            <Styled.TotalPriceDiv>
               <Styled.TotalBonus>Начислим бонусов </Styled.TotalBonus>
               <Styled.TotalBonusCount>+{totalPrice * 5}</Styled.TotalBonusCount>
            </Styled.TotalPriceDiv>
         }
      </Styled.SelectedSeats>

   );

}

export default SelectedSeats;