import { dividendsReportTypes } from '../../types';
import * as Styled from './resultTotal.styles';
export const ResultTotal = ({ dividendsReport }: { dividendsReport: dividendsReportTypes }) => (
  <Styled.ResultTotalSections>
    <h2>Podsumowanie do tablicy rozliczenia PIT-38</h2>
    <ul>
      <li>
        Zryczałtowany podatek obliczony od przychodów (dochodów), o których mowa w art. 30a ust. 1 pkt 1-5 ustawy,
        uzyskanych poza granicami Rzeczypospolitej Polskiej (kolumna 34 PIT-38) -{' '}
        <span>{dividendsReport.totalTax} zł</span>
      </li>
      <li>
        Podatek zapłacony za granicą, o którym mowa w art. 30a ust. 9 ustawy (przeliczony na złote) (kolumna 35 PIT-38){' '}
        - <b>{dividendsReport.totalTaxPaid} zł</b>
      </li>
      <li>
        Różnica między zryczałtowanym podatkiem a podatkiem zapłaconym za granicą (po zaokrągleniu do pełnych złotych5))
        (kolumna 36 in PIT-38) - <span>{dividendsReport.totalNeedToPay} zł</span>
      </li>
    </ul>
    <h2>Podsumowanie, ile faktycznie dostanę na rękę</h2>
    <ul>
      <li>
        Kwota uzyskana bez podatków w (PLN) = <span>{dividendsReport.totalGetAll} zł</span>
      </li>
      <li>
        Zaplacone podatki w (PLN) = <span>{dividendsReport.totalPaidFakt} zł</span>
      </li>
      <li>
        Kwota rękę (PLN) = <span>{dividendsReport.totalInHands} zł</span>
      </li>
    </ul>
  </Styled.ResultTotalSections>
);
