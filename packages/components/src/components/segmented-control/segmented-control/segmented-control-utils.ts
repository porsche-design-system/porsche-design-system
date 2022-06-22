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
import { getPrefixedTagNames } from '../../../utils';
import { forceUpdate } from '@stencil/core';

export const SEGMENTED_CONTROL_BACKGROUND_COLORS = ['background-surface', 'background-default'] as const;
export type SegmentedControlBackgroundColor = typeof SEGMENTED_CONTROL_BACKGROUND_COLORS[number];

export type SegmentedControlChangeEvent = { value: string | number };

// wide font for safety buffer, Porsche Next might not be available or not used and cause wrong calculation
const tempFont = 'sans-serif';

// temporary dom node to measure max-width of children content
export const tempDiv = document.createElement('div');
tempDiv.style.position = 'absolute';
tempDiv.style.visibility = 'hidden';
tempDiv.style.padding = `0 ${ITEM_PADDING}`;
tempDiv.style.boxSizing = 'border-box';
tempDiv.style.font = BUTTON_FONT.replace(fontFamily, tempFont);

export const tempLabel = document.createElement('div');
tempLabel.style.font = LABEL_FONT.replace(fontFamily, tempFont);

export const tempIcon = document.createElement('div');
tempIcon.style.display = 'inline-block';
tempIcon.style.width = ICON_SIZE;
tempIcon.style.marginRight = ICON_MARGIN;

export const getItemMaxWidth = (host: HTMLElement): number => {
  tempDiv.innerHTML = '';
  host.shadowRoot.append(tempDiv);

  const widths = Array.from(host.children).map((item: HTMLElement & SegmentedControlItem) => {
    tempDiv.innerHTML = item.innerHTML;

    if (item.icon || item.iconSource) {
      tempDiv.prepend(tempIcon);
    }
    if (item.label) {
      tempLabel.innerHTML = item.label;
      tempDiv.prepend(tempLabel);
    }

    return parseFloat(getComputedStyle(tempDiv).width);
  });

  tempDiv.remove();

  return Math.max(...widths);
};

export const syncItemsProps = (
  host: HTMLElement,
  value: string | number,
  backgroundColor: SegmentedControlBackgroundColor,
  theme: Theme
): void => {
  Array.from(host.children).forEach(
    (item: HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps) => {
      item.selected = item.value === value;
      item.backgroundColor = backgroundColor;
      item.theme = theme;
      forceUpdate(item);
    }
  );
};

export const getClickedSegmentedControlItem = (
  host: HTMLElement,
  targets: EventTarget[]
): HTMLElement & SegmentedControlItem => {
  const { pSegmentedControlItem } = getPrefixedTagNames(host);
  return targets.find(
    (x: HTMLElement) => x.tagName?.toLowerCase() === pSegmentedControlItem
  ) as unknown as HTMLElement & SegmentedControlItem;
};
