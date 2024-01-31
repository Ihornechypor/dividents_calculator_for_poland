import { ReactNode } from 'react';
import { inputTypes } from '..';

export type inputWrapperTypes = {
  text: string;
  type: string;
  placeholder: string;
  value: any;
  id: string;
  disabled: boolean;
  onChange: (e: inputTypes) => void;
};

export type inputSectionTypes = {
  text: string;
  name: string;
  id: string;
  disabled: boolean;
  options: { value: string; text: string }[];
  onChange: (e?: inputTypes) => void;
};

export type ButtonTypes = {
  children: ReactNode;
  disabled: boolean;
  onClick?: () => void;
};
