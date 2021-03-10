import { pxToRem } from '@porsche-design-system/utilities';
import { prefix } from '../../../utils';

export const sanitizeActiveTabIndex = (index: number, tabElementsCount: number): number => {
  if (index === undefined) {
    return undefined;
  }
  const maxIndex = tabElementsCount - 1; // can be -1 without children
  let sanitizedIndex: number;

  if (maxIndex < 0) {
    sanitizedIndex = 0;
  } else if (index > maxIndex) {
    sanitizedIndex = maxIndex;
  } else {
    sanitizedIndex = index;
  }
  return sanitizedIndex;
};

export const getXTranslationToInactive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const statusBarWidth = offsetWidth > 0 ? offsetWidth : 0;
  const statusBarCenter = statusBarWidth / 2;
  const statusBarPositionLeft = offsetLeft > 0 ? offsetLeft : 0;
  const xTranslation = statusBarPositionLeft + statusBarCenter;
  return xTranslation ? pxToRem(`${xTranslation}px`) : '0';
};
export const addEnableTransitionClass = (statusBarElement: HTMLElement): void => {
  statusBarElement.classList.add(prefix('tabs-bar__status-bar--enable-transition'));
};
export const removeEnableTransitionClass = (statusBarElement: HTMLElement): void => {
  statusBarElement.classList.remove(prefix('tabs-bar__status-bar--enable-transition'));
};

export const toggleEnableTransitionClass = (
  activeTabIndex: number,
  prevActiveTabIndex: number,
  statusBarElement: HTMLElement
): void => {
  // initial active + inactive to active
  if (activeTabIndex !== undefined && prevActiveTabIndex === undefined) {
    removeEnableTransitionClass(statusBarElement);
  } else {
    // active to active
    addEnableTransitionClass(statusBarElement);
  }
};
