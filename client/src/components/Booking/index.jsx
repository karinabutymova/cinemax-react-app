import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Styled from './styled';
import { Row, Col } from 'styled-bootstrap-grid';
import Select from 'react-select'
import ShowHalls from '../ShowHalls';
import BookingSteps from '../BookingSteps';
import SeatsChoice from '../SeatsChoice';
import Payment from '../Payment';


const Booking = ({ filmId, userId, userName }) => {
   const [shows, setShows] = useState([]);
   const [step, setStep] = useState(1);
   const [dateChoice, setDateChoice] = useState('');
   const [selectedHall, setSelectedHall] = useState([]);
   const [showsHalls, setShowsHalls] = useState([]);
   const [selectedSeats, setSelectedSeats] = useState([]);

   const [active, setActive] = useState(false);

   useLayoutEffect(() => {
      if (filmId) getFilmShows();
   }, [])

   const getFilmShows = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getAllFilmShows', {
            params: {
               filmId: filmId,
            }
         },
            { withCredentials: true }
         );

         if (response.data) {
            let dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
            let dates = [];
            let dateArr = [];
            response.data.forEach(show => {
               let onlyDate = show.film_datetime.substring(0, 10);
               let date = new Date(onlyDate).toLocaleDateString("ru", dateOptions);
               if (dateArr.indexOf(onlyDate) === -1) {
                  dateArr.push(onlyDate);
                  dates.push({
                     value: onlyDate,
                     label: date[0].toUpperCase() + date.slice(1)
                  })
               }
            });
            setShows(dates);
         } else {
            setShows([]);
         }

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const GetShowHalls = async (showDate) => {
      try {
         const response = await axios.get('http://localhost:3001/getShowHalls', {
            params: {
               filmId: filmId,
               showDate: showDate
            }
         },
            { withCredentials: true }
         );
         setShowsHalls(response.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const onChangeDate = (e) => {
      if (e) {
         GetShowHalls(e.value);
         setDateChoice(e);
      } else {
         setShowsHalls([]);
      }

   }


   return (
      <Styled.BookingDiv>
         {shows.length === 0 && <Styled.NullArrayText>Даты сеансов ещё не назначены</Styled.NullArrayText>}
         {shows.length > 0 &&
            <>
               <Row>
                  <BookingSteps step={step} />
               </Row>
               {step === 1 && <Row>
                  <Col xl="4" lg="6" md="6" xs="12">
                     <Select
                        name="shows"
                        noOptionsMessage={({ inputValue }) => "Ничего не найдено"}
                        placeholder="Выберите дату"
                        isClearable="true"
                        isSearchable="false"
                        options={shows}
                        defaultValue={dateChoice}
                        onChange={onChangeDate}
                        styles={{
                           menu: (baseStyles) => ({
                              ...baseStyles,
                              background: "#424242",
                           }),
                           control: (baseStyles) => ({
                              ...baseStyles,
                              color: "#FFFFFF",
                              borderColor: '#424242',
                              backgroundColor: '#424242',
                              borderRadius: '6px',
                              width: '100%',
                              height: '42px',
                              boxShadow: 'none',
                              ':active': {
                                 ...baseStyles[':active'],
                                 backgroundColor: '#4a4a4a',
                                 border: 'none'
                              },
                              ':hover': {
                                 ...baseStyles[':hover'],
                                 borderColor: '#424242',
                                 cursor: 'pointer'
                              }
                           }),
                           option: (baseStyles) => ({
                              ...baseStyles,
                              border: `0px`,
                              height: '42px',
                              background: '#424242',
                              fontFeatureSettings: "'pnum' on, 'lnum' on",
                              ':active': {
                                 ...baseStyles[':active'],
                                 backgroundColor: '#4a4a4a',
                              }
                           }),
                           singleValue: (baseStyles) => ({
                              ...baseStyles,
                              border: `0px`,
                              color: "#FFFFFF",
                              background: 'transparent'
                           }),
                           input: (baseStyles) => ({
                              ...baseStyles,
                              color: "#FFFFFF",
                           }),
                           dropdownIndicator: (baseStyles) => ({
                              ...baseStyles,
                              'svg': {
                                 fill: "#8D1BCD",
                              }

                           })
                        }} />
                  </Col>
               </Row>}

               {(step === 1 && showsHalls.length > 0) &&
                  <Row>
                     <Col xl="6" lg="6" md="8" xs="12">
                        <ShowHalls showsHalls={showsHalls}
                           step={setStep}
                           active={active}
                           setActive={setActive}
                           selectedHall={setSelectedHall} />
                     </Col>
                  </Row>
               }

               {(step === 2 && selectedHall) &&
                  <SeatsChoice
                     step={setStep}
                     showHall={selectedHall}
                     selectedSeats={selectedSeats}
                     setSelectedSeats={setSelectedSeats} />
               }
               {(step === 3 && selectedHall) &&
                  <Payment
                     step={setStep}
                     showHall={selectedHall}
                     selectedSeats={selectedSeats}
                     userId={userId}
                     userName={userName} />
               }
            </>
         }
      </Styled.BookingDiv>
   )
}

export default Booking;