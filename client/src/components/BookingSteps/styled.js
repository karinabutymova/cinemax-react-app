import styled from "styled-components";

export const StepsFlexDiv = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   height: 72px;

   margin-bottom: 64px;
`;

export const StepDiv = styled.div`
   width: 100%;
   display: flex;
   gap: 8px;
   align-items: center;
   padding: 24px 8px;

   position: relative;

   transition: all 0.25s;
   opacity: ${props => props.step === props.id ? '1' : '0.5'};

   &::after{
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      bottom: 0;
      background-color: #8D1BCD;
      display: block;
      opacity: ${props => props.step === props.id ? '1' : '0'};
   }
`;

export const StepNumber = styled.div`
   width: 34px;
   height: 34px;
   background: #616161;
   border-radius: 8px;

   text-align: center;

   font-style: normal;
   font-weight: 700;
   font-size: 16px;
   line-height: 34px;
    font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;
`;

export const StepDescriptionDiv = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
`;

export const StepTitle = styled.p`
   padding: 0;

   font-style: normal;
   font-weight: 700;
   font-size: 16px;
   line-height: 19px;

   color: #FFFFFF;
`;

export const StepCount = styled.p`
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;

   font-feature-settings: 'pnum' on, 'lnum' on;

   color: #FFFFFF;

`;