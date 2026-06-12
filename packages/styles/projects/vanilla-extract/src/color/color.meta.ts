import {
  colorBackdrop as _colorBackdrop,
  colorCanvas as _colorCanvas,
  colorContrastHigh as _colorContrastHigh,
  colorContrastHigher as _colorContrastHigher,
  colorContrastLow as _colorContrastLow,
  colorContrastLower as _colorContrastLower,
  colorContrastMedium as _colorContrastMedium,
  colorError as _colorError,
  colorErrorFrosted as _colorErrorFrosted,
  colorErrorFrostedSoft as _colorErrorFrostedSoft,
  colorErrorLow as _colorErrorLow,
  colorErrorMedium as _colorErrorMedium,
  colorFocus as _colorFocus,
  colorFrosted as _colorFrosted,
  colorFrostedSoft as _colorFrostedSoft,
  colorFrostedStrong as _colorFrostedStrong,
  colorInfo as _colorInfo,
  colorInfoFrosted as _colorInfoFrosted,
  colorInfoFrostedSoft as _colorInfoFrostedSoft,
  colorInfoLow as _colorInfoLow,
  colorInfoMedium as _colorInfoMedium,
  colorPrimary as _colorPrimary,
  colorSuccess as _colorSuccess,
  colorSuccessFrosted as _colorSuccessFrosted,
  colorSuccessFrostedSoft as _colorSuccessFrostedSoft,
  colorSuccessLow as _colorSuccessLow,
  colorSuccessMedium as _colorSuccessMedium,
  colorSurface as _colorSurface,
  colorWarning as _colorWarning,
  colorWarningFrosted as _colorWarningFrosted,
  colorWarningFrostedSoft as _colorWarningFrostedSoft,
  colorWarningLow as _colorWarningLow,
  colorWarningMedium as _colorWarningMedium,
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
  colorErrorDark,
  colorErrorFrostedDark,
  colorErrorFrostedLight,
  colorErrorLight,
  colorFocusDark,
  colorFocusLight,
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
import type { Meta, MetaEntry } from '../meta.types';

export const colorMeta: Meta = {
  lightDark: {
    colorCanvas: {
      name: 'colorCanvas',
      value: `var(--_color-canvas, ${_colorCanvas})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **canvas** color, typically used for surfaces.`,
    },
    colorSurface: {
      name: 'colorSurface',
      value: `var(--_color-surface, ${_colorSurface})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **surface** color, typically used for surfaces.`,
    },
    colorFrosted: {
      name: 'colorFrosted',
      value: `var(--_color-frosted, ${_colorFrosted})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted** color, typically used as a background in combination with \`blur()\`.`,
    },
    colorFrostedSoft: {
      name: 'colorFrostedSoft',
      value: `var(--_color-frosted-soft, ${_colorFrostedSoft})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted-soft** color, typically used as a background \`:hover\`.`,
    },
    colorFrostedStrong: {
      name: 'colorFrostedStrong',
      value: `var(--_color-frosted-strong, ${_colorFrostedStrong})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted-strong** color, typically used as a background in combination with \`blur()\`.`,
    },
    colorBackdrop: {
      name: 'colorBackdrop',
      value: `var(--_color-backdrop, ${_colorBackdrop})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **backdrop** color, typically used for backdrops.`,
    },
    colorPrimary: {
      name: 'colorPrimary',
      value: `var(--_color-primary, ${_colorPrimary})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **primary** color, typically used for text.`,
    },
    colorContrastHigher: {
      name: 'colorContrastHigher',
      value: `var(--_color-contrast-higher, ${_colorContrastHigher})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-higher** color, typically used for text.`,
    },
    colorContrastHigh: {
      name: 'colorContrastHigh',
      value: `var(--_color-contrast-high, ${_colorContrastHigh})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-high** color, typically used for text.`,
    },
    colorContrastMedium: {
      name: 'colorContrastMedium',
      value: `var(--_color-contrast-medium, ${_colorContrastMedium})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-medium** color, typically used for text.`,
    },
    colorContrastLow: {
      name: 'colorContrastLow',
      value: `var(--_color-contrast-low, ${_colorContrastLow})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-low** color, intended only for decorative elements.`,
    },
    colorContrastLower: {
      name: 'colorContrastLower',
      value: `var(--_color-contrast-lower, ${_colorContrastLower})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-lower** color, intended only for decorative elements.`,
    },
    colorInfo: {
      name: 'colorInfo',
      value: `var(--_color-info, ${_colorInfo})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info** color, typically used for text.`,
    },
    colorInfoMedium: {
      name: 'colorInfoMedium',
      value: `var(--_color-info-medium, ${_colorInfoMedium})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-medium** color, typically used for text or border.`,
    },
    colorInfoLow: {
      name: 'colorInfoLow',
      value: `var(--_color-info-low, ${_colorInfoLow})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-low** color, typically used for text or border.`,
    },
    colorInfoFrosted: {
      name: 'colorInfoFrosted',
      value: `var(--_color-info-frosted, ${_colorInfoFrosted})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    colorInfoFrostedSoft: {
      name: 'colorInfoFrostedSoft',
      value: `var(--_color-info-frosted-soft, ${_colorInfoFrostedSoft})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted-soft** color, typically used as background \`:hover\`.`,
    },
    colorSuccess: {
      name: 'colorSuccess',
      value: `var(--_color-success, ${_colorSuccess})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success** color, typically used for text.`,
    },
    colorSuccessMedium: {
      name: 'colorSuccessMedium',
      value: `var(--_color-success-medium, ${_colorSuccessMedium})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-medium** color, typically used for text or border.`,
    },
    colorSuccessLow: {
      name: 'colorSuccessLow',
      value: `var(--_color-success-low, ${_colorSuccessLow})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-low** color, typically used for text or border.`,
    },
    colorSuccessFrosted: {
      name: 'colorSuccessFrosted',
      value: `var(--_color-success-frosted, ${_colorSuccessFrosted})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    colorSuccessFrostedSoft: {
      name: 'colorSuccessFrostedSoft',
      value: `var(--_color-success-frosted-soft, ${_colorSuccessFrostedSoft})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted-soft** color, typically used as background \`:hover\`.`,
    },
    colorWarning: {
      name: 'colorWarning',
      value: `var(--_color-warning, ${_colorWarning})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning** color, typically used for text.`,
    },
    colorWarningMedium: {
      name: 'colorWarningMedium',
      value: `var(--_color-warning-medium, ${_colorWarningMedium})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-medium** color, typically used for text or border.`,
    },
    colorWarningLow: {
      name: 'colorWarningLow',
      value: `var(--_color-warning-low, ${_colorWarningLow})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-low** color, typically used for text or border.`,
    },
    colorWarningFrosted: {
      name: 'colorWarningFrosted',
      value: `var(--_color-warning-frosted, ${_colorWarningFrosted})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    colorWarningFrostedSoft: {
      name: 'colorWarningFrostedSoft',
      value: `var(--_color-warning-frosted-soft, ${_colorWarningFrostedSoft})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted-soft** color, typically used as background \`:hover\`.`,
    },
    colorError: {
      name: 'colorError',
      value: `var(--_color-error, ${_colorError})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error** color, typically used for text.`,
    },
    colorErrorMedium: {
      name: 'colorErrorMedium',
      value: `var(--_color-error-medium, ${_colorErrorMedium})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-medium** color, typically used for text or border.`,
    },
    colorErrorLow: {
      name: 'colorErrorLow',
      value: `var(--_color-error-low, ${_colorErrorLow})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-low** color, typically used for text or border.`,
    },
    colorErrorFrosted: {
      name: 'colorErrorFrosted',
      value: `var(--_color-error-frosted, ${_colorErrorFrosted})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted** color, typically used as background with \`.backdrop-blur-frosted\`.`,
    },
    colorErrorFrostedSoft: {
      name: 'colorErrorFrostedSoft',
      value: `var(--_color-error-frosted-soft, ${_colorErrorFrostedSoft})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted-soft** color, typically used as background \`:hover\`.`,
    },
    colorFocus: {
      name: 'colorFocus',
      value: `var(--_color-focus, ${_colorFocus})`,
      description: `Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **focus** color, typically used as the outline for \`:focus-visible\` states.`,
    },
  },
} as const;

const themeDark = {
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
} as const;

const themeLight = {
  primary: colorPrimaryLight,
  background: {
    base: colorCanvasLight,
    surface: colorSurfaceLight,
    shading: colorBackdropLight,
    frosted: colorFrostedLight,
  },
  contrast: { low: colorContrastLowLight, medium: colorContrastMediumLight, high: colorContrastHighLight },
  notification: {
    success: colorSuccessLight,
    successSoft: colorSuccessFrostedLight,
    warning: colorWarningLight,
    warningSoft: colorWarningFrostedLight,
    error: colorErrorLight,
    errorSoft: colorErrorFrostedLight,
    info: colorInfoLight,
    infoSoft: colorInfoFrostedLight,
  },
  state: {
    hover: colorFrostedLight,
    active: colorFrostedLight,
    focus: colorFocusLight,
    disabled: 'hsla(233,6.6%,23.9%,0.412)',
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
const deprecatedTheme: MetaEntry = {
  name: 'theme',
  value: { light: themeLight, dark: themeDark } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use individual variables instead.',
  handWritten: true,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
const deprecatedThemeDark: MetaEntry = {
  name: 'themeDark',
  value: themeDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use individual variables instead.',
  handWritten: true,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorCanvasDark instead. */
const deprecatedThemeDarkBackgroundBase: MetaEntry = {
  name: 'themeDarkBackgroundBase',
  value: colorCanvasDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorCanvasDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead. */
const deprecatedThemeDarkBackgroundFrosted: MetaEntry = {
  name: 'themeDarkBackgroundFrosted',
  value: colorFrostedDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorBackdropDark instead. */
const deprecatedThemeDarkBackgroundShading: MetaEntry = {
  name: 'themeDarkBackgroundShading',
  value: colorBackdropDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorBackdropDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceDark instead. */
const deprecatedThemeDarkBackgroundSurface: MetaEntry = {
  name: 'themeDarkBackgroundSurface',
  value: colorSurfaceDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighDark instead. */
const deprecatedThemeDarkContrastHigh: MetaEntry = {
  name: 'themeDarkContrastHigh',
  value: colorContrastHighDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowDark instead. */
const deprecatedThemeDarkContrastLow: MetaEntry = {
  name: 'themeDarkContrastLow',
  value: colorContrastLowDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumDark instead. */
const deprecatedThemeDarkContrastMedium: MetaEntry = {
  name: 'themeDarkContrastMedium',
  value: colorContrastMediumDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorDark instead. */
const deprecatedThemeDarkNotificationError: MetaEntry = {
  name: 'themeDarkNotificationError',
  value: colorErrorDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorErrorDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedDark instead. */
const deprecatedThemeDarkNotificationErrorSoft: MetaEntry = {
  name: 'themeDarkNotificationErrorSoft',
  value: colorErrorFrostedDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoDark instead. */
const deprecatedThemeDarkNotificationInfo: MetaEntry = {
  name: 'themeDarkNotificationInfo',
  value: colorInfoDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedDark instead. */
const deprecatedThemeDarkNotificationInfoSoft: MetaEntry = {
  name: 'themeDarkNotificationInfoSoft',
  value: colorInfoFrostedDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessDark instead. */
const deprecatedThemeDarkNotificationSuccess: MetaEntry = {
  name: 'themeDarkNotificationSuccess',
  value: colorSuccessDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedDark instead. */
const deprecatedThemeDarkNotificationSuccessSoft: MetaEntry = {
  name: 'themeDarkNotificationSuccessSoft',
  value: colorSuccessFrostedDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningDark instead. */
const deprecatedThemeDarkNotificationWarning: MetaEntry = {
  name: 'themeDarkNotificationWarning',
  value: colorWarningDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorWarningDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedDark instead. */
const deprecatedThemeDarkNotificationWarningSoft: MetaEntry = {
  name: 'themeDarkNotificationWarningSoft',
  value: colorWarningFrostedDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryDark instead. */
const deprecatedThemeDarkPrimary: MetaEntry = {
  name: 'themeDarkPrimary',
  value: colorPrimaryDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead. */
const deprecatedThemeDarkStateActive: MetaEntry = {
  name: 'themeDarkStateActive',
  value: colorFrostedDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. */
const deprecatedThemeDarkStateDisabled: MetaEntry = {
  name: 'themeDarkStateDisabled',
  value: 'hsla(240,1.5%,61.8%,0.302)',
  description: 'deprecated since v4.0.0, will be removed with next major release.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFocusDark instead. */
const deprecatedThemeDarkStateFocus: MetaEntry = {
  name: 'themeDarkStateFocus',
  value: colorFocusDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFocusDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead. */
const deprecatedThemeDarkStateHover: MetaEntry = {
  name: 'themeDarkStateHover',
  value: colorFrostedDark,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedDark instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
const deprecatedThemeLight: MetaEntry = {
  name: 'themeLight',
  value: themeLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use individual variables instead.',
  handWritten: true,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorCanvasLight instead. */
const deprecatedThemeLightBackgroundBase: MetaEntry = {
  name: 'themeLightBackgroundBase',
  value: colorCanvasLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorCanvasLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead. */
const deprecatedThemeLightBackgroundFrosted: MetaEntry = {
  name: 'themeLightBackgroundFrosted',
  value: colorFrostedLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorBackdropLight instead. */
const deprecatedThemeLightBackgroundShading: MetaEntry = {
  name: 'themeLightBackgroundShading',
  value: colorBackdropLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorBackdropLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceLight instead. */
const deprecatedThemeLightBackgroundSurface: MetaEntry = {
  name: 'themeLightBackgroundSurface',
  value: colorSurfaceLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSurfaceLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighLight instead. */
const deprecatedThemeLightContrastHigh: MetaEntry = {
  name: 'themeLightContrastHigh',
  value: colorContrastHighLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastHighLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowLight instead. */
const deprecatedThemeLightContrastLow: MetaEntry = {
  name: 'themeLightContrastLow',
  value: colorContrastLowLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorContrastLowLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumLight instead. */
const deprecatedThemeLightContrastMedium: MetaEntry = {
  name: 'themeLightContrastMedium',
  value: colorContrastMediumLight,
  description:
    'deprecated since v4.0.0, will be removed with next major release. Use colorContrastMediumLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorLight instead. */
const deprecatedThemeLightNotificationError: MetaEntry = {
  name: 'themeLightNotificationError',
  value: colorErrorLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorErrorLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedLight instead. */
const deprecatedThemeLightNotificationErrorSoft: MetaEntry = {
  name: 'themeLightNotificationErrorSoft',
  value: colorErrorFrostedLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorErrorFrostedLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoLight instead. */
const deprecatedThemeLightNotificationInfo: MetaEntry = {
  name: 'themeLightNotificationInfo',
  value: colorInfoLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedLight instead. */
const deprecatedThemeLightNotificationInfoSoft: MetaEntry = {
  name: 'themeLightNotificationInfoSoft',
  value: colorInfoFrostedLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorInfoFrostedLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessLight instead. */
const deprecatedThemeLightNotificationSuccess: MetaEntry = {
  name: 'themeLightNotificationSuccess',
  value: colorSuccessLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedLight instead. */
const deprecatedThemeLightNotificationSuccessSoft: MetaEntry = {
  name: 'themeLightNotificationSuccessSoft',
  value: colorSuccessFrostedLight,
  description:
    'deprecated since v4.0.0, will be removed with next major release. Use colorSuccessFrostedLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningLight instead. */
const deprecatedThemeLightNotificationWarning: MetaEntry = {
  name: 'themeLightNotificationWarning',
  value: colorWarningLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorWarningLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedLight instead. */
const deprecatedThemeLightNotificationWarningSoft: MetaEntry = {
  name: 'themeLightNotificationWarningSoft',
  value: colorWarningFrostedLight,
  description:
    'deprecated since v4.0.0, will be removed with next major release. Use colorWarningFrostedLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryLight instead. */
const deprecatedThemeLightPrimary: MetaEntry = {
  name: 'themeLightPrimary',
  value: colorPrimaryLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorPrimaryLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead. */
const deprecatedThemeLightStateActive: MetaEntry = {
  name: 'themeLightStateActive',
  value: colorFrostedLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. */
const deprecatedThemeLightStateDisabled: MetaEntry = {
  name: 'themeLightStateDisabled',
  value: 'hsla(233,6.6%,23.9%,0.412)',
  description: 'deprecated since v4.0.0, will be removed with next major release.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFocusLight instead. */
const deprecatedThemeLightStateFocus: MetaEntry = {
  name: 'themeLightStateFocus',
  value: colorFocusLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFocusLight instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead. */
const deprecatedThemeLightStateHover: MetaEntry = {
  name: 'themeLightStateHover',
  value: colorFrostedLight,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use colorFrostedLight instead.',
};

export const deprecatedColorMeta: Meta = {
  theme: deprecatedTheme,
  themeDark: deprecatedThemeDark,
  themeDarkBackgroundBase: deprecatedThemeDarkBackgroundBase,
  themeDarkBackgroundFrosted: deprecatedThemeDarkBackgroundFrosted,
  themeDarkBackgroundShading: deprecatedThemeDarkBackgroundShading,
  themeDarkBackgroundSurface: deprecatedThemeDarkBackgroundSurface,
  themeDarkContrastHigh: deprecatedThemeDarkContrastHigh,
  themeDarkContrastLow: deprecatedThemeDarkContrastLow,
  themeDarkContrastMedium: deprecatedThemeDarkContrastMedium,
  themeDarkNotificationError: deprecatedThemeDarkNotificationError,
  themeDarkNotificationErrorSoft: deprecatedThemeDarkNotificationErrorSoft,
  themeDarkNotificationInfo: deprecatedThemeDarkNotificationInfo,
  themeDarkNotificationInfoSoft: deprecatedThemeDarkNotificationInfoSoft,
  themeDarkNotificationSuccess: deprecatedThemeDarkNotificationSuccess,
  themeDarkNotificationSuccessSoft: deprecatedThemeDarkNotificationSuccessSoft,
  themeDarkNotificationWarning: deprecatedThemeDarkNotificationWarning,
  themeDarkNotificationWarningSoft: deprecatedThemeDarkNotificationWarningSoft,
  themeDarkPrimary: deprecatedThemeDarkPrimary,
  themeDarkStateActive: deprecatedThemeDarkStateActive,
  themeDarkStateDisabled: deprecatedThemeDarkStateDisabled,
  themeDarkStateFocus: deprecatedThemeDarkStateFocus,
  themeDarkStateHover: deprecatedThemeDarkStateHover,
  themeLight: deprecatedThemeLight,
  themeLightBackgroundBase: deprecatedThemeLightBackgroundBase,
  themeLightBackgroundFrosted: deprecatedThemeLightBackgroundFrosted,
  themeLightBackgroundShading: deprecatedThemeLightBackgroundShading,
  themeLightBackgroundSurface: deprecatedThemeLightBackgroundSurface,
  themeLightContrastHigh: deprecatedThemeLightContrastHigh,
  themeLightContrastLow: deprecatedThemeLightContrastLow,
  themeLightContrastMedium: deprecatedThemeLightContrastMedium,
  themeLightNotificationError: deprecatedThemeLightNotificationError,
  themeLightNotificationErrorSoft: deprecatedThemeLightNotificationErrorSoft,
  themeLightNotificationInfo: deprecatedThemeLightNotificationInfo,
  themeLightNotificationInfoSoft: deprecatedThemeLightNotificationInfoSoft,
  themeLightNotificationSuccess: deprecatedThemeLightNotificationSuccess,
  themeLightNotificationSuccessSoft: deprecatedThemeLightNotificationSuccessSoft,
  themeLightNotificationWarning: deprecatedThemeLightNotificationWarning,
  themeLightNotificationWarningSoft: deprecatedThemeLightNotificationWarningSoft,
  themeLightPrimary: deprecatedThemeLightPrimary,
  themeLightStateActive: deprecatedThemeLightStateActive,
  themeLightStateDisabled: deprecatedThemeLightStateDisabled,
  themeLightStateFocus: deprecatedThemeLightStateFocus,
  themeLightStateHover: deprecatedThemeLightStateHover,
} as const;
