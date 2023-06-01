import { useRef, useState } from "react";
import './style.css';

import arrowIcon from '../../assets/images/Icons/chevron-left.svg';

const AccordionItem = (props) => {
   const contentEl = useRef(null);
   const { handleToggle, active, faq } = props;
   const { header, id, text } = faq;

   return (
      <>
         <div style={{ marginBottom: '16px' }}>
            <header
               className={active === id ? "active" : ""} onClick={() => handleToggle(id)}>
               <h2>{header}</h2>
               <span><img src={arrowIcon} alt="chevron-left.svg" /></span>
            </header>
            <div
               ref={contentEl}
               className={`collapse ${active === id ? "show" : ""}`}
               style={active === id ? { height: contentEl.current.scrollHeight + 20 } : { height: "0px" }}>
               <p>{text}</p>
            </div >
         </div>
      </>
   );
};

export default AccordionItem;
