import styled from "styled-components";

export const InputContainer = styled.div`
   width: 386px;
   position: relative;

   background-color: #FFFFFF;
   margin-bottom: 16px;

   @media screen and (max-width: 576px){
      width: 100%;
   }
`;

export const Label = styled.label`
   position: absolute;
   left: 16px;
   top: 16px;

   background-color: #FFFFFF;
   transition: all 0.25s;
   padding: 0 2px;
   z-index: 1;
   
   color: ${props => props.inputColor || "#2D2B35"};

   &::before{
      content: "";
      height: 6px;
      position: absolute;
      left: 0;
      top: 10px;
      width: 100%;
      z-index: -1;
   }
`;

export const TextInput = styled.input`
   width: 100%;
   height: 48px;
   padding: 16px;

   background-color: #FFFFFF;
   color: #2D2B35;

   border: 1px solid #BDBDBD;
   border-radius: 4px;

   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;
   outline: none;
   transition: all 0.25s;
   
   &:focus{
      border: 1px solid #8D1BCD;
   }
   
   &:focus + ${Label}{
      top:-10px;
      font-size: 16px;

      color: #8D1BCD;
   }

   &::placeholder{
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      opacity: 0;
      transition: all 0.25s;
   }
   &:focus::placeholder{
      opacity: 1;
   }
`;

export const RedTextInput = styled(TextInput)`
   border: 1px solid #EB5757;

   &:focus{
       border: 1px solid #EB5757;
   }
`;

export const FilledLabel = styled(Label)`
   top:-10px;
   font-size: 16px;

   color: ${props => props.inputColor || "#2D2B35"};
`;

export const ErrorText = styled.p`
   font-style: normal;
   font-weight: 500;
   font-size: 12px;
   line-height: 14px;

   width:100%;

   color: #EB5757;
   background-color: #FFFFFF;
   padding: 0;
   margin-top: 4px;
`;

