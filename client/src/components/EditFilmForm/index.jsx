import { useState, useEffect } from 'react'
import axios from "axios";
import * as Styled from '../AddFilmForm/styled';
import { ImgDiv } from '../AddNewsForm/styled';
import { useNavigate } from 'react-router-dom';
import { Col } from 'styled-bootstrap-grid';
import InputField from '../InputField';
import Select from 'react-select';
import { Store } from 'react-notifications-component';

const EditFilmForm = ({ filmId, setFilter }) => {
   const navigate = useNavigate();
   const goBack = (link) => {
      navigate(link);
      window.scrollTo(0, 0);
   }
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

   const [film, setFilm] = useState({});
   const [title, setTitle] = useState('');
   const [poster, setPoster] = useState('');
   const [oldPoster, setOldPoster] = useState('');
   const [description, setDescription] = useState('');
   const [creators, setCreators] = useState('');
   const [actors, setActors] = useState('');
   const [year, setYear] = useState(0);
   const [genres, setGenres] = useState([]);
   const [country, setCountry] = useState('');
   const [runtime, setRuntime] = useState('');
   const [age, setAge] = useState([]);
   const [fromRent, setFromRent] = useState(0);
   const [toRent, setToRent] = useState(0);
   const [trailer, setTrailer] = useState('');
   const [errors, setErrors] = useState({});



   useEffect(() => {
      GetFilmById()
   }, []);

   const GetFilmById = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getfilm', {
            params: {
               filmId: filmId,
            }
         },
            { withCredentials: true }
         );
         setFilm(response.data);
         setAge(ageOptions.filter((option, index) => {
            return option.value === String(response.data.age_limit)
         }))
         let genresOp = [];
         response.data.genres.split(', ').forEach((genre) => {
            console.log(genre)
            let genr = genresOptions.filter((option, index) => {
               return option.value === String(genre)
            });
            genresOp.push(genr[0]);
         })
         setGenres(genresOp);
         setDescription(response.data.description);
         setActors(response.data.actors.split(', '));
         setOldPoster(response.data.photo_path);
      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const notification = (mess, isAuth) => Store.addNotification({
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
         setFilter();
         goBack('/adminPanel?filter=films');
      }
   });

   const editFilmForm = async (e) => {
      e.preventDefault();

      setErrors({});
      let allErrors = {};

      if (!title.length || !title.trim().length) allErrors.title = 'Пустое название';

      if (!poster.name && !oldPoster) allErrors.posterError = 'Необходимо добавить постер к фильму';
      else if (poster.name) {
         let fileFormat = poster.name.split('.').at(-1).toLowerCase();
         if (fileFormat !== 'jpg' && fileFormat !== 'png' && fileFormat !== 'jpeg') {
            allErrors.posterError = 'Неверный формат файла. Необходим jpg/png';
         }
      }

      if (!description.length || !description.trim().length) allErrors.description = 'Пустое описание';
      if (runtime % 1 !== 0) allErrors.runtime = 'Должно быть целым числом';
      if (runtime <= 0) allErrors.runtime = 'Не может быть меньше или равно нулю';

      let actorInput = document.querySelectorAll('[name="actors"]');
      let actorInputsValues = [];
      actorInput.forEach(actor => {
         if (actor.value) actorInputsValues.push(actor.value.trim());
      });

      if (!actorInputsValues.length) allErrors.actors = 'Не заполнен актёрский состав';
      if (!creators.length || !creators.trim().length) allErrors.creators = 'Поле не заполнено';
      if (!genres.length) allErrors.genres = 'Поле не заполнено';
      if (!age.label && !age[0].label) allErrors.age = 'Поле не заполнено';
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
         newFilm.poster = poster.name ? poster.name : oldPoster;
         newFilm.description = description

         // TODO: придумать как обрабатывать 
         // (или вообще по другому записывать)
         newFilm.actors = actorInputsValues.join(', ');
         newFilm.creators = creators;

         newFilm.year = year;
         let gnr = '';
         genres.forEach(genre => {
            gnr += genre.value[0].toUpperCase() + genre.value.slice(1) + ', ';
         });
         newFilm.genres = gnr.replace(/, $/, '');
         newFilm.country = country;
         newFilm.runtime = runtime;
         newFilm.age = age.value ? age.value : age[0].value;
         newFilm.fromRent = fromRent;
         newFilm.toRent = toRent;
         newFilm.trailer = trailer;

         newFilm.filmId = filmId;

         console.log(newFilm);

         if (poster.name) {
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
         }

         try {
            const response = await axios.post('http://localhost:3001/editFilm', {
               newFilm: newFilm
            },
               { withCredentials: true }
            );
            console.log(response.data);
            notification('Данные фильма успешно изменены');
         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }
      }

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

   const addActorInput = () => {
      let input = document.querySelector('[name="actors"]');
      let inputsDiv = document.querySelector('.actors-inputs');
      if (input && inputsDiv) {
         let newInput = input.cloneNode(true);
         newInput.value = '';
         inputsDiv.append(newInput);
      }
   }

   return (
      <>
         <Col col="12">
            <Styled.Form onSubmit={editFilmForm}>
               <InputField
                  inputType="text"
                  placeholder="Введите название"
                  label="Название"
                  value={film.film_title}
                  onChange={setTitle}
                  error={errors.title}
               />
               <Styled.Label>Постер</Styled.Label>
               <Styled.FileInput type="file" onChange={uploadPoster} />
               {(errors.posterError && errors.posterError.length > 0) && <Styled.ErrorTextGenres>{errors.posterError}</Styled.ErrorTextGenres>}
               {(oldPoster && oldPoster.length > 0) && <>
                  <ImgDiv style={{ backgroundImage: 'url(' + require(`../../assets/images/Posters/${oldPoster}`) + ')', marginBottom: '16px' }}>
                  </ImgDiv>
                  <Styled.ErrorText style={{ color: '#aeaeae' }}>*При выборе нового постера данный будет удалён</Styled.ErrorText>
               </>
               }

               <Styled.Label>Описание</Styled.Label>
               <Styled.TextArea rows={10}
                  value={film.description}
                  onChange={handleTextAreaOnChange}
               ></Styled.TextArea>
               {(errors.description && errors.description.length > 0) && <Styled.ErrorText>{errors.description}</Styled.ErrorText>}

               <InputField
                  inputType="number"
                  pattern="\d*"
                  placeholder="Введите кол-во минут"
                  label="Продолжительность (мин)"
                  onChange={setRuntime}
                  value={film.film_runtime}
                  error={errors.runtime}
               />
               <Styled.ActorsInputs className="actors-inputs">
                  <Styled.Label>Актёрский состав</Styled.Label>
                  {actors && actors.map(actor => <Styled.ActorInput type="text" placeholder="Введите актёра" name="actors" value={actor} />)}
               </Styled.ActorsInputs>
               {(errors.actors && errors.actors.length > 0) && <Styled.ErrorText>{errors.actors}</Styled.ErrorText>}

               <Styled.AddActorBtn type="button" onClick={addActorInput}>Добавить</Styled.AddActorBtn>
               <InputField
                  inputType="text"
                  placeholder="Введите режиссёра"
                  label="Режиссёр"
                  onChange={setCreators}
                  value={film.creators}
                  error={errors.creators}
               />
               <InputField
                  inputType="number"
                  pattern="\d*"
                  placeholder="Введите год"
                  label="Год выпуска"
                  onChange={setYear}
                  value={film.year}
                  error={errors.year}
               />
               {genres.length > 0 &&
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
                        defaultValue={genres}
                        styles={Styled.SelectStyle} />
                     {(errors.genres && errors.genres.length > 0) && <Styled.ErrorTextGenres>{errors.genres}</Styled.ErrorTextGenres>}

                  </Styled.SelectContainer>}


               {age.length > 0 && <Styled.SelectContainer>
                  <Styled.Label>Возрастное ограничение</Styled.Label>
                  <Select
                     name="age"
                     noOptionsMessage={({ inputValue }) => "Ничего не найдено"}
                     placeholder="Выберите возраст"
                     isClearable="true"
                     isSearchable="false"
                     options={ageOptions}
                     onChange={onChangeAge}
                     defaultValue={age}
                     styles={Styled.SelectStyle} />
                  {(errors.age && errors.age.length > 0) && <Styled.ErrorTextGenres>{errors.age}</Styled.ErrorTextGenres>}
               </Styled.SelectContainer>}
               <InputField
                  inputType="text"
                  placeholder="Введите страну"
                  label="Страна производства"
                  onChange={setCountry}
                  value={film.country}
                  error={errors.country}
               />
               <InputField
                  inputType="url"
                  placeholder="https://youtube.com"
                  label="Ссылка на трейлер"
                  onChange={setTrailer}
                  value={film.trailer_link}
                  error={errors.trailer}
               />
               <InputField
                  inputType="date"
                  label="Начала проката"
                  onChange={setFromRent}
                  value={film.from_rent_date}
                  error={errors.fromRent}
               />
               <InputField
                  inputType="date"
                  label="Конец проката"
                  onChange={setToRent}
                  value={film.to_rent_date}
                  error={errors.toRent}
               />
               <Styled.Flex>
                  <Styled.PrimaryButton type="submit">Сохранить</Styled.PrimaryButton>
                  <Styled.SecondaryButton onClick={() => goBack('/adminPanel?filter=films')}>Отмена</Styled.SecondaryButton>
               </Styled.Flex>
            </Styled.Form>
         </Col>

      </>
   );

}

export default EditFilmForm;