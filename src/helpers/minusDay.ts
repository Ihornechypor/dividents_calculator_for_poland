import { subDays, format } from 'date-fns';
import { dateFormat } from '../types';
import { API_DATE_FORMAT } from '../consts';

export const minusDay = (date: dateFormat, day: number) => date && format(subDays(date, day), API_DATE_FORMAT);
