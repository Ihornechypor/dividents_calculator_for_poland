import { nanoid } from 'nanoid';
import { POLAND_TAX_RATE } from '../consts';
import { apiDataTypes, dividendDataSateTypes } from '../types';
import { percentToDecimal } from './percentToDecimal';

export const dividendCalulations = (data: apiDataTypes, dividendData: dividendDataSateTypes) => {
  const taxNumToPercent = percentToDecimal(dividendData.tax);
  const taxBasePercents = taxNumToPercent >= POLAND_TAX_RATE;
  const taxBaseLocal = dividendData.ammount * data.currencyRate;
  const taxLocal = taxBaseLocal * POLAND_TAX_RATE;
  const taxPaidLocal = taxBaseLocal * taxNumToPercent;
  const taxForReportCell = taxBasePercents ? taxLocal : taxBaseLocal * taxNumToPercent;

  const taxNeedToPayLocal = taxNumToPercent >= POLAND_TAX_RATE ? 0 : taxLocal - taxPaidLocal;

  const taxAmmountLocal = dividendData.ammount * POLAND_TAX_RATE;
  const taxAmmountForeignPaid = dividendData.ammount * taxNumToPercent;
  const taxAmmountForeignToPay = taxNumToPercent >= POLAND_TAX_RATE ? 0 : taxAmmountLocal - taxAmmountForeignPaid;

  return {
    id: nanoid(),
    ...dividendData,
    ...data,
    taxBasePercents,
    taxBaseLocal,
    taxLocal,
    taxPaidLocal,
    taxForReportCell,
    taxNeedToPayLocal,
    taxAmmountLocal,
    taxAmmountForeignPaid,
    taxAmmountForeignToPay,
  };
};
