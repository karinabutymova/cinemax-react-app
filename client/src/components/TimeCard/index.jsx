import { useState } from 'react';
import * as Styled from './styled';

const TimeCard = ({ id, time, price, setActiveTime, active }) => {
   // const [active, setActive] = useState(false);

   const click = () => {
      setActiveTime(id);
   }

   return (
      <>
         <Styled.TimeDiv active={active} id={id} onClick={click}>
            {time}
            <Styled.Price active={active} id={id} >{(price % 1) === 0 ? price.toFixed(1) : price.toFixed(2)} BYN</Styled.Price>
         </Styled.TimeDiv>

      </>
   );

}

export default TimeCard;