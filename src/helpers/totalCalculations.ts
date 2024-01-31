import { resultTableTypes } from '../types';

export const totalCalculations = (dividendsTotal: resultTableTypes[]) => {
  const totalTax = dividendsTotal.reduce((sum, item) => sum + item.taxLocal, 0).toFixed(0);
  const totalTaxPaid = dividendsTotal.reduce((sum, item) => sum + item.taxForReportCell, 0).toFixed(0);
  const totalNeedToPay = dividendsTotal.reduce((sum, item) => sum + item.taxNeedToPayLocal, 0).toFixed(0);

  const totalGetAll = dividendsTotal.reduce((sum, item) => sum + item.taxBaseLocal, 0);
  const totalPaidFakt = dividendsTotal.reduce((sum, item) => sum + item.taxPaidLocal, 0);
  const totalInHands = totalGetAll - totalPaidFakt - Number(totalNeedToPay);

  return {
    totalTax,
    totalTaxPaid,
    totalNeedToPay,
    totalGetAll: totalGetAll.toFixed(0),
    totalPaidFakt: totalPaidFakt.toFixed(0),
    totalInHands: totalInHands.toFixed(0),
  };
};
