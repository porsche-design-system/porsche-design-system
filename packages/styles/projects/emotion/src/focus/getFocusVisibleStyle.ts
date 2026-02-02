import { themeLightStateFocus } from '../color';

export type Options = {
  offset?: string;
};

export const getFocusVisibleStyle = (opts?: Options) => {
  const { offset = '2px' } = opts || {};
  return {
    '&:focus-visible': {
      outline: `2px solid ${themeLightStateFocus}`,
      outlineOffset: offset,
    },
  } as const;
};
