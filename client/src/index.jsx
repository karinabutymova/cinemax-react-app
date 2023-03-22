import React from 'react';
import ReactDOM from 'react-dom/client';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import {GlobalStyle, gridTheme} from './styled';
import App from './pages/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <>
         <GridThemeProvider gridTheme={gridTheme}>
            <GlobalStyle />
               <App />
         </GridThemeProvider> 
      </>
   </React.StrictMode>
);
