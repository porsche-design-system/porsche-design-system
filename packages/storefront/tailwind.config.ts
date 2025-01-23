import {
  borderRadius,
  borderWidth,
  breakpoint,
  fontFamily,
  fontLineHeight,
  fontSizeHeading,
  fontSizeText,
  fontWeight,
  spacingFluid,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXLarge,
  spacingStaticXSmall,
  spacingStaticXXLarge,
  themeDark,
  themeLight,
} from '@porsche-design-system/components-react/styles';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const pdsThemePrimary = '--pds-theme-primary';
const pdsThemeBackgroundBase = '--pds-theme-background-base';
const pdsThemeBackgroundSurface = '--pds-theme-background-surface';
const pdsThemeBackgroundShading = '--pds-theme-background-shading';
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

const hljsColor = '--hljs-color';
const hljsBackground = '--hljs-background';
const hljsComment = '--hljs-comment';
const hljsQuote = '--hljs-quote';
const hljsDoctag = '--hljs-doctag';
const hljsKeyword = '--hljs-keyword';
const hljsFormula = '--hljs-formula';
const hljsSection = '--hljs-section';
const hljsName = '--hljs-name';
const hljsSelectorTag = '--hljs-selector-tag';
const hljsDeletionColor = '--hljs-deletion-color';
const hljsDeletionBackground = '--hljs-deletion-background';
const hljsSubst = '--hljs-subst';
const hljsLiteral = '--hljs-literal';
const hljsString = '--hljs-string';
const hljsRegexp = '--hljs-regexp';
const hljsAdditionColor = '--hljs-addition-color';
const hljsAdditionBackground = '--hljs-addition-background';
const hljsAttribute = '--hljs-attribute';
const hljsMetaString = '--hljs-meta-string';
const hljsBuiltIn = '--hljs-built-in';
const hljsAttr = '--hljs-attr';
const hljsVariable = '--hljs-variable';
const hljsTemplateVariable = '--hljs-template-variable';
const hljsType = '--hljs-type';
const hljsSelectorClass = '--hljs-selector-class';
const hljsSelectorAttr = '--hljs-selector-attr';
const hljsSelectorPseudo = '--hljs-selector-pseudo';
const hljsNumber = '--hljs-number';
const hljsSymbol = '--hljs-symbol';
const hljsBullet = '--hljs-bullet';
const hljsLink = '--hljs-link';
const hljsMeta = '--hljs-meta';
const hljsSelectorId = '--hljs-selector-id';
const hljsTitle = '--hljs-title';

const hljsColorLight = '#383a42';
const hljsBackgroundLight = '#EEEFF266';
const hljsCommentColorLight = '#717277';
const hljsQuoteColorLight = '#717277';
const hljsDoctagColorLight = '#a626a4';
const hljsKeywordColorLight = '#a626a4';
const hljsFormulaColorLight = '#a626a4';
const hljsSectionColorLight = '#e41300';
const hljsNameColorLight = '#e41300';
const hljsSelectorTagColorLight = '#e41300';
const hljsDeletionColorLight = '#82071e';
const hljsDeletionBackgroundLight = '#ffebe9';
const hljsSubstColorLight = '#e41300';
const hljsLiteralColorLight = '#007aad';
const hljsStringColorLight = '#028500';
const hljsRegexpColorLight = '#028500';
const hljsAdditionColorLight = '#116329';
const hljsAdditionBackgroundLight = '#dafbe1';
const hljsAttributeColorLight = '#028500';
const hljsMetaStringColorLight = '#028500';
const hljsBuiltInColorLight = '#c18401';
const hljsAttrColorLight = '#986801';
const hljsVariableColorLight = '#986801';
const hljsTemplateVariableColorLight = '#986801';
const hljsTypeColorLight = '#986801';
const hljsSelectorClassColorLight = '#986801';
const hljsSelectorAttrColorLight = '#986801';
const hljsSelectorPseudoColorLight = '#986801';
const hljsNumberColorLight = '#986801';
const hljsSymbolColorLight = '#1f66ff';
const hljsBulletColorLight = '#1f66ff';
const hljsLinkColorLight = '#1f66ff';
const hljsMetaColorLight = '#1f66ff';
const hljsSelectorIdColorLight = '#1f66ff';
const hljsTitleColorLight = '#1f66ff';

