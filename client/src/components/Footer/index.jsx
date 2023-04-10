import React from 'react';
import * as Styled from './styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import mailIcon from '../../assets/images/Icons/mail.svg';
import phoneIcon from '../../assets/images/Icons/phone.svg';
import instagramIcon from '../../assets/images/Icons/instagram.svg';
import youtubeIcon from '../../assets/images/Icons/youtube.svg';
import twitterIcon from '../../assets/images/Icons/twitter.svg';

// TODO:: добавить ссылки
const Footer = () => {
   return (
      <>
         <Styled.Footer>
            <Container>
               <Row justifyContent='between' alignItems='center'>
                  <Col xl="2" lg="2" md="3" sm="12">
                     <Styled.Logo>CINEMAX</Styled.Logo>
                  </Col>
                  <Col xl="9" lg="9" md="8" sm="12">
                     <Styled.LinksFlexDiv>
                        <Styled.LinkContainer>
                           <Styled.MainLink to="/poster">Афиша</Styled.MainLink>
                           <Styled.SecondLink to="/poster?filter=now">Сейчас в кино</Styled.SecondLink>
                           <Styled.SecondLink to="/poster?filter=soon">Скоро</Styled.SecondLink>
                           <Styled.SecondLink>Подобрать фильм</Styled.SecondLink>
                        </Styled.LinkContainer>
                        <Styled.SecondMainLink>Подобрать фильм</Styled.SecondMainLink>
                        <Styled.LinkContainer>
                           <Styled.MainLink>Помощь</Styled.MainLink>
                           <Styled.SecondLink>Бонусная программа</Styled.SecondLink>
                           <Styled.SecondLink>Возврат билетов</Styled.SecondLink>
                           <Styled.SecondLink>Частые вопросы</Styled.SecondLink>
                        </Styled.LinkContainer>
                        <Styled.LinkContainer>
                           <Styled.ContactLink>Контакты</Styled.ContactLink>
                           <Styled.ContactFlexDiv>
                              <Styled.Icon src={mailIcon} />
                              <Styled.ContactSecondLink>info@cinemax.com</Styled.ContactSecondLink>
                           </Styled.ContactFlexDiv>
                           <Styled.ContactFlexDiv>
                              <Styled.Icon src={phoneIcon} />
                              <Styled.ContactSecondLink>+375 (29) 970–20–20</Styled.ContactSecondLink>
                           </Styled.ContactFlexDiv>
                           <Styled.ContactFlexDiv />
                        </Styled.LinkContainer>
                        <Styled.LinkContainer>
                           <Styled.SocialLinks>
                              <Styled.SocialIconLink to="https://www.instagram.com/"><Styled.LargeIcon src={instagramIcon} /></Styled.SocialIconLink>
                              <Styled.SocialIconLink to="https://www.youtube.com/"><Styled.LargeIcon src={youtubeIcon} /></Styled.SocialIconLink>
                              <Styled.SocialIconLink to="https://twitter.com/home"><Styled.LargeIcon src={twitterIcon} /></Styled.SocialIconLink>
                           </Styled.SocialLinks>
                        </Styled.LinkContainer>
                     </Styled.LinksFlexDiv>
                  </Col>
               </Row>
               <Row>
                  <Styled.Line />
                  <Styled.Policy>© 2023 Бутымова Карина 11 группа</Styled.Policy>
               </Row>
            </Container>
         </Styled.Footer>
      </>
   )
}

export default Footer;