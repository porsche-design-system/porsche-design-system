import type { Theme } from '../../../types';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';

export const SEGMENTED_CONTROL_BACKGROUND_COLORS = ['background-surface', 'background-default'] as const;
export type SegmentedControlBackgroundColor = typeof SEGMENTED_CONTROL_BACKGROUND_COLORS[number];

export const getItemMaxWidth = async (host: HTMLElement): Promise<number> => {
  const widths = await Promise.all(
    Array.from(host.children).map(async (item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';

      host.parentElement.append(clone);
      await (clone as any).componentOnReady();
      const { width } = getComputedStyle(clone);
      clone.remove();

      return width;
    })
  );

  return Math.max(...widths.map(parseFloat)) * 1.03;
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
