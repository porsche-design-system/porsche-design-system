'use client';

import type { StorefrontTextZoom } from '@/models/textZoom';
import {
  PPopover,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';

type TextZoomSelectProps = {
  value: StorefrontTextZoom;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onUpdate: (event: CustomEvent<SelectUpdateEventDetail>) => void;
};

export const TextZoomSelect = ({
  value = '100%',
  label = 'Text Zoom',
  hideLabel = false,
  onUpdate,
}: TextZoomSelectProps) => {
  return (
    <PSelect name="text-zoom" value={value} hideLabel={hideLabel} compact={true} onUpdate={onUpdate}>
      <span slot="label" className="inline-flex gap-static-xs">
        {label}
        <PPopover onClick={(e) => e.preventDefault()}>
          Changes the text size and values with unit <code>rem</code> or <code>em</code> relatively. This setting can be
          defined in browser settings for any website or by an application itself on
          <code>
            {'<'}html{'>'}
          </code>{' '}
          tag. To achieve WCAG 2.2 AA compliance it's obligatory to support text zoom up to at least 200%.
        </PPopover>
      </span>
      <PSelectOption value="100%">100%</PSelectOption>
      <PSelectOption value="130%">130%</PSelectOption>
      <PSelectOption value="150%">150%</PSelectOption>
      <PSelectOption value="200%">200%</PSelectOption>
    </PSelect>
  );
};
