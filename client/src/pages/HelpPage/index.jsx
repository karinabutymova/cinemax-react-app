import React, { useState } from 'react';
import axios from 'axios';
import * as Styled from './styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { Store } from 'react-notifications-component';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ticketIcon from '../../assets/images/Icons/ticket.svg';
import timeIcon from '../../assets/images/Icons/time.svg';
import profileIcon from '../../assets/images/Icons/profile.svg';
import ticketsIcon from '../../assets/images/Icons/tickets.svg';
import returnTicketIcon from '../../assets/images/Icons/returnTicket.svg';
import arrowRoundIcon from '../../assets/images/Icons/arrowRound.svg';
import arrowStraightIcon from '../../assets/images/Icons/arrowStraight.svg';
import AccordionItem from '../../components/AccordionItem';


const faqs = [
   {
      id: 1,
      header: "Есть ли возможность арендовать зал для проведения мероприятий?",
      text: "Да, мы предоставляем услуги аренды зала для проведения различных мероприятий, таких как презентации, конференции, дни рождения и другие. Для более подробной информации, пожалуйста, свяжитесь с нами по телефону или через форму обратной связи на нашем сайте."
   },
   {
      id: 2,
      header: "Оказываете ли вы фильмы в оригинальной озвучке?",
      text: "Да. При этом язык показа указан на сайте в названии фильма."
   },
   {
      id: 3,
      header: "В каких форматах вы показываете фильмов?",
      text: "Мы показываем фильмы в форматах 2D, 3D и IMAX."
   },
   {
      id: 4,
      header: "Можно ли вернуть или обменять билеты на фильм?",
      text: "Вы можете вернуть билеты в кассе кинотеатра или в личный кабинет на сайте. Возврат осущесвляется до начала сеанса."
   },
   {
      id: 5,
      header: "Можно ли принести свою еду и напитки в кинотеатр?",
      text: "Кинотеатре запрещено приносить свою еду и напитки."
   },
]

