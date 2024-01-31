import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePic = ({ label, selected, onChange, maxDate, disabled }: any) => (
  <label>
    {label} <br />
    <DatePicker selected={selected} onChange={onChange} maxDate={maxDate} disabled={disabled} />
  </label>
);
