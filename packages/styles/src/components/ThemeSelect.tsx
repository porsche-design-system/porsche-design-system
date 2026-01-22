import type { Theme } from '@porsche-design-system/emotion';
import type { ChangeEvent, SelectHTMLAttributes } from 'react';

type ThemeSelectProps = {
  value: Theme;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const ThemeSelect = ({ value = 'light', onChange, ...rest }: ThemeSelectProps) => {
  return (
    <select name="theme" value={value} onChange={onChange} {...rest}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="auto">Auto</option>
    </select>
  );
};
