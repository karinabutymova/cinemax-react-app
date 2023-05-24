import { createGlobalStyle } from 'styled-components';
import RalewayLight from './assets/fonts/Raleway-Light.ttf';
import RalewayRegular from './assets/fonts/Raleway-Regular.ttf';
import RalewayMedium from './assets/fonts/Raleway-Medium.ttf';
import RalewaySemiBold from './assets/fonts/Raleway-SemiBold.ttf';
import RalewayBold from './assets/fonts/Raleway-Bold.ttf';
import RalewayBlack from './assets/fonts/Raleway-Black.ttf';
import Azonix from './assets/fonts/Azonix.otf';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Raleway';
  src: url(${RalewayLight}) format("truetype");
  font-weight: 300;
}

@font-face {
  font-family: 'Raleway';
  src: url(${RalewayRegular}) format("truetype");
  font-weight: 400;
}

@font-face {
  font-family: 'Raleway';
  src: url(${RalewayMedium}) format("truetype");
  font-weight: 500;
}

@font-face {
  font-family: 'Raleway';
  src: url(${RalewaySemiBold}) format("truetype");
  font-weight: 600;
}

@font-face {
  font-family: 'Raleway';
  src: url(${RalewayBold}) format("truetype");
  font-weight: 700;
}

@font-face {
  font-family: 'Raleway';
  src: url(${RalewayBlack}) format("truetype");
  font-weight: 800;
}

@font-face {
  font-family: 'Azonix';
  src: url(${Azonix}) format("opentype");
  font-weight: 400;
}

*{
   margin: 0;
   padding: 0;
   box-sizing: border-box;

   font-family: 'Raleway';

   background-color: #2D2B35;
   
   color: #FFFFFF;
}

html{
   scroll-behavior: smooth;
}

body{
   overflow-x: hidden;
   & .rnc__base, .rnc__base *{
      background-color: initial;
   }

   & .rnc__notification-content{
      background-color: #2D2B35;
      border-radius: 0 4px 4px 0;
   }
   & .rnc__notification-item--success {
      border-left: 8px solid #8D1BCD;
   }
   & .rnc__notification-item--success .rnc__notification-timer {
    background-color: #8D1BCD;
   }

   & .quill {
      background-color: transparent !important;
      margin-bottom: 12px;
   }
   & .quill *{
      background-color: transparent !important;
   }
   & .ql-editor p{
      color: #2D2B35;
   }

   & .ql-picker-item, 
   & .ql-picker-label{
      color: #2D2B35;
   }

   & .ql-picker-options{
      background-color: #FFFFFF !important;
   }

   & .ql-formats *{
      background-color: #FFFFFF !important;
   }
   & .ql-container{
      min-height: 80px;
   }

   .popup-content{
      background-color: transparent;
      border: 0;

      @media (max-width: 768px) {
         width: 70%;
      }

      @media (max-width: 576px) {
         width: 80%;
      }
   }
}
`;

export const gridTheme = {
   gridColumns: 12,
   col: {
      padding: 16,
   },

   container: {
      padding: 16,
      maxWidth: {
         xxl: 1201,
         xl: 1200,
         // lg: 786,
         // md: 720,
         // sm: 540,
         // xs: 539
      },
   },
};
