import {
  colorBackdropDark,
  colorBackdropLight,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHighDark,
  colorContrastHigherDark,
  colorContrastHigherLight,
  colorContrastHighLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorErrorDark,
  colorErrorFrostedDark,
  colorErrorFrostedLight,
  colorErrorFrostedSoftDark,
  colorErrorFrostedSoftLight,
  colorErrorLight,
  colorErrorLowDark,
  colorErrorLowLight,
  colorErrorMediumDark,
  colorErrorMediumLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorFrostedStrongDark,
  colorFrostedStrongLight,
  colorInfoDark,
  colorInfoFrostedDark,
  colorInfoFrostedLight,
  colorInfoFrostedSoftDark,
  colorInfoFrostedSoftLight,
  colorInfoLight,
  colorInfoLowDark,
  colorInfoLowLight,
  colorInfoMediumDark,
  colorInfoMediumLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessFrostedDark,
  colorSuccessFrostedLight,
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLowDark,
  colorSuccessLowLight,
  colorSuccessMediumDark,
  colorSuccessMediumLight,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarningDark,
  colorWarningFrostedDark,
  colorWarningFrostedLight,
  colorWarningFrostedSoftDark,
  colorWarningFrostedSoftLight,
  colorWarningLight,
  colorWarningLowDark,
  colorWarningLowLight,
  colorWarningMediumDark,
  colorWarningMediumLight,
} from '@porsche-design-system/tokens';
import type { ScssRaw } from '../types';

// The light-mode custom-property assignments shared by the `@supports` fallback's light selectors.
const lightCustomProps = [
  `--_color-focus: ${colorFocusLight};`,
  `--_color-canvas: ${colorCanvasLight};`,
  `--_color-surface: ${colorSurfaceLight};`,
  `--_color-frosted: ${colorFrostedLight};`,
  `--_color-frosted-soft: ${colorFrostedSoftLight};`,
  `--_color-frosted-strong: ${colorFrostedStrongLight};`,
  `--_color-backdrop: ${colorBackdropLight};`,
  `--_color-contrast-lower: ${colorContrastLowerLight};`,
  `--_color-contrast-low: ${colorContrastLowLight};`,
  `--_color-contrast-medium: ${colorContrastMediumLight};`,
  `--_color-contrast-high: ${colorContrastHighLight};`,
  `--_color-contrast-higher: ${colorContrastHigherLight};`,
  `--_color-primary: ${colorPrimaryLight};`,
  `--_color-success: ${colorSuccessLight};`,
  `--_color-success-low: ${colorSuccessLowLight};`,
  `--_color-success-medium: ${colorSuccessMediumLight};`,
  `--_color-success-frosted: ${colorSuccessFrostedLight};`,
  `--_color-success-frosted-soft: ${colorSuccessFrostedSoftLight};`,
  `--_color-warning: ${colorWarningLight};`,
  `--_color-warning-low: ${colorWarningLowLight};`,
  `--_color-warning-medium: ${colorWarningMediumLight};`,
  `--_color-warning-frosted: ${colorWarningFrostedLight};`,
  `--_color-warning-frosted-soft: ${colorWarningFrostedSoftLight};`,
  `--_color-error: ${colorErrorLight};`,
  `--_color-error-low: ${colorErrorLowLight};`,
  `--_color-error-medium: ${colorErrorMediumLight};`,
  `--_color-error-frosted: ${colorErrorFrostedLight};`,
  `--_color-error-frosted-soft: ${colorErrorFrostedSoftLight};`,
  `--_color-info: ${colorInfoLight};`,
  `--_color-info-low: ${colorInfoLowLight};`,
  `--_color-info-medium: ${colorInfoMediumLight};`,
  `--_color-info-frosted: ${colorInfoFrostedLight};`,
  `--_color-info-frosted-soft: ${colorInfoFrostedSoftLight};`,
].join('\n');

// The dark-mode custom-property assignments shared by the dark selectors and the `prefers-color-scheme` block.
const darkCustomProps = [
  `--_color-focus: ${colorFocusDark};`,
  `--_color-canvas: ${colorCanvasDark};`,
  `--_color-surface: ${colorSurfaceDark};`,
  `--_color-frosted: ${colorFrostedDark};`,
  `--_color-frosted-soft: ${colorFrostedSoftDark};`,
  `--_color-frosted-strong: ${colorFrostedStrongDark};`,
  `--_color-backdrop: ${colorBackdropDark};`,
  `--_color-contrast-lower: ${colorContrastLowerDark};`,
  `--_color-contrast-low: ${colorContrastLowDark};`,
  `--_color-contrast-medium: ${colorContrastMediumDark};`,
  `--_color-contrast-high: ${colorContrastHighDark};`,
  `--_color-contrast-higher: ${colorContrastHigherDark};`,
  `--_color-primary: ${colorPrimaryDark};`,
  `--_color-success: ${colorSuccessDark};`,
  `--_color-success-low: ${colorSuccessLowDark};`,
  `--_color-success-medium: ${colorSuccessMediumDark};`,
  `--_color-success-frosted: ${colorSuccessFrostedDark};`,
  `--_color-success-frosted-soft: ${colorSuccessFrostedSoftDark};`,
  `--_color-warning: ${colorWarningDark};`,
  `--_color-warning-low: ${colorWarningLowDark};`,
  `--_color-warning-medium: ${colorWarningMediumDark};`,
  `--_color-warning-frosted: ${colorWarningFrostedDark};`,
  `--_color-warning-frosted-soft: ${colorWarningFrostedSoftDark};`,
  `--_color-error: ${colorErrorDark};`,
  `--_color-error-low: ${colorErrorLowDark};`,
  `--_color-error-medium: ${colorErrorMediumDark};`,
  `--_color-error-frosted: ${colorErrorFrostedDark};`,
  `--_color-error-frosted-soft: ${colorErrorFrostedSoftDark};`,
  `--_color-info: ${colorInfoDark};`,
  `--_color-info-low: ${colorInfoLowDark};`,
  `--_color-info-medium: ${colorInfoMediumDark};`,
  `--_color-info-frosted: ${colorInfoFrostedDark};`,
  `--_color-info-frosted-soft: ${colorInfoFrostedSoftDark};`,
].join('\n');

