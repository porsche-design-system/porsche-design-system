import {
  colorBackdrop,
  colorCanvas,
  colorContrastHigh,
  colorContrastHigher,
  colorContrastLow,
  colorContrastLower,
  colorContrastMedium,
  colorError,
  colorErrorFrosted,
  colorErrorFrostedSoft,
  colorErrorLow,
  colorErrorMedium,
  colorFocus,
  colorFrosted,
  colorFrostedSoft,
  colorFrostedStrong,
  colorInfo,
  colorInfoFrosted,
  colorInfoFrostedSoft,
  colorInfoLow,
  colorInfoMedium,
  colorPrimary,
  colorSuccess,
  colorSuccessFrosted,
  colorSuccessFrostedSoft,
  colorSuccessLow,
  colorSuccessMedium,
  colorSurface,
  colorWarning,
  colorWarningFrosted,
  colorWarningFrostedSoft,
  colorWarningLow,
  colorWarningMedium,
} from '@porsche-design-system/tokens';
import type { ScssVariable } from '../types';

/** The `light-dark()` MDN link prefixing every color description, kept identical to the storefront page. */
const ld =
  'Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)';

/** Each `$color-*` resolves a runtime custom property (set by `color-scheme()`) with the token as fallback. */
const cssVar = (name: string, token: string): string => `var(--_${name}, ${token})`;

/**
 * Color theme variables grouped like the storefront API tables
 * (`background` / `foreground` / `semantic` / `a11y`). Each value is a `var(--_color-*, token)`
 * expression resolved at runtime by the `color-scheme()` mixin. The mixin itself and the deprecated
 * `$pds-theme-*` aliases are plumbing — they live in the composition layer, not here.
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
