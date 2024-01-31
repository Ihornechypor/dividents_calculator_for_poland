import styled, { css } from 'styled-components';
import theme, { themeColors } from '../../../styles/theme';
import { ButtonTypes } from '../../../types';

type ButtonProps = {
  disabled?: boolean;
  variant?: ButtonTypes['variant'];
};

const Button = styled.button<ButtonProps>`
  font-size: 14px;
  font-weight: bold;
  color: ${themeColors.white};
  padding: 6px 12px;
  margin-bottom: 0;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  transition: all 0.5s;
  border-radius: ${theme.global.borderRadius};

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: ${themeColors.primary};
      &:hover,
      &:focus {
        background-color: ${themeColors.primary};
      }
    `}

  ${(props) =>
    props.variant === 'danger' &&
    css`
      background-color: ${themeColors.danger};
      &:hover,
      &:focus {
        background-color: ${themeColors.dangerDarken};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      background: ${themeColors.gray} !important;
      pointer-events: none;
      opacity: 0.3;
    `}

  &:disabled {
  }
`;

export { Button };
