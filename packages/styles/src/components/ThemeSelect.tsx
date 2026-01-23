import type { Theme } from '@porsche-design-system/emotion';
import type { ChangeEvent, SelectHTMLAttributes } from 'react';

type ThemeSelectProps = {
  value: Theme;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const themes = ['light', 'dark', 'auto'];

export const ThemeSelect = ({ value = 'light', onChange, ...rest }: ThemeSelectProps) => {
  return (
    <select name="theme" value={value} onChange={onChange} {...rest}>
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
  );
};
