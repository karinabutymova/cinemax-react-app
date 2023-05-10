import { useEffect } from "react";
import * as Styled from "./styled";
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'styled-bootstrap-grid';


const Page404 = () => {

   const navigate = useNavigate();

   useEffect(() => {
      document.title = 'Страница не найдена - Cinemax';
   }, []);

   const goToMainPage = () => {
      navigate('/');
   }

   return (
      <>
         <Container>
            <Row xlAlignItems="center" lgAlignItems="center" style={{ height: '100vh' }}>
               <Col xl="7" lg="7" md="12" xs="12" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <div>
                     <Styled.PageSlogan>
                        Всё! Кина не&nbsp;будет!
                     </Styled.PageSlogan>
                     <Styled.ErrorType>
                        Страница не&nbsp;найдена :(
                     </Styled.ErrorType>
                     <Styled.Description>
                        Возможно опечатка в&nbsp;адресе или&nbsp;страница была перемещена
                     </Styled.Description>
                     <Styled.PrimaryButton onClick={goToMainPage}>
                        На главную
                     </Styled.PrimaryButton>
                  </div>

               </Col>
               <Col xl="5" lg="5" md="12" xs="12">
                  <Styled.FlexContainer>
                     <Styled.Img src={require(`../../assets/images/Page404/image404.png`)} />
                  </Styled.FlexContainer>
               </Col>
            </Row>
         </Container>
      </>
   )
}

export default Page404;