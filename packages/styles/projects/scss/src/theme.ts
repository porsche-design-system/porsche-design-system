import {
  colorBackdropDark,
  colorBackdropLight,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHighDark,
  colorContrastHighLight,
  colorContrastLowDark,
  colorContrastLowLight,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorDark,
  colorErrorFrostedDark,
  colorErrorFrostedLight,
  colorErrorLight,
  colorFrostedDark,
  colorFrostedLight,
  colorInfoDark,
  colorInfoFrostedDark,
  colorInfoFrostedLight,
  colorInfoLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessFrostedDark,
  colorSuccessFrostedLight,
  colorSuccessLight,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarningDark,
  colorWarningFrostedDark,
  colorWarningFrostedLight,
  colorWarningLight,
} from '@porsche-design-system/tokens';

export const getThemeScss = () => {
  return `
    $pds-theme-light-primary: ${colorPrimaryLight};
    $pds-theme-light-background-base: ${colorCanvasLight};
    $pds-theme-light-background-surface: ${colorSurfaceLight};
    $pds-theme-light-background-shading: ${colorBackdropLight};
    $pds-theme-light-background-frosted: ${colorFrostedLight};
    $pds-theme-light-contrast-low: ${colorContrastLowLight};
    $pds-theme-light-contrast-medium: ${colorContrastMediumLight};
    $pds-theme-light-contrast-high: ${colorContrastHighLight};
    $pds-theme-light-notification-success: ${colorSuccessLight};
    $pds-theme-light-notification-success-soft: ${colorSuccessFrostedLight};
    $pds-theme-light-notification-warning: ${colorWarningLight};
    $pds-theme-light-notification-warning-soft: ${colorWarningFrostedLight};
    $pds-theme-light-notification-error: ${colorErrorLight};
    $pds-theme-light-notification-error-soft: ${colorErrorFrostedLight};
    $pds-theme-light-notification-info: ${colorInfoLight};
    $pds-theme-light-notification-info-soft: ${colorInfoFrostedLight};
    $pds-theme-light-state-hover: hsla(236, 6.4%, 51%, 0.148);
    $pds-theme-light-state-active: hsla(236, 6.4%, 51%, 0.148);
    $pds-theme-light-state-focus: #1a44ea;
    $pds-theme-light-state-disabled: ${colorDisabledLight};
    $pds-theme-dark-primary: ${colorPrimaryDark};
    $pds-theme-dark-background-base: ${colorCanvasDark};
    $pds-theme-dark-background-surface: ${colorSurfaceDark};
    $pds-theme-dark-background-shading: ${colorBackdropDark};
    $pds-theme-dark-background-frosted: ${colorFrostedDark};
    $pds-theme-dark-contrast-low: ${colorContrastLowDark};
    $pds-theme-dark-contrast-medium: ${colorContrastMediumDark};
    $pds-theme-dark-contrast-high: ${colorContrastHighDark};
    $pds-theme-dark-notification-success: ${colorSuccessDark};
    $pds-theme-dark-notification-success-soft: ${colorSuccessFrostedDark};
    $pds-theme-dark-notification-warning: ${colorWarningDark};
    $pds-theme-dark-notification-warning-soft: ${colorWarningFrostedDark};
    $pds-theme-dark-notification-error: ${colorErrorDark};
    $pds-theme-dark-notification-error-soft: ${colorErrorFrostedDark};
    $pds-theme-dark-notification-info: ${colorInfoDark};
    $pds-theme-dark-notification-info-soft: ${colorInfoFrostedDark};
    $pds-theme-dark-state-hover: hsla(240, 2.2%, 44.1%, 0.228);
    $pds-theme-dark-state-active: hsla(240, 2.2%, 44.1%, 0.228);
    $pds-theme-dark-state-focus: #1a44ea;
    $pds-theme-dark-state-disabled: ${colorDisabledDark};
`;
};
