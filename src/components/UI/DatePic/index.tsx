import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicTypes } from '../../../types';

export const DatePic = ({ label, selected, onChange, maxDate, disabled }: DatePicTypes) => (
  <div>
    <p>{label}</p>
    <DatePicker
      selected={selected}
      onChange={onChange}
      maxDate={maxDate}
      disabled={disabled}
      shouldCloseOnSelect={true}
    />
  </div>
);
