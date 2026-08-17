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
import { scssIdentifier } from '../deprecation';
import type { DeprecatedScssVariable, ScssMeta, ScssRaw } from '../types';

/** The `light-dark()` MDN link prefixing every color description. */
const ld =
  'Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)';

/** Each `$color-*` resolves a runtime custom property (set by `color-scheme()`) with the token as fallback. */
const cssVar = (name: string, token: string): string => `var(--_${name}, ${token})`;

/** Color theme variables (`background` / `foreground` / `semantic` / `a11y`), each a `var(--_color-*, token)` resolved by `color-scheme()`. */
export const color = {
  background: {
    canvas: {
      name: '$color-canvas',
      value: cssVar('color-canvas', colorCanvas),
      description: `${ld} **canvas** color, typically used for surfaces.`,
    },
    surface: {
      name: '$color-surface',
      value: cssVar('color-surface', colorSurface),
      description: `${ld} **surface** color, typically used for surfaces.`,
    },
    frosted: {
      name: '$color-frosted',
      value: cssVar('color-frosted', colorFrosted),
      description: `${ld} **frosted** color, typically used as a background in combination with \`blur()\`.`,
    },
    frostedSoft: {
      name: '$color-frosted-soft',
      value: cssVar('color-frosted-soft', colorFrostedSoft),
      description: `${ld} **frosted-soft** color, typically used as a background \`:hover\`.`,
    },
    frostedStrong: {
      name: '$color-frosted-strong',
      value: cssVar('color-frosted-strong', colorFrostedStrong),
      description: `${ld} **frosted** color, typically used as a background in combination with \`blur()\`.`,
    },
    backdrop: {
      name: '$color-backdrop',
      value: cssVar('color-backdrop', colorBackdrop),
      description: `${ld} **backdrop** color, typically used for backdrops.`,
    },
  },
  foreground: {
    primary: {
      name: '$color-primary',
      value: cssVar('color-primary', colorPrimary),
      description: `${ld} **primary** color, typically used for text.`,
    },
    contrastHigher: {
      name: '$color-contrast-higher',
      value: cssVar('color-contrast-higher', colorContrastHigher),
      description: `${ld} **contrast-higher** color, typically used for text.`,
    },
    contrastHigh: {
      name: '$color-contrast-high',
      value: cssVar('color-contrast-high', colorContrastHigh),
      description: `${ld} **contrast-high** color, typically used for text.`,
    },
    contrastMedium: {
      name: '$color-contrast-medium',
      value: cssVar('color-contrast-medium', colorContrastMedium),
      description: `${ld} **contrast-medium** color, typically used for text.`,
    },
    contrastLow: {
      name: '$color-contrast-low',
      value: cssVar('color-contrast-low', colorContrastLow),
      description: `${ld} **contrast-low** color, intended only for decorative elements.`,
    },
    contrastLower: {
      name: '$color-contrast-lower',
      value: cssVar('color-contrast-lower', colorContrastLower),
      description: `${ld} **contrast-lower** color, intended only for decorative elements.`,
    },
  },
  semantic: {
    info: {
      name: '$color-info',
      value: cssVar('color-info', colorInfo),
      description: `${ld} **info** color, typically used for text.`,
    },
    infoMedium: {
      name: '$color-info-medium',
      value: cssVar('color-info-medium', colorInfoMedium),
      description: `${ld} **info-medium** color, typically used for text or border.`,
    },
    infoLow: {
      name: '$color-info-low',
      value: cssVar('color-info-low', colorInfoLow),
      description: `${ld} **info-low** color, typically used for text or border.`,
    },
    infoFrosted: {
      name: '$color-info-frosted',
      value: cssVar('color-info-frosted', colorInfoFrosted),
      description: `${ld} **info-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    infoFrostedSoft: {
      name: '$color-info-frosted-soft',
      value: cssVar('color-info-frosted-soft', colorInfoFrostedSoft),
      description: `${ld} **info-frosted-soft** color, typically used as background \`:hover\`.`,
    },
    success: {
      name: '$color-success',
      value: cssVar('color-success', colorSuccess),
      description: `${ld} **success** color, typically used for text.`,
    },
    successMedium: {
      name: '$color-success-medium',
      value: cssVar('color-success-medium', colorSuccessMedium),
      description: `${ld} **success-medium** color, typically used for text or border.`,
    },
    successLow: {
      name: '$color-success-low',
      value: cssVar('color-success-low', colorSuccessLow),
      description: `${ld} **success-low** color, typically used for text or border.`,
    },
    successFrosted: {
      name: '$color-success-frosted',
      value: cssVar('color-success-frosted', colorSuccessFrosted),
      description: `${ld} **success-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    successFrostedSoft: {
      name: '$color-success-frosted-soft',
      value: cssVar('color-success-frosted-soft', colorSuccessFrostedSoft),
      description: `${ld} **success-frosted-soft** color, typically used as background \`:hover\`.`,
    },
    warning: {
      name: '$color-warning',
      value: cssVar('color-warning', colorWarning),
      description: `${ld} **warning** color, typically used for text.`,
    },
    warningMedium: {
      name: '$color-warning-medium',
      value: cssVar('color-warning-medium', colorWarningMedium),
      description: `${ld} **warning-medium** color, typically used for text or border.`,
    },
    warningLow: {
      name: '$color-warning-low',
      value: cssVar('color-warning-low', colorWarningLow),
      description: `${ld} **warning-low** color, typically used for text or border.`,
    },
    warningFrosted: {
      name: '$color-warning-frosted',
      value: cssVar('color-warning-frosted', colorWarningFrosted),
      description: `${ld} **warning-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    warningFrostedSoft: {
      name: '$color-warning-frosted-soft',
      value: cssVar('color-warning-frosted-soft', colorWarningFrostedSoft),
      description: `${ld} **warning-frosted-soft** color, typically used as background \`:hover\`.`,
    },
    error: {
      name: '$color-error',
      value: cssVar('color-error', colorError),
      description: `${ld} **error** color, typically used for text.`,
    },
    errorMedium: {
      name: '$color-error-medium',
      value: cssVar('color-error-medium', colorErrorMedium),
      description: `${ld} **error-medium** color, typically used for text or border.`,
    },
    errorLow: {
      name: '$color-error-low',
      value: cssVar('color-error-low', colorErrorLow),
      description: `${ld} **error-low** color, typically used for text or border.`,
    },
    errorFrosted: {
      name: '$color-error-frosted',
      value: cssVar('color-error-frosted', colorErrorFrosted),
      description: `${ld} **error-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    errorFrostedSoft: {
      name: '$color-error-frosted-soft',
      value: cssVar('color-error-frosted-soft', colorErrorFrostedSoft),
      description: `${ld} **error-frosted-soft** color, typically used as background \`:hover\`.`,
    },
  },
  a11y: {
    focus: {
      name: '$color-focus',
      value: cssVar('color-focus', colorFocus),
      description: `${ld} **focus** color, typically used as the outline for \`:focus-visible\` states.`,
    },
  },
} satisfies ScssMeta['color'];

