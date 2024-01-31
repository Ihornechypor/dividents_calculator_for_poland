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
        <p>Kalkulator obliczy</p>
        <Controller />
      </Main>
      <Footer />
    </>
  );
}

export default App;
