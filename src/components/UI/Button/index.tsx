import { ButtonTypes } from '../../../types';

export const Button = ({ children, disabled, onClick }: ButtonTypes) => (
  <button
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
  </button>
);
