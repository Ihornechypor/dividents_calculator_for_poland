import { useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Controller = () => {
  const [value, setValue] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const setDate = (date: Date | null) => {
    console.log(date);

    date && setStartDate(date);
  };

  return (
    <Styled.ControllerBox>
      <h1>This tool will help you to calculate dividents</h1>
      <div>
        <label>
          Divident ammount <br />
          <input type="number" placeholder="ammount" />
        </label>
      </div>
      <div>
        <select name="currency" id="">
          <option>chose currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div>
        <p>Set divident payment day</p>
        <DatePicker selected={startDate} onChange={setDate} />
      </div>
      <div>{value}</div>
    </Styled.ControllerBox>
  );
};
