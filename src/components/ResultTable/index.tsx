import { API_DATE_FORMAT, POLAND_TAX_RATE, TO_FIXED_VALUE } from '../../consts';
import { reformatDate } from '../../helpers/reformatDate';

export const ResultTable = ({
  dividendsTotal,
  handleRemove,
}: {
  dividendsTotal: any[];
  handleRemove: (id: string) => void;
}) => {
  return (
    <div style={{ border: '1px solid red', padding: 20 }}>
      <p>Data</p>
      <table cellPadding={2} border={2}>
        <thead>
          <tr>
            <th>Company name</th>
            <th>Divident date</th>
            <th>Currency</th>
            <th>Local currency date (PLN)</th>
            <th>Local currency rate (PLN)</th>
            <th>Divident price (Foreign currecy)</th>
            <th>Foreign tax</th>
            <th>Local tax base (PLN)</th>
            <th>Local tax (PLN)</th>
            <th>Local tax Paid (PLN)</th>
            <th>Local need to pay (PLN)</th>
            <th>Local tax ammount (Foreign currecy)</th>
            <th>Foreign tax payed (Foreign currecy)</th>
            <th colSpan={2}>Foreign taxt need to pay (Foreign currecy)</th>
          </tr>
        </thead>
        <tbody>
          {dividendsTotal.length > 0
            ? dividendsTotal.map((item) => (
                <tr key={item.id} style={{ backgroundColor: `${item.taxBasePercents ? 'orange' : 'transparent'}` }}>
                  <td>{item.company}</td>
                  <td>{reformatDate(item.date, API_DATE_FORMAT)}</td>
                  <td>{item.currency}</td>
                  <td>{item.currencyDate}</td>
                  <td>{item.currencyRate}</td>
                  <td>{item.ammount}</td>
                  <td>
                    {item.tax}% (real taxt percent {item.taxBasePercents ? POLAND_TAX_RATE : '15'}%)
                  </td>
                  <td>{item.taxBaseLocal.toFixed(TO_FIXED_VALUE)}</td>
                  <td>{item.taxLocal.toFixed(TO_FIXED_VALUE)}</td>
                  <td>{item.taxPaidLocal.toFixed(TO_FIXED_VALUE)}</td>
                  <td>{item.taxNeedToPayLocal.toFixed(TO_FIXED_VALUE)}</td>
                  <td>{item.taxAmmountLocal.toFixed(TO_FIXED_VALUE)}</td>
                  <td>{item.taxAmmountForeignPaid.toFixed(TO_FIXED_VALUE)}</td>
                  <td>{item.taxAmmountForeignToPay.toFixed(TO_FIXED_VALUE)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => handleRemove(item.id)}>X</button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
