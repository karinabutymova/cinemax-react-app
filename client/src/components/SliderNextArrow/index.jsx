import React, { useState, useLayoutEffect } from 'react';
import * as Styled from './styled';

import nextArrowIcon from '../../assets/images/Icons/prevArrow.svg';

const SliderNextArrow = (props) => {
   const [top, setTop] = useState();

   useLayoutEffect(() => {
      if (~window.location.href.indexOf("news")) setTop('50%');
   }, []);

   return (
      <>
         <Styled.NextArrow top={top} onClick={props.onClick}>
            <Styled.ArrowIcon src={nextArrowIcon} alt="nextArrow" />
         </Styled.NextArrow>
      </>
   )
}

export default SliderNextArrow;