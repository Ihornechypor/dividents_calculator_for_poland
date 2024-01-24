import { subDays, parse } from 'date-fns';
import { API_DATE_FORMAT } from '../consts';

export const updateSubDays = (date: string, type: string, day: number) =>
  subDays(parse(date, API_DATE_FORMAT, new Date()), day);
