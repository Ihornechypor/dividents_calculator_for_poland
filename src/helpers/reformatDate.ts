import { format } from 'date-fns';
import { dateFormatTypes } from '../types';

export const reformatDate = (date: dateFormatTypes, type: string) => date && format(date, type);
