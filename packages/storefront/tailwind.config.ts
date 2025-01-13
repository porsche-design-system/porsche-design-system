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

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      'background-code': {
        light: 'rgba(0, 0, 0, 0.06)',
        DEFAULT: 'rgba(0, 0, 0, 0.06)',
        dark: 'rgba(255, 255, 255, 0.08)',
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
          ...getFocusStyle(),
        },
      });
    }),
  ],
} satisfies Config;
