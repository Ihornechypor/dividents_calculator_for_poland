import { subDays, format } from 'date-fns';
import { dateFormatTypes } from '../types';
import { API_DATE_FORMAT } from '../consts';

export const minusDay = (date: dateFormatTypes, day: number) => date && format(subDays(date, day), API_DATE_FORMAT);
