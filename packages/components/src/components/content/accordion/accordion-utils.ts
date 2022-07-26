import type { BreakpointCustomizable } from '../../../utils';
import { getTagName } from '../../../utils';
import { pxToRemWithUnit } from '../../../styles';

export const ACCORDION_SIZES = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZES[number];
export type AccordionChangeEvent = { open: boolean };

export const setCollapsibleElementHeight = (
  collapsibleElement: HTMLDivElement,
  isOpen: boolean,
  contentWrapperHeight: string
): void => {
  if (collapsibleElement) {
    collapsibleElement.style.height = isOpen ? contentWrapperHeight : '0';
  }
};

export const getContentHeight = ({ height }: DOMRectReadOnly, isCompact: boolean): string => {
  const contentPaddingTop = isCompact ? 0 : 8;
  return pxToRemWithUnit(height + contentPaddingTop);
};

export const warnIfCompactAndSizeIsSet = (
  host: HTMLElement,
  compact: boolean,
  size: BreakpointCustomizable<AccordionSize>
): void => {
  if (compact && size !== 'small') {
    console.warn(`Property "size" of ${getTagName(host)} is ignored when property "compact" is set to "true".`);
  }
};
