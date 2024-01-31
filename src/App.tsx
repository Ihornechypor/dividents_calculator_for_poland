import { Main } from './components/Layout';
import GlobalStyle from './styles/globalStyles';
import { Controller } from './components/Controller';
import { Footer } from './components/Layout/Footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <h1>Kalkulator dywidend otrzymanych za granicą dla rozliczenia PIT-38</h1>
        <p>
          Ten kalkulator rozliczy podatek, który trzeba zapłacić od dywidend otrzymanych za granicą. Jest on podłączony
          do API NBP, które pobiera informacje o kursie walut aktualnym w czasie otrzymania dywidendy.
        </p>
        <br />
        <Controller />
      </Main>
      <Footer />
    </>
  );
}

export default App;
