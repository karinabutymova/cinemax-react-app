import styled from "styled-components";

export const MainSection = styled.section`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  padding: 0 10px;
  transition: 0.1s linear;
  z-index: 0;
`;

export const MainScreen = styled.div`
   height: 100vh;

   & *{
      background: transparent;
   }

   @media (max-width: 764px) {
      & .row{
         justify-content: flex-start !important;
      }
   }

`;
