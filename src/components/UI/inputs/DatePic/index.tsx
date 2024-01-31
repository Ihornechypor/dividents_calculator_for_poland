import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicTypes } from '../../../../types';
import * as Styled from '../inputCommonStyles';

export const DatePic = ({ label, selected, onChange, maxDate, disabled }: DatePicTypes) => (
  <Styled.InputWrapper {...(disabled ? { notActive: disabled } : {})}>
    <span>{label}</span>
    <DatePicker
      selected={selected}
      onChange={onChange}
      maxDate={maxDate}
      disabled={disabled}
      shouldCloseOnSelect={true}
    />
  </Styled.InputWrapper>
);
