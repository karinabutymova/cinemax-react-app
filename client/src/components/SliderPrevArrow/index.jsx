import React, { useState } from 'react';
import * as Styled from './styled';

import prevArrowIcon from '../../assets/images/Icons/prevArrow.svg';

const SliderPrevArrow = (props) => {

   return (
      <>
         <Styled.PrevArrow onClick={props.onClick}>
            <Styled.ArrowIcon src={prevArrowIcon} alt="prevArrow" />
         </Styled.PrevArrow>
      </>
   )
}

export default SliderPrevArrow;