import React, { useState, useLayoutEffect } from 'react';
import * as Styled from './styled';

import prevArrowIcon from '../../assets/images/Icons/prevArrow.svg';

const SliderPrevArrow = (props) => {
   const [top, setTop] = useState();

   useLayoutEffect(() => {
      if (~window.location.href.indexOf("news")) setTop('50%');
   }, [])

   return (
      <>
         <Styled.PrevArrow top={top} onClick={props.onClick}>
            <Styled.ArrowIcon src={prevArrowIcon} alt="prevArrow" />
         </Styled.PrevArrow>
      </>
   )
}

export default SliderPrevArrow;