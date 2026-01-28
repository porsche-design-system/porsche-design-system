import {
  colorBackdrop,
  colorBackdropDark,
  colorBackdropLight,
  colorCanvas,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHigh,
  colorContrastHighDark,
  colorContrastHigher,
  colorContrastHigherDark,
  colorContrastHigherLight,
  colorContrastHighLight,
  colorContrastLow,
  colorContrastLowDark,
  colorContrastLower,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMedium,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorDisabledDark,
  colorDisabledLight,
  colorError,
  colorErrorDark,
  colorErrorFrosted,
  colorErrorFrostedDark,
  colorErrorFrostedLight,
  colorErrorFrostedSoft,
  colorErrorFrostedSoftDark,
  colorErrorFrostedSoftLight,
  colorErrorLight,
  colorErrorLow,
  colorErrorLowDark,
  colorErrorLowLight,
  colorErrorMedium,
  colorErrorMediumDark,
  colorErrorMediumLight,
  colorFocus,
  colorFocusDark,
  colorFocusLight,
  colorFrosted,
  colorFrostedDark,
  colorFrostedLight,
  colorFrostedSoft,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorInfo,
  colorInfoDark,
  colorInfoFrosted,
  colorInfoFrostedDark,
  colorInfoFrostedLight,
  colorInfoFrostedSoft,
  colorInfoFrostedSoftDark,
  colorInfoFrostedSoftLight,
  colorInfoLight,
  colorInfoLow,
  colorInfoLowDark,
  colorInfoLowLight,
  colorInfoMedium,
  colorInfoMediumDark,
  colorInfoMediumLight,
  colorPrimary,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccess,
  colorSuccessDark,
  colorSuccessFrosted,
  colorSuccessFrostedDark,
  colorSuccessFrostedLight,
  colorSuccessFrostedSoft,
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLow,
  colorSuccessLowDark,
  colorSuccessLowLight,
  colorSuccessMedium,
  colorSuccessMediumDark,
  colorSuccessMediumLight,
  colorSurface,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarning,
  colorWarningDark,
  colorWarningFrosted,
  colorWarningFrostedDark,
  colorWarningFrostedLight,
  colorWarningFrostedSoft,
  colorWarningFrostedSoftDark,
  colorWarningFrostedSoftLight,
  colorWarningLight,
  colorWarningLow,
  colorWarningLowDark,
  colorWarningLowLight,
  colorWarningMedium,
  colorWarningMediumDark,
  colorWarningMediumLight,
} from '@porsche-design-system/tokens';

