import { Main } from './components/Layout';
import GlobalStyle from './styles/globalStyles';
import { Controller } from './components/Controller';

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <h1>Kalkulator dywidend otrzymanych za granicą</h1>
        <Controller />
      </Main>
    </>
  );
}

export default App;
