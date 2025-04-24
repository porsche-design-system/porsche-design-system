'use client';

import type { StorefrontDirection } from '@/models/dir';
import {
  PPopover,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';

type DirectionSelectProps = {
  value: StorefrontDirection;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onUpdate: (event: CustomEvent<SelectUpdateEventDetail>) => void;
};

export const DirectionSelect = ({
  value = 'ltr',
  label = 'Direction',
  hideLabel = false,
  onUpdate,
}: DirectionSelectProps) => {
  return (
    <PSelect name="direction" value={value} hideLabel={hideLabel} compact={true} onUpdate={onUpdate}>
      <span slot="label" className="inline-flex gap-static-xs">
        {label}
        <PPopover onClick={(e) => e.preventDefault()}>
          Changes the direction of HTML elements, mostly used on
          <code>
            {'<'}html{'>'}
          </code>{' '}
          tag to support languages which are read from right to left like e.g. Arabic.
        </PPopover>
      </span>
      <PSelectOption value="ltr">LTR (left-to-right)</PSelectOption>
      <PSelectOption value="rtl">RTL (right-to-left)</PSelectOption>
      <PSelectOption value="auto">Auto</PSelectOption>
    </PSelect>
  );
};
