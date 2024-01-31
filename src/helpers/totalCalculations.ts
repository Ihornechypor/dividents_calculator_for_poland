import { TO_FIXED_VALUE } from '../consts';
import { resultTableTypes } from '../types';

export const totalCalculations = (dividendsTotal: resultTableTypes[]) => {
  const totalTax = dividendsTotal.reduce((sum, item) => sum + item.taxLocal, 0).toFixed(TO_FIXED_VALUE);
  const totalTaxPaid = dividendsTotal.reduce((sum, item) => sum + item.taxPaidLocal, 0).toFixed(TO_FIXED_VALUE);
  const totalNeedToPay = dividendsTotal.reduce((sum, item) => sum + item.taxNeedToPayLocal, 0).toFixed(TO_FIXED_VALUE);

  return {
    totalTax,
    totalTaxPaid,
    totalNeedToPay,
  };
};