import { borderRadiusSmall, fontLineHeight, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { colors } from '../colors';
import { getTransition } from '../common-styles';

const { primaryColor, frostedSoftColor, contrastHighColor } = colors;

export const getOptionJssStyle = (
  componentName: 'select-option' | 'multi-select-option',
  cssVarScalingName: string
): JssStyle => {
  const gap = `calc(11.2px * (var(${cssVarScalingName}) - 0.64285714) + 4px)`;
  const paddingBlock = `calc(11.2px * (var(${cssVarScalingName}) - 0.64285714) + 4px)`;
  const paddingInline = `var(--p-internal-${componentName}-padding-left, calc(16.8px * (var(${cssVarScalingName}) - 0.64285714) + 6px)) calc(16.8px * (var(${cssVarScalingName}) - 0.64285714) + 6px)`;

  return {
    display: 'flex',
    gap,
    paddingBlock,
    paddingInline,
    minHeight: fontLineHeight, // preserves height for empty option
    ...textSmallStyle,
    color: contrastHighColor,
    cursor: 'pointer',
    textAlign: 'start',
    wordBreak: 'break-word',
    boxSizing: 'content-box',
    borderRadius: borderRadiusSmall,
    transition: `${getTransition('background-color')}, ${getTransition('color')}`,
    '&--highlighted': {
      background: frostedSoftColor,
    },
    '&--highlighted, &--selected': {
      color: primaryColor,
    },
    '&--disabled': {
      cursor: 'not-allowed',
    },
    '&--hidden': {
      display: 'none',
    },
  };
};
