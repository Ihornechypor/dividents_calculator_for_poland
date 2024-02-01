import { useRef } from 'react';
import { API_DATE_FORMAT, POLAND_TAX_RATE, TO_FIXED_VALUE } from '../../consts';
import { reformatDate } from '../../helpers';
import { resultTableTypes } from '../../types';
import { Button } from '../UI';
import * as Styled from './resultTable.styles';
import { DownloadTableExcel } from 'react-export-table-to-excel-2';

export const ResultTable = ({
  dividendsTotal,
  handleRemove,
}: {
  dividendsTotal: resultTableTypes[];
  handleRemove: (id: string) => void;
}) => {
  const tableRef = useRef(null);

  return (
    <Styled.ResultTableSection>
      <h2>Tablica z dywidendami</h2>
      <Styled.ResultTableInfo type="warning">
        Kolor ten wskazuje, że wartość płatności za granicą jest wyższa niż w Polsce.
      </Styled.ResultTableInfo>
      <DownloadTableExcel filename="dywidendy" sheet="users" currentTableRef={tableRef.current}>
        <Button variant="primary">Wgenerować xls plik </Button>
      </DownloadTableExcel>
      <Styled.ResultTableWrapper>
        <Styled.ResultTable ref={tableRef}>
          <thead>
            <tr>
              <th></th>
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
                Podatek zapłacony <br />
                za granicą <br /> faktycznie (PLN)
              </th>
              <th>
                Zryczałtowany podatek <br />
                kolumna 34(PLN)
              </th>
              <th>
                Podatek zapłacony <br />
                za granicą <br />
                dla kolumny 35
              </th>
              <th>
                Różnica <br /> kolumna 36(PLN)
              </th>
            </tr>
          </thead>
          <tbody>
            {dividendsTotal.length > 0
              ? dividendsTotal.map((item) => (
                  <Styled.ResultTableTr key={item.id} type={item.taxBasePercents ? 'warning' : null}>
                    <td>
                      <Button onClick={() => handleRemove(item.id)} variant="danger">
                        X
                      </Button>
                    </td>
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
                  </Styled.ResultTableTr>
                ))
              : null}
          </tbody>
        </Styled.ResultTable>
      </Styled.ResultTableWrapper>
    </Styled.ResultTableSection>
  );
};
