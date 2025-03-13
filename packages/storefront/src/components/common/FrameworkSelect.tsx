'use client';

import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';

type ThemeSelectProps = {
  framework: Framework;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onUpdate: (event: CustomEvent<SelectUpdateEventDetail>) => void;
};

export const FrameworkSelect = ({
  framework = 'vanilla-js',
  label = 'Theme',
  hideLabel = false,
  onUpdate,
}: ThemeSelectProps) => {
  return (
    <PSelect
      className="xs:w-[min(calc(50%-theme(spacing.xs)/2),12.5rem)]"
      name="theme"
      value={framework}
      label={label}
      hideLabel={hideLabel}
      onUpdate={onUpdate}
    >
      <PSelectOption disabled={true}>Select framework</PSelectOption>
      <PSelectOption value="angular">Angular</PSelectOption>
      <PSelectOption value="react">React</PSelectOption>
      <PSelectOption value="vanilla-js">Vanilla JS</PSelectOption>
      <PSelectOption value="vue">Vue</PSelectOption>
    </PSelect>
  );
};
