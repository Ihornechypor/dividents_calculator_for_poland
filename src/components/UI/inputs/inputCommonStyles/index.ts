import styled, { css } from 'styled-components';
import theme, { themeColors } from '../../../../styles/theme';

type inputWrapperCommponProps = {
  notActive?: boolean;
};

const inputWrapperCommpon = css<inputWrapperCommponProps>`
  padding: 10px;
  border: 1px solid ${themeColors.primary};
  border-radius: ${theme.global.borderRadius};
  font-weight: bold;
  transition: all 0.5s;
  span,
  label {
    display: block;
  }

  input,
  select {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid ${themeColors.primary};
    border-radius: ${theme.global.borderRadius};
    font-weight: bold;
  }

  ${(props) =>
    props.notActive &&
    css`
      opacity: 0.3;
      border: 1px solid ${themeColors.gray};

      input,
      select {
        border: 1px solid ${themeColors.gray};
      }
    `}
`;

const InputWrapper = styled.div`
  ${inputWrapperCommpon}
`;

export { InputWrapper };
