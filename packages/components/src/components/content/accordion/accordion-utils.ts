import { pxToRemWithUnit } from '../../../utils';

const ACCORDION_SIZE = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZE[number];
export type AccordionChangeEvent = { open: boolean };

export const setCollapsibleElementHeight = (
  collapsibleElement: HTMLDivElement,
  isOpen: boolean,
  contentWrapperHeight: string
): void => {
  collapsibleElement.style.height = isOpen ? contentWrapperHeight : '0';
};

export const getContentWrapperHeight = ({ height }: DOMRectReadOnly, isCompact: boolean): string => {
  const CONTENT_PADDING_TOP = isCompact ? 0 : 8;
  return pxToRemWithUnit(height + CONTENT_PADDING_TOP);
};
