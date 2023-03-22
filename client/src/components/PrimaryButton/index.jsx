import {Button} from './styled';

const PrimaryButton = ({width, btnText, type}) => {
   return(
      <>
         <Button width={width} type={type} >{btnText}</Button>
      </>
   );
}

export default PrimaryButton;