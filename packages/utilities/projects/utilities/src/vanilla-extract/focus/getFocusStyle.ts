import { borderRadiusMedium, borderRadiusSmall, borderWidthBase } from '../border';
import { themeLightStateFocus } from '../theme';

type Offset = 'small' | 'none';
type BorderRadius = 'small' | 'medium';

export type Options = {
  offset?: Offset | string;
  borderRadius?: BorderRadius | string;
};

const getFocusStyles = (borderRadius: Options['borderRadius'] = 'small') => {
  const borderRadiusValue =
    borderRadius === 'small'
      ? borderRadiusSmall
      : borderRadius === 'medium'
        ? borderRadiusMedium
        : borderRadius || borderRadiusSmall;
  return {
    // TODO: borderRadius should be removed from interface
    // TODO: evaluate if '&::-moz-focus-inner': { border: 0 } is useful/needed for FF
    borderRadius: borderRadiusValue, // it's visually being reflected on both (when placed here), element and focus outline
  };
};

const getFocusNestedStyles = (offset: Options['offset'] = '2px') => {
  const outlineOffset = offset === 'small' ? '2px' : offset === 'none' ? 0 : offset || '2px';
  return {
    '&:focus': {
      outline: `${borderWidthBase} solid ${themeLightStateFocus}`,
      outlineOffset,
    },
    // why? have a look at this article https://tpgi.com/focus-visible-and-backwards-compatibility/
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent',
    },
  } as const;
};

export const getFocusStyle = (opts?: Options) => {
  const { borderRadius, offset } = opts || {};
  return {
    ...getFocusStyles(borderRadius),
    selectors: {
      ...getFocusNestedStyles(offset),
    },
  } as const;
};