export const getColorScss = () => {
  return `
    $color-focus: ${colorFocus};
    $color-focus-light: ${colorFocusLight};
    $color-focus-dark: ${colorFocusDark};
    $color-canvas: ${colorCanvas};
    $color-canvas-light: ${colorCanvasLight};
    $color-canvas-dark: ${colorCanvasDark};
    $color-surface: ${colorSurface};
    $color-surface-light: ${colorSurfaceLight};
    $color-surface-dark: ${colorSurfaceDark};
    $color-frosted: ${colorFrosted};
    $color-frosted-light: ${colorFrostedLight};
    $color-frosted-dark: ${colorFrostedDark};
    $color-frosted-soft: ${colorFrostedSoft};
    $color-frosted-soft-light: ${colorFrostedSoftLight};
    $color-frosted-soft-dark: ${colorFrostedSoftDark};
    $color-backdrop: ${colorBackdrop};
    $color-backdrop-light: ${colorBackdropLight};
    $color-backdrop-dark: ${colorBackdropDark};
    $color-contrast-lower: ${colorContrastLower};
    $color-contrast-lower-light: ${colorContrastLowerLight};
    $color-contrast-lower-dark: ${colorContrastLowerDark};
    $color-contrast-low: ${colorContrastLow};
    $color-contrast-low-light: ${colorContrastLowLight};
    $color-contrast-low-dark: ${colorContrastLowDark};
    $color-contrast-medium: ${colorContrastMedium};
    $color-contrast-medium-light: ${colorContrastMediumLight};
    $color-contrast-medium-dark: ${colorContrastMediumDark};
    $color-contrast-high: ${colorContrastHigh};
    $color-contrast-high-light: ${colorContrastHighLight};
    $color-contrast-high-dark: ${colorContrastHighDark};
    $color-contrast-higher: ${colorContrastHigher};
    $color-contrast-higher-light: ${colorContrastHigherLight};
    $color-contrast-higher-dark: ${colorContrastHigherDark};
    $color-primary: ${colorPrimary};
    $color-primary-light: ${colorPrimaryLight};
    $color-primary-dark: ${colorPrimaryDark};
    $color-success: ${colorSuccess};
    $color-success-light: ${colorSuccessLight};
    $color-success-dark: ${colorSuccessDark};
    $color-success-low: ${colorSuccessLow};
    $color-success-low-light: ${colorSuccessLowLight};
    $color-success-low-dark: ${colorSuccessLowDark};
    $color-success-medium: ${colorSuccessMedium};
    $color-success-medium-light: ${colorSuccessMediumLight};
    $color-success-medium-dark: ${colorSuccessMediumDark};
    $color-success-frosted: ${colorSuccessFrosted};
    $color-success-frosted-light: ${colorSuccessFrostedLight};
    $color-success-frosted-dark: ${colorSuccessFrostedDark};
    $color-success-frosted-soft: ${colorSuccessFrostedSoft};
    $color-success-frosted-soft-light: ${colorSuccessFrostedSoftLight};
    $color-success-frosted-soft-dark: ${colorSuccessFrostedSoftDark};
    $color-warning: ${colorWarning};
    $color-warning-light: ${colorWarningLight};
    $color-warning-dark: ${colorWarningDark};
    $color-warning-low: ${colorWarningLow};
    $color-warning-low-light: ${colorWarningLowLight};
    $color-warning-low-dark: ${colorWarningLowDark};
    $color-warning-medium: ${colorWarningMedium};
    $color-warning-medium-light: ${colorWarningMediumLight};
    $color-warning-medium-dark: ${colorWarningMediumDark};
    $color-warning-frosted: ${colorWarningFrosted};
    $color-warning-frosted-light: ${colorWarningFrostedLight};
    $color-warning-frosted-dark: ${colorWarningFrostedDark};
    $color-warning-frosted-soft: ${colorWarningFrostedSoft};
    $color-warning-frosted-soft-light: ${colorWarningFrostedSoftLight};
    $color-warning-frosted-soft-dark: ${colorWarningFrostedSoftDark};
    $color-error: ${colorError};
    $color-error-light: ${colorErrorLight};
    $color-error-dark: ${colorErrorDark};
    $color-error-low: ${colorErrorLow};
    $color-error-low-light: ${colorErrorLowLight};
    $color-error-low-dark: ${colorErrorLowDark};
    $color-error-medium: ${colorErrorMedium};
    $color-error-medium-light: ${colorErrorMediumLight};
    $color-error-medium-dark: ${colorErrorMediumDark};
    $color-error-frosted: ${colorErrorFrosted};
    $color-error-frosted-light: ${colorErrorFrostedLight};
    $color-error-frosted-dark: ${colorErrorFrostedDark};
    $color-error-frosted-soft: ${colorErrorFrostedSoft};
    $color-error-frosted-soft-light: ${colorErrorFrostedSoftLight};
    $color-error-frosted-soft-dark: ${colorErrorFrostedSoftDark};
    $color-info: ${colorInfo};
    $color-info-light: ${colorInfoLight};
    $color-info-dark: ${colorInfoDark};
    $color-info-low: ${colorInfoLow};
    $color-info-low-light: ${colorInfoLowLight};
    $color-info-low-dark: ${colorInfoLowDark};
    $color-info-medium: ${colorInfoMedium};
    $color-info-medium-light: ${colorInfoMediumLight};
    $color-info-medium-dark: ${colorInfoMediumDark};
    $color-info-frosted: ${colorInfoFrosted};
    $color-info-frosted-light: ${colorInfoFrostedLight};
    $color-info-frosted-dark: ${colorInfoFrostedDark};
    $color-info-frosted-soft: ${colorInfoFrostedSoft};
    $color-info-frosted-soft-light: ${colorInfoFrostedSoftLight};
    $color-info-frosted-soft-dark: ${colorInfoFrostedSoftDark};

    /* TBD: $color-skeleton: #f7f7f7; */

    $pds-theme-light-primary: ${colorPrimaryLight}; /* alias (deprecated) */
    $pds-theme-light-background-base: ${colorCanvasLight}; /* alias (deprecated) */
    $pds-theme-light-background-surface: ${colorSurfaceLight}; /* alias (deprecated) */
    $pds-theme-light-background-shading: ${colorBackdropLight}; /* alias (deprecated) */
    $pds-theme-light-background-frosted: ${colorFrostedLight}; /* alias (deprecated) */
    $pds-theme-light-contrast-low: ${colorContrastLowLight}; /* alias (deprecated) */
    $pds-theme-light-contrast-medium: ${colorContrastMediumLight}; /* alias (deprecated) */
    $pds-theme-light-contrast-high: ${colorContrastHighLight}; /* alias (deprecated) */
    $pds-theme-light-notification-success: ${colorSuccessLight}; /* alias (deprecated) */
    $pds-theme-light-notification-success-soft: ${colorSuccessFrostedLight}; /* alias (deprecated) */
    $pds-theme-light-notification-warning: ${colorWarningLight}; /* alias (deprecated) */
    $pds-theme-light-notification-warning-soft: ${colorWarningFrostedLight}; /* alias (deprecated) */
    $pds-theme-light-notification-error: ${colorErrorLight}; /* alias (deprecated) */
    $pds-theme-light-notification-error-soft: ${colorErrorFrostedLight}; /* alias (deprecated) */
    $pds-theme-light-notification-info: ${colorInfoLight}; /* alias (deprecated) */
    $pds-theme-light-notification-info-soft: ${colorInfoFrostedLight}; /* alias (deprecated) */
    $pds-theme-light-state-hover: hsla(236, 6.4%, 51%, 0.148); /* alias (deprecated) */
    $pds-theme-light-state-active: hsla(236, 6.4%, 51%, 0.148); /* alias (deprecated) */
    $pds-theme-light-state-focus: #1a44ea; /* alias (deprecated) */
    $pds-theme-light-state-disabled: ${colorDisabledLight}; /* alias (deprecated) */
    $pds-theme-dark-primary: ${colorPrimaryDark}; /* alias (deprecated) */
    $pds-theme-dark-background-base: ${colorCanvasDark}; /* alias (deprecated) */
    $pds-theme-dark-background-surface: ${colorSurfaceDark}; /* alias (deprecated) */
    $pds-theme-dark-background-shading: ${colorBackdropDark}; /* alias (deprecated) */
    $pds-theme-dark-background-frosted: ${colorFrostedDark}; /* alias (deprecated) */
    $pds-theme-dark-contrast-low: ${colorContrastLowDark}; /* alias (deprecated) */
    $pds-theme-dark-contrast-medium: ${colorContrastMediumDark}; /* alias (deprecated) */
    $pds-theme-dark-contrast-high: ${colorContrastHighDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-success: ${colorSuccessDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-success-soft: ${colorSuccessFrostedDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-warning: ${colorWarningDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-warning-soft: ${colorWarningFrostedDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-error: ${colorErrorDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-error-soft: ${colorErrorFrostedDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-info: ${colorInfoDark}; /* alias (deprecated) */
    $pds-theme-dark-notification-info-soft: ${colorInfoFrostedDark}; /* alias (deprecated) */
    $pds-theme-dark-state-hover: hsla(240, 2.2%, 44.1%, 0.228); /* alias (deprecated) */
    $pds-theme-dark-state-active: hsla(240, 2.2%, 44.1%, 0.228); /* alias (deprecated) */
    $pds-theme-dark-state-focus: #1a44ea; /* alias (deprecated) */
    $pds-theme-dark-state-disabled: ${colorDisabledDark}; /* alias (deprecated) */
`;
};
