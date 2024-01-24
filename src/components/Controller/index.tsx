import { useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { percentToDecimal } from '../../helpers/percentToDecimal';
import { dividendDataSateTypes, inputTypes, dateFormat, apiDate } from '../../types';
import { isAllDataFilled } from '../../helpers/isAllDataFilled';
import { API_DATE_FORMAT } from '../../consts';
import { getCurrecyRate } from '../../api/getCurrencyRate';
import { reformatDate } from '../../helpers/reformatDate';
import { updateSubDays } from '../../helpers/updateSubDays';
import { minusDay } from '../../helpers/minusDay';

const initialDividendState = {
  ammount: 0,
  tax: 0,
  date: null,
  currency: 'usd',
};

const initialDividendCurrencyData = { currencyDate: null, currencyRate: 0 };

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ...initialDividendState,
  });

  const [dividendCurrencyData, setDividendCurrencyData] = useState<apiDate>({ ...initialDividendCurrencyData });
  const [dividendCalculated, setDividendCalculated] = useState<boolean>(false);

  const handleDividentData = (e?: inputTypes, date?: dateFormat) => {
    e &&
      setDividendData((prev) => ({
        ...prev,
        [e.target.id]: e.target.id === 'tax' ? percentToDecimal(e.target.value) : e.target.value,
      }));
    date && setDividendData((prev) => ({ ...prev, date }));
  };

  const fetchData = async (): Promise<void> => {
    let currentDate = minusDay(dividendData.date, 1);
    let retryCount = 0;
    while (retryCount < 10) {
      try {
        const data = await getCurrecyRate(currentDate, dividendData.currency);

        if (data.currencyDate) {
          setDividendCurrencyData(data);
          setDividendCalculated(true);
          break;
        } else {
          console.error('Empty or invalid API response');
        }
      } catch (error) {
        console.log(currentDate);
        const subDay = updateSubDays(currentDate, API_DATE_FORMAT, 1);
        currentDate = reformatDate(subDay, API_DATE_FORMAT);

        retryCount += 1;
      }
    }
  };

  const handleTaxCalucation = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleReset = () => {
    setDividendCalculated(false);
    setDividendData(initialDividendState);
    setDividendCurrencyData(initialDividendCurrencyData);
  };

  return (
    <Styled.ControllerBox>
      <form onSubmit={handleTaxCalucation}>
        <div>
          <label>
            Divident ammount <br />
            <input
              type="number"
              placeholder="ammount"
              onChange={handleDividentData}
              id="ammount"
              disabled={dividendCalculated}
            />
          </label>
        </div>
        <div>
          <label>
            Divident tax in %<br />
            <input
              type="number"
              placeholder="ammount"
              onChange={handleDividentData}
              id="tax"
              disabled={dividendCalculated}
            />
          </label>
        </div>
        <div>
          <p>Currency</p>
          <select name="currency" onChange={handleDividentData} id="date" disabled={dividendCalculated}>
            <option value="usd">usd</option>
            <option value="eur">eur</option>
          </select>
        </div>
        <div>
          <p>Set divident payment day</p>
          <DatePicker
            selected={dividendData.date}
            onChange={(date) => handleDividentData(null, date)}
            disabled={dividendCalculated}
          />
        </div>
        <div>
          <button disabled={isAllDataFilled(dividendData)}>calculate and add divident to pay</button>
        </div>
      </form>
      <button onClick={handleReset} disabled={!dividendCalculated}>
        Reset form
      </button>
      <br />
      <div style={{ border: '1px solid red', padding: 20 }}>
        <div>
          <p>data you provided</p>
        </div>
        <div>
          {Object.entries(dividendData).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
          {Object.entries(dividendCurrencyData).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
        </div>
      </div>
    </Styled.ControllerBox>
  );
};
