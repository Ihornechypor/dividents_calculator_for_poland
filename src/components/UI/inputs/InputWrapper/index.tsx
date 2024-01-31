import { inputWrapperTypes } from '../../../../types';

export const InputWrapper = ({ text, type, placeholder, value, id, disabled, onChange }: inputWrapperTypes) => {
  return (
    <div>
      <label>
        {text} <br />
        <input type={type} placeholder={placeholder} onChange={onChange} value={value} id={id} disabled={disabled} />
      </label>
    </div>
  );
};