const hljsColorDark = '#abb2bf';
const hljsBackgroundDark = '#21222599';
const hljsCommentColorDark = '#7b8495';
const hljsQuoteColorDark = '#7b8495';
const hljsDoctagColorDark = '#c678dd';
const hljsKeywordColorDark = '#c678dd';
const hljsFormulaColorDark = '#c678dd';
const hljsSectionColorDark = '#e06c75';
const hljsNameColorDark = '#e06c75';
const hljsSelectorTagColorDark = '#e06c75';
const hljsDeletionColorDark = '#ffdcd7';
const hljsDeletionBackgroundDark = '#67060c';
const hljsSubstColorDark = '#e06c75';
const hljsLiteralColorDark = '#56b6c2';
const hljsStringColorDark = '#98c379';
const hljsRegexpColorDark = '#98c379';
const hljsAdditionColorDark = '#aff5b4';
const hljsAdditionBackgroundDark = '#033a16';
const hljsAttributeColorDark = '#98c379';
const hljsMetaStringColorDark = '#98c379';
const hljsBuiltInColorDark = '#e6c07b';
const hljsAttrColorDark = '#d19a66';
const hljsVariableColorDark = '#d19a66';
const hljsTemplateVariableColorDark = '#d19a66';
const hljsTypeColorDark = '#d19a66';
const hljsSelectorClassColorDark = '#d19a66';
const hljsSelectorAttrColorDark = '#d19a66';
const hljsSelectorPseudoColorDark = '#d19a66';
const hljsNumberColorDark = '#d19a66';
const hljsSymbolColorDark = '#61aeee';
const hljsBulletColorDark = '#61aeee';
const hljsLinkColorDark = '#61aeee';
const hljsMetaColorDark = '#61aeee';
const hljsSelectorIdColorDark = '#61aeee';
const hljsTitleColorDark = '#61aeee';

const lightTheme = {
  [pdsThemePrimary]: themeLight.primary,
  [pdsThemeBackgroundBase]: themeLight.background.base,
  [pdsThemeBackgroundSurface]: themeLight.background.surface,
  [pdsThemeBackgroundShading]: themeLight.background.shading,
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
  [hljsColor]: hljsColorLight,
  [hljsBackground]: hljsBackgroundLight,
  [hljsComment]: hljsCommentColorLight,
  [hljsQuote]: hljsQuoteColorLight,
  [hljsDoctag]: hljsDoctagColorLight,
  [hljsKeyword]: hljsKeywordColorLight,
  [hljsFormula]: hljsFormulaColorLight,
  [hljsSection]: hljsSectionColorLight,
  [hljsName]: hljsNameColorLight,
  [hljsSelectorTag]: hljsSelectorTagColorLight,
  [hljsDeletionColor]: hljsDeletionColorLight,
  [hljsDeletionBackground]: hljsDeletionBackgroundLight,
  [hljsSubst]: hljsSubstColorLight,
  [hljsLiteral]: hljsLiteralColorLight,
  [hljsString]: hljsStringColorLight,
  [hljsRegexp]: hljsRegexpColorLight,
  [hljsAdditionColor]: hljsAdditionColorLight,
  [hljsAdditionBackground]: hljsAdditionBackgroundLight,
  [hljsAttribute]: hljsAttributeColorLight,
  [hljsMetaString]: hljsMetaStringColorLight,
  [hljsBuiltIn]: hljsBuiltInColorLight,
  [hljsAttr]: hljsAttrColorLight,
  [hljsVariable]: hljsVariableColorLight,
  [hljsTemplateVariable]: hljsTemplateVariableColorLight,
  [hljsType]: hljsTypeColorLight,
  [hljsSelectorClass]: hljsSelectorClassColorLight,
  [hljsSelectorAttr]: hljsSelectorAttrColorLight,
  [hljsSelectorPseudo]: hljsSelectorPseudoColorLight,
  [hljsNumber]: hljsNumberColorLight,
  [hljsSymbol]: hljsSymbolColorLight,
  [hljsBullet]: hljsBulletColorLight,
  [hljsLink]: hljsLinkColorLight,
  [hljsMeta]: hljsMetaColorLight,
  [hljsSelectorId]: hljsSelectorIdColorLight,
  [hljsTitle]: hljsTitleColorLight,
};

