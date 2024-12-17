import { type Options, getFocusNestedStyles, getFocusStyles } from '../../js/focus/getFocusStyle';

export const getFocusStyle = (opts?: Options) => {
  const { borderRadius, offset } = opts || {};
  return {
    ...getFocusStyles(borderRadius),
    selectors: {
      ...getFocusNestedStyles(offset),
    },
  } as const;
};
