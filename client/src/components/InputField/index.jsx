import { useState, useEffect } from "react";
import { InputContainer, TextInput, RedTextInput, Label, FilledLabel, ErrorText } from "./styled";


const InputField = ({ ...props }) => {
   const [textInput, setTextInput] = useState('');
   const [textError, setTextError] = useState('');

   useEffect(() => {
      setTextError(props.error);
      if (props.value) setTextInput(props.value);
   }, [props.error]);

   useEffect(() => {
      if (props.value) {
         setTextInput(props.value);
         props.onChange(props.value);
      }
   }, [props.value]);

   // обработка изменений поля ввода
   const handleOnChange = (e) => {
      setTextInput(e.target.value);

      props.onChange(e.target.value);
   }

   return (
      <>
         <InputContainer>
            {textError
               ? <RedTextInput
                  type={props.inputType}
                  value={textInput}
                  id="input"
                  autoComplete="off"
                  placeholder={props.placeholder}
                  required
                  max={props.dateMax}
                  min={props.dateMin}
                  onChange={handleOnChange} />
               : <TextInput
                  type={props.inputType}
                  id="input"
                  value={textInput}
                  autoComplete="off"
                  placeholder={props.placeholder}
                  required
                  max={props.dateMax}
                  min={props.dateMin}
                  onChange={handleOnChange}
               />
            }

            {(() => {
               if (textInput) {
                  if (textError) return <FilledLabel htmlFor="input" inputColor="#EB5757">{props.label}</FilledLabel>
                  else return <FilledLabel htmlFor="input">{props.label}</FilledLabel>
               } else {
                  if (textError) return <Label htmlFor="input" inputColor="#EB5757">{props.label}</Label>
                  else return <Label htmlFor="input">{props.label}</Label>
               }
            })()}

            {textError && <ErrorText>{textError}</ErrorText>}
         </InputContainer>


      </>
   );

}

export default InputField;