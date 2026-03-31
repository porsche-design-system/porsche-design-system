import type { JssStyle } from 'jss';
import { getTransition } from '../common-styles';
import {
  colorContrastHigh,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  radiusSm,
  typescaleSm,
} from '../css-variables';
import { forcedColorsMediaQuery } from '../media-query/forced-colors-media-query';

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
    minHeight: leadingNormal, // preserves height for empty option
    font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
    color: colorContrastHigh,
    cursor: 'pointer',
    textAlign: 'start',
    wordBreak: 'break-word',
    boxSizing: 'content-box',
    borderRadius: `var(${legacyRadiusSmall}, ${radiusSm})`,
    transition: `${getTransition('background-color')}, ${getTransition('color')}`,
    '&--highlighted': {
      background: colorFrosted,
      ...forcedColorsMediaQuery({
        forcedColorAdjust: 'none',
        outline: '2px solid Highlight',
        outlineOffset: '-2px',
      }),
    },
    '&--highlighted, &--selected': {
      color: colorPrimary,
    },
    '&--disabled': {
      cursor: 'not-allowed',
      ...forcedColorsMediaQuery({
        color: 'GrayText',
      }),
    },
    '&--hidden': {
      display: 'none',
    },
  };
};
