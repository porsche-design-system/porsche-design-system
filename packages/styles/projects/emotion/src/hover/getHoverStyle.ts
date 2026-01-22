import { borderRadiusMedium, borderRadiusSmall } from '../border';
import { motionDurationShort, motionEasingBase } from '../motion';
import { themeLightStateHover } from '../theme';

type BorderRadius = 'small' | 'medium';
export type Options = {
  borderRadius?: BorderRadius | string;
};

const offsetHorizontal = '2px';

export const getHoverStyles = (borderRadius: Options['borderRadius'] = 'small') => {
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
    transition: `background var(--p-transition-duration, ${motionDurationShort}) ${motionEasingBase}`,
  };
};

export const getHoverNestedStyles = () => {
  return {
    background: themeLightStateHover, // hover color is equal for light and dark theme
  };
};

export const getHoverStyle = (opts?: Options) => {
  const { borderRadius } = opts || {};
  return {
    ...getHoverStyles(borderRadius),
    // TODO: how can we test this later in vrt?
    '@media(hover:hover)': {
      '&:hover': {
        ...getHoverNestedStyles(),
      },
    },
  } as const;
};
