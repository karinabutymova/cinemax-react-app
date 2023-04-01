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
body{
   overflow-x: hidden;
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
