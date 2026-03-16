import { useState } from 'react';
import { colorPalettes, ThemeContext } from '../constants/theme';

export function ThemeDecorator({ palette = 0, children }) {
  const [p, setP] = useState(palette);
  return (
    <ThemeContext.Provider value={{ palette: p, setPalette: setP }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const withTheme = (palette = 0) => (Story) => (
  <ThemeDecorator palette={palette}>
    <Story />
  </ThemeDecorator>
);