const HelpPage = () => {

   const [active, setActive] = useState(null);
   const [name, setName] = useState(null);
   const [email, setEmail] = useState(null);
   const [mess, setMess] = useState(null);

   const [error, setError] = useState({});

   const handleToggle = (index) => {
      if (active === index) {
         setActive(null);
      } else {
         setActive(index);
      }
   };


   const notification = (mess, isAuth) => Store.addNotification({
      title: mess,
      type: "success",
      insert: "top",
      container: "bottom-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: 2000
      }
   });

   const FeedbackFormSubmit = async (e) => {
      e.preventDefault();

      let allErrors = {};

      if (!name) {
         allErrors.name = 'Введите имя';
      } else if (name.length > 250) {
         allErrors.name = 'Длина имени не более 250 символов';
      }

      if (!email) {
         allErrors.email = 'Введите email';
      } else {
         let emailFilter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
         if (!emailFilter.test(email)) allErrors.email = "Неверный формат email";
      }

      if (!mess) {
         allErrors.mess = 'Введите текст сообщения';
      } else if (mess.length > 3000) {
         allErrors.mess = 'Tекст сообщения не более 6000 символов';
      }

      if (Object.keys(allErrors).length !== 0) {
         setError(allErrors);
      } else {
         try {
            await axios.post('http://localhost:3001/sendFeedBackEmail', {
               email: email,
               name: name,
               mess: mess
            }, { withCredentials: true })
               .then((response) => {
                  notification('Сообщение успешно отправлено');
                  setName('');
                  setMess('');
                  setEmail('');
               });

         } catch (error) {
            if (error.response) {
               console.log(error.response.data);
            }
         }
      }
   }

   const changeName = (e) => {
      setName(e.target.value);
   }
   const changeEmail = (e) => {
      setEmail(e.target.value);
   }
   const changeMess = (e) => {
      setMess(e.target.value);
   }

   return (
      <>
         <Header />
         <Container>
            <Row>
               <Col col="12">
                  <Styled.PageTitle>Помощь</Styled.PageTitle>
               </Col>
            </Row>
            <Row id="bonus">
               <Col col="12">
                  <Styled.SectionContainer>
                     <Styled.SectionTitle>
                        Бонусная программа
                     </Styled.SectionTitle>
                     <Styled.WhiteContainer>
                        <Styled.BonusFlex>
                           <Styled.BonusDivContainer>
                              <Styled.BonusText>В&nbsp;рамках программы лояльности после&nbsp;бронирование билетов осуществляется начисление бонусных баллов. Зарегистрированный пользователь автоматически становится участником программы.</Styled.BonusText>
                              <Styled.BonusMarkDiv>
                                 <Styled.BonusIcon src={ticketIcon} alt="ticket.svg" />
                                 <Styled.BonusMarkContent>
                                    <Styled.BonusMarkSpan>
                                       1</Styled.BonusMarkSpan>&nbsp;бонус = <Styled.BonusMarkSpan>1</Styled.BonusMarkSpan>&nbsp;копейка
                                 </Styled.BonusMarkContent>
                              </Styled.BonusMarkDiv>
                           </Styled.BonusDivContainer>
                           <Styled.BonusDivContainer>
                              <Styled.BonusText>Количество начисляемых баллов равно 5% от&nbsp;общей суммы заказа. В&nbsp;случае использования доступных бонусов, бонусные баллы за&nbsp;текущую покупку не&nbsp;начисляются. История накопления и&nbsp;списания доступна в&nbsp;профиле.</Styled.BonusText>
                              <Styled.BonusMarkDiv>
                                 <Styled.BonusIcon src={ticketIcon} alt="ticket.svg" />
                                 <Styled.BonusMarkContent>Погашение до&nbsp;<Styled.BonusMarkSpan>50%&nbsp;стоимости</Styled.BonusMarkSpan> заказа</Styled.BonusMarkContent>
                              </Styled.BonusMarkDiv>
                           </Styled.BonusDivContainer>
                        </Styled.BonusFlex>
                     </Styled.WhiteContainer>
                  </Styled.SectionContainer>
               </Col>
            </Row>
            <Row id="tickets">
               <Col col="12">
                  <Styled.SectionContainer>
                     <Styled.SectionTitle>
                        Возврат билетов
                     </Styled.SectionTitle>
                     <Styled.TicketWhiteContainer>
                        <Styled.TicketContainer>
                           <Styled.ReturnTicketDiv style={{ marginTop: '24px' }}>
                              <Styled.Step>1.</Styled.Step>
                              <Styled.TicketIcon src={timeIcon} style={{ width: '70px' }} alt="time.svg" />
                              <Styled.ReturnTicketText>
                                 Убедитесь, что ещё есть время до&nbsp;начала сеанса*
                              </Styled.ReturnTicketText>
                           </Styled.ReturnTicketDiv>
                           <Styled.ArrowRoundIcon src={arrowRoundIcon} alt="arrowRound.svg" />
                           <Styled.ArrowStraightIcon src={arrowStraightIcon} alt="arrowStraight.svg" />
                           <Styled.ReturnTicketDiv>
                              <Styled.Step>2.</Styled.Step>
                              <Styled.TicketIcon src={profileIcon} style={{ width: '140px' }} alt="profile.svg" />
                              <Styled.ReturnTicketText>
                                 Перейдите в&nbsp;профиль
                              </Styled.ReturnTicketText>
                           </Styled.ReturnTicketDiv>
                           <Styled.ArrowRoundIcon src={arrowRoundIcon} alt="arrowRound.svg" />
                           <Styled.ArrowStraightIcon src={arrowStraightIcon} alt="arrowStraight.svg" />
                           <Styled.ReturnTicketDiv>
                              <Styled.Step>3.</Styled.Step>
                              <Styled.TicketIcon src={ticketsIcon} style={{ width: '70px' }} alt="tickets.svg" />
                              <Styled.ReturnTicketText>
                                 Найдите билеты на&nbsp;необходимый сеанс
                              </Styled.ReturnTicketText>
                           </Styled.ReturnTicketDiv>
                           <Styled.ArrowRoundIcon src={arrowRoundIcon} alt="arrowRound.svg" />
                           <Styled.ArrowStraightIcon src={arrowStraightIcon} alt="arrowStraight.svg" />
                           <Styled.ReturnTicketDiv>
                              <Styled.Step>4.</Styled.Step>
                              <Styled.TicketIcon src={returnTicketIcon} style={{ width: '130px' }} alt="returnTicket.svg" />
                              <Styled.ReturnTicketText>
                                 Выберите "Возврат билетов" и&nbsp;подтвердите выбор
                              </Styled.ReturnTicketText>
                           </Styled.ReturnTicketDiv>
                        </Styled.TicketContainer>
                        <Styled.TicketMark>*Возврат возможен только до&nbsp;начала сеанса (аналогично при&nbsp;возврате через&nbsp;киоск)</Styled.TicketMark>
                     </Styled.TicketWhiteContainer>
                  </Styled.SectionContainer>
               </Col>
            </Row>
            <Row id="questions">
               <Col col="12">
                  <Styled.SectionContainer>
                     <Styled.SectionTitle>
                        Частые вопросы
                     </Styled.SectionTitle>
                     <Styled.Article>
                        {faqs.map((faq, index) => {
                           return (
                              <AccordionItem key={index} active={active} handleToggle={handleToggle} faq={faq} />
                           );
                        })}
                     </Styled.Article>
                  </Styled.SectionContainer>
               </Col>
            </Row>
            <Row>
               <Col xl="5" lg="5" md="12" sm="12" xs="12">
                  <Styled.SectionContainer style={{ marginBottom: '24px' }}>
                     <Styled.FeedBackSectionTitle>
                        Обратная связь
                     </Styled.FeedBackSectionTitle>
                  </Styled.SectionContainer>
                  <Styled.FeedBackText>
                     Мы ценим ваше мнение и&nbsp;рады обратной связи. Если у&nbsp;вас есть какие-либо вопросы, предложения или отзывы, то&nbsp;свяжитесь с&nbsp;нами через&nbsp;данную форму. Мы всегда готовы помочь и&nbsp;предоставить максимально качественный сервис!
                  </Styled.FeedBackText>
               </Col>
               <Col xl="7" lg="7" md="12" sm="12" xs="12">
                  <Styled.FeedBackForm onSubmit={FeedbackFormSubmit}>
                     <Styled.FullNameDiv>
                        <Styled.InputContainer>
                           <Styled.InputLabel>Ваше имя:</Styled.InputLabel>
                           <Styled.BonusInput type='text' value={name} onChange={changeName} />
                           {(error && error.name && error.name.length > 0) && <Styled.Error>{error.name}</Styled.Error>}
                        </Styled.InputContainer>
                        <Styled.InputContainer>
                           <Styled.InputLabel>Ваш email:</Styled.InputLabel>
                           <Styled.BonusInput type='text' value={email} onChange={changeEmail} />
                           {(error && error.email && error.email.length > 0) && <Styled.Error>{error.email}</Styled.Error>}
                        </Styled.InputContainer>
                     </Styled.FullNameDiv>
                     <Styled.InputContainer>
                        <Styled.InputLabel>Сообщение:</Styled.InputLabel>
                        <Styled.Textarea value={mess} onChange={changeMess} />
                        {(error && error.mess && error.mess.length > 0) && <Styled.Error>{error.mess}</Styled.Error>}
                     </Styled.InputContainer>
                     <Styled.PrimaryButton type='submit'>Отправить</Styled.PrimaryButton>
                  </Styled.FeedBackForm>
               </Col>
            </Row>
         </Container>
         <Footer />
      </>
   )
}

export default HelpPage;