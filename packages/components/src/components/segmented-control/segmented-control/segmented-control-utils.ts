import { borderWidthBase, fontFamily } from '@porsche-design-system/emotion';
import { forceUpdate } from '@stencil/core';
import { hasDocument } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import {
  BUTTON_FONT,
  getScalableItemStyles,
  ICON_MARGIN,
  ICON_SIZE,
  LABEL_FONT,
} from '../segmented-control-item/segmented-control-item-styles';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';

export type SegmentedControlChangeEventDetail = { value: string | number };

export const SEGMENTED_CONTROL_COLUMNS = ['auto', ...Array.from(new Array(25), (_, i) => i + 1)];
export type SegmentedControlColumns = (typeof SEGMENTED_CONTROL_COLUMNS)[number];

export type SegmentedControlState = FormState;

// Expect Porsche Next to be available and use sans-serif (wide font for safety buffer) as fallback
const tempFont = 'Porsche Next, sans-serif';

// temporary dom node to measure max-width of children content
// All width relevant styling has to be kept in sync with the button of the p-segmented-control-item
export const tempDiv = hasDocument ? document.createElement('div') : undefined;
if (tempDiv) {
  tempDiv.style.position = 'absolute';
  tempDiv.style.visibility = 'hidden';
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

export const getItemWidths = (host: HTMLElement, compact: boolean): { minWidth: number | string; maxWidth: number } => {
  tempDiv.innerHTML = '';
  host.shadowRoot.append(tempDiv);

  const { dimension, padding } = getScalableItemStyles(
    false /* Uses the largest possible padding of the item */,
    compact
  );

  const widths = Array.from(host.children)
    .filter((el) => el.slot !== 'label' && el.slot !== 'message' && el.slot !== 'description')
    .map((item: HTMLElement & SegmentedControlItem) => {
      tempDiv.innerHTML = item.innerHTML;
      tempDiv.style.minWidth = dimension;
      tempDiv.style.padding = padding;

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

  return { minWidth: dimension, maxWidth: Math.max(...widths) };
};

type Item = HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps;

export const syncSegmentedControlItemsProps = (
  host: HTMLElement,
  value: string | number,
  disabled: boolean,
  state: SegmentedControlState,
  message: string,
  compact: boolean
): void => {
  for (const item of Array.from(host.children).filter(
    (el) => el.slot !== 'label' && el.slot !== 'message' && el.slot !== 'description'
  )) {
    (item as Item).selected = (item as Item).value === value;
    (item as Item).state = state;
    (item as Item).message = message;
    (item as Item).compact = compact;
    (item as Item).disabledParent = disabled;
    forceUpdate(item);
  }
};
