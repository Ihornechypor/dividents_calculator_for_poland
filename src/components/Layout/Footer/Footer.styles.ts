import styled from 'styled-components';
import theme, { themeColors } from '../../../styles/theme';

const Footer = styled.footer`
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  a {
    color: #fff;
  }
  p {
    background-color: ${themeColors.primary};
    display: block;
    width: 100%;
    padding: ${theme.global.gutter};
  }
`;

export { Footer };
