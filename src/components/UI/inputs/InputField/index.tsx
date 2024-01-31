import { inputWrapperTypes } from '../../../../types';
import * as Styled from '../inputCommonStyles';

export const InputField = ({ text, type, placeholder, value, id, disabled, onChange }: inputWrapperTypes) => {
  return (
    <Styled.InputWrapper {...(disabled ? { notActive: disabled } : {})}>
      <label>
        {text} <br />
        <input type={type} placeholder={placeholder} onChange={onChange} value={value} id={id} disabled={disabled} />
      </label>
    </Styled.InputWrapper>
  );
};
