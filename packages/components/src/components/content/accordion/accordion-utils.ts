import { BreakpointCustomizable, getTagName, pxToRemWithUnit } from '../../../utils';
import { stringify } from '../../../../tests/unit/helper';

const ACCORDION_SIZE = ['small', 'medium'] as const;
export type AccordionSize = typeof ACCORDION_SIZE[number];
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

export const getContentWrapperHeight = ({ height }: DOMRectReadOnly, isCompact: boolean): string => {
  const CONTENT_PADDING_TOP = isCompact ? 0 : 8;
  return pxToRemWithUnit(height + CONTENT_PADDING_TOP);
};

export const throwIfCompactAndSizeIsSet = (
  host: HTMLElement,
  compact: boolean,
  size: BreakpointCustomizable<AccordionSize>
): void => {
  if (compact && size !== 'small') {
    throw new Error(`Size of '${stringify(size)}' is ignored when compact is set to 'true' on ${getTagName(host)}.`);
  }
};
