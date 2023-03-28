import React, { useState } from 'react';
import * as Styled from './styled';
 
const TabHeader = ({...props}) => {
   const[active, SetActive] = useState(props.activeId);

   const doClick = (index) => {
      if(index !== active){
         SetActive(index);
         props.setActiveTab(index);
         props.setSearchParams({filter: index});
      }
   }

   return (
      <>
         <Styled.TabsHeader className="tabs-header">
            <Styled.TabsLi>
               <Styled.LinkTab 
                active={(active === 'now' ? 'active' : '')}
                onClick={() => doClick('now')} >
                  <Styled.Span>Сейчас в прокате</Styled.Span>
               </Styled.LinkTab>
            </Styled.TabsLi>
            <Styled.TabsLi>
               <Styled.LinkTab 
                  active={(active === 'soon' ? 'active' : '')}
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