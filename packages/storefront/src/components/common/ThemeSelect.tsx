'use client';

import {
  PLinkPure,
  PPopover,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import React from 'react';
import type { StorefrontColorScheme } from '@/models/theme';

type ThemeSelectProps = {
  value: StorefrontColorScheme;
  onThemeChange: (event: CustomEvent<SelectChangeEventDetail>) => void;
} & Partial<PSelectProps>;

export const ThemeSelect = ({
  value = 'scheme-light',
  onThemeChange,
  name = 'theme',
  label = 'Color Scheme',
  hideLabel = false,
  ...rest
}: ThemeSelectProps) => {
  const themeMap: Record<StorefrontColorScheme, string> = {
    'scheme-light': 'Light',
    'scheme-dark': 'Dark',
    'scheme-light-dark': 'Light Dark',
  };

  return (
    <PSelect name={name} value={value} onChange={onThemeChange} hideLabel={hideLabel} {...rest}>
      <span slot="label" className="inline-flex gap-static-xs">
        {label}
        <PPopover onClick={(e) => e.preventDefault()}>
          All color tokens use the{' '}
          <PLinkPure
            icon="none"
            underline={true}
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark"
            target="_blank"
          >
            light-dark()
          </PLinkPure>{' '}
          CSS function. Set the theme via the CSS <code>color-scheme</code> property: <code>light</code> for light mode,{' '}
          <code>dark</code> for dark mode, or <code>light dark</code> to follow the user's system preference.
        </PPopover>
      </span>
      {Object.entries(themeMap).map(([theme, name]) => (
        <PSelectOption key={theme} value={theme}>
          {name}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
