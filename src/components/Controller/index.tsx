import { useEffect, useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { percentToDecimal } from '../../helpers/percentToDecimal';
import { dividendDataSateTypes, inputTypes, dateFormat, apiData, dividendsReportTypes } from '../../types';
import { isAllDataFilled } from '../../helpers/isAllDataFilled';
import { POLAND_TAX_RATE, API_DATE_FORMAT, TO_FIXED_VALUE } from '../../consts';
import { getCurrecyRate } from '../../api/getCurrencyRate';
import { reformatDate } from '../../helpers/reformatDate';
import { updateSubDays } from '../../helpers/updateSubDays';
import { minusDay } from '../../helpers/minusDay';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

const initialDividendState = {
  company: '',
  ammount: 0,
  tax: 15,
  date: null,
  currency: 'usd',
};

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ...initialDividendState,
  });
  const [dividendCalculated, setDividendCalculated] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dividendsTotal, setDividendsTotal] = useState<any[]>([]);
  const [dividendsReport, setDividendsReport] = useState<dividendsReportTypes>({
    totalTax: 0,
    totalTaxPaid: 0,
    totalNeedToPay: 0,
  });

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
    const taxBasePercents = taxNumToPercent >= POLAND_TAX_RATE;

    const taxBaseLocal = dividendData.ammount * data.currencyRate;
    const taxLocal = taxBaseLocal * POLAND_TAX_RATE;
    const taxPaidLocal = taxBaseLocal * taxNumToPercent;
    const taxNeedToPayLocal = taxNumToPercent >= POLAND_TAX_RATE ? 0 : taxLocal - taxPaidLocal;

    const taxAmmountLocal = dividendData.ammount * POLAND_TAX_RATE;
    const taxAmmountForeignPaid = dividendData.ammount * taxNumToPercent;
    const taxAmmountForeignToPay = taxNumToPercent >= POLAND_TAX_RATE ? 0 : taxAmmountLocal - taxAmmountForeignPaid;

    const taxTotal = {
      id: nanoid(),
      ...dividendData,
      ...data,
      taxBasePercents,
      taxBaseLocal,
      taxLocal,
      taxPaidLocal,
      taxNeedToPayLocal,
      taxAmmountLocal,
      taxAmmountForeignPaid,
      taxAmmountForeignToPay,
    };

    setDividendsTotal((prev) => {
      return [...prev, { ...taxTotal }];
    });
  };

  useEffect(() => {
    console.log(dividendsTotal);
  }, [dividendsTotal]);

  const fetchData = async (): Promise<void> => {
    let currentDate = minusDay(dividendData.date, 1);
    let retryCount = 0;
    while (retryCount < 10) {
      try {
        const data = await getCurrecyRate(currentDate, dividendData.currency);

        if (data.currencyDate) {
          setDividendCalculated(true);
          handleDividendCalculations(data);
          setIsFetching(false);
          break;
        } else {
          console.error('Empty or invalid API response');
        }
      } catch (error) {
        const subDay = updateSubDays(currentDate, API_DATE_FORMAT, 1);
        currentDate = subDay && reformatDate(subDay, API_DATE_FORMAT);

        retryCount += 1;
      }
    }
  };

  const handleTaxCalucation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);
    fetchData();
  };

  const handleReset = () => {
    setIsFetching(false);
    setDividendCalculated(false);
    setDividendData(initialDividendState);
  };

  const handleRemove = (id: string) => setDividendsTotal((prev) => prev.filter((item) => item.id !== id));

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
          <button disabled={isFetching || isAllDataFilled(dividendData) || dividendCalculated}>
            Calculate divident
          </button>
        </div>
      </form>
      <button onClick={handleReset} disabled={!dividendCalculated}>
        Add new dividend
      </button>
      <br />

      <div>
        <p>Total</p>
        <ul>
          <li>Dividend tax (Line 45 in PIT-38) {dividendsReport.totalTax}</li>
          <li>Tax paid in foreign country (Line 46 in PIT-38) {dividendsReport.totalTaxPaid}</li>
          <li>Tax you need to aditionally pay (Line 47 in PIT-38) {dividendsReport.totalNeedToPay}</li>
        </ul>
      </div>
      <div style={{ border: '1px solid red', padding: 20 }}>
        <div>
          <p>Data</p>
        </div>
        <div>
          <table cellPadding={2} border={2}>
            <thead>
              <tr>
                <th>Company name</th>
                <th>Divident date</th>
                <th>Currency</th>
                <th>Local currency date (PLN)</th>
                <th>Local currency rate (PLN)</th>
                <th>Divident price (Foreign currecy)</th>
                <th>Foreign tax</th>
                <th>Local tax base (PLN)</th>
                <th>Local tax (PLN)</th>
                <th>Local tax Paid (PLN)</th>
                <th>Local need to pay (PLN)</th>
                <th>Local tax ammount (Foreign currecy)</th>
                <th>Foreign tax payed (Foreign currecy)</th>
                <th colSpan={2}>Foreign taxt need to pay (Foreign currecy)</th>
              </tr>
            </thead>
            <tbody>
              {dividendsTotal.length > 0
                ? dividendsTotal.map((item) => (
                    <tr key={item.id} style={{ backgroundColor: `${item.taxBasePercents ? 'orange' : 'transparent'}` }}>
                      <td>{item.company}</td>
                      <td>{reformatDate(item.date, API_DATE_FORMAT)}</td>
                      <td>{item.currency}</td>
                      <td>{item.currencyDate}</td>
                      <td>{item.currencyRate}</td>
                      <td>{item.ammount}</td>
                      <td>
                        {item.tax}% (real taxt percent {item.taxBasePercents ? POLAND_TAX_RATE : '15'}%)
                      </td>
                      <td>{item.taxBaseLocal.toFixed(TO_FIXED_VALUE)}</td>
                      <td>{item.taxLocal.toFixed(TO_FIXED_VALUE)}</td>
                      <td>{item.taxPaidLocal.toFixed(TO_FIXED_VALUE)}</td>
                      <td>{item.taxNeedToPayLocal.toFixed(TO_FIXED_VALUE)}</td>
                      <td>{item.taxAmmountLocal.toFixed(TO_FIXED_VALUE)}</td>
                      <td>{item.taxAmmountForeignPaid.toFixed(TO_FIXED_VALUE)}</td>
                      <td>{item.taxAmmountForeignToPay.toFixed(TO_FIXED_VALUE)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button onClick={() => handleRemove(item.id)}>X</button>
                      </td>
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
