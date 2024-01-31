import { ReactNode } from 'react';
import { dateFormatTypes, inputTypes } from '..';

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
  variant?: 'primary' | 'danger' | null;
  disabled?: boolean;
  onClick?: () => void;
};

export type DatePicTypes = {
  label: string;
  selected: dateFormatTypes;
  onChange: (date: dateFormatTypes) => void;
  maxDate: dateFormatTypes;
  disabled: boolean;
};
