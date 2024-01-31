import { useEffect, useState } from 'react';
import * as Styled from './controller.styles';
import {
  dividendDataSateTypes,
  inputTypes,
  dateFormatTypes,
  apiDataTypes,
  dividendsReportTypes,
  resultTableTypes,
} from '../../types';
import { CURRENCIES, MAX_DIVIDEND_DATE } from '../../consts';
import { totalCalculations, isAllDataFilled, fetchData } from '../../helpers';
import { initialDividendState, dividendsReportState } from '../../initialStates';
import { ResultTable } from '../ResultTable';
import { ResultTotal } from '../ResultTotal';
import { dividendCalulations } from '../../helpers/dividendCalulations';
import { InputSelect, InputField, Button, DatePic } from '../UI';

export const Controller = () => {
  const [dividendData, setDividendData] = useState<dividendDataSateTypes>({
    ...initialDividendState,
  });
  const [dividendCalculated, setDividendCalculated] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dividendsReport, setDividendsReport] = useState<dividendsReportTypes>({ ...dividendsReportState });
  const [dividendsTotal, setDividendsTotal] = useState<resultTableTypes[]>(
    JSON.parse(localStorage.getItem('dividendTotal')!) || [],
  );

  useEffect(() => {
    setDividendsReport({ ...totalCalculations(dividendsTotal) });
    localStorage.setItem('dividendTotal', JSON.stringify(dividendsTotal));
  }, [dividendsTotal]);

  const handleDividentData = (e?: inputTypes, date?: dateFormatTypes) => {
    e &&
      setDividendData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    date && setDividendData((prev) => ({ ...prev, date }));
  };

  const handleDividendCalculations = (data: apiDataTypes) =>
    setDividendsTotal((prev) => [...prev, { ...dividendCalulations(data, dividendData) }]);

  const handleTaxCalucation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);

    const data = await fetchData(dividendData);

    if (data) {
      setDividendCalculated(true);
      handleDividendCalculations(data);
      setDividendData({ ...initialDividendState });
      setIsFetching(false);
    } else {
      setIsFetching(false);
      console.error('Failed to fetch data from API');
    }
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
        <InputField
          text="Ticker lub nazwa"
          type="text"
          placeholder="ticker"
          onChange={handleDividentData}
          value={dividendData.company}
          id="company"
          disabled={dividendCalculated}
        />
        <InputField
          text="Wartość dywidendy w walucie obcej"
          type="number"
          placeholder="wartość"
          onChange={handleDividentData}
          value={dividendData.ammount}
          id="ammount"
          disabled={dividendCalculated}
        />
        <InputField
          text="Procent podatku dywidendy w zagranicznych np (15%)"
          type="number"
          placeholder=""
          onChange={handleDividentData}
          value={dividendData.tax}
          id="tax"
          disabled={dividendCalculated}
        />
        <InputSelect
          name="currency"
          text="Waluta"
          onChange={handleDividentData}
          id="currency"
          disabled={dividendCalculated}
          options={CURRENCIES}
        />
        <div>
          <DatePic
            label="Data dywidendy (Tu wpisujemy faktyczną datę dywidendy 'Skrypt automatychnie wszytko podliczy')"
            selected={dividendData.date}
            onChange={(date: dateFormatTypes) => handleDividentData(null, date)}
            maxDate={MAX_DIVIDEND_DATE}
            disabled={dividendCalculated}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button disabled={isFetching || isAllDataFilled(dividendData) || dividendCalculated} variant="primary">
            Dodaj dywidendę do tablicy
          </Button>
        </div>
      </form>
      <div style={{ textAlign: 'right', marginTop: 10 }}>
        <Button onClick={handleReset} disabled={!dividendCalculated} variant="primary">
          Dodaj nową dividendę
        </Button>
      </div>
      <div style={{ textAlign: 'right', marginTop: 10 }}>
        <Button variant="primary" onClick={() => alert('11')}>
          Dodaj nową dividendę
        </Button>
      </div>

      <ResultTotal dividendsReport={dividendsReport} />
      <ResultTable dividendsTotal={dividendsTotal} handleRemove={handleRemove} />
    </Styled.ControllerBox>
  );
};
