import { API_DATE_FORMAT, POLAND_TAX_RATE, TO_FIXED_VALUE } from '../../consts';
import { reformatDate } from '../../helpers';
import { resultTableTypes } from '../../types';
import { Button } from '../UI';
import * as Styled from './resultTable.styles';
export const ResultTable = ({
  dividendsTotal,
  handleRemove,
}: {
  dividendsTotal: resultTableTypes[];
  handleRemove: (id: string) => void;
}) => {
  return (
    <Styled.ResultTableSection>
      <h2>Tablica z dywidendami</h2>
      <Styled.ResultTableInfo type="warning">
        Kolor ten wskazuje, że wartość płatności dokonanych za granicą jest wyższy niż w Polsce.
      </Styled.ResultTableInfo>
      <Styled.ResultTableWrapper>
        <Styled.ResultTable>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Waluta</th>
              <th>Data dywidendy</th>
              <th>Data z api NBP</th>
              <th>
                Kurs waluty <br /> z api NBP (PLN)
              </th>
              <th>
                Wartość dywidendy <br />
                (w walucie)
              </th>
              <th>Podatek zagraniczny</th>
              <th>Wartość w (PLN)</th>
              <th>
                Podatek zaplacony <br />
                za granicą (PLN)
              </th>
              <th>
                Zryczałtowany podatek <br />
                kolumna 34(PLN)
              </th>
              <th>
                Podatek zapłacony <br />
                za granicą kolumna 35
              </th>
              <th>
                Różnica <br /> kolumna 36(PLN)
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dividendsTotal.length > 0
              ? dividendsTotal.map((item) => (
                  <Styled.ResultTableTr key={item.id} type={item.taxBasePercents ? 'warning' : null}>
                    <td>{item.company}</td>
                    <td>{item.currency}</td>
                    <td>{reformatDate(item.date, API_DATE_FORMAT)}</td>
                    <td>{item.currencyDate}</td>
                    <td>{item.currencyRate}</td>
                    <td>{item.ammount}</td>
                    <td>
                      {item.tax}% <br />
                      {item.taxBasePercents && `(Maksymalny podatek ${POLAND_TAX_RATE * 100} %)`}
                    </td>
                    <td>{item.taxBaseLocal.toFixed(TO_FIXED_VALUE)}</td>
                    <td>{item.taxPaidLocal.toFixed(TO_FIXED_VALUE)}</td>
                    <td>{item.taxLocal.toFixed(TO_FIXED_VALUE)}</td>
                    <td>{item.taxForReportCell.toFixed(TO_FIXED_VALUE)}</td>
                    <td>{item.taxNeedToPayLocal.toFixed(TO_FIXED_VALUE)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Button onClick={() => handleRemove(item.id)} variant="danger">
                        X
                      </Button>
                    </td>
                  </Styled.ResultTableTr>
                ))
              : null}
          </tbody>
        </Styled.ResultTable>
      </Styled.ResultTableWrapper>
    </Styled.ResultTableSection>
  );
};
