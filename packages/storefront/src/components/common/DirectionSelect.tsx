'use client';

import type { StorefrontDirection } from '@/models/dir';
import {
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';

type DirectionSelectProps = {
  dir: StorefrontDirection;
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
    <PSelect name="direction" value={dir} label={label} hideLabel={hideLabel} onUpdate={onUpdate}>
      <PSelectOption value="ltr">LTR (left-to-right)</PSelectOption>
      <PSelectOption value="rtl">RTL (right-to-left)</PSelectOption>
      <PSelectOption value="auto">Auto</PSelectOption>
    </PSelect>
  );
};
