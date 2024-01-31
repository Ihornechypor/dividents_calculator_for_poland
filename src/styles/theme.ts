export const themeColors = {
  black: '#000',
  dark: '#3a393f',
  primary: '#5a23c8',
  warning: '#ffc107',
  danger: '#721c24',
  white: '#fff',
  gray: '',
};

export const themeFonts = {
  mainFont: "'Roboto',Arial, sans-serif",
  memFont: "'Londrina Outline', cursive;",
};

const theme = {
  global: {
    fontSize: '16px',
    font: themeFonts.mainFont,
    fontWeight: 400,
    textColor: themeColors.black,
    lineHeight: 1.4,
    gutter: '24px',
    maxSectionWidth: '920px',
  },
};

export default theme;