// The light-mode custom-property assignments shared by the `@supports` fallback's light selectors.
const lightCustomProps = `--_color-focus: ${colorFocusLight};
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

// The dark-mode custom-property assignments shared by the dark selectors and the `prefers-color-scheme` block.
const darkCustomProps = `--_color-focus: ${colorFocusDark};
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

/** The `color-scheme()` theming mixin: `.scheme-*` classes plus `@supports` fallbacks for browsers without `light-dark()` (plumbing). */
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
 * Deprecated `$pds-theme-*` aliases. Each maps to the `light-dark()` aware `$color-*` variable that
 * replaces both its light and dark spelling; the state colors have no modern equivalent.
 */
export const colorDeprecations = {
  light: {
    primary: {
      name: '$pds-theme-light-primary',
      value: colorPrimaryLight,
      deprecation: { replacement: scssIdentifier(color.foreground.primary) },
    },
    backgroundBase: {
      name: '$pds-theme-light-background-base',
      value: colorCanvasLight,
      deprecation: { replacement: scssIdentifier(color.background.canvas) },
    },
    backgroundSurface: {
      name: '$pds-theme-light-background-surface',
      value: colorSurfaceLight,
      deprecation: { replacement: scssIdentifier(color.background.surface) },
    },
    backgroundShading: {
      name: '$pds-theme-light-background-shading',
      value: colorBackdropLight,
      deprecation: { replacement: scssIdentifier(color.background.backdrop) },
    },
    backgroundFrosted: {
      name: '$pds-theme-light-background-frosted',
      value: colorFrostedLight,
      deprecation: { replacement: scssIdentifier(color.background.frosted) },
    },
    contrastLow: {
      name: '$pds-theme-light-contrast-low',
      value: colorContrastLowLight,
      deprecation: { replacement: scssIdentifier(color.foreground.contrastLow) },
    },
    contrastMedium: {
      name: '$pds-theme-light-contrast-medium',
      value: colorContrastMediumLight,
      deprecation: { replacement: scssIdentifier(color.foreground.contrastMedium) },
    },
    contrastHigh: {
      name: '$pds-theme-light-contrast-high',
      value: colorContrastHighLight,
      deprecation: { replacement: scssIdentifier(color.foreground.contrastHigh) },
    },
    notificationSuccess: {
      name: '$pds-theme-light-notification-success',
      value: colorSuccessLight,
      deprecation: { replacement: scssIdentifier(color.semantic.success) },
    },
    notificationSuccessSoft: {
      name: '$pds-theme-light-notification-success-soft',
      value: colorSuccessFrostedLight,
      deprecation: { replacement: scssIdentifier(color.semantic.successFrosted) },
    },
    notificationWarning: {
      name: '$pds-theme-light-notification-warning',
      value: colorWarningLight,
      deprecation: { replacement: scssIdentifier(color.semantic.warning) },
    },
    notificationWarningSoft: {
      name: '$pds-theme-light-notification-warning-soft',
      value: colorWarningFrostedLight,
      deprecation: { replacement: scssIdentifier(color.semantic.warningFrosted) },
    },
    notificationError: {
      name: '$pds-theme-light-notification-error',
      value: colorErrorLight,
      deprecation: { replacement: scssIdentifier(color.semantic.error) },
    },
    notificationErrorSoft: {
      name: '$pds-theme-light-notification-error-soft',
      value: colorErrorFrostedLight,
      deprecation: { replacement: scssIdentifier(color.semantic.errorFrosted) },
    },
    notificationInfo: {
      name: '$pds-theme-light-notification-info',
      value: colorInfoLight,
      deprecation: { replacement: scssIdentifier(color.semantic.info) },
    },
    notificationInfoSoft: {
      name: '$pds-theme-light-notification-info-soft',
      value: colorInfoFrostedLight,
      deprecation: { replacement: scssIdentifier(color.semantic.infoFrosted) },
    },
    stateHover: {
      name: '$pds-theme-light-state-hover',
      value: 'hsla(236, 6.4%, 51%, 0.148)',
      deprecation: {},
    },
    stateActive: {
      name: '$pds-theme-light-state-active',
      value: 'hsla(236, 6.4%, 51%, 0.148)',
      deprecation: {},
    },
    stateFocus: {
      name: '$pds-theme-light-state-focus',
      value: '#1a44ea',
      deprecation: { replacement: scssIdentifier(color.a11y.focus) },
    },
    stateDisabled: {
      name: '$pds-theme-light-state-disabled',
      value: 'hsla(233,6.6%,23.9%,0.412)',
      deprecation: {},
    },
  },
  dark: {
    primary: {
      name: '$pds-theme-dark-primary',
      value: colorPrimaryDark,
      deprecation: { replacement: scssIdentifier(color.foreground.primary) },
    },
    backgroundBase: {
      name: '$pds-theme-dark-background-base',
      value: colorCanvasDark,
      deprecation: { replacement: scssIdentifier(color.background.canvas) },
    },
    backgroundSurface: {
      name: '$pds-theme-dark-background-surface',
      value: colorSurfaceDark,
      deprecation: { replacement: scssIdentifier(color.background.surface) },
    },
    backgroundShading: {
      name: '$pds-theme-dark-background-shading',
      value: colorBackdropDark,
      deprecation: { replacement: scssIdentifier(color.background.backdrop) },
    },
    backgroundFrosted: {
      name: '$pds-theme-dark-background-frosted',
      value: colorFrostedDark,
      deprecation: { replacement: scssIdentifier(color.background.frosted) },
    },
    contrastLow: {
      name: '$pds-theme-dark-contrast-low',
      value: colorContrastLowDark,
      deprecation: { replacement: scssIdentifier(color.foreground.contrastLow) },
    },
    contrastMedium: {
      name: '$pds-theme-dark-contrast-medium',
      value: colorContrastMediumDark,
      deprecation: { replacement: scssIdentifier(color.foreground.contrastMedium) },
    },
    contrastHigh: {
      name: '$pds-theme-dark-contrast-high',
      value: colorContrastHighDark,
      deprecation: { replacement: scssIdentifier(color.foreground.contrastHigh) },
    },
    notificationSuccess: {
      name: '$pds-theme-dark-notification-success',
      value: colorSuccessDark,
      deprecation: { replacement: scssIdentifier(color.semantic.success) },
    },
    notificationSuccessSoft: {
      name: '$pds-theme-dark-notification-success-soft',
      value: colorSuccessFrostedDark,
      deprecation: { replacement: scssIdentifier(color.semantic.successFrosted) },
    },
    notificationWarning: {
      name: '$pds-theme-dark-notification-warning',
      value: colorWarningDark,
      deprecation: { replacement: scssIdentifier(color.semantic.warning) },
    },
    notificationWarningSoft: {
      name: '$pds-theme-dark-notification-warning-soft',
      value: colorWarningFrostedDark,
      deprecation: { replacement: scssIdentifier(color.semantic.warningFrosted) },
    },
    notificationError: {
      name: '$pds-theme-dark-notification-error',
      value: colorErrorDark,
      deprecation: { replacement: scssIdentifier(color.semantic.error) },
    },
    notificationErrorSoft: {
      name: '$pds-theme-dark-notification-error-soft',
      value: colorErrorFrostedDark,
      deprecation: { replacement: scssIdentifier(color.semantic.errorFrosted) },
    },
    notificationInfo: {
      name: '$pds-theme-dark-notification-info',
      value: colorInfoDark,
      deprecation: { replacement: scssIdentifier(color.semantic.info) },
    },
    notificationInfoSoft: {
      name: '$pds-theme-dark-notification-info-soft',
      value: colorInfoFrostedDark,
      deprecation: { replacement: scssIdentifier(color.semantic.infoFrosted) },
    },
    stateHover: {
      name: '$pds-theme-dark-state-hover',
      value: 'hsla(240, 2.2%, 44.1%, 0.228)',
      deprecation: {},
    },
    stateActive: {
      name: '$pds-theme-dark-state-active',
      value: 'hsla(240, 2.2%, 44.1%, 0.228)',
      deprecation: {},
    },
    stateFocus: {
      name: '$pds-theme-dark-state-focus',
      value: '#1a44ea',
      deprecation: { replacement: scssIdentifier(color.a11y.focus) },
    },
    stateDisabled: {
      name: '$pds-theme-dark-state-disabled',
      value: 'hsla(240,1.5%,61.8%,0.302)',
      deprecation: {},
    },
  },
} satisfies Record<string, Record<string, DeprecatedScssVariable>>;
