export type inputTypes = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | null;

export type dateFormatTypes = Date | null;

export type dividendDataSateTypes = {
  company: string;
  ammount: number;
  tax: number;
  currency: string;
  date: dateFormatTypes;
};

export type dividendsReportTypes = {
  totalTax: string;
  totalTaxPaid: string;
  totalNeedToPay: string;
};

export type apiTypes = {
  date: string;
  formatedDate: string;
  currency: string;
};

export type apiDataTypes = {
  currencyRate: number | 0;
  currencyDate: string | null;
};

export type resultTableComputedTypes = {
  id: string;
  taxBasePercents: boolean;
  taxBaseLocal: number;
  taxLocal: number;
  taxPaidLocal: number;
  taxForReportCell: number;
  taxNeedToPayLocal: number;
  taxAmmountLocal: number;
  taxAmmountForeignPaid: number;
  taxAmmountForeignToPay: number;
};

export type resultTableTypes = dividendDataSateTypes & apiDataTypes & resultTableComputedTypes;

export * from './uiTypes';
