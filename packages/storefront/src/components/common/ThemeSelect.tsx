'use client';

import type { PlaygroundTheme } from '@/models/theme';
import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';

type ThemeSelectProps = {
  value: PlaygroundTheme;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onUpdate: (event: CustomEvent<SelectUpdateEventDetail>) => void;
};

export const ThemeSelect = ({ value = 'light', label = 'Theme', hideLabel = false, onUpdate }: ThemeSelectProps) => {
  return (
    <PSelect name="theme" value={value} label={label} hideLabel={hideLabel} compact={true} onUpdate={onUpdate}>
      <PSelectOption value="light">Light</PSelectOption>
      <PSelectOption value="dark">Dark</PSelectOption>
      <PSelectOption value="auto">Auto (sync with operating system)</PSelectOption>
    </PSelect>
  );
};
