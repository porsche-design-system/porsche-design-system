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

export const getContentWrapperHeight = (
  borderBoxSize: ResizeObserverSize | readonly ResizeObserverSize[],
  contentRect: DOMRectReadOnly
): string => {
  let contentBlockHeight;

  // Safari does not support borderBoxSize
  if (!borderBoxSize) {
    contentBlockHeight = contentRect.height;
  } else {
    // Firefox implements `borderBoxSize` as a single content rect, rather than an array
    const { blockSize } = borderBoxSize[0] || borderBoxSize;
    contentBlockHeight = blockSize;
  }
  return pxToRemWithUnit(contentBlockHeight);
};
