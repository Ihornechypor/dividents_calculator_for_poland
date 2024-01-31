import { ButtonTypes } from '../../../types';
import * as Styled from './button.styles';

export const Button = ({ children, disabled, onClick, variant }: ButtonTypes) => (
  <Styled.Button
    disabled={disabled}
    variant={variant}
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
