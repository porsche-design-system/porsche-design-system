import {
  borderRadius,
  borderWidth,
  breakpoint,
  fontFamily,
  fontLineHeight,
  fontSizeHeading,
  fontSizeText,
  fontWeight,
  getFocusStyle,
  headingLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  headingXLargeStyle,
  headingXXLargeStyle,
  spacingFluid,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXLarge,
  spacingStaticXSmall,
  spacingStaticXXLarge,
  textSmallStyle,
  themeDark,
  themeLight,
} from '@porsche-design-system/components-react/styles';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import type { RecursiveKeyValuePair } from 'tailwindcss/types/config';

const pdsThemePrimary = '--pds-theme-primary';
const pdsThemeBackgroundBase = '--pds-theme-background-base';
const pdsThemeBackgroundSurface = '--pds-theme-background-surface';
const pdsThemeBackgroundShading = '--pds-theme-background-shading';
const pdsThemeCustomBackgroundCode = '--pds-theme-custom-background-code';
const pdsThemeContrastLow = '--pds-theme-contrast-low';
const pdsThemeContrastMedium = '--pds-theme-contrast-medium';
const pdsThemeContrastHigh = '--pds-theme-contrast-high';
const pdsThemeNotificationSuccess = '--pds-theme-notification-success';
const pdsThemeNotificationWarning = '--pds-theme-notification-warning';
const pdsThemeNotificationError = '--pds-theme-notification-error';
const pdsThemeNotificationInfo = '--pds-theme-notification-info';
const pdsThemeStateHover = '--pds-theme-state-hover';
const pdsThemeStateActive = '--pds-theme-state-active';
const pdsThemeStateFocus = '--pds-theme-state-focus';
const pdsThemeStateDisabled = '--pds-theme-state-disabled';

const lightTheme = {
  [pdsThemePrimary]: themeLight.primary,
  [pdsThemeBackgroundBase]: themeLight.background.base,
  [pdsThemeBackgroundSurface]: themeLight.background.surface,
  [pdsThemeBackgroundShading]: themeLight.background.shading,
  [pdsThemeCustomBackgroundCode]: 'rgba(0, 0, 0, 0.06)',
  [pdsThemeContrastLow]: themeLight.contrast.low,
  [pdsThemeContrastMedium]: themeLight.contrast.medium,
  [pdsThemeContrastHigh]: themeLight.contrast.high,
  [pdsThemeNotificationSuccess]: themeLight.notification.success,
  [pdsThemeNotificationWarning]: themeLight.notification.warning,
  [pdsThemeNotificationError]: themeLight.notification.error,
  [pdsThemeNotificationInfo]: themeLight.notification.info,
  [pdsThemeStateHover]: themeLight.state.hover,
  [pdsThemeStateActive]: themeLight.state.active,
  [pdsThemeStateFocus]: themeLight.state.focus,
  [pdsThemeStateDisabled]: themeLight.state.disabled,
};

