import { motionDurationShort, motionEasingBase } from '@porsche-design-system/emotion';
import type { JssStyle, Styles } from 'jss';
import { OPTION_LIST_SAFE_ZONE } from '../../utils';
import { colors } from '../colors';
import { cssVariableAnimationDuration } from '../common-styles';
import { legacyRadiusMedium, radiusXl } from '../css-variables';

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

const { contrastLowColor, canvasColor } = colors;

export const getPopoverJssStyle = (isOpen: boolean, cssVarScalingName: string, optionHeight: 40 | 44): JssStyle => {
  const minHeightOptionList = `calc(${4.5 * (optionHeight + 8) + 6 + 2}px)`; // 4.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)

  const padding = `calc(11.2px * (var(${cssVarScalingName}) - 0.64285714) + 4px)`;
  const gap = `calc(11.2px * (var(${cssVarScalingName}) - 0.64285714) + 4px)`;

  return {
    all: 'unset',
    position: 'absolute',
    zIndex: 99, // needed for backwards compatibility, to enable browsers not supporting #top-layer
    padding,
    display: isOpen ? 'flex' : 'none', // needed for backwards compatibility, otherwise 'flex' would be enough
    flexDirection: 'column',
    gap,
    maxHeight: `max(${minHeightOptionList}, calc(50vh - 54px / 2 - ${OPTION_LIST_SAFE_ZONE}px * 2))`,
    boxSizing: 'border-box',
    overflow: 'hidden auto',
    scrollbarWidth: 'thin', // firefox
    scrollbarColor: 'auto', // firefox
    animation: `var(${cssVariableAnimationDuration}, ${motionDurationShort}) ${keyframesName} ${motionEasingBase} forwards`,
    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.15))',
    background: canvasColor,
    border: `1px solid ${contrastLowColor}`,
    borderRadius: `var(${legacyRadiusMedium}, ${radiusXl})`,
    '&:not(:popover-open)': {
      display: 'none',
    },
  };
};
