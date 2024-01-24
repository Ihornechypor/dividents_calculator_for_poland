import { useEffect, useState } from 'react';
import { Main } from './components/Layout';
import GlobalStyle from './styles/globalStyles';
import { Controller } from './components/Controller';

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Controller />
      </Main>
    </>
  );
}

export default App;
