import type { Theme } from '../../../types';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';

export const SEGMENTED_CONTROL_BACKGROUND_COLORS = ['background-surface', 'background-default'] as const;
export type SegmentedControlBackgroundColor = typeof SEGMENTED_CONTROL_BACKGROUND_COLORS[number];

// temporary dom node to measure max-width of children content
const tempDiv = document.createElement('div'); // TODO: font-family?
tempDiv.style.position = 'absolute';
tempDiv.style.visibility = 'hidden';
tempDiv.style.padding = '0 2.5rem';
tempDiv.style.boxSizing = 'border-box';

export const getItemMaxWidth = (host: HTMLElement): number => {
  host.shadowRoot.append(tempDiv);

  const widths = Array.from(host.children).map((item) => {
    tempDiv.innerHTML = item.innerHTML;
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
