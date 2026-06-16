import type { Meta } from '../meta.types';
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
  theme,
  themeDark,
  themeDarkBackgroundBase,
  themeDarkBackgroundFrosted,
  themeDarkBackgroundShading,
  themeDarkBackgroundSurface,
  themeDarkContrastHigh,
  themeDarkContrastLow,
  themeDarkContrastMedium,
  themeDarkNotificationError,
  themeDarkNotificationErrorSoft,
  themeDarkNotificationInfo,
  themeDarkNotificationInfoSoft,
  themeDarkNotificationSuccess,
  themeDarkNotificationSuccessSoft,
  themeDarkNotificationWarning,
  themeDarkNotificationWarningSoft,
  themeDarkPrimary,
  themeDarkStateActive,
  themeDarkStateDisabled,
  themeDarkStateFocus,
  themeDarkStateHover,
  themeLight,
  themeLightBackgroundBase,
  themeLightBackgroundFrosted,
  themeLightBackgroundShading,
  themeLightBackgroundSurface,
  themeLightContrastHigh,
  themeLightContrastLow,
  themeLightContrastMedium,
  themeLightNotificationError,
  themeLightNotificationErrorSoft,
  themeLightNotificationInfo,
  themeLightNotificationInfoSoft,
  themeLightNotificationSuccess,
  themeLightNotificationSuccessSoft,
  themeLightNotificationWarning,
  themeLightNotificationWarningSoft,
  themeLightPrimary,
  themeLightStateActive,
  themeLightStateDisabled,
  themeLightStateFocus,
  themeLightStateHover,
} from '.';

