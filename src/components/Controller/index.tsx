import { useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { percentToDecimal } from '../../helpers/percentToDecimal';
import { dividendDataSateTypes, inputTypes, dateFormat, apiData } from '../../types';
import { isAllDataFilled } from '../../helpers/isAllDataFilled';
import { POLAND_TAX_RATE, API_DATE_FORMAT, TO_FIXED_VALUE } from '../../consts';
import { getCurrecyRate } from '../../api/getCurrencyRate';
import { reformatDate } from '../../helpers/reformatDate';
import { updateSubDays } from '../../helpers/updateSubDays';
import { minusDay } from '../../helpers/minusDay';
import { nanoid } from 'nanoid';

const initialDividendState = {
  id: nanoid(),
  company: '',
  ammount: 0,
  tax: 0,
  date: null,
  currency: 'usd',
};

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ...initialDividendState,
  });
  const [dividendCalculated, setDividendCalculated] = useState<boolean>(false);
  const [dividendsTotal, setDividendsTotal] = useState<any[]>([]);

  const handleDividentData = (e?: inputTypes, date?: dateFormat) => {
    e &&
      setDividendData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    date && setDividendData((prev) => ({ ...prev, date }));
  };

  const handleDividendCalculations = (data: apiData) => {
    const taxNumToPercent = percentToDecimal(dividendData.tax);
    const taxHigherThenForeig = taxNumToPercent >= POLAND_TAX_RATE;

    const taxBaseLocal = dividendData.ammount * data.currencyRate;
    const taxAmmountLocal = dividendData.ammount * POLAND_TAX_RATE;

    const taxAmmountForeignPaid = taxHigherThenForeig ? 0 : dividendData.ammount * taxNumToPercent;
    const taxAmmountForeignToPay = taxHigherThenForeig ? 0 : taxAmmountLocal - taxAmmountForeignPaid;
    const taxNeedToRepay = taxHigherThenForeig ? 0 : taxAmmountForeignToPay * data.currencyRate;
    const taxNeedToRepayFixed = taxHigherThenForeig ? 0 : taxNeedToRepay.toFixed(TO_FIXED_VALUE);
    // const

    const taxTodal = {
      ...dividendData,
      ...data,
      taxBaseLocal,
      taxAmmountLocal,
      taxAmmountForeignPaid,
      taxAmmountForeignToPay,
      taxNeedToRepayFixed,
    };

    console.log(taxTodal);

    setDividendsTotal(() => {
      return [{ ...taxTodal }];
    });
  };

  const fetchData = async (): Promise<void> => {
    let currentDate = minusDay(dividendData.date, 1);
    let retryCount = 0;
    while (retryCount < 10) {
      try {
        const data = await getCurrecyRate(currentDate, dividendData.currency);

        if (data.currencyDate) {
          setDividendCalculated(true);
          handleDividendCalculations(data);
          break;
        } else {
          console.error('Empty or invalid API response');
        }
      } catch (error) {
        console.log(currentDate);
        const subDay = updateSubDays(currentDate, API_DATE_FORMAT, 1);
        currentDate = subDay && reformatDate(subDay, API_DATE_FORMAT);

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
  };

  return (
    <Styled.ControllerBox>
      <form onSubmit={handleTaxCalucation}>
        <div>
          <label>
            Divident company <br />
            <input
              type="text"
              placeholder="Divident company"
              onChange={handleDividentData}
              value={dividendData.company}
              id="company"
              disabled={dividendCalculated}
            />
          </label>
        </div>
        <div>
          <label>
            Divident ammount <br />
            <input
              type="number"
              placeholder="ammount"
              onChange={handleDividentData}
              value={dividendData.ammount}
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
              value={dividendData.tax}
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
          <button disabled={isAllDataFilled(dividendData) || dividendCalculated}>
            calculate and add divident to pay
          </button>
        </div>
      </form>
      <button onClick={handleReset} disabled={!dividendCalculated}>
        Reset form
      </button>
      <br />
      <div style={{ border: '1px solid red', padding: 20 }}>
        <div>
          <p>Data</p>
        </div>
        <div>
          <table cellPadding={2} border={2}>
            <thead>
              <tr>
                <th>Company name</th>
                <th>Divident price in foreign currency</th>
                <th>Currency</th>
                <th>Foreign tax</th>
                <th>Divident date</th>
                <th>Local currency date</th>
                <th>Local currency rate (PLN)</th>
                <th>Local tax base (PLN)</th>
                <th>Local tax ammount (Foreign currecy)</th>
                <th>Foreign tax payed (Foreign currecy)</th>
                <th>Foreign taxt need to pay (Foreign currecy)</th>
                <th>Local taxt need to pay (PLN)</th>
              </tr>
            </thead>
            <tbody>
              {dividendsTotal.length > 0
                ? dividendsTotal.map((item) => (
                    <tr key={item.id}>
                      <td>{item.company}</td>
                      <td>{item.ammount}</td>
                      <td>{item.currency}</td>
                      <td>{item.tax}</td>
                      <td>{reformatDate(item.date, API_DATE_FORMAT)}</td>
                      <td>{item.currencyDate}</td>
                      <td>{item.currencyRate}</td>
                      <td>{item.taxBaseLocal}</td>
                      <td>{item.taxAmmountLocal}</td>
                      <td>{item.taxAmmountForeignPaid}</td>
                      <td>{item.taxAmmountForeignToPay}</td>
                      <td>{item.taxNeedToRepayFixed}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </Styled.ControllerBox>
  );
};
