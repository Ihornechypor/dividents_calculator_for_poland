import { resultTableTypes } from '../types';

export const totalCalculations = (dividendsTotal: resultTableTypes[]) => {
  const totalTax = dividendsTotal.reduce((sum, item) => sum + item.taxLocal, 0).toFixed(0);
  let totalTaxPaid = dividendsTotal.reduce((sum, item) => sum + item.taxForReportCell, 0).toFixed(0);
  const totalNeedToPay = dividendsTotal.reduce((sum, item) => sum + item.taxNeedToPayLocal, 0).toFixed(0);

  return {
    totalTax,
    totalTaxPaid,
    totalNeedToPay,
  };
};
