'use client';

import type { PlaygroundDir } from '@/models/dir';
import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';

type DirectionSelectProps = {
  dir: PlaygroundDir;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onUpdate: (event: CustomEvent<SelectUpdateEventDetail>) => void;
};

export const DirectionSelect = ({
  dir = 'ltr',
  label = 'Direction',
  hideLabel = false,
  onUpdate,
}: DirectionSelectProps) => {
  return (
    <PSelect
      className="xs:w-[min(calc(50%-theme(spacing.xs)/2),12.5rem)]"
      name="theme"
      value={dir}
      label={label}
      hideLabel={hideLabel}
      onUpdate={onUpdate}
    >
      <PSelectOption disabled={true}>Select direction</PSelectOption>
      <PSelectOption value="ltr">LTR (left-to-right)</PSelectOption>
      <PSelectOption value="rtl">RTL (right-to-left)</PSelectOption>
      <PSelectOption value="auto">Auto</PSelectOption>
    </PSelect>
  );
};
