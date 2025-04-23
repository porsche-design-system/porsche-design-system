import { borderWidthBase, fontFamily } from '@porsche-design-system/styles';
import { forceUpdate } from '@stencil/core';
import type { Theme } from '../../../types';
import { hasDocument } from '../../../utils';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import {
  BUTTON_FONT,
  ICON_MARGIN,
  ICON_SIZE,
  ITEM_PADDING,
  LABEL_FONT,
} from '../segmented-control-item/segmented-control-item-styles';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';

export const SEGMENTED_CONTROL_BACKGROUND_COLORS = ['background-surface', 'background-default'] as const; // 'background-color' prop is deprecated
export type SegmentedControlBackgroundColor = (typeof SEGMENTED_CONTROL_BACKGROUND_COLORS)[number]; // 'background-color' prop is deprecated

/** @deprecated */
export type SegmentedControlUpdateEvent = { value: string | number };
export type SegmentedControlUpdateEventDetail = SegmentedControlUpdateEvent;

export const SEGMENTED_CONTROL_COLUMNS = ['auto', ...Array.from(new Array(25), (_, i) => i + 1)];
export type SegmentedControlColumns = (typeof SEGMENTED_CONTROL_COLUMNS)[number];

// Expect Porsche Next to be available and use sans-serif (wide font for safety buffer) as fallback
const tempFont = 'Porsche Next, sans-serif';

// temporary dom node to measure max-width of children content
// All width relevant styling has to be kept in sync with the button of the p-segmented-control-item
export const tempDiv = hasDocument ? document.createElement('div') : undefined;
if (tempDiv) {
  tempDiv.style.position = 'absolute';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.padding = `0 ${ITEM_PADDING}`; // Uses the largest possible padding of the item
  tempDiv.style.border = `${borderWidthBase} solid`;
  tempDiv.style.boxSizing = 'border-box';
  tempDiv.style.font = BUTTON_FONT.replace(fontFamily, tempFont);
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
  tempDiv.innerHTML = '';
  host.shadowRoot.append(tempDiv);

  const widths = Array.from(host.children, (item: HTMLElement & SegmentedControlItem) => {
    tempDiv.innerHTML = item.innerHTML;

    if (item.icon || item.iconSource) {
      tempDiv.prepend(tempIcon);
    }
    if (item.label) {
      tempLabel.innerHTML = item.label;
      tempDiv.prepend(tempLabel);
    }

    return Number.parseFloat(getComputedStyle(tempDiv).width);
  });

  tempDiv.remove();

  return Math.max(...widths);
};

type Item = HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps;

export const syncSegmentedControlItemsProps = (
  host: HTMLElement,
  value: string | number,
  disabled: boolean,
  theme: Theme
): void => {
  for (const item of Array.from(host.children)) {
    (item as Item).selected = (item as Item).value === value;
    (item as Item).theme = theme;
    (item as Item).disabledParent = disabled;
    forceUpdate(item);
  }
};
