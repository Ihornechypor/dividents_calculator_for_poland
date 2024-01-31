import { useEffect, useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { percentToDecimal } from '../../helpers/percentToDecimal';
import {
  dividendDataSateTypes,
  inputTypes,
  dateFormatTypes,
  apiDataTypes,
  dividendsReportTypes,
  resultTableTypes,
} from '../../types';
import { isAllDataFilled } from '../../helpers/isAllDataFilled';
import { POLAND_TAX_RATE, API_DATE_FORMAT, TO_FIXED_VALUE } from '../../consts';
import { getCurrecyRate } from '../../api/getCurrencyRate';
import { reformatDate } from '../../helpers/reformatDate';
import { updateSubDays } from '../../helpers/updateSubDays';
import { initialDividendState, dividendsReportState } from '../../initialStates';
import { minusDay } from '../../helpers/minusDay';
import { nanoid } from 'nanoid';
import { ResultTable } from '../ResultTable';
import { ResultTotal } from '../ResultTotal';

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ...initialDividendState,
  });
  const [dividendCalculated, setDividendCalculated] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dividendsReport, setDividendsReport] = useState<dividendsReportTypes>({ ...dividendsReportState });
  const [dividendsTotal, setDividendsTotal] = useState<resultTableTypes[]>([]);

  const handleDividentData = (e?: inputTypes, date?: dateFormatTypes) => {
    e &&
      setDividendData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    date && setDividendData((prev) => ({ ...prev, date }));
  };

  const handleDividendCalculations = (data: apiDataTypes) => {
    const taxNumToPercent = percentToDecimal(dividendData.tax);
    const taxBasePercents = taxNumToPercent >= POLAND_TAX_RATE;

    const taxBaseLocal = dividendData.ammount * data.currencyRate;
    const taxLocal = taxBaseLocal * POLAND_TAX_RATE;
    const taxPaidLocal = taxBaseLocal * taxNumToPercent;
    const taxNeedToPayLocal = taxNumToPercent >= POLAND_TAX_RATE ? 0 : taxLocal - taxPaidLocal;

    const taxAmmountLocal = dividendData.ammount * POLAND_TAX_RATE;
    const taxAmmountForeignPaid = dividendData.ammount * taxNumToPercent;
    const taxAmmountForeignToPay = taxNumToPercent >= POLAND_TAX_RATE ? 0 : taxAmmountLocal - taxAmmountForeignPaid;

    const taxTotal: resultTableTypes = {
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
    const totalTax = dividendsTotal.reduce((sum, item) => sum + item.taxLocal, 0).toFixed(TO_FIXED_VALUE);
    const totalTaxPaid = dividendsTotal.reduce((sum, item) => sum + item.taxPaidLocal, 0).toFixed(TO_FIXED_VALUE);
    const totalNeedToPay = dividendsTotal
      .reduce((sum, item) => sum + item.taxNeedToPayLocal, 0)
      .toFixed(TO_FIXED_VALUE);
    console.log(totalTax);
    setDividendsReport({ totalTax, totalTaxPaid, totalNeedToPay });
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

  const handleRemove = (id: string) => {
    setDividendsTotal((prev) => prev.filter((item) => item.id !== id));
    setDividendCalculated(false);
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
          <button disabled={isFetching || isAllDataFilled(dividendData) || dividendCalculated}>
            Calculate divident
          </button>
        </div>
      </form>
      <button onClick={handleReset} disabled={!dividendCalculated}>
        Add new dividend
      </button>

      <ResultTotal dividendsReport={dividendsReport} />
      <ResultTable dividendsTotal={dividendsTotal} handleRemove={handleRemove} />
    </Styled.ControllerBox>
  );
};
