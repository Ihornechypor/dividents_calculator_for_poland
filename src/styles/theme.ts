export const themeColors = {
  dark: '#3a393f',
  primary: '#5a23c8',
  primaryDarken: '#6823c8',
  warning: '#ffc107',
  danger: '#dc3545',
  dangerDarken: '#841f2c',
  white: '#fff',
  gray: '#6c757d',
};

export const themeFonts = {
  mainFont: "'Roboto',Arial, sans-serif",
};

const theme = {
  global: {
    fontSize: '16px',
    font: themeFonts.mainFont,
    fontWeight: 400,
    lineHeight: 1.4,
    gutter: '24px',
    maxSectionWidth: '920px',
    breakpoint: '991px',
    borderRadius: '4px',
  },
};

export default theme;
