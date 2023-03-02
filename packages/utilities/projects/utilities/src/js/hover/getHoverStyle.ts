import type { Theme } from '../theme';
import { themeDarkStateHover, themeLightStateHover } from '../theme';
import { borderRadiusMedium, borderRadiusSmall } from '../border';
import { frostedGlassStyle } from '../frostedGlass';

type Size = 'small' | 'medium';
type Inset = Size;
type BorderRadius = Size;
type Options = {
  inset?: Inset | string;
  borderRadius?: BorderRadius | string;
  theme?: Theme;
};

export const getHoverStyle = (opts?: Options) => {
  const inset = opts?.inset === 'small' ? '-4px' : opts?.inset === 'medium' ? '-6px' : opts?.inset || '-4px';
  const borderRadius =
    opts?.borderRadius === 'small'
      ? borderRadiusSmall
      : opts?.borderRadius === 'medium'
      ? borderRadiusMedium
      : opts?.borderRadius || borderRadiusSmall;

  return {
    position: 'relative',
    zIndex: 0, // ensures pseudo-element gets behind text node but not behind parent node
    // TODO: how can we test this later in vrt?
    '@media(hover:hover)': {
      '&:hover::before': {
        content: '""',
        position: 'absolute',
        inset,
        pointerEvents: 'none', // necessary to be able to select elements behind pseudo-element
        zIndex: -1, // ensures pseudo-element gets behind text node
        ...frostedGlassStyle,
        background: opts?.theme === 'dark' ? themeDarkStateHover : themeLightStateHover,
        borderRadius,
      },
    },
  } as const;
};
