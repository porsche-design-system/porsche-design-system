'use client';

import type { PlaygroundTheme } from '@/models/theme';
import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';

type ThemeSelectProps = {
  theme: PlaygroundTheme;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onUpdate: (event: CustomEvent<SelectUpdateEventDetail>) => void;
};

export const ThemeSelect = ({ theme = 'light', label = 'Theme', hideLabel = false, onUpdate }: ThemeSelectProps) => {
  return (
    <PSelect
      className="xs:w-[min(calc(50%-theme(spacing.xs)/2),12.5rem)]"
      name="theme"
      value={theme}
      label={label}
      hideLabel={hideLabel}
      onUpdate={onUpdate}
    >
      <PSelectOption disabled={true}>Select theme</PSelectOption>
      <PSelectOption value="light">Light</PSelectOption>
      <PSelectOption value="dark">Dark</PSelectOption>
      <PSelectOption value="auto">Auto (sync with operating system)</PSelectOption>
    </PSelect>
  );
};
