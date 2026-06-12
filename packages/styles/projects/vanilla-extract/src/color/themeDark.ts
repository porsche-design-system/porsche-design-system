import {
  colorBackdropDark,
  colorCanvasDark,
  colorContrastHighDark,
  colorContrastLowDark,
  colorContrastMediumDark,
  colorErrorDark,
  colorErrorFrostedDark,
  colorFocusDark,
  colorFrostedDark,
  colorInfoDark,
  colorInfoFrostedDark,
  colorPrimaryDark,
  colorSuccessDark,
  colorSuccessFrostedDark,
  colorSurfaceDark,
  colorWarningDark,
  colorWarningFrostedDark,
} from '@porsche-design-system/tokens';

/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
export const themeDark = {
  primary: colorPrimaryDark,
  background: {
    base: colorCanvasDark,
    surface: colorSurfaceDark,
    shading: colorBackdropDark,
    frosted: colorFrostedDark,
  },
  contrast: { low: colorContrastLowDark, medium: colorContrastMediumDark, high: colorContrastHighDark },
  notification: {
    success: colorSuccessDark,
    successSoft: colorSuccessFrostedDark,
    warning: colorWarningDark,
    warningSoft: colorWarningFrostedDark,
    error: colorErrorDark,
    errorSoft: colorErrorFrostedDark,
    info: colorInfoDark,
    infoSoft: colorInfoFrostedDark,
  },
  state: {
    hover: colorFrostedDark,
    active: colorFrostedDark,
    focus: colorFocusDark,
    disabled: 'hsla(240,1.5%,61.8%,0.302)',
  },
};
