import { themeLightStateHover } from '../theme';
import { borderRadiusMedium, borderRadiusSmall } from '../border';
// import { frostedGlassStyle } from '../frostedGlass';

type BorderRadius = 'small' | 'medium';
type Options = {
  borderRadius?: BorderRadius | string;
};

const offsetHorizontal = '2px';

export const getHoverStyle = (opts?: Options) => {
  const borderRadius =
    opts?.borderRadius === 'small'
      ? borderRadiusSmall
      : opts?.borderRadius === 'medium'
      ? borderRadiusMedium
      : opts?.borderRadius || borderRadiusSmall;

  return {
    borderRadius, // it's visually being reflected on both (when placed here), element and hover
    marginLeft: `-${offsetHorizontal}`,
    marginRight: `-${offsetHorizontal}`,
    paddingLeft: offsetHorizontal,
    paddingRight: offsetHorizontal,
    transition: 'background var(--p-transition-duration, .24s) ease',
    // TODO: how can we test this later in vrt?
    '@media(hover:hover)': {
      '&:hover': {
        // ...frostedGlassStyle,
        background: themeLightStateHover, // hover color is equal for light and dark theme
      },
    },
  } as const;
};
