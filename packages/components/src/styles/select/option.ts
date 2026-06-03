import {
  colorContrastHigh,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  radiusSm,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle } from 'jss';
import { getTransition } from '../common-styles';
import { forcedColorsMediaQuery } from '../media-query/forced-colors-media-query';

export const getOptionJssStyle = (
  componentName: 'select-option' | 'multi-select-option',
  cssVarScalingName: string
): JssStyle => {
  const gap = `calc(11.2px * (${ref(cssVarScalingName)} - 0.64285714) + 4px)`;
  const paddingBlock = `calc(11.2px * (${ref(cssVarScalingName)} - 0.64285714) + 4px)`;
  const paddingInline = `${ref(`--_p-${componentName}-b`, `calc(16.8px * (${ref(cssVarScalingName)} - 0.64285714) + 6px)`)} calc(16.8px * (${ref(cssVarScalingName)} - 0.64285714) + 6px)`;

  return {
    display: 'flex',
    gap,
    paddingBlock,
    paddingInline,
    minHeight: ref(leadingNormal), // preserves height for empty option
    font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    color: ref(colorContrastHigh),
    cursor: 'pointer',
    textAlign: 'start',
    wordBreak: 'break-word',
    boxSizing: 'content-box',
    borderRadius: ref(legacyRadiusSmall, ref(radiusSm)),
    transition: `${getTransition('background-color')}, ${getTransition('color')}`,
    '&--highlighted': {
      background: ref(colorFrosted),
      ...forcedColorsMediaQuery({
        forcedColorAdjust: 'none',
        outline: '2px solid Highlight',
        outlineOffset: '-2px',
      }),
    },
    '&--highlighted, &--selected': {
      color: ref(colorPrimary),
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
