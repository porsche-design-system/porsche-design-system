'use client';

import {
  PPopover,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import React from 'react';
import type { PlaygroundTheme } from '@/models/theme';

type ThemeSelectProps = {
  value: PlaygroundTheme;
  onThemeChange: (event: CustomEvent<SelectChangeEventDetail>) => void;
} & Partial<PSelectProps>;

export const ThemeSelect = ({
  value = 'light',
  onThemeChange,
  name = 'theme',
  label = 'Theme',
  hideLabel = false,
  ...rest
}: ThemeSelectProps) => {
  return (
    <PSelect name={name} value={value} onChange={onThemeChange} label={label} hideLabel={hideLabel} {...rest}>
      <span slot="label">{label}</span>
      <PPopover slot="label-after" className="ms-static-xs" onClick={(e) => e.preventDefault()}>
        Changes the theme of the application and any Porsche Design System component. It's possible to choose between
        forced theme <b>light</b> and <b>dark</b>. It's also possible to use <b>auto</b>, which applies light or dark
        theme depending on the operating system settings automatically.
      </PPopover>
      <PSelectOption value="light">Light</PSelectOption>
      <PSelectOption value="dark">Dark</PSelectOption>
      <PSelectOption value="auto">Auto (sync with operating system)</PSelectOption>
    </PSelect>
  );
};
