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
import { CURRENCIES } from '../../consts';
import { totalCalculations, isAllDataFilled, fetchData } from '../../helpers';
import { initialDividendState, dividendsReportState } from '../../initialStates';
import { ResultTable } from '../ResultTable';
import { ResultTotal } from '../ResultTotal';
import { dividendCalulations } from '../../helpers/dividendCalulations';
import { InputSelect, InputWrapper, Button, DatePic } from '../UI';

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
    setDividendsReport({ ...totalCalculations(dividendsTotal) });
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
          value={dividendData.ammount}
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
          id="currency"
          disabled={dividendCalculated}
          options={CURRENCIES}
        />
        <div>
          <DatePic
            label="Set divident payment day"
            selected={dividendData.date}
            onChange={(date: dateFormatTypes) => handleDividentData(null, date)}
            maxDate={maxDate}
            disabled={dividendCalculated}
          />
        </div>
        <div>
          <Button disabled={isFetching || isAllDataFilled(dividendData) || dividendCalculated}>
            Calculate dividend
          </Button>
        </div>
      </form>
      <Button onClick={handleReset} disabled={!dividendCalculated}>
        Add new dividend
      </Button>
      <ResultTotal dividendsReport={dividendsReport} />
      <ResultTable dividendsTotal={dividendsTotal} handleRemove={handleRemove} />
    </Styled.ControllerBox>
  );
};
