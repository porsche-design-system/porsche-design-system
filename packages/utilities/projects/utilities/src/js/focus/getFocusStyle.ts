import { themeLightStateFocus } from '../theme';
import { borderRadiusMedium, borderRadiusSmall, borderWidthBase } from '../border';

type Offset = 'small' | 'none';
type BorderRadius = 'small' | 'medium';
type Options = {
  offset?: Offset | string;
  borderRadius?: BorderRadius | string;
};

export const getFocusStyle = (opts?: Options) => {
  const { borderRadius = 'small', offset = '2px' } = opts || {};
  const outlineOffset = offset === 'small' ? '2px' : offset === 'none' ? 0 : offset || '2px';
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
    '&:focus': {
      outline: `${borderWidthBase} solid ${themeLightStateFocus}`,
      outlineOffset,
    },
    // why? have a look at this article https://www.tpgi.com/focus-visible-and-backwards-compatibility/
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent',
    },
  } as const;
};
