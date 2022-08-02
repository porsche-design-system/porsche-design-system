import { breakpoint } from '@porsche-design-system/utilities-v2';

export const mediaQueries = [
  `(min-width:${breakpoint.xxs})`,
  `(min-width:${breakpoint.xs})`,
  `(min-width:${breakpoint.s})`,
  `(min-width:${breakpoint.m})`,
  `(min-width:${breakpoint.l})`,
  `(min-width:${breakpoint.xl})`,
];

export const mediaQueryLists = mediaQueries.map((mediaQuery) => window.matchMedia(mediaQuery));

export const breakpointChangeCallbackMap: Map<HTMLElement, () => void> = new Map();

export const observeBreakpointChange = (node: HTMLElement, callback: () => void): void => {
  // node might not be defined in connectedCallback
  if (node) {
    if (breakpointChangeCallbackMap.size === 0) {
      mediaQueryLists.forEach((mediaQueryList) => {
        mediaQueryList.addEventListener('change', handleBreakpointChange);
      });
    }
    breakpointChangeCallbackMap.set(node, callback);
  }
};

export const unobserveBreakpointChange = (node: HTMLElement): void => {
  if (breakpointChangeCallbackMap.has(node)) {
    breakpointChangeCallbackMap.delete(node);
  }
  if (breakpointChangeCallbackMap.size === 0) {
    mediaQueryLists.forEach((mediaQueryList) => {
      mediaQueryList.removeEventListener('change', handleBreakpointChange);
    });
  }
};

export const handleBreakpointChange = (): void => {
  breakpointChangeCallbackMap.forEach((breakpointChangeCallback) => {
    breakpointChangeCallback();
  });
};
