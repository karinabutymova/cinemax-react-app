import { useState } from 'react';
import * as Styled from './styled';

const TimeCard = ({ id, time, price, setActiveTime, active, isContinue }) => {
   // const [active, setActive] = useState(false);

   const click = () => {
      setActiveTime(id);
   }

   return (
      <>
         {isContinue &&
            <Styled.TimeDiv active={active} id={id} onClick={click}>
               {time}
               <Styled.Price active={active} id={id} >{(price % 1) === 0 ? price.toFixed(1) : price.toFixed(2)} BYN</Styled.Price>
            </Styled.TimeDiv>
         }

         {!isContinue &&
            <Styled.TimeDiv active={active} id={id} style={{ opacity: '0.5' }}>
               {time}
            </Styled.TimeDiv>
         }

      </>
   );

}

export default TimeCard;