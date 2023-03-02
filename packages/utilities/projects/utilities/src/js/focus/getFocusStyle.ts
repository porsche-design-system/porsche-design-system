import type { Theme } from '../theme';
import { themeDarkStateFocus, themeLightStateFocus } from '../theme';
import { borderRadiusMedium, borderRadiusSmall, borderWidthBase } from '../border';

type Size = 'small' | 'medium';
type Inset = Size;
type BorderRadius = Size;
type Options = {
  inset?: Inset | string;
  borderRadius?: BorderRadius | string;
  theme?: Theme;
};

export const getFocusStyle = (opts?: Options) => {
  const inset = opts?.inset === 'small' ? '-4px' : opts?.inset === 'medium' ? '-6px' : opts?.inset || '-4px';
  const borderRadius =
    opts?.borderRadius === 'small'
      ? borderRadiusSmall
      : opts?.borderRadius === 'medium'
      ? borderRadiusMedium
      : opts?.borderRadius || borderRadiusSmall;

  return {
    position: 'relative',
    // we can't use outline, since border-radius has no effect on outline style in Safari
    outline: 0,
    '&:focus::after': {
      content: '""',
      position: 'absolute',
      inset,
      pointerEvents: 'none', // necessary to be able to select elements behind pseudo-element
      border: `${borderWidthBase} solid ${opts?.theme === 'dark' ? themeDarkStateFocus : themeLightStateFocus}`,
      borderRadius,
    },
    // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
    '&:focus:not(:focus-visible)::after': {
      borderColor: 'transparent',
    },
  } as const;
};
