const mediaQueries = [
  '(min-width:0px) and (max-width:479px)',
  '(min-width:480px) and (max-width:759px)',
  '(min-width:760px) and (max-width:999px)',
  '(min-width:1000px) and (max-width:1299px)',
  '(min-width:1300px) and (max-width:1759px)',
  '(min-width:1760px) and (max-width:1919px)',
];
const mediaQueryLists = mediaQueries.map((mediaQuery) => window.matchMedia(mediaQuery));

let lastBreakpointIndex: number;

const breakpointChangeCallbacks: Map<HTMLElement, () => void> = new Map();

export const addBreakpointCallback = (node: HTMLElement, callback: () => void): void => {
  // node might not be defined in connectedCallback
  if (node) {
    if (breakpointChangeCallbacks.size === 0) {
      mediaQueryLists.forEach((mediaQueryList, index) =>
        mediaQueryList.addEventListener('change', (e) => handleBreakpointChange(e, index))
      );
    }
    breakpointChangeCallbacks.set(node, callback);
  }
};

export const removeBreakpointCallback = (node: HTMLElement): void => {
  if (breakpointChangeCallbacks.has(node)) {
    breakpointChangeCallbacks.delete(node);
  }
  if (breakpointChangeCallbacks.size === 0) {
    mediaQueryLists.forEach((mediaQueryList, index) =>
      mediaQueryList.removeEventListener('change', (e) => handleBreakpointChange(e, index))
    );
  }
};

const handleBreakpointChange = ({ matches }: MediaQueryListEvent, index: number): void => {
  if (matches && index !== lastBreakpointIndex) {
    lastBreakpointIndex = index;
    breakpointChangeCallbacks.forEach((breakpointChangeCallback) => breakpointChangeCallback());
  }
};
