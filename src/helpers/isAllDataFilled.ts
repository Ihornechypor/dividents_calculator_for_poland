import { dividendDataSateTypes } from '../types';

export const isAllDataFilled = (obj: dividendDataSateTypes) =>
  !Object.values(obj).every((value) => value !== undefined && value !== null && value !== '' && value !== 0);
