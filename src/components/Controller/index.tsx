import { useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { percentToDecimal } from '../../helpers/percentToDecimal';
import { dividendDataSateTypes } from '../../types';
import { isAllDataFilled } from '../../helpers/isAllDataFilled';

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ammount: 0,
    tax: 0,
    date: null,
    currency: 'USD',
  });

  const handleDividendValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDividendData((prev) => ({ ...prev, ammount: +e.target.value }));
  };

  const handleDividentTax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDividendData((prev) => ({ ...prev, tax: percentToDecimal(e.target.value) }));
  };

  const handleDividendCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDividendData((prev) => ({ ...prev, currency: e.target.value }));
  };

  const handleDividendDate = (date: Date | null) => {
    date && setDividendData((prev) => ({ ...prev, date }));
  };

  const handleTaxCalucation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isAllDataFilled(dividendData));
  };

  return (
    <Styled.ControllerBox>
      <h1>This tool will help you to calculate dividents</h1>
      <form onSubmit={handleTaxCalucation}>
        <div>
          <label>
            Divident ammount <br />
            <input type="number" placeholder="ammount" onChange={handleDividendValue} />
          </label>
        </div>
        <div>
          <label>
            Divident tax in %<br />
            <input type="number" placeholder="ammount" onChange={handleDividentTax} />
          </label>
        </div>
        <div>
          <select name="currency" id="" onChange={handleDividendCurrency}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <p>Set divident payment day</p>
          <DatePicker selected={dividendData.date} onChange={handleDividendDate} />
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
