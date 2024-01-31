import { ButtonTypes } from '../../../types';
import * as Styled from './button.styles';

export const Button = ({ children, disabled, onClick }: ButtonTypes) => (
  <Styled.Button
    disabled={disabled}
    {...(onClick
      ? {
          onClick: () => {
            onClick();
          },
        }
      : {})}
  >
    {children}
  </Styled.Button>
);
