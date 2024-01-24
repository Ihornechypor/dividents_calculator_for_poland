import { useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { percentToDecimal } from '../../helpers/percentToDecimal';
import { dividendDataSateTypes, inputTypes, inputDate } from '../../types';
import { isAllDataFilled } from '../../helpers/isAllDataFilled';

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ammount: 0,
    tax: 0,
    date: null,
    currency: 'USD',
  });

  const handleDividentData = (e?: inputTypes, date?: inputDate) => {
    e &&
      setDividendData((prev) => ({
        ...prev,
        [e.target.id]: e.target.id === 'tax' ? percentToDecimal(e.target.value) : e.target.value,
      }));
    date && setDividendData((prev) => ({ ...prev, date }));
  };

  const handleTaxCalucation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isAllDataFilled(dividendData));
  };

  return (
    <Styled.ControllerBox>
      <h1>This tool will help you to calculate dividents for Poland tax form</h1>
      <form onSubmit={handleTaxCalucation}>
        <div>
          <label>
            Divident ammount <br />
            <input type="number" placeholder="ammount" onChange={handleDividentData} id="ammount" />
          </label>
        </div>
        <div>
          <label>
            Divident tax in %<br />
            <input type="number" placeholder="ammount" onChange={handleDividentData} id="tax" />
          </label>
        </div>
        <div>
          <select name="currency" onChange={handleDividentData} id="date">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <p>Set divident payment day</p>
          <DatePicker selected={dividendData.date} onChange={(date) => handleDividentData(null, date)} />
        </div>
        <div>
          <button disabled={isAllDataFilled(dividendData)}>calculate divident to pay</button>
        </div>
      </form>
      <div style={{ border: '1px solid red', padding: 20 }}>
        <div>{dividendData.ammount}</div>
        <div>{dividendData.tax}</div>
        <div>{dividendData.date && dividendData.date.toLocaleDateString()}</div>
        <div>{dividendData.currency}</div>
      </div>
    </Styled.ControllerBox>
  );
};
