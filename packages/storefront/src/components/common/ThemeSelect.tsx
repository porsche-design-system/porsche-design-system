'use client';

import type { PlaygroundTheme } from '@/models/theme';
import {
  PPopover,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';

type ThemeSelectProps = {
  value: PlaygroundTheme;
  onUpdate: (event: CustomEvent<SelectUpdateEventDetail>) => void;
} & Partial<PSelectProps>;

export const ThemeSelect = ({
  value = 'light',
  onUpdate,
  name = 'theme',
  label = 'Theme',
  hideLabel = false,
  ...rest
}: ThemeSelectProps) => {
  return (
    <PSelect name={name} value={value} onUpdate={onUpdate} label={label} hideLabel={hideLabel} {...rest}>
      <span slot="label" className="inline-flex gap-static-xs">
        {label}
        <PPopover onClick={(e) => e.preventDefault()}>
          Changes the theme of the application and any Porsche Design System component. It's possible to choose between
          forced theme <b>light</b> and <b>dark</b>. It's also possible to use <b>auto</b>, which applies light or dark
          theme depending on the operating system settings automatically.
        </PPopover>
      </span>
      <PSelectOption value="light">Light</PSelectOption>
      <PSelectOption value="dark">Dark</PSelectOption>
      <PSelectOption value="auto">Auto (sync with operating system)</PSelectOption>
    </PSelect>
  );
};
