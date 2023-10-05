import { themeLightStateHover } from '../theme';
import { borderRadiusMedium, borderRadiusSmall } from '../border';
// import { frostedGlassStyle } from '../frostedGlass';

type BorderRadius = 'small' | 'medium';
type Options = {
  borderRadius?: BorderRadius | string;
};

const offsetHorizontal = '2px';

export const getHoverStyle = (opts?: Options) => {
  const { borderRadius = 'small' } = opts || {};
  const borderRadiusValue =
    borderRadius === 'small'
      ? borderRadiusSmall
      : borderRadius === 'medium'
      ? borderRadiusMedium
      : borderRadius || borderRadiusSmall;

  return {
    borderRadius: borderRadiusValue, // it's visually being reflected on both (when placed here), element and hover
    marginLeft: `-${offsetHorizontal}`,
    marginRight: `-${offsetHorizontal}`,
    paddingLeft: offsetHorizontal,
    paddingRight: offsetHorizontal,
    // TODO: how can we test this later in vrt?
    '@media(hover:hover)': {
      '&': {
        transition: 'background var(--p-transition-duration, .24s) ease',
      },
      '&:hover': {
        // ...frostedGlassStyle,
        background: themeLightStateHover, // hover color is equal for light and dark theme
      },
    },
  } as const;
};
