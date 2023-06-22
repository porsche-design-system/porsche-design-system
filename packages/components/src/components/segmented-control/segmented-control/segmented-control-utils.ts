import type { Theme } from '../../../types';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import {
  BUTTON_FONT,
  ICON_MARGIN,
  ICON_SIZE,
  ITEM_PADDING,
  LABEL_FONT,
} from '../segmented-control-item/segmented-control-item-styles';
import { fontFamily } from '@porsche-design-system/utilities-v2';
import { forceUpdate } from '@stencil/core';
import { hasDocument } from '../../../utils';

export const SEGMENTED_CONTROL_BACKGROUND_COLORS = ['background-surface', 'background-default'] as const; // 'background-color' prop is deprecated
export type SegmentedControlBackgroundColor = (typeof SEGMENTED_CONTROL_BACKGROUND_COLORS)[number]; // 'background-color' prop is deprecated

export type SegmentedControlUpdateEvent = { value: string | number };

// Expect Porsche Next to be available and use sans-serif (wide font for safety buffer) as fallback
/* eslint-disable @typescript-eslint/quotes */
const tempFont = 'Porsche Next, sans-serif';

// temporary dom node to measure max-width of children content
export const tempButton = hasDocument ? document.createElement('button') : undefined;
if (tempButton) {
  tempButton.style.position = 'absolute';
  tempButton.style.visibility = 'hidden';
  tempButton.style.padding = `0 ${ITEM_PADDING}`;
  tempButton.style.boxSizing = 'border-box';
  tempButton.style.font = BUTTON_FONT.replace(fontFamily, tempFont);
}

export const tempLabel = hasDocument ? document.createElement('div') : undefined;
if (tempLabel) {
  tempLabel.style.font = LABEL_FONT.replace(fontFamily, tempFont);
}

export const tempIcon = hasDocument ? document.createElement('div') : undefined;
if (tempIcon) {
  tempIcon.style.display = 'inline-block';
  tempIcon.style.width = ICON_SIZE;
  tempIcon.style.marginRight = ICON_MARGIN;
}

export const getItemMaxWidth = (host: HTMLElement): number => {
  tempButton.innerHTML = '';
  host.shadowRoot.append(tempButton);

  const widths = Array.from(host.children).map((item: HTMLElement & SegmentedControlItem) => {
    tempButton.innerHTML = item.innerHTML;

    if (item.icon || item.iconSource) {
      tempButton.prepend(tempIcon);
    }
    if (item.label) {
      tempLabel.innerHTML = item.label;
      tempButton.prepend(tempLabel);
    }

    return parseFloat(getComputedStyle(tempButton).width);
  });

  tempButton.remove();

  return Math.max(...widths);
};

export const syncSegmentedControlItemsProps = (host: HTMLElement, value: string | number, theme: Theme): void => {
  Array.from(host.children).forEach(
    (item: HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps) => {
      item.selected = item.value === value;
      item.theme = theme;
      forceUpdate(item);
    }
  );
};
