import React from 'react';
import * as Styled from './styled';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import searchIcon from '../../assets/images/Icons/search.svg';

const Header = () => {
   return (
      <>
         <Styled.Nav>
            <Container>
               <Styled.FullMenu>
                  <Row justifyContent="between">
                     <Col xl="5" lg="6">
                        <Styled.SrcBlock>
                           <Styled.Src to="/poster">Афиша</Styled.Src>
                           <Styled.Src to="/news">Новости</Styled.Src>
                           <Styled.Src to="/about">О кинотеатре</Styled.Src>
                           <Styled.Src to="/help">Помощь</Styled.Src>
                        </Styled.SrcBlock>
                     </Col>
                     <Col xl="2" lg="2">
                        <Styled.LogoSrcBlock>
                           <Styled.SrcLogo to="/">CINEMAX</Styled.SrcLogo>
                        </Styled.LogoSrcBlock>
                     </Col>
                     <Col xl="5" lg="4">
                        <Styled.LastSrcBlock>
                           <Styled.SrcSearch to="/search">
                              <Styled.SearchImg src={searchIcon} />
                           </Styled.SrcSearch>
                           <Styled.SrcAccount to="/profile">Мой профиль</Styled.SrcAccount>
                        </Styled.LastSrcBlock>
                     </Col>
                  </Row>
               </Styled.FullMenu>
            </Container>
            <Container>
               <Styled.MobileMenu>
                  <Styled.MobileSrcLogo to="/">CINEMAX</Styled.MobileSrcLogo>
                  <Styled.MobileMenuCheckbox type="checkbox" id="checkbox" />
                  <Styled.MobileMenuBtn for="checkbox">
                     <Styled.MobileMenuIcon />
                  </Styled.MobileMenuBtn>
                  <Styled.MobileMenuContainer>
                     <Styled.MobileMenuList>
                        <Styled.MobileMenuItem>
                           <Styled.MobileMenuLink to="/poster">Афиша</Styled.MobileMenuLink>
                        </Styled.MobileMenuItem>
                        <Styled.MobileMenuItem>
                           <Styled.MobileMenuLink to="/news">Новости</Styled.MobileMenuLink>
                        </Styled.MobileMenuItem>
                        <Styled.MobileMenuItem>
                           <Styled.MobileMenuLink to="/about">О кинотеатре</Styled.MobileMenuLink>
                        </Styled.MobileMenuItem>
                        <Styled.MobileMenuItem>
                           <Styled.MobileMenuLink to="/help">Помощь</Styled.MobileMenuLink>
                        </Styled.MobileMenuItem>
                        <Styled.MobileMenuItem>
                           <Styled.MobileMenuLink to="/search">Поиск</Styled.MobileMenuLink>
                        </Styled.MobileMenuItem>
                        <Styled.MobileMenuItem>
                           <Styled.MobileMenuLink to="/profile">Мой профиль</Styled.MobileMenuLink>
                        </Styled.MobileMenuItem>
                     </Styled.MobileMenuList>
                  </Styled.MobileMenuContainer>
               </Styled.MobileMenu>
            </Container>
         </Styled.Nav>
      </>
   )
}

export default Header;