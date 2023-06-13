import { themeLightStateFocus } from '../theme';
import { borderRadiusMedium, borderRadiusSmall, borderWidthBase } from '../border';

type Offset = 'small' | 'none';
type BorderRadius = 'small' | 'medium';
type Options = {
  offset?: Offset | string;
  borderRadius?: BorderRadius | string;
};

export const getFocusStyle = (opts?: Options) => {
  const outlineOffset = opts?.offset === 'small' ? '2px' : opts?.offset === 'none' ? 0 : opts?.offset || '2px';
  const borderRadius =
    opts?.borderRadius === 'small'
      ? borderRadiusSmall
      : opts?.borderRadius === 'medium'
      ? borderRadiusMedium
      : opts?.borderRadius || borderRadiusSmall;

  return {
    borderRadius, // it's visually being reflected on both (when placed here), element and focus outline
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
