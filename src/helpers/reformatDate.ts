import { format } from 'date-fns';

export const reformatDate = (date: Date, type: string) => date && format(date, type);
