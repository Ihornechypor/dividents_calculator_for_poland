import { subDays, parse } from 'date-fns';

export const updateSubDays = (date: string | null, type: string, day: number) =>
  date && subDays(parse(date, type, new Date()), day);
