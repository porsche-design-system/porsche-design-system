import {
  borderRadiusMedium,
  motionDurationShort,
  motionEasingBase,
  spacingStaticSmall,
} from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import { OPTION_LIST_SAFE_ZONE, type Theme } from '../../utils';
import { getHasCSSAnchorPositioningSupport } from '../../utils/supportsNativeCSSAnchorPositioning';
import { getThemedColors } from '../colors';
import { cssVariableAnimationDuration } from '../common-styles';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';

type Direction = 'up' | 'down' | 'auto';

const hasNativeCSSAnchorPositioningSupport = getHasCSSAnchorPositioningSupport();

const keyframesName = 'fade-in';

export const getPopoverKeyframesStyles: Styles = {
  [`@keyframes ${keyframesName}`]: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
};

export const getPopoverJssStyle = (
  isOpen: boolean,
  direction: Direction,
  anchorName: string,
  cssVarScaling: string | number,
  optionHeight: number,
  theme: Theme
): JssStyle => {
  const { contrastLowColor, backgroundColor } = getThemedColors(theme);
  const { contrastLowColor: contrastLowColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');

  return {
    all: 'unset',
    position: 'absolute',
    padding: `max(2px, ${cssVarScaling} * 6px)`,
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: `max(2px, ${cssVarScaling} * ${spacingStaticSmall})`,
    maxHeight: `${8.5 * (optionHeight + 8) + 6 + 2}px`, // 8.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)
    boxSizing: 'border-box',
    overflow: 'hidden auto',
    // scrollBehavior: 'smooth', // when defined, `.scrollTo()` isn't applied immediately
    // overscrollBehaviorY: 'none', // when defined, rubber band scroll effect is getting lost on iOS Safari
    // WebkitOverflowScrolling: 'touch', // not necessary anymore for iOS Safari
    scrollbarWidth: 'thin', // firefox
    scrollbarColor: 'auto', // firefox
    animation: `var(${cssVariableAnimationDuration}, ${motionDurationShort}) ${keyframesName} ${motionEasingBase} forwards`,
    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.15))',
    background: backgroundColor,
    border: `1px solid ${contrastLowColor}`,
    borderRadius: borderRadiusMedium,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundColorDark,
      borderColor: contrastLowColorDark,
    }),
    '&:not(:popover-open)': {
      display: 'none',
    },
    zIndex: 99, // ensures option list is rendered on top for browsers not supporting #top-layer
    ...(hasNativeCSSAnchorPositioningSupport && {
      positionAnchor: anchorName,
      positionVisibility: 'always',
      positionTryOrder: 'normal',
      positionArea: direction === 'up' ? 'top' : 'bottom',
      positionTryFallbacks: 'flip-block',
      width: 'anchor-size(width)',
      margin: `${OPTION_LIST_SAFE_ZONE}px 0`,
    }),
  };
};
