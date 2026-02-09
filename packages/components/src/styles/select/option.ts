import { fontLineHeight, textSmallStyle } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import { getTransition } from '../common-styles';
import { colorContrastHigh, colorFrostedSoft, colorPrimary, legacyRadiusSmall, radiusSm } from '../css-variables';

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
    color: colorContrastHigh,
    cursor: 'pointer',
    textAlign: 'start',
    wordBreak: 'break-word',
    boxSizing: 'content-box',
    borderRadius: `var(${legacyRadiusSmall}, ${radiusSm})`,
    transition: `${getTransition('background-color')}, ${getTransition('color')}`,
    '&--highlighted': {
      background: colorFrostedSoft,
    },
    '&--highlighted, &--selected': {
      color: colorPrimary,
    },
    '&--disabled': {
      cursor: 'not-allowed',
    },
    '&--hidden': {
      display: 'none',
    },
  };
};
