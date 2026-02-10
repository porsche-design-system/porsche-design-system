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
  colorFrostedStrong,
  colorFrostedStrongDark,
  colorFrostedStrongLight,
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
  const lightColorVarsPolyfill = `
    --_color-focus: ${colorFocusLight};
    --_color-canvas: ${colorCanvasLight};
    --_color-surface: ${colorSurfaceLight};
    --_color-frosted: ${colorFrostedLight};
    --_color-frosted-soft: ${colorFrostedSoftLight};
    --_color-frosted-strong: ${colorFrostedStrongLight};
    --_color-backdrop: ${colorBackdropLight};
    --_color-contrast-lower: ${colorContrastLowerLight};
    --_color-contrast-low: ${colorContrastLowLight};
    --_color-contrast-medium: ${colorContrastMediumLight};
    --_color-contrast-high: ${colorContrastHighLight};
    --_color-contrast-higher: ${colorContrastHigherLight};
    --_color-primary: ${colorPrimaryLight};
    --_color-success: ${colorSuccessLight};
    --_color-success-low: ${colorSuccessLowLight};
    --_color-success-medium: ${colorSuccessMediumLight};
    --_color-success-frosted: ${colorSuccessFrostedLight};
    --_color-success-frosted-soft: ${colorSuccessFrostedSoftLight};
    --_color-warning: ${colorWarningLight};
    --_color-warning-low: ${colorWarningLowLight};
    --_color-warning-medium: ${colorWarningMediumLight};
    --_color-warning-frosted: ${colorWarningFrostedLight};
    --_color-warning-frosted-soft: ${colorWarningFrostedSoftLight};
    --_color-error: ${colorErrorLight};
    --_color-error-low: ${colorErrorLowLight};
    --_color-error-medium: ${colorErrorMediumLight};
    --_color-error-frosted: ${colorErrorFrostedLight};
    --_color-error-frosted-soft: ${colorErrorFrostedSoftLight};
    --_color-info: ${colorInfoLight};
    --_color-info-low: ${colorInfoLowLight};
    --_color-info-medium: ${colorInfoMediumLight};
    --_color-info-frosted: ${colorInfoFrostedLight};
    --_color-info-frosted-soft: ${colorInfoFrostedSoftLight};`;

  const darkColorVarsPolyfill = `
    --_color-focus: ${colorFocusDark};
    --_color-canvas: ${colorCanvasDark};
    --_color-surface: ${colorSurfaceDark};
    --_color-frosted: ${colorFrostedDark};
    --_color-frosted-soft: ${colorFrostedSoftDark};
    --_color-frosted-strong: ${colorFrostedStrongDark};
    --_color-backdrop: ${colorBackdropDark};
    --_color-contrast-lower: ${colorContrastLowerDark};
    --_color-contrast-low: ${colorContrastLowDark};
    --_color-contrast-medium: ${colorContrastMediumDark};
    --_color-contrast-high: ${colorContrastHighDark};
    --_color-contrast-higher: ${colorContrastHigherDark};
    --_color-primary: ${colorPrimaryDark};
    --_color-success: ${colorSuccessDark};
    --_color-success-low: ${colorSuccessLowDark};
    --_color-success-medium: ${colorSuccessMediumDark};
    --_color-success-frosted: ${colorSuccessFrostedDark};
    --_color-success-frosted-soft: ${colorSuccessFrostedSoftDark};
    --_color-warning: ${colorWarningDark};
    --_color-warning-low: ${colorWarningLowDark};
    --_color-warning-medium: ${colorWarningMediumDark};
    --_color-warning-frosted: ${colorWarningFrostedDark};
    --_color-warning-frosted-soft: ${colorWarningFrostedSoftDark};
    --_color-error: ${colorErrorDark};
    --_color-error-low: ${colorErrorLowDark};
    --_color-error-medium: ${colorErrorMediumDark};
    --_color-error-frosted: ${colorErrorFrostedDark};
    --_color-error-frosted-soft: ${colorErrorFrostedSoftDark};
    --_color-info: ${colorInfoDark};
    --_color-info-low: ${colorInfoLowDark};
    --_color-info-medium: ${colorInfoMediumDark};
    --_color-info-frosted: ${colorInfoFrostedDark};
    --_color-info-frosted-soft: ${colorInfoFrostedSoftDark};`;

  return `
    $color-focus: var(--_color-focus, ${colorFocus});
    $color-canvas: var(--_color-canvas, ${colorCanvas});
    $color-surface: var(--_color-surface, ${colorSurface});
    $color-frosted: var(--_color-frosted, ${colorFrosted});
    $color-frosted-soft: var(--_color-frosted-soft, ${colorFrostedSoft});
    $color-frosted-strong: var(--_color-frosted-strong, ${colorFrostedStrong});
    $color-backdrop: var(--_color-backdrop, ${colorBackdrop});
    $color-contrast-lower: var(--_color-contrast-lower, ${colorContrastLower});
    $color-contrast-low: var(--_color-contrast-low, ${colorContrastLow});
    $color-contrast-medium: var(--_color-contrast-medium, ${colorContrastMedium});
    $color-contrast-high: var(--_color-contrast-high, ${colorContrastHigh});
    $color-contrast-higher: var(--_color-contrast-higher, ${colorContrastHigher});
    $color-primary: var(--_color-primary, ${colorPrimary});
    $color-success: var(--_color-success, ${colorSuccess});
    $color-success-low: var(--_color-success-low, ${colorSuccessLow});
    $color-success-medium: var(--_color-success-medium, ${colorSuccessMedium});
    $color-success-frosted: var(--_color-success-frosted, ${colorSuccessFrosted});
    $color-success-frosted-soft: var(--_color-success-frosted-soft, ${colorSuccessFrostedSoft});
    $color-warning: var(--_color-warning, ${colorWarning});
    $color-warning-low: var(--_color-warning-low, ${colorWarningLow});
    $color-warning-medium: var(--_color-warning-medium, ${colorWarningMedium});
    $color-warning-frosted: var(--_color-warning-frosted, ${colorWarningFrosted});
    $color-warning-frosted-soft: var(--_color-warning-frosted-soft, ${colorWarningFrostedSoft});
    $color-error: var(--_color-error, ${colorError});
    $color-error-low: var(--_color-error-low, ${colorErrorLow});
    $color-error-medium: var(--_color-error-medium, ${colorErrorMedium});
    $color-error-frosted: var(--_color-error-frosted, ${colorErrorFrosted});
    $color-error-frosted-soft: var(--_color-error-frosted-soft, ${colorErrorFrostedSoft});
    $color-info: var(--_color-info, ${colorInfo});
    $color-info-low: var(--_color-info-low, ${colorInfoLow});
    $color-info-medium: var(--_color-info-medium, ${colorInfoMedium});
    $color-info-frosted: var(--_color-info-frosted, ${colorInfoFrosted});
    $color-info-frosted-soft: var(--_color-info-frosted-soft, ${colorInfoFrostedSoft});

    @mixin color-scheme-polyfill($color-scheme: 'light') {
      @supports not (color: light-dark(white, black)) {
        @if $color-scheme == 'light' {
          ${lightColorVarsPolyfill}
        }

        @if $color-scheme == 'dark' {
          ${darkColorVarsPolyfill}
        }

        @if $color-scheme == 'light dark' {
          ${lightColorVarsPolyfill}
          @media (prefers-color-scheme: dark) {
            ${darkColorVarsPolyfill}
          }
        }
      }
    }

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
    $pds-theme-light-state-disabled: hsla(233,6.6%,23.9%,0.412); /* (deprecated) */
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
    $pds-theme-dark-state-disabled: hsla(240,1.5%,61.8%,0.302); /* (deprecated) */
`;
};