/**
 * The `color-scheme()` theming mixin: the `.scheme-*` classes plus the `@supports`-gated light/dark
 * custom-property fallbacks for browsers without `light-dark()`. Plumbing: still emitted so consumers
 * can `@include` it, but NOT a documented `scssMeta` entry.
 */
export const colorSchemeMixin: ScssRaw = {
  raw: `@mixin color-scheme() {
  .scheme-normal {
    color-scheme: normal;
  }
  .scheme-dark {
    color-scheme: dark;
  }
  .scheme-light {
    color-scheme: light;
  }
  .scheme-light-dark {
    color-scheme: light dark;
  }
  .scheme-only-dark {
    color-scheme: only dark;
  }
  .scheme-only-light {
    color-scheme: only light;
  }

  @supports not (color: light-dark(white, black)) {
    :root, .scheme-light, .scheme-only-light, .scheme-normal, .scheme-light-dark {
${lightCustomProps}
    }

    .scheme-dark, .scheme-only-dark {
${darkCustomProps}
    }

    @media (prefers-color-scheme: dark) {
      .scheme-light-dark {
${darkCustomProps}
      }
    }
  }
}`,
};

/**
 * The deprecated `$pds-theme-light-*` / `$pds-theme-dark-*` aliases. Plumbing: still emitted with
 * identical values, but NOT documented `scssMeta` entries.
 */
export const colorDeprecatedAliases: ScssRaw = {
  raw: [
    `$pds-theme-light-primary: ${colorPrimaryLight}; /* alias (deprecated) */`,
    `$pds-theme-light-background-base: ${colorCanvasLight}; /* alias (deprecated) */`,
    `$pds-theme-light-background-surface: ${colorSurfaceLight}; /* alias (deprecated) */`,
    `$pds-theme-light-background-shading: ${colorBackdropLight}; /* alias (deprecated) */`,
    `$pds-theme-light-background-frosted: ${colorFrostedLight}; /* alias (deprecated) */`,
    `$pds-theme-light-contrast-low: ${colorContrastLowLight}; /* alias (deprecated) */`,
    `$pds-theme-light-contrast-medium: ${colorContrastMediumLight}; /* alias (deprecated) */`,
    `$pds-theme-light-contrast-high: ${colorContrastHighLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-success: ${colorSuccessLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-success-soft: ${colorSuccessFrostedLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-warning: ${colorWarningLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-warning-soft: ${colorWarningFrostedLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-error: ${colorErrorLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-error-soft: ${colorErrorFrostedLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-info: ${colorInfoLight}; /* alias (deprecated) */`,
    `$pds-theme-light-notification-info-soft: ${colorInfoFrostedLight}; /* alias (deprecated) */`,
    '$pds-theme-light-state-hover: hsla(236, 6.4%, 51%, 0.148); /* alias (deprecated) */',
    '$pds-theme-light-state-active: hsla(236, 6.4%, 51%, 0.148); /* alias (deprecated) */',
    '$pds-theme-light-state-focus: #1a44ea; /* alias (deprecated) */',
    '$pds-theme-light-state-disabled: hsla(233,6.6%,23.9%,0.412); /* (deprecated) */',
    `$pds-theme-dark-primary: ${colorPrimaryDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-background-base: ${colorCanvasDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-background-surface: ${colorSurfaceDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-background-shading: ${colorBackdropDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-background-frosted: ${colorFrostedDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-contrast-low: ${colorContrastLowDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-contrast-medium: ${colorContrastMediumDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-contrast-high: ${colorContrastHighDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-success: ${colorSuccessDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-success-soft: ${colorSuccessFrostedDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-warning: ${colorWarningDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-warning-soft: ${colorWarningFrostedDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-error: ${colorErrorDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-error-soft: ${colorErrorFrostedDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-info: ${colorInfoDark}; /* alias (deprecated) */`,
    `$pds-theme-dark-notification-info-soft: ${colorInfoFrostedDark}; /* alias (deprecated) */`,
    '$pds-theme-dark-state-hover: hsla(240, 2.2%, 44.1%, 0.228); /* alias (deprecated) */',
    '$pds-theme-dark-state-active: hsla(240, 2.2%, 44.1%, 0.228); /* alias (deprecated) */',
    '$pds-theme-dark-state-focus: #1a44ea; /* alias (deprecated) */',
    '$pds-theme-dark-state-disabled: hsla(240,1.5%,61.8%,0.302); /* (deprecated) */',
  ].join('\n'),
};
