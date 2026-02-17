'use client';

import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';

type FrameworkSelectProps = {
  framework: Framework;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onFrameworkChange: (event: CustomEvent<SelectChangeEventDetail>) => void;
};

export const FrameworkSelect = ({
  framework = 'vanilla-js',
  label = 'Theme',
  hideLabel = false,
  onFrameworkChange,
}: FrameworkSelectProps) => {
  return (
    <PSelect
      className="xs:w-[min(calc(50%-(var(--spacing-fluid-xs))/2),12.5rem)]"
      name="theme"
      value={framework}
      label={label}
      hideLabel={hideLabel}
      onChange={onFrameworkChange}
    >
      <PSelectOption disabled={true}>Select framework</PSelectOption>
      <PSelectOption value="angular">Angular</PSelectOption>
      <PSelectOption value="react">React</PSelectOption>
      <PSelectOption value="vanilla-js">Vanilla JS</PSelectOption>
      <PSelectOption value="vue">Vue</PSelectOption>
    </PSelect>
  );
};
