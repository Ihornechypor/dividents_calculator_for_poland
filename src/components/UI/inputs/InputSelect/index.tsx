import { inputSectionTypes } from '../../../../types';

export const InputSelect = ({ text, name, id, disabled, onChange, options }: inputSectionTypes) => {
  return (
    <div>
      <p>{text}</p>
      <select name={name} onChange={onChange} id={id} disabled={disabled}>
        {options.map((item) => (
          <option value={item.value} key={item.text}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};
