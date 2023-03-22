import { useState, useEffect } from "react";
import { InputContainer, TextInput, RedTextInput, Label, FilledLabel, ErrorText } from "./styled";


const InputField = ({...props}) =>{
   const [textInput, setTextInput] = useState('');
   const [textError, setTextError] = useState('');

   useEffect(() => {
      setTextError(props.error);
   }, [props.error]);

   // обработка изменений поля ввода
   const handleOnChange = (e) => {
      setTextInput(e.target.value);

      // TODO: что то с этим надо решить
      if(props.setLastName) props.setLastName(e.target.value);
      if(props.setFirstName) props.setFirstName(e.target.value);
      if(props.setEmail) props.setEmail(e.target.value);
      if(props.setPassword) props.setPassword(e.target.value);
      if(props.setConfPassword) props.setConfPassword(e.target.value);
   }

   return(
      <>
         <InputContainer>
            {textError 
               ?  <RedTextInput                   
                  type={props.inputType}
                  value={textInput}
                  id="input"
                  autoComplete="off"
                  placeholder={props.placeholder}
                  required
                  onChange={handleOnChange} />
               : <TextInput                   
                  type={props.inputType}
                  id="input"
                  value={textInput}
                  autoComplete="off"
                  placeholder={props.placeholder}
                  required
                  onChange={handleOnChange} />
            }
            
            {(() =>{
               if (textInput) {
                  if(textError) return <FilledLabel for="input" inputColor="#EB5757">{props.label}</FilledLabel> 
                  else return <FilledLabel for="input">{props.label}</FilledLabel>
               }else{
                  if(textError) return <Label for="input" inputColor="#EB5757">{props.label}</Label>
                  else return <Label for="input">{props.label}</Label>
               }
            })()}

            {textError && <ErrorText>{textError}</ErrorText>}
         </InputContainer>
      </>
   );

}

export default InputField;