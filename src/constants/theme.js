import { createContext, useContext } from 'react';

export const colorPalettes = [
  { name: 'Default', colors: ['#CDF2FF', '#CDF5EC', '#DBF5F4', '#48B2FF', '#176331'] },
  { name: 'Warm', colors: ['#FFE8D6', '#FFDDC1', '#FFF1E6', '#E8700A', '#9C4400'] },
  { name: 'Earth', colors: ['#E8DCC8', '#D4C5A9', '#F0EBE0', '#8B7355', '#4A3728'] },
  { name: 'Slate', colors: ['#E0E4EA', '#CDD3DC', '#EDF0F4', '#5A6B80', '#2E3A46'] },
  { name: 'Dusk', colors: ['#E8DEFF', '#D5CEFF', '#F0EBFF', '#7B61C2', '#3D2E6B'] },
];

export const ThemeContext = createContext({ palette: 0, setPalette: () => {} });

export function useThemeColors() {
  const { palette } = useContext(ThemeContext);
  const c = colorPalettes[palette].colors;
  return { navActiveBg: c[0] + 'A6', imageMat: c[1], highlight: c[2], accent: c[3], link: c[4] };
}
