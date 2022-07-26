import type { BreakpointCustomizable } from '../../../utils';
import { getTagName, observeChildren, unobserveChildren } from '../../../utils';
import { pxToRemWithUnit } from '../../../styles';
import { Accordion } from './accordion';

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

export const registeredAccordions: Accordion[] = [];

export const onWindowResize = (): void => {
  registeredAccordions.forEach((accordion) => {
    accordion.setContentHeight();
  });
};

export const observeWindowResize = (accordion: Accordion): void => {
  if (!registeredAccordions.includes(accordion)) {
    registeredAccordions.push(accordion);
    window.addEventListener('resize', onWindowResize);
  }
};

export const unobserveWindowResize = (accordion: Accordion): void => {
  const index = registeredAccordions.indexOf(accordion);
  if (index > -1) {
    registeredAccordions.splice(index, 1);
  }
  if (registeredAccordions.length === 0) {
    window.removeEventListener('resize', onWindowResize);
  }
};

export const mutationObserverFallback = (accordion: Accordion): void => {
  observeWindowResize(accordion);
  observeChildren(accordion.host, accordion.setContentHeight);
};

export const removeMutationObserverFallback = (accordion: Accordion): void => {
  unobserveWindowResize(accordion);
  unobserveChildren(accordion.host);
};
