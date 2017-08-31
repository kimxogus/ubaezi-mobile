import React from 'react';
import { ThemeProvider } from 'styled-components';

export const theme = {
  fg: 'white',
  bg: 'palevioletred',
};

export const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg,
});

export const invertedTheme = invertTheme(theme);

export const InvertedThemeProvider = () => (
  <ThemeProvider theme={invertTheme} />
);
