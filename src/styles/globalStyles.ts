import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }
  *, 
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  html,
  body {
    width: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.global.font};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }

  a, button {
    cursor: pointer;
  }

  img {
    object-fit: contain;
    width: 100%;
    display: block
  }
`;

export default GlobalStyle;
