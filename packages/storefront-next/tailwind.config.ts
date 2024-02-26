import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import {
  borderRadius,
  borderWidth,
  breakpoint,
  fontFamily,
  fontLineHeight,
  fontSizeHeading,
  fontSizeText,
  fontWeight,
  themeLight,
  themeDark,
} from '@porsche-design-system/components-react/styles';
import { spacingFluid } from '@porsche-design-system/utilities-v2/src/js';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
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
        DEFAULT: themeLight.primary,
        dark: themeDark.primary,
      },
      'background-base': {
        light: themeLight.background.base,
        DEFAULT: themeLight.background.base,
        dark: themeDark.background.base,
      },
      'background-surface': {
        light: themeLight.background.surface,
        DEFAULT: themeLight.background.surface,
        dark: themeDark.background.surface,
      },
      'background-shading': {
        light: themeLight.background.shading,
        DEFAULT: themeLight.background.shading,
        dark: themeDark.background.shading,
      },
      'contrast-low': {
        light: themeLight.contrast.low,
        DEFAULT: themeLight.contrast.low,
        dark: themeDark.contrast.low,
      },
      'contrast-medium': {
        light: themeLight.contrast.medium,
        DEFAULT: themeLight.contrast.medium,
        dark: themeDark.contrast.medium,
      },
      'contrast-high': {
        light: themeLight.contrast.high,
        DEFAULT: themeLight.contrast.high,
        dark: themeDark.contrast.high,
      },
      'notification-success': {
        light: themeLight.notification.success,
        DEFAULT: themeLight.notification.success,
        dark: themeDark.notification.success,
      },
      'notification-warning': {
        light: themeLight.notification.warning,
        DEFAULT: themeLight.notification.warning,
        dark: themeDark.notification.warning,
      },
      'notification-error': {
        light: themeLight.notification.error,
        DEFAULT: themeLight.notification.error,
        dark: themeDark.notification.error,
      },
      'notification-info': {
        light: themeLight.notification.info,
        DEFAULT: themeLight.notification.info,
        dark: themeDark.notification.info,
      },
      'state-hover': {
        light: themeLight.state.hover,
        DEFAULT: themeLight.state.hover,
        dark: themeDark.state.hover,
      },
      'state-active': {
        light: themeLight.state.active,
        DEFAULT: themeLight.state.active,
        dark: themeDark.state.active,
      },
      'state-focus': {
        light: themeLight.state.focus,
        DEFAULT: themeLight.state.focus,
        dark: themeDark.state.focus,
      },
      'state-disabled': {
        light: themeLight.state.disabled,
        DEFAULT: themeLight.state.disabled,
        dark: themeDark.state.disabled,
      },
    },
    spacing: {
      xs: spacingFluid.xSmall,
      sm: spacingFluid.small,
      md: spacingFluid.medium,
      lg: spacingFluid.large,
      xl: spacingFluid.xLarge,
      '2xl': spacingFluid.xxLarge,
    },
    borderWidth: {
      DEFAULT: borderWidth.base,
      base: borderWidth.base,
      thin: borderWidth.thin,
    },
    borderRadius: {
      DEFAULT: borderRadius.small,
      none: '0',
      sm: borderRadius.small,
      md: borderRadius.medium,
      lg: borderRadius.large,
    },
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.mdx-h1': {
          '@apply font-porsche-next font-semi-bold text-2xl text-primary dark:text-primary-dark': '',
        },
        '.mdx-h2': {
          '@apply font-porsche-next font-semi-bold text-xl text-primary dark:text-primary-dark': '',
        },
        '.mdx-h3': {
          '@apply font-porsche-next font-semi-bold text-lg text-primary dark:text-primary-dark': '',
        },
        '.mdx-h4': {
          '@apply font-porsche-next font-semi-bold text-md text-primary dark:text-primary-dark': '',
        },
        '.mdx-h5': {
          '@apply font-porsche-next font-semi-bold text-sm text-primary dark:text-primary-dark': '',
        },
        '.mdx-h6': {
          '@apply font-porsche-next font-semi-bold text-sm text-primary dark:text-primary-dark': '',
        },
        '.mdx-p': {
          '@apply font-porsche-next font-regular text-sm text-primary dark:text-primary-dark': '',
        },
      });
    }),
  ],
};
export default config;
