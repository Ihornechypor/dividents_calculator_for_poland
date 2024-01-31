import { dividendsReportTypes } from '../../types';

export const ResultTotal = ({ dividendsReport }: { dividendsReport: dividendsReportTypes }) => (
  <section>
    <h2>Podsumowanie tablicy rozliczenia PIT-38</h2>
    <ul>
      <li>
        Zryczałtowany podatek obliczony od przychodów (dochodów), o których mowa w art. 30a ust. 1 pkt 1–5 ustawy,
        uzyskanych poza granicami Rzeczypospolitej Polskiej (kolumna 34 PIT-38) -{' '}
        <b style={{ fontSize: 20 }}>{dividendsReport.totalTax} zł</b>
      </li>
      <li>
        Podatek zapłacony za granicą, o którym mowa w art. 30a ust. 9 ustawy (przeliczony na złote) (kolumna 35 PIT-38){' '}
        - <b style={{ fontSize: 20 }}>{dividendsReport.totalTaxPaid} zł</b>
      </li>
      <li>
        Różnica między zryczałtowanym podatkiem a podatkiem zapłaconym za granicą (po zaokrągleniu do pełnych złotych5))
        (kolumna 36 in PIT-38) - <b style={{ fontSize: 20 }}>{dividendsReport.totalNeedToPay} zł</b>
      </li>
    </ul>
  </section>
);
