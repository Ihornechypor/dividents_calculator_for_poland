import styled, { css } from 'styled-components';
import { themeColors } from '../../../styles/theme';

type ButtonProps = {
  disabled?: boolean;
  type?: 'primary' | 'danger' | null;
};

const Button = styled.button<ButtonProps>`
  font-size: 14px;
  padding: 6px 12px;
  margin-bottom: 0;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  transition: all;

  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: ${themeColors.primary};
      &:hover,
      &:focus {
        background-color: ${themeColors.primary};
      }
    `}

  ${(props) =>
    props.type === 'danger' &&
    css`
      background-color: ${themeColors.danger};
      &:hover,
      &:focus {
        background-color: ${themeColors.primary};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}
`;

export { Button };
