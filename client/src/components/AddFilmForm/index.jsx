import { useState } from 'react'
import axios from "axios";
import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import { Col } from 'styled-bootstrap-grid';
import InputField from '../InputField';
import Select from 'react-select';

const AddFilmForm = ({ setIsAddFilm }) => {

   const genresOptions = [
      { value: 'Боевик', label: 'Боевик' },
      { value: 'Комедия', label: 'Комедия' },
      { value: 'Драма', label: 'Драма' },
      { value: 'Ужасы', label: 'Ужасы' },
      { value: 'Триллер', label: 'Триллер' },
      { value: 'Детектив', label: 'Детектив' },
      { value: 'Мелодрама', label: 'Мелодрама' },
      { value: 'Фантастика', label: 'Фантастика' }
   ];

   const ageOptions = [
      { value: '0', label: '0+' },
      { value: '6', label: '6+' },
      { value: '12', label: '12+' },
      { value: '18', label: '18+' }
   ];

   const [title, setTitle] = useState('');
   const [poster, setPoster] = useState('');
   const [description, setDescription] = useState('');
   const [actors, setActors] = useState('');
   const [creators, setCreators] = useState('');
   const [year, setYear] = useState(0);
   const [genres, setGenres] = useState([]);
   const [country, setCountry] = useState('');
   const [runtime, setRuntime] = useState('');
   const [age, setAge] = useState([]);
   const [fromRent, setFromRent] = useState(0);
   const [toRent, setToRent] = useState(0);
   const [trailer, setTrailer] = useState('');
   const [errors, setErrors] = useState({});

   const navigate = useNavigate();


   const addFilmForm = async (e) => {
      e.preventDefault();

      setErrors({});
      let allErrors = {};

      if (!title.length || !title.trim().length) allErrors.title = 'Пустое название';

      let fileFormat = poster.name.split('.').at(-1).toLowerCase();
      if (fileFormat !== 'jpg' && fileFormat !== 'png' && fileFormat !== 'jpeg') {
         allErrors.posterError = 'Неверный формат файла. Необходим jpg/png';
      }

      if (!description.length || !description.trim().length) allErrors.description = 'Пустое описание';
      if (runtime % 1 !== 0) allErrors.runtime = 'Должно быть целым числом';
      if (runtime <= 0) allErrors.runtime = 'Не может быть меньше или равно нулю';

      if (!actors.length || !actors.trim().length) allErrors.actors = 'Поле не заполнено';
      if (!creators.length || !creators.trim().length) allErrors.creators = 'Поле не заполнено';
      if (!genres.length) allErrors.genres = 'Поле не заполнено';
      if (!age.label) allErrors.age = 'Поле не заполнено';
      if (!country.length || !country.trim().length)
         allErrors.country = 'Поле не заполнено';

      if (year % 1 !== 0) allErrors.year = 'Должно быть целым числом';
      if (year > new Date().getFullYear() + 1 || year < 1900)
         allErrors.year = `Год в диапазоне: 1900 - ${new Date().getFullYear() + 1}`;

      if (new Date(fromRent).getFullYear() < year)
         allErrors.fromRent = 'Не может быть ранее даты выпуска';

      if (new Date(fromRent).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
         allErrors.fromRent = 'Не может быть ранее текущей даты';

      if (new Date(toRent) < new Date(fromRent))
         allErrors.toRent = 'Не можнт быть ранее даты начала';

      if (Object.keys(allErrors).length !== 0) {
         console.log(allErrors);
         setErrors(allErrors);
      } else {
         let newFilm = {};

         newFilm.title = title;
         newFilm.poster = poster.name;
         newFilm.description = description

         // TODO: придумать как обрабатывать 
         // (или вообще по другому записывать)
         newFilm.actors = actors;
         newFilm.creators = creators;

         newFilm.year = year;
         let gnr = '';
         genres.forEach(genre => {
            gnr += genre.value[0].toUpperCase() + genre.value.slice(1) + ', ';
         });
         newFilm.genres = gnr.replace(/, $/, '');
         newFilm.country = country;
         newFilm.runtime = runtime;
         newFilm.age = age.value;
         newFilm.fromRent = fromRent;
         newFilm.toRent = toRent;
         newFilm.trailer = trailer;


         const data = new FormData();
         data.append('file', poster);

         try {
            const response = await axios.post('http://localhost:3001/uploadImg', data,
               { withCredentials: true }
            );
            console.log(response.statusText);
         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }

         try {
            const response = await axios.post('http://localhost:3001/addFilm', {
               newFilm: newFilm
            },
               { withCredentials: true }
            );
            console.log(response.data);
            if (response.data) window.location.reload();
         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }
      }

   }

   const goBack = () => {
      setIsAddFilm(false);
   }

   const handleTextAreaOnChange = (e) => {
      setDescription(e.target.value);
   }

   const onChangeGenres = (e) => {
      if (e) {
         setGenres(e);
      }
   }

   const onChangeAge = (e) => {
      if (e) {
         setAge(e);
      } else {
         setAge({});
      }
   }

   const uploadPoster = (e) => {
      setPoster(e.target.files[0]);
   }

   return (
      <>
         <Col col="12">
            <Styled.Form onSubmit={addFilmForm}>
               <InputField
                  inputType="text"
                  placeholder="Введите название"
                  label="Название"
                  onChange={setTitle}
                  error={errors.title}
               />
               <Styled.Label>Постер</Styled.Label>
               <Styled.FileInput type="file" onChange={uploadPoster} />
               {(errors.posterError && errors.posterError.length > 0) && <Styled.ErrorTextGenres>{errors.posterError}</Styled.ErrorTextGenres>}

               <Styled.Label>Описание</Styled.Label>
               <Styled.TextArea rows={10}
                  onChange={handleTextAreaOnChange}
               ></Styled.TextArea>
               {(errors.description && errors.description.length > 0) && <Styled.ErrorText>{errors.description}</Styled.ErrorText>}

               <InputField
                  inputType="number"
                  pattern="\d*"
                  placeholder="Введите кол-во минут"
                  label="Продолжительность"
                  onChange={setRuntime}
                  error={errors.runtime}
               />
               <InputField
                  inputType="text"
                  placeholder="Введите актёров через запятую"
                  label="Актёрский состав"
                  onChange={setActors}
                  error={errors.actors}
               />
               <InputField
                  inputType="text"
                  placeholder="Введите режиссёра"
                  label="Режиссёр"
                  onChange={setCreators}
                  error={errors.creators}
               />
               <InputField
                  inputType="number"
                  pattern="\d*"
                  placeholder="Введите год"
                  label="Год выпуска"
                  onChange={setYear}
                  error={errors.year}
               />

               <Styled.SelectContainer>
                  <Styled.Label>Жанры</Styled.Label>
                  <Select
                     name="genres"
                     isMulti
                     noOptionsMessage={({ inputValue }) => "Ничего не найдено"}
                     placeholder="Выберите жанр"
                     isClearable="true"
                     isSearchable="false"
                     options={genresOptions}
                     onChange={onChangeGenres}
                     styles={Styled.SelectStyle} />
                  {(errors.genres && errors.genres.length > 0) && <Styled.ErrorTextGenres>{errors.genres}</Styled.ErrorTextGenres>}

               </Styled.SelectContainer>

               <Styled.SelectContainer>
                  <Styled.Label>Возрастное ограничение</Styled.Label>
                  <Select
                     name="age"
                     noOptionsMessage={({ inputValue }) => "Ничего не найдено"}
                     placeholder="Выберите возраст"
                     isClearable="true"
                     isSearchable="false"
                     options={ageOptions}
                     onChange={onChangeAge}
                     styles={Styled.SelectStyle} />
                  {(errors.age && errors.age.length > 0) && <Styled.ErrorTextGenres>{errors.age}</Styled.ErrorTextGenres>}

               </Styled.SelectContainer>
               <InputField
                  inputType="text"
                  placeholder="Введите страну"
                  label="Страна производства"
                  onChange={setCountry}
                  error={errors.country}
               />
               <InputField
                  inputType="url"
                  placeholder="https://youtube.com"
                  label="Ссылка на трейлер"
                  onChange={setTrailer}
                  error={errors.trailer}
               />
               <InputField
                  inputType="date"
                  label="Начала проката"
                  onChange={setFromRent}
                  error={errors.fromRent}
               />
               <InputField
                  inputType="date"
                  label="Конец проката"
                  onChange={setToRent}
                  error={errors.toRent}
               />
               <Styled.Flex>
                  <Styled.PrimaryButton type="submit">Сохранить</Styled.PrimaryButton>
                  <Styled.SecondaryButton onClick={goBack}>Отмена</Styled.SecondaryButton>
               </Styled.Flex>
            </Styled.Form>
         </Col>

      </>
   );

}

export default AddFilmForm;