import styled from "styled-components";

export const SeatInput = styled.input`
   position: absolute;
   z-index: -1;
   opacity: 0;
`;

export const Seat = styled.label`
   width: 25px;
   height: 25px;
   border: 2px solid #8D1BCD;
   border-radius: 5px 5px 0px 0px;

   background-color: transparent;
   background-color: ${props => props.active ? '#8D1BCD' : 'transparent'} !important;

   &:hover {
      cursor: pointer;
   }
`;

export const DisableSeat = styled(Seat)`
   border: 2px solid #424242;
   background-color: #424242 !important;
   pointer-events: none;

`;