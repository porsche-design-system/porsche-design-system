import type { Theme } from '../../../types';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import {
  ITEM_PADDING,
  ICON_SIZE,
  ICON_MARGIN,
  ITEM_FONT,
} from '../segmented-control-item/segmented-control-item-styles';
import { fontFamily } from '@porsche-design-system/utilities-v2';
import { getPrefixedTagNames, getTagName } from '../../../utils';

export const SEGMENTED_CONTROL_BACKGROUND_COLORS = ['background-surface', 'background-default'] as const;
export type SegmentedControlBackgroundColor = typeof SEGMENTED_CONTROL_BACKGROUND_COLORS[number];

export type SegmentedControlChangeEvent = { value: string };

// temporary dom node to measure max-width of children content
const tempDiv = document.createElement('div');
tempDiv.style.position = 'absolute';
tempDiv.style.visibility = 'hidden';
tempDiv.style.padding = `0 ${ITEM_PADDING}`;
tempDiv.style.boxSizing = 'border-box';
tempDiv.style.font = ITEM_FONT.replace(fontFamily, '"Porsche Next",sans-serif');

const tempIcon = document.createElement('div');
tempIcon.style.display = 'inline-block';
tempIcon.style.width = ICON_SIZE;
tempIcon.style.marginRight = ICON_MARGIN;

export const getItemMaxWidth = (host: HTMLElement): number => {
  host.shadowRoot.append(tempDiv);

  const widths = Array.from(host.children).map((item: HTMLElement & SegmentedControlItem) => {
    tempDiv.innerHTML = item.innerHTML;
    if (item.icon) {
      tempDiv.prepend(tempIcon);
    }
    return parseFloat(getComputedStyle(tempDiv).width);
  });

  tempDiv.remove();

  return Math.max(...widths); // * 1.03; // TODO: buffer to be on safe side?
};

export const syncItemsProps = (
  host: HTMLElement,
  theme: Theme,
  backgroundColor: SegmentedControlBackgroundColor
): void => {
  Array.from(host.children).forEach((item: HTMLElement & SegmentedControlItemInternalHTMLProps) => {
    item.theme = theme;
    item.backgroundColor = backgroundColor;
  });
};

export const renderInputOutsideShadowRoot = (host: HTMLElement, name: string, value: string | number): void => {
  let input = host.querySelector('input');
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    host.append(input);
  }
  input.name = name;
  input.value = `${value}`;
};

export const isEventTargetSegmentedControlItem = (host: HTMLElement, target: HTMLElement): boolean => {
  return getTagName(target) === getPrefixedTagNames(host).pSegmentedControlItem;
};
