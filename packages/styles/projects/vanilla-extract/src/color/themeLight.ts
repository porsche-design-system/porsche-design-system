import {
  colorBackdropLight,
  colorCanvasLight,
  colorContrastHighLight,
  colorContrastLowLight,
  colorContrastMediumLight,
  colorErrorFrostedLight,
  colorErrorLight,
  colorFocusLight,
  colorFrostedLight,
  colorInfoFrostedLight,
  colorInfoLight,
  colorPrimaryLight,
  colorSuccessFrostedLight,
  colorSuccessLight,
  colorSurfaceLight,
  colorWarningFrostedLight,
  colorWarningLight,
} from '@porsche-design-system/tokens';

/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
export const themeLight = {
  primary: colorPrimaryLight,
  background: {
    base: colorCanvasLight,
    surface: colorSurfaceLight,
    shading: colorBackdropLight,
    frosted: colorFrostedLight,
  },
  contrast: { low: colorContrastLowLight, medium: colorContrastMediumLight, high: colorContrastHighLight },
  notification: {
    success: colorSuccessLight,
    successSoft: colorSuccessFrostedLight,
    warning: colorWarningLight,
    warningSoft: colorWarningFrostedLight,
    error: colorErrorLight,
    errorSoft: colorErrorFrostedLight,
    info: colorInfoLight,
    infoSoft: colorInfoFrostedLight,
  },
  state: {
    hover: colorFrostedLight,
    active: colorFrostedLight,
    focus: colorFocusLight,
    disabled: 'hsla(233,6.6%,23.9%,0.412)',
  },
};
