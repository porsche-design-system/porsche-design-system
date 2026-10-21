import { type ColorScheme, colorSchemeNameMap } from '@porsche-design-system/shared/models';
import type { ChangeEvent, SelectHTMLAttributes } from 'react';

type ThemeSelectProps = {
  value: ColorScheme;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const ThemeSelect = ({ value = 'scheme-light', onChange, ...rest }: ThemeSelectProps) => {
  return (
    <select name="theme" value={value} onChange={onChange} {...rest}>
      {Object.entries(colorSchemeNameMap).map(([theme, name]) => (
        <option key={theme} value={theme}>
          {name}
        </option>
      ))}
    </select>
  );
};