const darkTheme = {
  [pdsThemePrimary]: themeDark.primary,
  [pdsThemeBackgroundBase]: themeDark.background.base,
  [pdsThemeBackgroundSurface]: themeDark.background.surface,
  [pdsThemeBackgroundShading]: themeDark.background.shading,
  [pdsThemeCustomBackgroundCode]: 'rgba(255, 255, 255, 0.08)',
  [pdsThemeContrastLow]: themeDark.contrast.low,
  [pdsThemeContrastMedium]: themeDark.contrast.medium,
  [pdsThemeContrastHigh]: themeDark.contrast.high,
  [pdsThemeNotificationSuccess]: themeDark.notification.success,
  [pdsThemeNotificationWarning]: themeDark.notification.warning,
  [pdsThemeNotificationError]: themeDark.notification.error,
  [pdsThemeNotificationInfo]: themeDark.notification.info,
  [pdsThemeStateHover]: themeDark.state.hover,
  [pdsThemeStateActive]: themeDark.state.active,
  [pdsThemeStateFocus]: themeDark.state.focus,
  [pdsThemeStateDisabled]: themeDark.state.disabled,
};

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  darkMode: 'selector',
  theme: {
    screens: {
      xs: `${breakpoint.xs}px`,
      sm: `${breakpoint.s}px`,
      md: `${breakpoint.m}px`,
      lg: `${breakpoint.l}px`,
      xl: `${breakpoint.xl}px`,
      '2xl': `${breakpoint.xxl}px`,
    },
    fontFamily: {
      'porsche-next': fontFamily,
      code: "Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
    fontSize: {
      '2xs': [fontSizeText.xxSmall, fontLineHeight],
      xs: [fontSizeText.xSmall, fontLineHeight],
      base: [fontSizeText.small, fontLineHeight],
      sm: [fontSizeText.small, fontLineHeight],
      md: [fontSizeText.medium, fontLineHeight],
      lg: [fontSizeText.large, fontLineHeight],
      xl: [fontSizeText.xLarge, fontLineHeight],
      '2xl': [fontSizeHeading.xxLarge, fontLineHeight],
    },
    fontWeight: {
      regular: `${fontWeight.regular}`,
      'semi-bold': `${fontWeight.semiBold}`,
      bold: `${fontWeight.bold}`,
    },
    colors: {
      primary: {
        light: themeLight.primary,
        DEFAULT: `var(${pdsThemePrimary})`,
        dark: themeDark.primary,
      },
      'background-base': {
        light: themeLight.background.base,
        DEFAULT: `var(${pdsThemeBackgroundBase})`,
        dark: themeDark.background.base,
      },
      'background-surface': {
        light: themeLight.background.surface,
        DEFAULT: `var(${pdsThemeBackgroundSurface})`,
        dark: themeDark.background.surface,
      },
      'background-shading': {
        light: themeLight.background.shading,
        DEFAULT: `var(${pdsThemeBackgroundShading})`,
        dark: themeDark.background.shading,
      },
      'background-code': {
        light: 'rgba(0, 0, 0, 0.06)',
        DEFAULT: `var(${pdsThemeCustomBackgroundCode})`,
        dark: 'rgba(255, 255, 255, 0.08)',
      },
      'contrast-low': {
        light: themeLight.contrast.low,
        DEFAULT: `var(${pdsThemeContrastLow})`,
        dark: themeDark.contrast.low,
      },
      'contrast-medium': {
        light: themeLight.contrast.medium,
        DEFAULT: `var(${pdsThemeContrastMedium})`,
        dark: themeDark.contrast.medium,
      },
      'contrast-high': {
        light: themeLight.contrast.high,
        DEFAULT: `var(${pdsThemeContrastHigh})`,
        dark: themeDark.contrast.high,
      },
      'notification-success': {
        light: themeLight.notification.success,
        DEFAULT: `var(${pdsThemeNotificationSuccess})`,
        dark: themeDark.notification.success,
      },
      'notification-warning': {
        light: themeLight.notification.warning,
        DEFAULT: `var(${pdsThemeNotificationWarning})`,
        dark: themeDark.notification.warning,
      },
      'notification-error': {
        light: themeLight.notification.error,
        DEFAULT: `var(${pdsThemeNotificationError})`,
        dark: themeDark.notification.error,
      },
      'notification-info': {
        light: themeLight.notification.info,
        DEFAULT: `var(${pdsThemeNotificationInfo})`,
        dark: themeDark.notification.info,
      },
      'state-hover': {
        light: themeLight.state.hover,
        DEFAULT: `var(${pdsThemeStateHover})`,
        dark: themeDark.state.hover,
      },
      'state-active': {
        light: themeLight.state.active,
        DEFAULT: `var(${pdsThemeStateActive})`,
        dark: themeDark.state.active,
      },
      'state-focus': {
        light: themeLight.state.focus,
        DEFAULT: `var(${pdsThemeStateFocus})`,
        dark: themeDark.state.focus,
      },
      'state-disabled': {
        light: themeLight.state.disabled,
        DEFAULT: `var(${pdsThemeStateDisabled})`,
        dark: themeDark.state.disabled,
      },
    },
    extend: {
      spacing: {
        xs: spacingFluid.xSmall,
        sm: spacingFluid.small,
        md: spacingFluid.medium,
        lg: spacingFluid.large,
        xl: spacingFluid.xLarge,
        '2xl': spacingFluid.xxLarge,
        'static-xs': spacingStaticXSmall,
        'static-sm': spacingStaticSmall,
        'static-md': spacingStaticMedium,
        'static-lg': spacingStaticLarge,
        'static-xl': spacingStaticXLarge,
        'static-2xl': spacingStaticXXLarge,
      },
      borderWidth: {
        DEFAULT: borderWidth.base,
        thin: borderWidth.thin,
        base: borderWidth.base,
      },
      borderRadius: {
        DEFAULT: borderRadius.small,
        sm: borderRadius.small,
        md: borderRadius.medium,
        lg: borderRadius.large,
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.pds-heading-xx-large': {
          ...headingXXLargeStyle,
        },
        '.pds-heading-x-large': {
          ...headingXLargeStyle,
        },
        '.pds-heading-large': {
          ...headingLargeStyle,
        },
        '.pds-heading-medium': {
          ...headingMediumStyle,
        },
        '.pds-heading-small': {
          ...headingSmallStyle,
        },
        '.pds-text-small': {
          ...textSmallStyle,
        },
        '.pds-focus': {
          ...(getFocusStyle() as RecursiveKeyValuePair),
        },
      });
    }),
    plugin(({ addBase }) => {
      addBase({
        body: {
          ...lightTheme,
          '@media (prefers-color-scheme: dark)': darkTheme,
        },
        'body.light': lightTheme,
        'body.dark': darkTheme,
      });
    }),
  ],
} satisfies Config;
