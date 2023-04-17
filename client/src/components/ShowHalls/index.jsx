import { useState, useEffect } from 'react';
import * as Styled from './styled';
import TimeCard from '../TimeCard';

const ShowHalls = ({ showsHalls, step, selectedHall, active, setActive }) => {

   const [halls, setHalls] = useState([]);


   const timeOptions = { hour: 'numeric', minute: 'numeric' };

   useEffect(() => {
      let hall = [];
      showsHalls.forEach(show => {
         if (hall.indexOf(show['halls.hall_title']) === -1) {
            hall.push(show['halls.hall_title']);
         }
      });
      setHalls(hall);
   }, [showsHalls])

   const setActiveTime = (key) => {
      setActive(key);
   }

   const nextStep = () => {
      step(2);
      showsHalls.forEach(show => {
         if (show.id === active) selectedHall(show);
      });
   }

   return (
      <>
         <Styled.HallsListDiv>
            {halls.map((hallTitle, index) =>
               <Styled.HallDiv key={index}>
                  <Styled.HallTitle key={index}>{hallTitle}</Styled.HallTitle>
                  <Styled.TimeFlexDiv>
                     {showsHalls.map((showHall) => {
                        if (showHall['halls.hall_title'] === hallTitle) {
                           let date = new Date(showHall.film_datetime);
                           date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
                           return <TimeCard key={showHall.id}
                              id={showHall.id}
                              setActiveTime={setActiveTime}
                              active={active}
                              price={showHall.price}
                              time={date.toLocaleTimeString('ru', timeOptions)} />
                        }
                        return true
                     })}
                  </Styled.TimeFlexDiv>
               </Styled.HallDiv>
            )}
         </Styled.HallsListDiv>

         <Styled.PrimaryButton active={active} onClick={nextStep}>Далее</Styled.PrimaryButton>
      </>
   );

}

export default ShowHalls;