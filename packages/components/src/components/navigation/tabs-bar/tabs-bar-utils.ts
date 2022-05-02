import type { TextWeight } from '../../../types';
import { pxToRemWithUnit } from '../../../styles';

const TAB_SIZE = ['small', 'medium'] as const;
export type TabSize = typeof TAB_SIZE[number];

export type TabWeight = Extract<TextWeight, 'regular' | 'semibold'>;

export type TabChangeEvent = { activeTabIndex: number };
const ENABLE_TRANSITION_CLASS = 'bar--enable-transition';

export const sanitizeActiveTabIndex = (index: number, tabElementsCount: number): number => {
  // TODO: Adjust this check when working on the validation / fallback ticket https://github.com/porscheui/porsche-design-system/issues/1235
  if (index === undefined || index === null || isNaN(index)) {
    return undefined;
  }

  const maxIndex = tabElementsCount - 1; // can be -1 without children
  let sanitizedIndex: number;

  if (maxIndex < 0 || index < 0 || index > maxIndex) {
    sanitizedIndex = undefined;
  } else {
    sanitizedIndex = index;
  }
  return sanitizedIndex;
};

export const addEnableTransitionClass = (barElement: HTMLElement): void => {
  barElement.classList.add(ENABLE_TRANSITION_CLASS);
};

export const removeEnableTransitionClass = (barElement: HTMLElement): void => {
  barElement.classList.remove(ENABLE_TRANSITION_CLASS);
};

export const getTransformationToInactive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const barWidth = offsetWidth > 0 ? offsetWidth : 0;
  const barCenter = barWidth / 2;
  const barPositionLeft = offsetLeft > 0 ? offsetLeft : 0;
  const xTranslation = barPositionLeft + barCenter;
  const xTranslate = pxToRemWithUnit(xTranslation || 0);
  return `transform: translate3d(${xTranslate},0,0); width: 0;`;
};

export const getTransformationToActive = ({ offsetWidth, offsetLeft }: HTMLElement = {} as HTMLElement): string => {
  const barWidth = pxToRemWithUnit(offsetWidth || 0);
  const barPositionLeft = pxToRemWithUnit(offsetLeft > 0 ? offsetLeft : 0);
  return `transform: translate3d(${barPositionLeft},0,0); width: ${barWidth};`;
};

export const determineEnableTransitionClass = (
  activeTabIndex: number,
  prevActiveTabIndex: number,
  barElement: HTMLElement
): void => {
  // initial active + inactive to active
  if (activeTabIndex !== undefined && prevActiveTabIndex === undefined) {
    removeEnableTransitionClass(barElement);
  } else {
    // active to active
    addEnableTransitionClass(barElement);
  }
};

export const tabsBarsMutationMap: Map<Node, () => void> = new Map();

const tabsBarsObserver = new MutationObserver((mutations) => {
  mutations
    // remove duplicates so we execute callback only once per node
    .filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)
    .forEach((mutation) => tabsBarsMutationMap.get(mutation.target)?.());
});

export const observeTabsBars = <T extends HTMLElement>(node: T, callback: () => void): void => {
  // node might not be defined in connectedCallback
  if (node) {
    tabsBarsMutationMap.set(node, callback);
    tabsBarsObserver.observe(node, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
};

export const unobserveAttributes = <T extends HTMLElement>(node: T): void => {
  tabsBarsMutationMap.delete(node);
};
