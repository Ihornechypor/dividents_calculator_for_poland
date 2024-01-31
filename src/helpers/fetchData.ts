import { getCurrecyRate } from '../api/getCurrencyRate';
import { API_DATE_FORMAT } from '../consts';
import { reformatDate, updateSubDays, minusDay } from '../helpers';
import { dividendDataSateTypes } from '../types';

export const fetchData = async (dividendData: dividendDataSateTypes) => {
  let currentDate = minusDay(dividendData.date, 1);
  let retryCount = 0;
  while (retryCount < 10) {
    try {
      const data = await getCurrecyRate(currentDate, dividendData.currency);

      if (data.currencyDate) {
        alert(data);
        return data;
      } else {
        console.error('Empty or invalid API response');
      }
    } catch (error) {
      alert(error);
      const subDay = updateSubDays(currentDate, API_DATE_FORMAT, 1);
      currentDate = subDay && reformatDate(subDay, API_DATE_FORMAT);

      retryCount += 1;
    }
  }
};
