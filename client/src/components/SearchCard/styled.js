import styled from "styled-components";

export const ImgContainer = styled.div`
   max-width: 185px;
   max-height: 128px;

   border-radius: 8px;

   overflow: hidden;
`;

export const Flex = styled.div`
   display: flex;
   flex-direction: column;
`;

export const FilmTitle = styled.p`
   font-style: normal;
   font-weight: 600;
   font-size: 18px;
   line-height: 19px;

   color: #FFFFFF;

   margin-bottom: 8px;
`;

export const FilmGenre = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 15px;

   color: #A7A7A7;

   margin-bottom: 16px;
`;

export const Img = styled.img`
   width: 100%;

   object-fit: cover;

   transform: scale(1.3, 1.3) translateY(15px);
   transition: all 0.35s;
`;


export const CardContainer = styled.div`
   width: 100%;
   display: flex;
   gap: 20px; 

   margin-bottom: 16px;

   align-items: center;

   &:hover{
      cursor: pointer;
   }

   &:hover ${Img} {
      transform: scale(1.4, 1.4) translateY(15px);
   }
`;

export const SoonDate = styled.p`
   font-style: normal;
   font-weight: 300;
   font-size: 14px;
   line-height: 14px;
   
   font-variant: small-caps;
   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #828282;
`;