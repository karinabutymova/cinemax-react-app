import { useState, useLayoutEffect } from 'react'
import axios from "axios";
import * as Styled from '../AddFilmForm/styled';
import { useNavigate } from 'react-router-dom';
import { Col } from 'styled-bootstrap-grid';
import InputField from '../InputField';
import Select from 'react-select';

const AddFilmShowForm = ({ setIsAddFilmShow }) => {

   const dateOption = { month: '2-digit' };
   const dateMin = new Date().getFullYear() + '-' + new Date().toLocaleDateString('ru', dateOption) + '-' + new Date().getDate();

   const [film, setFilm] = useState(null);
   const [filmsOptions, setFilmsOptions] = useState([]);
   const [hallsOptions, setHallsOptions] = useState([]);
   const [timeOptions, setTimeOptions] = useState([]);
   const [hall, setHall] = useState('');
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [price, setPrice] = useState('');

   const [errors, setErrors] = useState({});

   const navigate = useNavigate();

   useLayoutEffect(() => {
      getFilms();
      getHalls();
   }, [])

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

   const addFilmShowForm = async (e) => {
      e.preventDefault();

      setErrors({});
      let allErrors = {};

      if (!film) allErrors.film = 'Не выбран фильм';
      if (price <= 0) allErrors.price = 'Цена не может быть меньше или равна нулю';

      if (Object.keys(allErrors).length !== 0) {
         console.log(allErrors);
         setErrors(allErrors);
      }

      // try {
      //    const response = await axios.post('http://localhost:3001/uploadImg', data,
      //       { withCredentials: true }
      //    );
      //    console.log(response.statusText);
      // } catch (error) {
      //    if (error.response) {
      //       console.log(error.response.data);
      //    }
      // }

   }

   const goBack = () => {
      setIsAddFilmShow(false);
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
                  <InputField
                     inputType="date"
                     dateMin={dateMin}
                     dateMax={film.toRent}
                     label="Дата сеанса"
                     onChange={setDate}
                     error={errors.date}
                  />
               }

               {date && <Styled.SelectContainer>
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

               </Styled.SelectContainer>}


               <Styled.Flex>
                  <Styled.PrimaryButton type="submit">Сохранить</Styled.PrimaryButton>
                  <Styled.SecondaryButton onClick={goBack}>Отмена</Styled.SecondaryButton>
               </Styled.Flex>
            </Styled.Form>
         </Col>

      </>
   );

}

export default AddFilmShowForm;