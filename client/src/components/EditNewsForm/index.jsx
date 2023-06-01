import { useState, useEffect } from 'react'
import axios from "axios";
import * as Styled from '../AddNewsForm/styled';
import { useNavigate } from 'react-router-dom';
import { Col } from 'styled-bootstrap-grid';
import InputField from '../InputField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Store } from 'react-notifications-component';


const EditNewsForm = ({ news }) => {
   const navigate = useNavigate();
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [template, setTemplate] = useState(1);
   const [images, setImages] = useState('');
   const [newImages, setNewImages] = useState('');
   const [errors, setErrors] = useState({});

   const goBack = (link) => {
      navigate('/adminPanel?filter=news');
      window.scrollTo(0, 0);
   }

   useEffect(() => {
      getNewsById();
   }, [])

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
         navigate('');
         window.scrollTo(0, 0);
      }
   });

   const getNewsById = async (e) => {
      try {
         const response = await axios.get('http://localhost:3001/getNewsById', {
            params: {
               newsId: news,
            }
         },
            { withCredentials: true }
         );

         setTitle(response.data.news_title);
         setBody(response.data.news_body);
         setTemplate(response.data.news_template);
         setImages(response.data.news_images);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const editNewsForm = async (e) => {
      e.preventDefault();

      setErrors({});
      let allErrors = {};

      if (!title.length || !title.trim().length) allErrors.title = 'Пустой заголовок';
      // TODO проверку нормальную

      if (!body.length || !body.trim().length) allErrors.body = 'Пустое содержание';
      if (!template) allErrors.template = 'Выберите шаблон';

      [...newImages].forEach(img => {
         let fileFormat = img.name.split('.').at(-1).toLowerCase();
         if (fileFormat !== 'jpg' && fileFormat !== 'png' && fileFormat !== 'jpeg') {
            allErrors.images = 'Неверный формат файла. Необходим jpg/png';
            setNewImages('')
         }
      });

      if (![...newImages].length && !images) allErrors.images = 'Необходимо добавить изображение';

      if (Object.keys(allErrors).length !== 0) {
         console.log(allErrors);
         setErrors(allErrors);
      } else {
         let newNews = {};

         newNews.news_title = title;
         newNews.news_body = body;
         newNews.news_template = template;

         let imgs = '';
         [...newImages].forEach(img => {
            imgs += img.name + ', ';
         });

         newNews.news_images = images ? (images + ', ' + imgs).replace(/, $/, '') : imgs.replace(/, $/, '');

         [...newImages].forEach(async (img) => {
            const data = new FormData();
            data.append('file', img);

            try {
               const response = await axios.post('http://localhost:3001/uploadNewsImg', data,
                  { withCredentials: true }
               );
               console.log(response.statusText);
            } catch (error) {
               if (error.response) {
                  console.log(error.response.data);
               }
            }
         });

         try {
            const response = await axios.post('http://localhost:3001/editNews', {
               newNews: newNews,
               newsId: news
            },
               { withCredentials: true }
            );
            notification('Новость успешно изменена');
         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }
      }

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
      setNewImages(e.target.files);
   }

   const deleteImg = (img) => {
      let lastImg = images.split(', ').filter(image => image !== img);
      setImages(lastImg.join(', '));
   }

   return (
      <>
         <Col col="12">
            <Styled.Form onSubmit={editNewsForm}>
               <InputField
                  inputType="text"
                  placeholder="Введите заголовок"
                  label="Заголовок"
                  value={title}
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
               {template === 1 && <Styled.FileInput type="file" onChange={uploadImages} />}
               {template === 2 && <Styled.FileInput type="file" multiple onChange={uploadImages} />}
               {(errors.images && errors.images.length > 0) && <Styled.ErrorText>{errors.images}</Styled.ErrorText>}

               {(images && images.length > 0) &&
                  <Styled.ImgContainer>
                     {images.split(', ').map((img) => {
                        try {

                           return <Styled.ImgDiv style={{ backgroundImage: 'url(' + require(`../../assets/images/News/${img}`) + ')' }}>
                              <p onClick={() => deleteImg(img)}>×</p>
                           </Styled.ImgDiv>
                        } catch (error) {
                        }
                        return false;
                     })}
                  </Styled.ImgContainer>
               }
               <Styled.Flex>
                  <Styled.PrimaryButton type="submit">Сохранить</Styled.PrimaryButton>
                  <Styled.SecondaryButton onClick={() => goBack('/adminPanel?filter=news')}>Отмена</Styled.SecondaryButton>
               </Styled.Flex>
            </Styled.Form>
         </Col >

      </>
   );

}

export default EditNewsForm;