import { colorFocus } from '../color';

export type Options = {
  offset?: string;
};

/**
 * Applies a **focus-visible** outline style with configurable `offset`.
 * @signature getFocusVisibleStyle({ offset: string = '2px' })
 */
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
