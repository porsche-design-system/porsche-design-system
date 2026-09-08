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
  colorSchemeStyles,
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
} from '../../src/color/';
import type { VanillaExtractMeta, VanillaExtractToken } from '../types';

const ld = `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)`;

const background = {
  canvas: { name: 'colorCanvas', description: `${ld} **canvas** color, typically used for surfaces.`, value: colorCanvas },
  surface: {
    name: 'colorSurface',
    description: `${ld} **surface** color, typically used for surfaces.`,
    value: colorSurface,
  },
  frosted: {
    name: 'colorFrosted',
    description: `${ld} **frosted** color, typically used as a background in combination with \`blur()\`.`,
    value: colorFrosted,
  },
  frostedSoft: {
    name: 'colorFrostedSoft',
    description: `${ld} **frosted-soft** color, typically used as a background \`:hover\`.`,
    value: colorFrostedSoft,
  },
  frostedStrong: {
    name: 'colorFrostedStrong',
    description: `${ld} **frosted-strong** color, typically used as a background in combination with \`blur()\`.`,
    value: colorFrostedStrong,
  },
  backdrop: {
    name: 'colorBackdrop',
    description: `${ld} **backdrop** color, typically used for backdrops.`,
    value: colorBackdrop,
  },
} satisfies Record<string, VanillaExtractToken>;

const foreground = {
  primary: {
    name: 'colorPrimary',
    description: `${ld} **primary** color, typically used for text.`,
    value: colorPrimary,
  },
  contrastHigher: {
    name: 'colorContrastHigher',
    description: `${ld} **contrast-higher** color, typically used for text.`,
    value: colorContrastHigher,
  },
  contrastHigh: {
    name: 'colorContrastHigh',
    description: `${ld} **contrast-high** color, typically used for text.`,
    value: colorContrastHigh,
  },
  contrastMedium: {
    name: 'colorContrastMedium',
    description: `${ld} **contrast-medium** color, typically used for text.`,
    value: colorContrastMedium,
  },
  contrastLow: {
    name: 'colorContrastLow',
    description: `${ld} **contrast-low** color, intended only for decorative elements.`,
    value: colorContrastLow,
  },
  contrastLower: {
    name: 'colorContrastLower',
    description: `${ld} **contrast-lower** color, intended only for decorative elements.`,
    value: colorContrastLower,
  },
} satisfies Record<string, VanillaExtractToken>;

const semantic = {
  info: { name: 'colorInfo', description: `${ld} **info** color, typically used for text.`, value: colorInfo },
  infoMedium: {
    name: 'colorInfoMedium',
    description: `${ld} **info-medium** color, typically used for text or border.`,
    value: colorInfoMedium,
  },
  infoLow: {
    name: 'colorInfoLow',
    description: `${ld} **info-low** color, typically used for text or border.`,
    value: colorInfoLow,
  },
  infoFrosted: {
    name: 'colorInfoFrosted',
    description: `${ld} **info-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    value: colorInfoFrosted,
  },
  infoFrostedSoft: {
    name: 'colorInfoFrostedSoft',
    description: `${ld} **info-frosted-soft** color, typically used as background \`:hover\`.`,
    value: colorInfoFrostedSoft,
  },
  success: {
    name: 'colorSuccess',
    description: `${ld} **success** color, typically used for text.`,
    value: colorSuccess,
  },
  successMedium: {
    name: 'colorSuccessMedium',
    description: `${ld} **success-medium** color, typically used for text or border.`,
    value: colorSuccessMedium,
  },
  successLow: {
    name: 'colorSuccessLow',
    description: `${ld} **success-low** color, typically used for text or border.`,
    value: colorSuccessLow,
  },
  successFrosted: {
    name: 'colorSuccessFrosted',
    description: `${ld} **success-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    value: colorSuccessFrosted,
  },
  successFrostedSoft: {
    name: 'colorSuccessFrostedSoft',
    description: `${ld} **success-frosted-soft** color, typically used as background \`:hover\`.`,
    value: colorSuccessFrostedSoft,
  },
  warning: {
    name: 'colorWarning',
    description: `${ld} **warning** color, typically used for text.`,
    value: colorWarning,
  },
  warningMedium: {
    name: 'colorWarningMedium',
    description: `${ld} **warning-medium** color, typically used for text or border.`,
    value: colorWarningMedium,
  },
  warningLow: {
    name: 'colorWarningLow',
    description: `${ld} **warning-low** color, typically used for text or border.`,
    value: colorWarningLow,
  },
  warningFrosted: {
    name: 'colorWarningFrosted',
    description: `${ld} **warning-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    value: colorWarningFrosted,
  },
  warningFrostedSoft: {
    name: 'colorWarningFrostedSoft',
    description: `${ld} **warning-frosted-soft** color, typically used as background \`:hover\`.`,
    value: colorWarningFrostedSoft,
  },
  error: { name: 'colorError', description: `${ld} **error** color, typically used for text.`, value: colorError },
  errorMedium: {
    name: 'colorErrorMedium',
    description: `${ld} **error-medium** color, typically used for text or border.`,
    value: colorErrorMedium,
  },
  errorLow: {
    name: 'colorErrorLow',
    description: `${ld} **error-low** color, typically used for text or border.`,
    value: colorErrorLow,
  },
  errorFrosted: {
    name: 'colorErrorFrosted',
    description: `${ld} **error-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    value: colorErrorFrosted,
  },
  errorFrostedSoft: {
    name: 'colorErrorFrostedSoft',
    description: `${ld} **error-frosted-soft** color, typically used as background \`:hover\`.`,
    value: colorErrorFrostedSoft,
  },
} satisfies Record<string, VanillaExtractToken>;

const a11y = {
  focus: {
    name: 'colorFocus',
    description: `${ld} **focus** color, typically used as the outline for \`:focus-visible\` states.`,
    value: colorFocus,
  },
} satisfies Record<string, VanillaExtractToken>;

export const color = {
  background,
  foreground,
  semantic,
  a11y,
  // vanilla-extract-specific helper with no scss counterpart, kept keyed by export name.
  colorSchemeStyles: {
    name: 'colorSchemeStyles',
    description:
      'Holds the global style rules for the `.scheme-*` color-scheme classes, including [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) fallback variables for browsers without support.',
    styles: colorSchemeStyles,
  },
} satisfies VanillaExtractMeta['color'];
