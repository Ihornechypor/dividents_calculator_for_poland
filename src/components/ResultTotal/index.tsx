import { dividendsReportTypes } from '../../types';

export const ResultTotal = ({ dividendsReport }: { dividendsReport: dividendsReportTypes }) => (
  <div>
    <p>Total</p>
    <ul>
      <li>Dividend tax (Line 45 in PIT-38) {dividendsReport.totalTax}</li>
      <li>Tax paid in foreign country (Line 46 in PIT-38) {dividendsReport.totalTaxPaid}</li>
      <li>Tax you need to aditionally pay (Line 47 in PIT-38) {dividendsReport.totalNeedToPay}</li>
    </ul>
  </div>
);
