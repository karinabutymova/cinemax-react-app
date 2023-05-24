import { useState } from 'react'
import axios from "axios";
import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import { Col } from 'styled-bootstrap-grid';
import InputField from '../InputField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNewsForm = ({ setIsAddNews }) => {

   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [template, setTemplate] = useState(1);
   const [images, setImages] = useState('');
   const [errors, setErrors] = useState({});


   const addNewsForm = async (e) => {
      e.preventDefault();

      setErrors({});
      let allErrors = {};

      if (!title.length || !title.trim().length) allErrors.title = 'Пустой заголовок';
      // TODO проверку нормальную

      if (!body.length || !body.trim().length) allErrors.body = 'Пустое содержание';
      if (!template) allErrors.template = 'Выберите шаблон';

      if (Object.keys(allErrors).length !== 0) {
         console.log(allErrors);
         setErrors(allErrors);
      }

      // let fileFormat = poster.name.split('.').at(-1).toLowerCase();
      // if (fileFormat !== 'jpg' && fileFormat !== 'png' && fileFormat !== 'jpeg') {
      //    allErrors.posterError = 'Неверный формат файла. Необходим jpg/png';
      // }


      // const data = new FormData();
      // data.append('file', poster);

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

      // try {
      //    const response = await axios.post('http://localhost:3001/addNews', {
      //       newNews: newNews
      //    },
      //       { withCredentials: true }
      //    );
      //    console.log(response.data);
      //    if (response.data) window.location.reload();
      // } catch (error) {
      //    if (error.response) {
      //       console.log(error.response.data);
      //    }
      // }
   }


   const goBack = () => {
      setIsAddNews(false);
   }

   const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link',
   ];
   const modules = {
      toolbar: [
         [{ 'header': [1, 2, 3, false] }],
         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
         ['link'],
         ['clean']
      ],
   }

   const uploadImages = (e) => {
      setImages(e.target.files[0]);
   }

   return (
      <>
         <Col col="12">
            <Styled.Form onSubmit={addNewsForm}>
               <InputField
                  inputType="text"
                  placeholder="Введите заголовок"
                  label="Заголовок"
                  onChange={setTitle}
                  error={errors.title}
               />

               <Styled.Label>Содержание</Styled.Label>
               <ReactQuill theme="snow" value={body} onChange={setBody} modules={modules} />
               {(errors.body && errors.body.length > 0) && <Styled.ErrorText>{errors.body}</Styled.ErrorText>}

               <Styled.Label>Шаблон</Styled.Label>
               <Styled.TemplateBtnDiv>
                  <Styled.TemplateBtn type="button" template={template} id={1} onClick={() => setTemplate(1)}>Одно фото</Styled.TemplateBtn>
                  <Styled.TemplateBtn type="button" template={template} id={2} onClick={() => setTemplate(2)} > Слайдер</Styled.TemplateBtn>
               </Styled.TemplateBtnDiv>
               {(errors.template && errors.template.length > 0) && <Styled.ErrorText>{errors.template}</Styled.ErrorText>}

               <Styled.Label>Изображения</Styled.Label>
               <Styled.FileInput type="file" onChange={uploadImages} />
               {(errors.images && errors.images.length > 0) && <Styled.ErrorText>{errors.images}</Styled.ErrorText>}

               <Styled.Flex>
                  <Styled.PrimaryButton type="submit">Сохранить</Styled.PrimaryButton>
                  <Styled.SecondaryButton onClick={goBack}>Отмена</Styled.SecondaryButton>
               </Styled.Flex>
            </Styled.Form>
         </Col >

      </>
   );

}

export default AddNewsForm;