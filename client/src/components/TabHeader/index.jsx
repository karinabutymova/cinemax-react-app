import React, { useState } from 'react';
import * as Styled from './styled';

const TabHeader = ({ ...props }) => {
   const [active, SetActive] = useState(props.activeId);

   const doClick = (index) => {
      if (index !== active) {
         SetActive(index);
         props.setActiveTab(index);
         props.searchParams.set('filter', index);
         props.setSearchParams(props.searchParams);
      }
   }

   return (
      <>
         <Styled.TabsHeader className="tabs-header">
            <Styled.TabsLi>
               <Styled.LinkTab
                  active={active === 'now' && true}
                  onClick={() => doClick('now')} >
                  <Styled.Span>Сейчас в прокате</Styled.Span>
               </Styled.LinkTab>
            </Styled.TabsLi>
            <Styled.TabsLi>
               <Styled.LinkTab
                  active={active === 'soon' && true}
                  onClick={() => doClick('soon')} >
                  <Styled.Span>Скоро</Styled.Span>
               </Styled.LinkTab>
            </Styled.TabsLi>
            {/* <Styled.TabsLi>
               <Styled.LinkTab 
                  active={(active === 'pickup' ? 'active' : '')}
                  onClick={() => doClick('pickup')} >
                  <Styled.Span>Подобрать фильм</Styled.Span>
               </Styled.LinkTab>
            </Styled.TabsLi> */}
         </Styled.TabsHeader>
      </>
   )
}

export default TabHeader;