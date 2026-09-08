'use client';

import {
  PPopover,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { StorefrontDirection } from '@/models/dir';

type DirectionSelectProps = {
  value: StorefrontDirection;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onDirectionChange: (event: CustomEvent<SelectChangeEventDetail>) => void;
};

export const DirectionSelect = ({
  value = 'ltr',
  label = 'Direction',
  hideLabel = false,
  onDirectionChange,
}: DirectionSelectProps) => {
  return (
    <PSelect name="direction" value={value} hideLabel={hideLabel} compact={true} onChange={onDirectionChange}>
      <span slot="label">{label}</span>
      <PPopover slot="label-after" onClick={(e) => e.preventDefault()}>
        The <code>dir</code> global attribute in HTML changes the direction of text and other content within an element.
        It's most often used on the{' '}
        <code>
          {'<'}html{'>'}
        </code>{' '}
        tag to set the entire page's direction, which is crucial for supporting languages that are written from{' '}
        <b>right to left</b> (RTL), such as Arabic and Hebrew. For example, using{' '}
        <code>
          {'<'}html dir="rtl"{'>'}
        </code>{' '}
        makes the entire page display from right to left, adjusting the layout and text flow accordingly.
      </PPopover>
      <PSelectOption value="ltr">LTR (left-to-right)</PSelectOption>
      <PSelectOption value="rtl">RTL (right-to-left)</PSelectOption>
    </PSelect>
  );
};
