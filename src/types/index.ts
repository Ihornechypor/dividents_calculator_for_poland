export type inputTypes = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | null;

export type inputDate = Date | null;

export type dividendDataSateTypes = {
  ammount: number;
  tax: number;
  date: inputDate;
  currency: string;
};
