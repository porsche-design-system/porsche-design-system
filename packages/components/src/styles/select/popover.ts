import {
  borderRadiusMedium,
  motionDurationShort,
  motionEasingBase,
  spacingStaticSmall,
} from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import { isThemeDark, OPTION_LIST_SAFE_ZONE, type Theme } from '../../utils';
import { getThemedColors } from '../colors';
import { cssVariableAnimationDuration } from '../common-styles';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';

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
  cssVarScaling: string | 1, // "1" is needed for components not yet supporting compact mode
  optionHeight: 40 | 44,
  theme: Theme
): JssStyle => {
  const { contrast20Color, canvasColor, surfaceColor } = getThemedColors(theme);
  const { contrast20Color: contrast20ColorDark, surfaceColor: surfaceColorDark } = getThemedColors('dark');

  const minHeightOptionList = `calc(${4.5 * (optionHeight + 8) + 6 + 2}px)`; // 4.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)

  return {
    all: 'unset',
    position: 'absolute',
    zIndex: 99, // needed for backwards compatibility, to enable browsers not supporting #top-layer
    padding: `max(2px, ${cssVarScaling} * 6px)`,
    display: isOpen ? 'flex' : 'none', // needed for backwards compatibility, otherwise 'flex' would be enough
    flexDirection: 'column',
    gap: `max(2px, ${cssVarScaling} * ${spacingStaticSmall})`,
    maxHeight: `max(${minHeightOptionList}, calc(50vh - 54px / 2 - ${OPTION_LIST_SAFE_ZONE}px * 2))`,
    boxSizing: 'border-box',
    overflow: 'hidden auto',
    scrollbarWidth: 'thin', // firefox
    scrollbarColor: 'auto', // firefox
    animation: `var(${cssVariableAnimationDuration}, ${motionDurationShort}) ${keyframesName} ${motionEasingBase} forwards`,
    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.15))',
    background: isThemeDark(theme) ? surfaceColor : canvasColor,
    border: `1px solid ${contrast20Color}`,
    borderRadius: borderRadiusMedium,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: surfaceColorDark,
      borderColor: contrast20ColorDark,
    }),
    '&:not(:popover-open)': {
      display: 'none',
    },
  };
};
