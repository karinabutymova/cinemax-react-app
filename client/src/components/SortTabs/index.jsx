import React, { useState } from 'react';
import * as Styled from './styled';

import sortIcon from '../../assets/images/Icons/trending-up.svg';

const SortTabs = ({ ...props }) => {
   const [active, SetActive] = useState(props.activeId);


   const doClick = (index) => {
      if (index !== active) {
         SetActive(index);
         props.setActiveSort(index);
         props.searchParams.set('sort', index);
         props.setSearchParams(props.searchParams);
         props.sortPosters();
      }
   }

   return (
      <>
         <Styled.FlexContainer>
            <Styled.SortTitleDiv>
               <Styled.SortIcon src={sortIcon} />
               <Styled.SortTitle>Показывать сначала:</Styled.SortTitle>
            </Styled.SortTitleDiv>
            <Styled.SortTabsDiv>
               <Styled.SorOption
                  active={active === 'bestRate' && true}
                  onClick={() => doClick('bestRate')}>
                  Лучший рейтинг
               </Styled.SorOption>
               <Styled.SorOption
                  active={active === 'new' && true}
                  onClick={() => doClick('new')}>
                  Новинки
               </Styled.SorOption>
               <Styled.SorOption
                  active={active === 'forKids' && true}
                  onClick={() => doClick('forKids')}>
                  Детям
               </Styled.SorOption>
            </Styled.SortTabsDiv>
         </Styled.FlexContainer>
      </>
   )
}

export default SortTabs;