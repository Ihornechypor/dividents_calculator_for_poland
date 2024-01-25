import { Main } from './components/Layout';
import GlobalStyle from './styles/globalStyles';
import { Controller } from './components/Controller';

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <h1>This tool will help you to calculate dividends for Poland tax form</h1>
        <Controller />
      </Main>
    </>
  );
}

export default App;
