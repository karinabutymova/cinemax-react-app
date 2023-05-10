import React, { useState } from 'react';
import * as Styled from './styled';
import { Row, Col } from 'styled-bootstrap-grid';

const BookingSteps = ({ step }) => {
   return (
      <Col xl="9" lg="9" md="12" xs="12">
         <Styled.StepsFlexDiv >
            <Styled.StepDiv id={1} step={step}>
               <Styled.StepNumber>1</Styled.StepNumber>
               <Styled.StepDescriptionDiv>
                  <Styled.StepTitle>Выбор даты и времени</Styled.StepTitle>
                  <Styled.StepCount>Шаг 1 из 3</Styled.StepCount>
               </Styled.StepDescriptionDiv>
            </Styled.StepDiv>
            <Styled.StepDiv id={2} step={step}>
               <Styled.StepNumber>2</Styled.StepNumber>
               <Styled.StepDescriptionDiv>
                  <Styled.StepTitle>Выбор места</Styled.StepTitle>
                  <Styled.StepCount>Шаг 2 из 3</Styled.StepCount>
               </Styled.StepDescriptionDiv>
            </Styled.StepDiv>
            <Styled.StepDiv id={3} step={step}>
               <Styled.StepNumber>3</Styled.StepNumber>
               <Styled.StepDescriptionDiv>
                  <Styled.StepTitle>Оформление</Styled.StepTitle>
                  <Styled.StepCount>Шаг 3 из 3</Styled.StepCount>
               </Styled.StepDescriptionDiv>
            </Styled.StepDiv>
         </Styled.StepsFlexDiv>
      </Col>
   )
}

export default BookingSteps;