const darkTheme = {
  [pdsThemePrimary]: themeDark.primary,
  [pdsThemeBackgroundBase]: themeDark.background.base,
  [pdsThemeBackgroundSurface]: themeDark.background.surface,
  [pdsThemeBackgroundShading]: themeDark.background.shading,
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
  [hljsColor]: hljsColorDark,
  [hljsBackground]: hljsBackgroundDark,
  [hljsComment]: hljsCommentColorDark,
  [hljsQuote]: hljsQuoteColorDark,
  [hljsDoctag]: hljsDoctagColorDark,
  [hljsKeyword]: hljsKeywordColorDark,
  [hljsFormula]: hljsFormulaColorDark,
  [hljsSection]: hljsSectionColorDark,
  [hljsName]: hljsNameColorDark,
  [hljsSelectorTag]: hljsSelectorTagColorDark,
  [hljsDeletionColor]: hljsDeletionColorDark,
  [hljsDeletionBackground]: hljsDeletionBackgroundDark,
  [hljsSubst]: hljsSubstColorDark,
  [hljsLiteral]: hljsLiteralColorDark,
  [hljsString]: hljsStringColorDark,
  [hljsRegexp]: hljsRegexpColorDark,
  [hljsAdditionColor]: hljsAdditionColorDark,
  [hljsAdditionBackground]: hljsAdditionBackgroundDark,
  [hljsAttribute]: hljsAttributeColorDark,
  [hljsMetaString]: hljsMetaStringColorDark,
  [hljsBuiltIn]: hljsBuiltInColorDark,
  [hljsAttr]: hljsAttrColorDark,
  [hljsVariable]: hljsVariableColorDark,
  [hljsTemplateVariable]: hljsTemplateVariableColorDark,
  [hljsType]: hljsTypeColorDark,
  [hljsSelectorClass]: hljsSelectorClassColorDark,
  [hljsSelectorAttr]: hljsSelectorAttrColorDark,
  [hljsSelectorPseudo]: hljsSelectorPseudoColorDark,
  [hljsNumber]: hljsNumberColorDark,
  [hljsSymbol]: hljsSymbolColorDark,
  [hljsBullet]: hljsBulletColorDark,
  [hljsLink]: hljsLinkColorDark,
  [hljsMeta]: hljsMetaColorDark,
  [hljsSelectorId]: hljsSelectorIdColorDark,
  [hljsTitle]: hljsTitleColorDark,
};

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  safelist: [
    'hljs',
    'hljs-comment',
    'hljs-quote',
    'hljs-doctag',
    'hljs-keyword',
    'hljs-formula',
    'hljs-section',
    'hljs-name',
    'hljs-selector-tag',
    'hljs-deletion-color',
    'hljs-deletion-background',
    'hljs-subst',
    'hljs-literal',
    'hljs-string',
    'hljs-regexp',
    'hljs-addition-color',
    'hljs-addition-background',
    'hljs-attribute',
    'hljs-meta-string',
    'hljs-built-in',
    'hljs-attr',
    'hljs-variable',
    'hljs-template-variable',
    'hljs-type',
    'hljs-selector-class',
    'hljs-selector-attr',
    'hljs-selector-pseudo',
    'hljs-number',
    'hljs-symbol',
    'hljs-bullet',
    'hljs-link',
    'hljs-meta',
    'hljs-selector-id',
    'hljs-title',
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
      colors: {
        hljsColor: {
          light: hljsColorLight,
          DEFAULT: `var(${hljsColor})`,
          dark: hljsColorDark,
        },
        hljsBackground: {
          light: hljsBackgroundLight,
          DEFAULT: `var(${hljsBackground})`,
          dark: hljsBackgroundDark,
        },
        hljsComment: {
          light: hljsCommentColorLight,
          DEFAULT: `var(${hljsComment})`,
          dark: hljsCommentColorDark,
        },
        hljsQuote: {
          light: hljsQuoteColorLight,
          DEFAULT: `var(${hljsQuote})`,
          dark: hljsQuoteColorDark,
        },
        hljsDoctag: {
          light: hljsDoctagColorLight,
          DEFAULT: `var(${hljsDoctag})`,
          dark: hljsDoctagColorDark,
        },
        hljsKeyword: {
          light: hljsKeywordColorLight,
          DEFAULT: `var(${hljsKeyword})`,
          dark: hljsKeywordColorDark,
        },
        hljsFormula: {
          light: hljsFormulaColorLight,
          DEFAULT: `var(${hljsFormula})`,
          dark: hljsFormulaColorDark,
        },
        hljsSection: {
          light: hljsSectionColorLight,
          DEFAULT: `var(${hljsSection})`,
          dark: hljsSectionColorDark,
        },
        hljsName: {
          light: hljsNameColorLight,
          DEFAULT: `var(${hljsName})`,
          dark: hljsNameColorDark,
        },
        hljsSelectorTag: {
          light: hljsSelectorTagColorLight,
          DEFAULT: `var(${hljsSelectorTag})`,
          dark: hljsSelectorTagColorDark,
        },
        hljsDeletionColor: {
          light: hljsDeletionColorLight,
          DEFAULT: `var(${hljsDeletionColor})`,
          dark: hljsDeletionColorDark,
        },
        hljsDeletionBackground: {
          light: hljsDeletionBackgroundLight,
          DEFAULT: `var(${hljsDeletionBackground})`,
          dark: hljsDeletionBackgroundDark,
        },
        hljsSubst: {
          light: hljsSubstColorLight,
          DEFAULT: `var(${hljsSubst})`,
          dark: hljsSubstColorDark,
        },
        hljsLiteral: {
          light: hljsLiteralColorLight,
          DEFAULT: `var(${hljsLiteral})`,
          dark: hljsLiteralColorDark,
        },
        hljsString: {
          light: hljsStringColorLight,
          DEFAULT: `var(${hljsString})`,
          dark: hljsStringColorDark,
        },
        hljsRegexp: {
          light: hljsRegexpColorLight,
          DEFAULT: `var(${hljsRegexp})`,
          dark: hljsRegexpColorDark,
        },
        hljsAdditionColor: {
          light: hljsAdditionColorLight,
          DEFAULT: `var(${hljsAdditionColor})`,
          dark: hljsAdditionColorDark,
        },
        hljsAdditionBackground: {
          light: hljsAdditionBackgroundLight,
          DEFAULT: `var(${hljsAdditionBackground})`,
          dark: hljsAdditionBackgroundDark,
        },
        hljsAttribute: {
          light: hljsAttributeColorLight,
          DEFAULT: `var(${hljsAttribute})`,
          dark: hljsAttributeColorDark,
        },
        hljsMetaString: {
          light: hljsMetaStringColorLight,
          DEFAULT: `var(${hljsMetaString})`,
          dark: hljsMetaStringColorDark,
        },
        hljsBuiltIn: {
          light: hljsBuiltInColorLight,
          DEFAULT: `var(${hljsBuiltIn})`,
          dark: hljsBuiltInColorDark,
        },
        hljsAttr: {
          light: hljsAttrColorLight,
          DEFAULT: `var(${hljsAttr})`,
          dark: hljsAttrColorDark,
        },
        hljsVariable: {
          light: hljsVariableColorLight,
          DEFAULT: `var(${hljsVariable})`,
          dark: hljsVariableColorDark,
        },
        hljsTemplateVariable: {
          light: hljsTemplateVariableColorLight,
          DEFAULT: `var(${hljsTemplateVariable})`,
          dark: hljsTemplateVariableColorDark,
        },
        hljsType: {
          light: hljsTypeColorLight,
          DEFAULT: `var(${hljsType})`,
          dark: hljsTypeColorDark,
        },
        hljsSelectorClass: {
          light: hljsSelectorClassColorLight,
          DEFAULT: `var(${hljsSelectorClass})`,
          dark: hljsSelectorClassColorDark,
        },
        hljsSelectorAttr: {
          light: hljsSelectorAttrColorLight,
          DEFAULT: `var(${hljsSelectorAttr})`,
          dark: hljsSelectorAttrColorDark,
        },
        hljsSelectorPseudo: {
          light: hljsSelectorPseudoColorLight,
          DEFAULT: `var(${hljsSelectorPseudo})`,
          dark: hljsSelectorPseudoColorDark,
        },
        hljsNumber: {
          light: hljsNumberColorLight,
          DEFAULT: `var(${hljsNumber})`,
          dark: hljsNumberColorDark,
        },
        hljsSymbol: {
          light: hljsSymbolColorLight,
          DEFAULT: `var(${hljsSymbol})`,
          dark: hljsSymbolColorDark,
        },
        hljsBullet: {
          light: hljsBulletColorLight,
          DEFAULT: `var(${hljsBullet})`,
          dark: hljsBulletColorDark,
        },
        hljsLink: {
          light: hljsLinkColorLight,
          DEFAULT: `var(${hljsLink})`,
          dark: hljsLinkColorDark,
        },
        hljsMeta: {
          light: hljsMetaColorLight,
          DEFAULT: `var(${hljsMeta})`,
          dark: hljsMetaColorDark,
        },
        hljsSelectorId: {
          light: hljsSelectorIdColorLight,
          DEFAULT: `var(${hljsSelectorId})`,
          dark: hljsSelectorIdColorDark,
        },
        hljsTitle: {
          light: hljsTitleColorLight,
          DEFAULT: `var(${hljsTitle})`,
          dark: hljsTitleColorDark,
        },
      },
      maxWidth: {
        prose: '85ch',
      },
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
