import { borderRadiusMedium, borderRadiusSmall } from '../border/generated/deprecated';
import { themeLightStateFocus } from '../color/generated/deprecated';

export type Options = {
  offset?: 'small' | 'none' | string;
  borderRadius?: 'small' | 'medium' | string;
};

/** @deprecated since v4.0.0, will be removed with next major release. Use getFocusVisibleStyle instead. */
export const getFocusStyle = (opts?: Options) => {
  const { offset, borderRadius } = opts || {};

  return {
    '&:focus': {
      outline: `2px solid ${themeLightStateFocus}`,
      outlineOffset: offset === 'none' ? 0 : offset === 'small' || offset === undefined ? '2px' : offset,
    },
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent',
    },
    borderRadius:
      borderRadius === 'medium'
        ? borderRadiusMedium
        : borderRadius === undefined || borderRadius === 'small'
          ? borderRadiusSmall
          : borderRadius,
  } as const;
};

