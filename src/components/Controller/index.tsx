import { useEffect, useState } from 'react';
import * as Styled from './controller.styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  dividendDataSateTypes,
  inputTypes,
  dateFormatTypes,
  apiDataTypes,
  dividendsReportTypes,
  resultTableTypes,
} from '../../types';
import { isAllDataFilled } from '../../helpers/isAllDataFilled';
import { API_DATE_FORMAT, TO_FIXED_VALUE } from '../../consts';
import { getCurrecyRate } from '../../api/getCurrencyRate';
import { reformatDate } from '../../helpers/reformatDate';
import { updateSubDays } from '../../helpers/updateSubDays';
import { initialDividendState, dividendsReportState } from '../../initialStates';
import { minusDay } from '../../helpers/minusDay';
import { ResultTable } from '../ResultTable';
import { ResultTotal } from '../ResultTotal';
import { dividendCalulations } from '../../helpers/dividendCalulations';
import { InputSelect, InputWrapper } from '../UI';

const maxDate = new Date();

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ...initialDividendState,
  });
  const [dividendCalculated, setDividendCalculated] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dividendsReport, setDividendsReport] = useState<dividendsReportTypes>({ ...dividendsReportState });
  const [dividendsTotal, setDividendsTotal] = useState<resultTableTypes[]>([]);
  useEffect(() => {
    const totalTax = dividendsTotal.reduce((sum, item) => sum + item.taxLocal, 0).toFixed(TO_FIXED_VALUE);
    const totalTaxPaid = dividendsTotal.reduce((sum, item) => sum + item.taxPaidLocal, 0).toFixed(TO_FIXED_VALUE);
    const totalNeedToPay = dividendsTotal
      .reduce((sum, item) => sum + item.taxNeedToPayLocal, 0)
      .toFixed(TO_FIXED_VALUE);
    setDividendsReport({ totalTax, totalTaxPaid, totalNeedToPay });
  }, [dividendsTotal]);

  const handleDividentData = (e?: inputTypes, date?: dateFormatTypes) => {
    e &&
      setDividendData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    if (date) {
      console.log(e);

      date && setDividendData((prev) => ({ ...prev, date }));
    }
  };

  const handleDividendCalculations = (data: apiDataTypes) =>
    setDividendsTotal((prev) => [...prev, { ...dividendCalulations(data, dividendData) }]);

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
        <InputWrapper
          text="Dividend company"
          type="text"
          placeholder="Divident company"
          onChange={handleDividentData}
          value={dividendData.company}
          id="company"
          disabled={dividendCalculated}
        />
        <InputWrapper
          text="Dividend ammount"
          type="number"
          placeholder="Dividend ammount"
          onChange={handleDividentData}
          value={dividendData.company}
          id="ammount"
          disabled={dividendCalculated}
        />
        <InputWrapper
          text="Divident tax in %"
          type="number"
          placeholder="Divident tax in %"
          onChange={handleDividentData}
          value={dividendData.tax}
          id="tax"
          disabled={dividendCalculated}
        />
        <InputSelect
          name="currency"
          text="Currency"
          onChange={handleDividentData}
          id="date"
          disabled={dividendCalculated}
          options={[
            { value: 'usd', text: 'usd' },
            { value: 'eur', text: 'eur' },
          ]}
        />
        <div>
          <p>Set divident payment day</p>
          <DatePicker
            selected={dividendData.date}
            onChange={(date) => handleDividentData(null, date)}
            maxDate={maxDate}
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
