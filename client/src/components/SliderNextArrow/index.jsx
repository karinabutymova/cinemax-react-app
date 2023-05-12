import React from 'react';
import * as Styled from './styled';

import nextArrowIcon from '../../assets/images/Icons/prevArrow.svg';

const SliderNextArrow = (props) => {

   return (
      <>
         <Styled.NextArrow onClick={props.onClick}>
            <Styled.ArrowIcon src={nextArrowIcon} alt="nextArrow" />
         </Styled.NextArrow>
      </>
   )
}

export default SliderNextArrow;