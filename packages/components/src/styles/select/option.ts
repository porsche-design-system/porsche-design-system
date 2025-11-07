import { borderRadiusSmall, fontLineHeight, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { colors } from '../colors';
import { getTransition } from '../common-styles';

const { primaryColor, contrastLowColor, contrastHighColor, disabledColor } = colors;

export const getOptionJssStyle = (
  componentName: 'select-option' | 'multi-select-option',
  cssVarScaling: string | 1 // "1" is needed for components not yet supporting compact mode
): JssStyle => {
  const gap = `max(4px, ${cssVarScaling} * 12px)`;
  const paddingBlock = `max(2px, ${cssVarScaling} * ${spacingStaticSmall})`;
  const paddingInline = `max(4px, ${cssVarScaling} * var(--p-internal-${componentName}-padding-left, 12px)) max(4px, ${cssVarScaling} * 12px)`;

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
      background: contrastLowColor,
    },
    '&--highlighted, &--selected': {
      color: primaryColor,
    },
    '&--disabled': {
      cursor: 'not-allowed',
      color: disabledColor,
    },
    '&--hidden': {
      display: 'none',
    },
  };
};
