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
import type { ScssRaw, ScssVariable } from '../types';

/** The `light-dark()` MDN link prefixing every color description, kept identical to the storefront page. */
const ld =
  'Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)';

/** Each `$color-*` resolves a runtime custom property (set by `color-scheme()`) with the token as fallback. */
const cssVar = (name: string, token: string): string => `var(--_${name}, ${token})`;

/**
 * Color theme variables grouped like the storefront API tables
 * (`background` / `foreground` / `semantic` / `a11y`). Each value is a `var(--_color-*, token)`
 * expression resolved at runtime by the `color-scheme()` mixin. The mixin itself and the deprecated
 * `$pds-theme-*` aliases (plumbing) live alongside below.
 */
export const color = {
  background: {
    canvas: {
      name: '$color-canvas',
      value: cssVar('color-canvas', colorCanvas),
      description: `${ld} **canvas** color, typically used for surfaces.`,
      group: 'background',
    },
    surface: {
      name: '$color-surface',
      value: cssVar('color-surface', colorSurface),
      description: `${ld} **surface** color, typically used for surfaces.`,
      group: 'background',
    },
    frosted: {
      name: '$color-frosted',
      value: cssVar('color-frosted', colorFrosted),
      description: `${ld} **frosted** color, typically used as a background in combination with \`blur()\`.`,
      group: 'background',
    },
    frostedSoft: {
      name: '$color-frosted-soft',
      value: cssVar('color-frosted-soft', colorFrostedSoft),
      description: `${ld} **frosted-soft** color, typically used as a background \`:hover\`.`,
      group: 'background',
    },
    frostedStrong: {
      name: '$color-frosted-strong',
      value: cssVar('color-frosted-strong', colorFrostedStrong),
      description: `${ld} **frosted** color, typically used as a background in combination with \`blur()\`.`,
      group: 'background',
    },
    backdrop: {
      name: '$color-backdrop',
      value: cssVar('color-backdrop', colorBackdrop),
      description: `${ld} **backdrop** color, typically used for backdrops.`,
      group: 'background',
    },
  },
  foreground: {
    primary: {
      name: '$color-primary',
      value: cssVar('color-primary', colorPrimary),
      description: `${ld} **primary** color, typically used for text.`,
      group: 'foreground',
    },
    contrastHigher: {
      name: '$color-contrast-higher',
      value: cssVar('color-contrast-higher', colorContrastHigher),
      description: `${ld} **contrast-higher** color, typically used for text.`,
      group: 'foreground',
    },
    contrastHigh: {
      name: '$color-contrast-high',
      value: cssVar('color-contrast-high', colorContrastHigh),
      description: `${ld} **contrast-high** color, typically used for text.`,
      group: 'foreground',
    },
    contrastMedium: {
      name: '$color-contrast-medium',
      value: cssVar('color-contrast-medium', colorContrastMedium),
      description: `${ld} **contrast-medium** color, typically used for text.`,
      group: 'foreground',
    },
    contrastLow: {
      name: '$color-contrast-low',
      value: cssVar('color-contrast-low', colorContrastLow),
      description: `${ld} **contrast-low** color, intended only for decorative elements.`,
      group: 'foreground',
    },
    contrastLower: {
      name: '$color-contrast-lower',
      value: cssVar('color-contrast-lower', colorContrastLower),
      description: `${ld} **contrast-lower** color, intended only for decorative elements.`,
      group: 'foreground',
    },
  },
  semantic: {
    info: {
      name: '$color-info',
      value: cssVar('color-info', colorInfo),
      description: `${ld} **info** color, typically used for text.`,
      group: 'semantic',
    },
    infoMedium: {
      name: '$color-info-medium',
      value: cssVar('color-info-medium', colorInfoMedium),
      description: `${ld} **info-medium** color, typically used for text or border.`,
      group: 'semantic',
    },
    infoLow: {
      name: '$color-info-low',
      value: cssVar('color-info-low', colorInfoLow),
      description: `${ld} **info-low** color, typically used for text or border.`,
      group: 'semantic',
    },
    infoFrosted: {
      name: '$color-info-frosted',
      value: cssVar('color-info-frosted', colorInfoFrosted),
      description: `${ld} **info-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      group: 'semantic',
    },
    infoFrostedSoft: {
      name: '$color-info-frosted-soft',
      value: cssVar('color-info-frosted-soft', colorInfoFrostedSoft),
      description: `${ld} **info-frosted-soft** color, typically used as background \`:hover\`.`,
      group: 'semantic',
    },
    success: {
      name: '$color-success',
      value: cssVar('color-success', colorSuccess),
      description: `${ld} **success** color, typically used for text.`,
      group: 'semantic',
    },
    successMedium: {
      name: '$color-success-medium',
      value: cssVar('color-success-medium', colorSuccessMedium),
      description: `${ld} **success-medium** color, typically used for text or border.`,
      group: 'semantic',
    },
    successLow: {
      name: '$color-success-low',
      value: cssVar('color-success-low', colorSuccessLow),
      description: `${ld} **success-low** color, typically used for text or border.`,
      group: 'semantic',
    },
    successFrosted: {
      name: '$color-success-frosted',
      value: cssVar('color-success-frosted', colorSuccessFrosted),
      description: `${ld} **success-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      group: 'semantic',
    },
    successFrostedSoft: {
      name: '$color-success-frosted-soft',
      value: cssVar('color-success-frosted-soft', colorSuccessFrostedSoft),
      description: `${ld} **success-frosted-soft** color, typically used as background \`:hover\`.`,
      group: 'semantic',
    },
    warning: {
      name: '$color-warning',
      value: cssVar('color-warning', colorWarning),
      description: `${ld} **warning** color, typically used for text.`,
      group: 'semantic',
    },
    warningMedium: {
      name: '$color-warning-medium',
      value: cssVar('color-warning-medium', colorWarningMedium),
      description: `${ld} **warning-medium** color, typically used for text or border.`,
      group: 'semantic',
    },
    warningLow: {
      name: '$color-warning-low',
      value: cssVar('color-warning-low', colorWarningLow),
      description: `${ld} **warning-low** color, typically used for text or border.`,
      group: 'semantic',
    },
    warningFrosted: {
      name: '$color-warning-frosted',
      value: cssVar('color-warning-frosted', colorWarningFrosted),
      description: `${ld} **warning-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      group: 'semantic',
    },
    warningFrostedSoft: {
      name: '$color-warning-frosted-soft',
      value: cssVar('color-warning-frosted-soft', colorWarningFrostedSoft),
      description: `${ld} **warning-frosted-soft** color, typically used as background \`:hover\`.`,
      group: 'semantic',
    },
    error: {
      name: '$color-error',
      value: cssVar('color-error', colorError),
      description: `${ld} **error** color, typically used for text.`,
      group: 'semantic',
    },
    errorMedium: {
      name: '$color-error-medium',
      value: cssVar('color-error-medium', colorErrorMedium),
      description: `${ld} **error-medium** color, typically used for text or border.`,
      group: 'semantic',
    },
    errorLow: {
      name: '$color-error-low',
      value: cssVar('color-error-low', colorErrorLow),
      description: `${ld} **error-low** color, typically used for text or border.`,
      group: 'semantic',
    },
    errorFrosted: {
      name: '$color-error-frosted',
      value: cssVar('color-error-frosted', colorErrorFrosted),
      description: `${ld} **error-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      group: 'semantic',
    },
    errorFrostedSoft: {
      name: '$color-error-frosted-soft',
      value: cssVar('color-error-frosted-soft', colorErrorFrostedSoft),
      description: `${ld} **error-frosted-soft** color, typically used as background \`:hover\`.`,
      group: 'semantic',
    },
  },
  a11y: {
    focus: {
      name: '$color-focus',
      value: cssVar('color-focus', colorFocus),
      description: `${ld} **focus** color, typically used as the outline for \`:focus-visible\` states.`,
      group: 'a11y',
    },
  },
} satisfies Record<'background' | 'foreground' | 'semantic' | 'a11y', Record<string, ScssVariable>>;

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
 * @deprecated Use the documented `$color-*` variables instead.
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
