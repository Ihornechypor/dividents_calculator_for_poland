import { inputSectionTypes } from '../../../../types';
import * as Styled from '../inputCommonStyles';

export const InputSelect = ({ text, name, id, disabled, onChange, options }: inputSectionTypes) => {
  return (
    <Styled.InputWrapper {...(disabled ? { notActive: disabled } : {})}>
      <span>{text}</span>
      <select name={name} onChange={onChange} id={id} disabled={disabled}>
        {options.map((item) => (
          <option value={item.value} key={item.text}>
            {item.text}
          </option>
        ))}
      </select>
    </Styled.InputWrapper>
  );
};
