export type inputTypes = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | null;

export type dateFormat = Date | null;

export type dividendDataSateTypes = {
  id: string;
  company: string;
  ammount: number;
  tax: number;
  currency: string;
  date: dateFormat;
};

export type apiTypes = {
  date: string;
  formatedDate: string;
  currency: string;
};

export type apiData = {
  currencyRate: number | 0;
  currencyDate: string | null;
};
