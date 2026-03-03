'use client';

import {
  PPopover,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { StorefrontTextZoom } from '@/models/textZoom';

type TextZoomSelectProps = {
  value: StorefrontTextZoom;
  label?: PSelectProps['label'];
  hideLabel?: PSelectProps['hideLabel'];
  onTextZoomChange: (event: CustomEvent<SelectChangeEventDetail>) => void;
};

export const TextZoomSelect = ({
  value = '100%',
  label = 'Text Zoom',
  hideLabel = false,
  onTextZoomChange,
}: TextZoomSelectProps) => {
  return (
    <PSelect name="text-zoom" value={value} hideLabel={hideLabel} compact={true} onChange={onTextZoomChange}>
      <span slot="label">{label}</span>
      <PPopover slot="label-after" onClick={(e) => e.preventDefault()}>
        To ensure accessibility and comply with <b>WCAG 2.2 AA standards</b>, it is mandatory for web content to support
        text resizing up to at least <b>200%</b> without loss of content or functionality. Using relative units like{' '}
        <code>rem</code> is a best practice for achieving this, as they allow the text to scale uniformly based on the
        user's browser settings.
      </PPopover>
      <PSelectOption value="100%">100%</PSelectOption>
      <PSelectOption value="130%">130%</PSelectOption>
      <PSelectOption value="150%">150%</PSelectOption>
      <PSelectOption value="200%">200%</PSelectOption>
    </PSelect>
  );
};
