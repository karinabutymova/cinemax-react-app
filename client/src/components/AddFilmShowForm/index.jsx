import { useState, useLayoutEffect, useEffect } from 'react'
import axios from "axios";
import * as Styled from '../AddFilmForm/styled';
import { useNavigate } from 'react-router-dom';
import { Col } from 'styled-bootstrap-grid';
import InputField from '../InputField';
import Select from 'react-select';
import { Store } from 'react-notifications-component';

const AddFilmShowForm = ({ setIsAddFilmShow, setFilter }) => {

   const dateOption = { month: '2-digit' };
   const dateMin = new Date().getFullYear() + '-' + new Date().toLocaleDateString('ru', dateOption) + '-' + new Date().getDate();

   const [film, setFilm] = useState(null);
   const [filmsOptions, setFilmsOptions] = useState([]);
   const [hallsOptions, setHallsOptions] = useState([]);
   const [hall, setHall] = useState('');
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [busyTime, setBusyTime] = useState('');
   const [price, setPrice] = useState('');
   const [endTime, setEndTime] = useState('');
   const [intervals, setIntervals] = useState([]);

   const [errors, setErrors] = useState({});

   const navigate = useNavigate();
   const goBack = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }

   const notification = (mess) => Store.addNotification({
      title: mess,
      type: "success",
      insert: "top",
      container: "bottom-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: 1000,
         onScreen: true
      },
      onRemoval: (id, removedBy) => {
         setIsAddFilmShow(false);
         setFilter();
         goBack('/adminPanel?filter=filmShows');
      }
   });

   useLayoutEffect(() => {
      getFilms();
      getHalls();
   }, [])

   useEffect(() => {
      if (date && hall) {
         getFilmShowsForDate();
         setBusyTime([]);
         setIntervals([]);
      }

   }, [hall, date])

   useEffect(() => {
      if (!film) {
         setBusyTime([]);
      }

   }, [film])

   useEffect(() => {
      if (time && film) {
         let hour = time.split(':')[0];
         let ti = time.split(':')[1];
         hour = hour[0] === '0' ? hour[1] : hour;
         ti = ti[0] === '0' ? ti[1] : ti;

         let showEnd = new Date(new Date().setHours(hour, ti, 0, 0)).getTime() + (film.runtime + 20) * 60000;
         let ms = 1000 * 60 * 5;
         let roundedDate = new Date(Math.ceil(new Date(showEnd).getTime() / ms) * ms);
         let endHours = roundedDate.getHours();
         let endMinutes = roundedDate.getMinutes();
         endMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes;
         setEndTime(endHours + ':' + endMinutes);
      }

   }, [time, film])


   const getFilms = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getFilmTitles', {

         },
            { withCredentials: true }
         );

         if (response.data) {
            let films = [];
            response.data.forEach(film => {
               films.push({
                  value: film.id,
                  label: film.film_title,
                  fromRent: film.from_rent_date,
                  toRent: film.to_rent_date,
                  runtime: film.film_runtime
               })
            });
            setFilmsOptions(films);
         } else {
            setFilmsOptions([]);
         }

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const getHalls = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getHallsTitles', {
         },
            { withCredentials: true }
         );

         if (response.data) {
            let halls = [];
            response.data.forEach(hall => {
               halls.push({
                  value: hall.id,
                  label: hall.hall_title

               })
            });
            setHallsOptions(halls);
         } else {
            setFilmsOptions([]);
         }

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const getFilmShowsForDate = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getFilmShowsForDate', {
            params: {
               date: date,
               hall: hall.value
            }
         },
            { withCredentials: true }
         );

         if (response.data) {
            setBusyTime(response.data);

            let inter = [];
            response.data.map((time) => {
               let startTime = new Date(new Date(time.film_datetime).getTime() - 3 * 60 * 60 * 1000);
               let startHours = startTime.getHours();
               let startMinutes = startTime.getMinutes();
               startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes;

               let endTime = new Date(new Date(time.film_datetime).getTime() - 3 * 60 * 60 * 1000 + (time.film_runtime + 20) * 60000);
               let ms = 1000 * 60 * 5;
               let roundedDate = new Date(Math.ceil(endTime.getTime() / ms) * ms);
               let endHours = roundedDate.getHours();
               let endMinutes = roundedDate.getMinutes();
               endMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes;
               inter.push({ start: `${startHours}:${startMinutes}`, end: `${endHours}:${endMinutes}` })
            })

            if (inter.length > 0) setIntervals(inter);
         }

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }


   const addFilmShowForm = async (e) => {
      e.preventDefault();

      setErrors({});
      let allErrors = {};

      if (!film) allErrors.film = 'Не выбран фильм';
      if (!hall) allErrors.hall = 'Не выбран зал';
      if (time.split(':')[1][1] !== '0' && time.split(':')[1][1] !== '5') allErrors.time = 'Значение минут должно быть кратно 5';
      if (price <= 0) allErrors.price = 'Цена не может быть меньше или равна нулю';

      // проверка нового времени
      if (intervals.length > 0) {

         let res = intervals.filter((inter) => {
            let hour = time.split(':')[0];
            let ti = time.split(':')[1];
            hour = hour[0] === '0' ? hour[1] : hour;
            ti = ti[0] === '0' ? ti[1] : ti;

            let startDateCurrent = new Date(new Date().setHours(hour, ti, 0, 0));

            let endHourCur = endTime.split(':')[0];
            let endTiCur = endTime.split(':')[1];
            endHourCur = endHourCur[0] === '0' ? endHourCur[1] : endHourCur;
            endTiCur = endTiCur[0] === '0' ? endTiCur[1] : endTiCur;

            let endDateCurrent = new Date(new Date().setHours(endHourCur, endTiCur, 0, 0));

            let startHour = inter.start.split(':')[0];
            let startTi = inter.start.split(':')[1];
            startHour = startHour[0] === '0' ? startHour[1] : startHour;
            startTi = startTi[0] === '0' ? startTi[1] : startTi;

            let startDateInter = new Date(new Date().setHours(startHour, startTi, 0, 0));

            let endHour = inter.end.split(':')[0];
            let endTi = inter.end.split(':')[1];
            endHour = endHour[0] === '0' ? endHour[1] : endHour;
            endTi = endTi[0] === '0' ? endTi[1] : endTi;

            let endDateInter = new Date(new Date().setHours(endHour, endTi, 0, 0));

            return ((startDateCurrent >= startDateInter && startDateCurrent <= endDateInter) || (endDateCurrent >= startDateInter && endDateCurrent <= endDateInter));
         })
         console.log(res)
         if (res.length > 0) allErrors.time = `Время входит в занятый промежуток от ${res[0].start} до ${res[0].end}`;
      }

      if (Object.keys(allErrors).length !== 0) {
         console.log(allErrors);
         setErrors(allErrors);
      } else {
         let hour = time.split(':')[0];
         let ti = time.split(':')[1];
         hour = hour[0] === '0' ? hour[1] : hour;
         ti = ti[0] === '0' ? ti[1] : ti;

         let startDateCurrent = new Date(new Date(date).setHours(hour, ti, 0, 0));
         console.log(startDateCurrent)

         try {
            const response = await axios.post('http://localhost:3001/addFilmShow', {
               hall: hall.value,
               film: film.value,
               date: startDateCurrent,
               price: price
            },
               { withCredentials: true }
            );
            notification('Сеанс успешно добавлен');
         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }
      }
   }

   const onChangeFilm = (e) => {
      if (e) {
         setFilm(e);

         console.log(e)
      } else {
         setFilm(null);
      }
   }

   const onChangeHall = (e) => {
      if (e) {
         setHall(e);
      } else {
         setHall({});
      }
   }

   const changeTime = (e) => {
      setTime(e);
   }


   return (
      <>
         <Col col="12">
            <Styled.Form onSubmit={addFilmShowForm}>

               <Styled.SelectContainer>
                  <Styled.Label>Фильмы</Styled.Label>
                  <Select
                     name="films"
                     noOptionsMessage={({ inputValue }) => "Ничего не найдено"}
                     placeholder="Выберите фильм"
                     isClearable="true"
                     isSearchable="false"
                     options={filmsOptions}
                     onChange={onChangeFilm}
                     styles={Styled.SelectStyle} />
                  {(errors.film && errors.film.length > 0) && <Styled.ErrorTextGenres>{errors.film}</Styled.ErrorTextGenres>}
                  {(film && film.runtime > 0) &&
                     <Styled.ErrorTextGenres style={{ color: '#000000', opacity: '0.5' }}>
                        Продолжительность (мин): {film.runtime}
                     </Styled.ErrorTextGenres>}

               </Styled.SelectContainer>

               {film &&
                  <InputField
                     inputType="number"
                     pattern="\d*"
                     placeholder="Введите цену"
                     label="Цена за билет"
                     onChange={setPrice}
                     error={errors.price}
                  />
               }

               {film &&
                  <Styled.SelectContainer>
                     <Styled.Label>Зал</Styled.Label>
                     <Select
                        name="hall"
                        noOptionsMessage={({ inputValue }) => "Ничего не найдено"}
                        placeholder="Выберите зал"
                        isClearable="true"
                        isSearchable="false"
                        options={hallsOptions}
                        onChange={onChangeHall}
                        styles={Styled.SelectStyle} />
                     {(errors.hall && errors.hall.length > 0) && <Styled.ErrorTextGenres>{errors.hall}</Styled.ErrorTextGenres>}

                  </Styled.SelectContainer>
               }

               {film &&
                  <InputField
                     inputType="date"
                     dateMin={dateMin}
                     dateMax={film.toRent}
                     label="Дата сеанса"
                     onChange={setDate}
                     error={errors.date}
                  />
               }
               {(busyTime.length > 0 && film) &&
                  <>
                     <Styled.BusyTimeDIv>
                        <Styled.BusyTimeTitle>Занятые промежутки времени:</Styled.BusyTimeTitle>
                        {busyTime.map((time, index) => {
                           let startTime = new Date(new Date(time.film_datetime).getTime() - 3 * 60 * 60 * 1000);
                           let startHours = startTime.getHours();
                           let startMinutes = startTime.getMinutes();
                           startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes;

                           let endTime = new Date(new Date(time.film_datetime).getTime() - 3 * 60 * 60 * 1000 + (time.film_runtime + 20) * 60000);
                           let ms = 1000 * 60 * 5;
                           let roundedDate = new Date(Math.ceil(endTime.getTime() / ms) * ms);
                           let endHours = roundedDate.getHours();
                           let endMinutes = roundedDate.getMinutes();
                           endMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes;
                           return <Styled.BusyTime key={index}>{startHours}:{startMinutes} - {endHours}:{endMinutes}</Styled.BusyTime>
                        })}
                     </Styled.BusyTimeDIv>
                     <Styled.ErrorTextGenres style={{ color: '#000000', opacity: '0.5' }}>*Время рассчитано с учётом перерыва между сеансами (20 - 25 минут)</Styled.ErrorTextGenres>
                  </>
               }

               {(film && hall && date && !busyTime.length > 0) &&
                  <>
                     <Styled.BusyTimeDIv>
                        <Styled.BusyTimeTitle>В этот день ещё нет сеансов</Styled.BusyTimeTitle>
                     </Styled.BusyTimeDIv>

                  </>
               }

               {(film && hall && date) &&
                  <>

                     <InputField
                        inputType="time"
                        dateMin={'09:00'}
                        dateMax={'21:00'}
                        label="Время начала сеанса"
                        onChange={changeTime}
                        error={errors.time}
                     />
                     {endTime &&
                        <Styled.ErrorTextGenres style={{ color: '#000000', opacity: '0.5' }}>Время окончания: {
                           endTime
                        }
                        </Styled.ErrorTextGenres>
                     }
                     <Styled.ErrorTextGenres style={{ color: '#000000', opacity: '0.5' }}>*Время начала должно быть между 09:00 и 21:00</Styled.ErrorTextGenres>
                  </>
               }

               <Styled.Flex>
                  <Styled.PrimaryButton type="submit">Сохранить</Styled.PrimaryButton>
                  <Styled.SecondaryButton onClick={() => setIsAddFilmShow(false)}>Отмена</Styled.SecondaryButton>
               </Styled.Flex>
            </Styled.Form>
         </Col>

      </>
   );

}

export default AddFilmShowForm;