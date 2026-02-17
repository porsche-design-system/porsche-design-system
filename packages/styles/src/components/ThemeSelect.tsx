import type { ChangeEvent, SelectHTMLAttributes } from 'react';
import type { LightDarkTheme } from '../providers/ThemeProvider.tsx';

type ThemeSelectProps = {
  value: LightDarkTheme;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const themeMap: Record<LightDarkTheme, string> = {
  light: 'Light',
  dark: 'Dark',
  'light-dark': 'Light Dark',
};

export const ThemeSelect = ({ value = 'light', onChange, ...rest }: ThemeSelectProps) => {
  return (
    <select name="theme" value={value} onChange={onChange} {...rest}>
      {Object.entries(themeMap).map(([theme, name]) => (
        <option key={theme} value={theme}>
          {name}
        </option>
      ))}
    </select>
  );
};
