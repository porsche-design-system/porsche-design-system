const mediaQueries = [
  '(min-width:0px) and (max-width:479px)',
  '(min-width:480px) and (max-width:759px)',
  '(min-width:760px) and (max-width:999px)',
  '(min-width:1000px) and (max-width:1299px)',
  '(min-width:1300px) and (max-width:1759px)',
  '(min-width:1760px) and (max-width:1919px)',
];
export const mediaQueryLists = mediaQueries.map((mediaQuery) => window.matchMedia(mediaQuery));

let lastBreakpointIndex: number;

export const breakpointChangeCallbackMap: Map<HTMLElement, () => void> = new Map();

export const addBreakpointCallback = (node: HTMLElement, callback: () => void): void => {
  // node might not be defined in connectedCallback
  if (node) {
    if (breakpointChangeCallbackMap.size === 0) {
      mediaQueryLists.forEach((mediaQueryList, index) => {
        mediaQueryList.addEventListener('change', (e) => handleBreakpointChange(e, index));
      });
    }
    breakpointChangeCallbackMap.set(node, callback);
  }
};

export const removeBreakpointCallback = (node: HTMLElement): void => {
  if (breakpointChangeCallbackMap.has(node)) {
    breakpointChangeCallbackMap.delete(node);
  }
  if (breakpointChangeCallbackMap.size === 0) {
    mediaQueryLists.forEach((mediaQueryList, index) => {
      mediaQueryList.removeEventListener('change', (e) => handleBreakpointChange(e, index));
    });
  }
};

const handleBreakpointChange = ({ matches }: MediaQueryListEvent, index: number): void => {
  if (matches && index !== lastBreakpointIndex) {
    lastBreakpointIndex = index;
    breakpointChangeCallbackMap.forEach((breakpointChangeCallback) => breakpointChangeCallback());
  }
};
