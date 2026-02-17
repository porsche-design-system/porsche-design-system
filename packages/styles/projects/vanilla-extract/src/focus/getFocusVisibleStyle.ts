import { colorFocus } from '../color';

export type Options = {
  offset?: string;
};

export const getFocusVisibleStyle = (opts?: Options) => {
  const { offset = '2px' } = opts || {};
  return {
    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${colorFocus}`,
        outlineOffset: offset,
      },
    },
  } as const;
};