export const colorMeta: Meta = {
  background: {
    colorCanvas: {
      name: 'colorCanvas',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **canvas** color, typically used for surfaces.`,
      value: colorCanvas,
    },
    colorSurface: {
      name: 'colorSurface',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **surface** color, typically used for surfaces.`,
      value: colorSurface,
    },
    colorFrosted: {
      name: 'colorFrosted',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted** color, typically used as a background in combination with \`blur()\`.`,
      value: colorFrosted,
    },
    colorFrostedSoft: {
      name: 'colorFrostedSoft',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted-soft** color, typically used as a background \`:hover\`.`,
      value: colorFrostedSoft,
    },
    colorFrostedStrong: {
      name: 'colorFrostedStrong',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted-strong** color, typically used as a background in combination with \`blur()\`.`,
      value: colorFrostedStrong,
    },
    colorBackdrop: {
      name: 'colorBackdrop',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **backdrop** color, typically used for backdrops.`,
      value: colorBackdrop,
    },
  },
  foreground: {
    colorPrimary: {
      name: 'colorPrimary',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **primary** color, typically used for text.`,
      value: colorPrimary,
    },
    colorContrastHigher: {
      name: 'colorContrastHigher',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-higher** color, typically used for text.`,
      value: colorContrastHigher,
    },
    colorContrastHigh: {
      name: 'colorContrastHigh',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-high** color, typically used for text.`,
      value: colorContrastHigh,
    },
    colorContrastMedium: {
      name: 'colorContrastMedium',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-medium** color, typically used for text.`,
      value: colorContrastMedium,
    },
    colorContrastLow: {
      name: 'colorContrastLow',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-low** color, intended only for decorative elements.`,
      value: colorContrastLow,
    },
    colorContrastLower: {
      name: 'colorContrastLower',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-lower** color, intended only for decorative elements.`,
      value: colorContrastLower,
    },
  },
  semantic: {
    colorInfo: {
      name: 'colorInfo',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info** color, typically used for text.`,
      value: colorInfo,
    },
    colorInfoMedium: {
      name: 'colorInfoMedium',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-medium** color, typically used for text or border.`,
      value: colorInfoMedium,
    },
    colorInfoLow: {
      name: 'colorInfoLow',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-low** color, typically used for text or border.`,
      value: colorInfoLow,
    },
    colorInfoFrosted: {
      name: 'colorInfoFrosted',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      value: colorInfoFrosted,
    },
    colorInfoFrostedSoft: {
      name: 'colorInfoFrostedSoft',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted-soft** color, typically used as background \`:hover\`.`,
      value: colorInfoFrostedSoft,
    },
    colorSuccess: {
      name: 'colorSuccess',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success** color, typically used for text.`,
      value: colorSuccess,
    },
    colorSuccessMedium: {
      name: 'colorSuccessMedium',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-medium** color, typically used for text or border.`,
      value: colorSuccessMedium,
    },
    colorSuccessLow: {
      name: 'colorSuccessLow',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-low** color, typically used for text or border.`,
      value: colorSuccessLow,
    },
    colorSuccessFrosted: {
      name: 'colorSuccessFrosted',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      value: colorSuccessFrosted,
    },
    colorSuccessFrostedSoft: {
      name: 'colorSuccessFrostedSoft',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted-soft** color, typically used as background \`:hover\`.`,
      value: colorSuccessFrostedSoft,
    },
    colorWarning: {
      name: 'colorWarning',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning** color, typically used for text.`,
      value: colorWarning,
    },
    colorWarningMedium: {
      name: 'colorWarningMedium',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-medium** color, typically used for text or border.`,
      value: colorWarningMedium,
    },
    colorWarningLow: {
      name: 'colorWarningLow',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-low** color, typically used for text or border.`,
      value: colorWarningLow,
    },
    colorWarningFrosted: {
      name: 'colorWarningFrosted',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      value: colorWarningFrosted,
    },
    colorWarningFrostedSoft: {
      name: 'colorWarningFrostedSoft',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted-soft** color, typically used as background \`:hover\`.`,
      value: colorWarningFrostedSoft,
    },
    colorError: {
      name: 'colorError',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error** color, typically used for text.`,
      value: colorError,
    },
    colorErrorMedium: {
      name: 'colorErrorMedium',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-medium** color, typically used for text or border.`,
      value: colorErrorMedium,
    },
    colorErrorLow: {
      name: 'colorErrorLow',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-low** color, typically used for text or border.`,
      value: colorErrorLow,
    },
    colorErrorFrosted: {
      name: 'colorErrorFrosted',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
      value: colorErrorFrosted,
    },
    colorErrorFrostedSoft: {
      name: 'colorErrorFrostedSoft',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted-soft** color, typically used as background \`:hover\`.`,
      value: colorErrorFrostedSoft,
    },
  },
  a11y: {
    colorFocus: {
      name: 'colorFocus',
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **focus** color, typically used as the outline for \`:focus-visible\` states.`,
      value: colorFocus,
    },
  },
  colorSchemeStyles: {
    name: 'colorSchemeStyles',
    description:
      'Holds the global style rules for the `.scheme-*` color-scheme classes, including [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) fallback variables for browsers without support.',
    value: colorSchemeStyles,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
  theme: {
    name: 'theme',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use individual variables instead.',
    value: theme,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
  themeDark: {
    name: 'themeDark',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use individual variables instead.',
    value: themeDark,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorCanvasDark instead. */
  themeDarkBackgroundBase: {
    name: 'themeDarkBackgroundBase',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorCanvasDark instead.',
    value: themeDarkBackgroundBase,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead. */
  themeDarkBackgroundFrosted: {
    name: 'themeDarkBackgroundFrosted',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead.',
    value: themeDarkBackgroundFrosted,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorBackdropDark instead. */
  themeDarkBackgroundShading: {
    name: 'themeDarkBackgroundShading',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorBackdropDark instead.',
    value: themeDarkBackgroundShading,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceDark instead. */
  themeDarkBackgroundSurface: {
    name: 'themeDarkBackgroundSurface',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceDark instead.',
    value: themeDarkBackgroundSurface,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighDark instead. */
  themeDarkContrastHigh: {
    name: 'themeDarkContrastHigh',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighDark instead.',
    value: themeDarkContrastHigh,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowDark instead. */
  themeDarkContrastLow: {
    name: 'themeDarkContrastLow',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowDark instead.',
    value: themeDarkContrastLow,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumDark instead. */
  themeDarkContrastMedium: {
    name: 'themeDarkContrastMedium',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumDark instead.',
    value: themeDarkContrastMedium,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorDark instead. */
  themeDarkNotificationError: {
    name: 'themeDarkNotificationError',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorErrorDark instead.',
    value: themeDarkNotificationError,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedDark instead. */
  themeDarkNotificationErrorSoft: {
    name: 'themeDarkNotificationErrorSoft',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedDark instead.',
    value: themeDarkNotificationErrorSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoDark instead. */
  themeDarkNotificationInfo: {
    name: 'themeDarkNotificationInfo',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoDark instead.',
    value: themeDarkNotificationInfo,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedDark instead. */
  themeDarkNotificationInfoSoft: {
    name: 'themeDarkNotificationInfoSoft',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedDark instead.',
    value: themeDarkNotificationInfoSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessDark instead. */
  themeDarkNotificationSuccess: {
    name: 'themeDarkNotificationSuccess',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessDark instead.',
    value: themeDarkNotificationSuccess,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedDark instead. */
  themeDarkNotificationSuccessSoft: {
    name: 'themeDarkNotificationSuccessSoft',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedDark instead.',
    value: themeDarkNotificationSuccessSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningDark instead. */
  themeDarkNotificationWarning: {
    name: 'themeDarkNotificationWarning',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorWarningDark instead.',
    value: themeDarkNotificationWarning,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedDark instead. */
  themeDarkNotificationWarningSoft: {
    name: 'themeDarkNotificationWarningSoft',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedDark instead.',
    value: themeDarkNotificationWarningSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryDark instead. */
  themeDarkPrimary: {
    name: 'themeDarkPrimary',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryDark instead.',
    value: themeDarkPrimary,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead. */
  themeDarkStateActive: {
    name: 'themeDarkStateActive',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead.',
    value: themeDarkStateActive,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. */
  themeDarkStateDisabled: {
    name: 'themeDarkStateDisabled',
    description: 'deprecated since v4.0.0, will be removed with next major release.',
    value: themeDarkStateDisabled,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFocusDark instead. */
  themeDarkStateFocus: {
    name: 'themeDarkStateFocus',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFocusDark instead.',
    value: themeDarkStateFocus,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead. */
  themeDarkStateHover: {
    name: 'themeDarkStateHover',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead.',
    value: themeDarkStateHover,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
  themeLight: {
    name: 'themeLight',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use individual variables instead.',
    value: themeLight,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorCanvasLight instead. */
  themeLightBackgroundBase: {
    name: 'themeLightBackgroundBase',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorCanvasLight instead.',
    value: themeLightBackgroundBase,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead. */
  themeLightBackgroundFrosted: {
    name: 'themeLightBackgroundFrosted',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead.',
    value: themeLightBackgroundFrosted,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorBackdropLight instead. */
  themeLightBackgroundShading: {
    name: 'themeLightBackgroundShading',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorBackdropLight instead.',
    value: themeLightBackgroundShading,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceLight instead. */
  themeLightBackgroundSurface: {
    name: 'themeLightBackgroundSurface',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceLight instead.',
    value: themeLightBackgroundSurface,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighLight instead. */
  themeLightContrastHigh: {
    name: 'themeLightContrastHigh',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighLight instead.',
    value: themeLightContrastHigh,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowLight instead. */
  themeLightContrastLow: {
    name: 'themeLightContrastLow',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowLight instead.',
    value: themeLightContrastLow,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumLight instead. */
  themeLightContrastMedium: {
    name: 'themeLightContrastMedium',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumLight instead.',
    value: themeLightContrastMedium,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorLight instead. */
  themeLightNotificationError: {
    name: 'themeLightNotificationError',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorErrorLight instead.',
    value: themeLightNotificationError,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedLight instead. */
  themeLightNotificationErrorSoft: {
    name: 'themeLightNotificationErrorSoft',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedLight instead.',
    value: themeLightNotificationErrorSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoLight instead. */
  themeLightNotificationInfo: {
    name: 'themeLightNotificationInfo',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoLight instead.',
    value: themeLightNotificationInfo,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedLight instead. */
  themeLightNotificationInfoSoft: {
    name: 'themeLightNotificationInfoSoft',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedLight instead.',
    value: themeLightNotificationInfoSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessLight instead. */
  themeLightNotificationSuccess: {
    name: 'themeLightNotificationSuccess',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessLight instead.',
    value: themeLightNotificationSuccess,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedLight instead. */
  themeLightNotificationSuccessSoft: {
    name: 'themeLightNotificationSuccessSoft',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedLight instead.',
    value: themeLightNotificationSuccessSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningLight instead. */
  themeLightNotificationWarning: {
    name: 'themeLightNotificationWarning',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorWarningLight instead.',
    value: themeLightNotificationWarning,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedLight instead. */
  themeLightNotificationWarningSoft: {
    name: 'themeLightNotificationWarningSoft',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedLight instead.',
    value: themeLightNotificationWarningSoft,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryLight instead. */
  themeLightPrimary: {
    name: 'themeLightPrimary',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryLight instead.',
    value: themeLightPrimary,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead. */
  themeLightStateActive: {
    name: 'themeLightStateActive',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead.',
    value: themeLightStateActive,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. */
  themeLightStateDisabled: {
    name: 'themeLightStateDisabled',
    description: 'deprecated since v4.0.0, will be removed with next major release.',
    value: themeLightStateDisabled,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFocusLight instead. */
  themeLightStateFocus: {
    name: 'themeLightStateFocus',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFocusLight instead.',
    value: themeLightStateFocus,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead. */
  themeLightStateHover: {
    name: 'themeLightStateHover',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead.',
    value: themeLightStateHover,
    deprecated: true,
  },
} as const;
