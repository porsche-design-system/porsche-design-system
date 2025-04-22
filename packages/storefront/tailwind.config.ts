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

const pdsPrimaryColor = '--pds-primary-color';
const pdsBackgroundBaseColor = '--pds-background-base-color';
const pdsBackgroundSurfaceColor = '--pds-background-surface-color';
const pdsBackgroundShadingColor = '--pds-background-shading-color';
const pdsContrastLowColor = '--pds-contrast-low-color';
const pdsContrastMediumColor = '--pds-contrast-medium-color';
const pdsContrastHighColor = '--pds-contrast-high-color';
const pdsNotificationSuccessColor = '--pds-notification-success-color';
const pdsNotificationWarningColor = '--pds-notification-warning-color';
const pdsNotificationErrorColor = '--pds-notification-error-color';
const pdsNotificationInfoColor = '--pds-notification-info-color';
const pdsStateHoverColor = '--pds-state-hover-color';
const pdsStateActiveColor = '--pds-state-active-color';
const pdsStateFocusColor = '--pds-state-focus-color';
const pdsStateDisabledColor = '--pds-state-disabled-color';

const hljsColor = '--hljs-color';
const hljsBackground = '--hljs-background';
const hljsCommentColor = '--hljs-comment-color';
const hljsQuoteColor = '--hljs-quote-color';
const hljsDoctagColor = '--hljs-doctag-color';
const hljsKeywordColor = '--hljs-keyword-color';
const hljsFormulaColor = '--hljs-formula-color';
const hljsSectionColor = '--hljs-section-color';
const hljsNameColor = '--hljs-name-color';
const hljsSelectorTagColor = '--hljs-selector-tag-color';
const hljsDeletionColor = '--hljs-deletion-color';
const hljsDeletionBackground = '--hljs-deletion-background';
const hljsSubstColor = '--hljs-subst-color';
const hljsLiteralColor = '--hljs-literal-color';
const hljsStringColor = '--hljs-string-color';
const hljsRegexpColor = '--hljs-regexp-color';
const hljsAdditionColor = '--hljs-addition-color';
const hljsAdditionBackground = '--hljs-addition-background';
const hljsAttributeColor = '--hljs-attribute-color';
const hljsMetaStringColor = '--hljs-meta-string-color';
const hljsBuiltInColor = '--hljs-built-in-color';
const hljsAttrColor = '--hljs-attr-color';
const hljsVariableColor = '--hljs-variable-color';
const hljsTemplateVariableColor = '--hljs-template-variable-color';
const hljsTypeColor = '--hljs-type-color';
const hljsSelectorClassColor = '--hljs-selector-class-color';
const hljsSelectorAttrColor = '--hljs-selector-attr-color';
const hljsSelectorPseudoColor = '--hljs-selector-pseudo-color';
const hljsNumberColor = '--hljs-number-color';
const hljsSymbolColor = '--hljs-symbol-color';
const hljsBulletColor = '--hljs-bullet-color';
const hljsLinkColor = '--hljs-link-color';
const hljsMetaColor = '--hljs-meta-color';
const hljsSelectorIdColor = '--hljs-selector-id-color';
const hljsTitleColor = '--hljs-title-color';

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
  [pdsPrimaryColor]: themeLight.primary,
  [pdsBackgroundBaseColor]: themeLight.background.base,
  [pdsBackgroundSurfaceColor]: themeLight.background.surface,
  [pdsBackgroundShadingColor]: themeLight.background.shading,
  [pdsContrastLowColor]: themeLight.contrast.low,
  [pdsContrastMediumColor]: themeLight.contrast.medium,
  [pdsContrastHighColor]: themeLight.contrast.high,
  [pdsNotificationSuccessColor]: themeLight.notification.success,
  [pdsNotificationWarningColor]: themeLight.notification.warning,
  [pdsNotificationErrorColor]: themeLight.notification.error,
  [pdsNotificationInfoColor]: themeLight.notification.info,
  [pdsStateHoverColor]: themeLight.state.hover,
  [pdsStateActiveColor]: themeLight.state.active,
  [pdsStateFocusColor]: themeLight.state.focus,
  [pdsStateDisabledColor]: themeLight.state.disabled,
  [hljsColor]: hljsColorLight,
  [hljsBackground]: hljsBackgroundLight,
  [hljsCommentColor]: hljsCommentColorLight,
  [hljsQuoteColor]: hljsQuoteColorLight,
  [hljsDoctagColor]: hljsDoctagColorLight,
  [hljsKeywordColor]: hljsKeywordColorLight,
  [hljsFormulaColor]: hljsFormulaColorLight,
  [hljsSectionColor]: hljsSectionColorLight,
  [hljsNameColor]: hljsNameColorLight,
  [hljsSelectorTagColor]: hljsSelectorTagColorLight,
  [hljsDeletionColor]: hljsDeletionColorLight,
  [hljsDeletionBackground]: hljsDeletionBackgroundLight,
  [hljsSubstColor]: hljsSubstColorLight,
  [hljsLiteralColor]: hljsLiteralColorLight,
  [hljsStringColor]: hljsStringColorLight,
  [hljsRegexpColor]: hljsRegexpColorLight,
  [hljsAdditionColor]: hljsAdditionColorLight,
  [hljsAdditionBackground]: hljsAdditionBackgroundLight,
  [hljsAttributeColor]: hljsAttributeColorLight,
  [hljsMetaStringColor]: hljsMetaStringColorLight,
  [hljsBuiltInColor]: hljsBuiltInColorLight,
  [hljsAttrColor]: hljsAttrColorLight,
  [hljsVariableColor]: hljsVariableColorLight,
  [hljsTemplateVariableColor]: hljsTemplateVariableColorLight,
  [hljsTypeColor]: hljsTypeColorLight,
  [hljsSelectorClassColor]: hljsSelectorClassColorLight,
  [hljsSelectorAttrColor]: hljsSelectorAttrColorLight,
  [hljsSelectorPseudoColor]: hljsSelectorPseudoColorLight,
  [hljsNumberColor]: hljsNumberColorLight,
  [hljsSymbolColor]: hljsSymbolColorLight,
  [hljsBulletColor]: hljsBulletColorLight,
  [hljsLinkColor]: hljsLinkColorLight,
  [hljsMetaColor]: hljsMetaColorLight,
  [hljsSelectorIdColor]: hljsSelectorIdColorLight,
  [hljsTitleColor]: hljsTitleColorLight,
};

const darkTheme = {
  [pdsPrimaryColor]: themeDark.primary,
  [pdsBackgroundBaseColor]: themeDark.background.base,
  [pdsBackgroundSurfaceColor]: themeDark.background.surface,
  [pdsBackgroundShadingColor]: themeDark.background.shading,
  [pdsContrastLowColor]: themeDark.contrast.low,
  [pdsContrastMediumColor]: themeDark.contrast.medium,
  [pdsContrastHighColor]: themeDark.contrast.high,
  [pdsNotificationSuccessColor]: themeDark.notification.success,
  [pdsNotificationWarningColor]: themeDark.notification.warning,
  [pdsNotificationErrorColor]: themeDark.notification.error,
  [pdsNotificationInfoColor]: themeDark.notification.info,
  [pdsStateHoverColor]: themeDark.state.hover,
  [pdsStateActiveColor]: themeDark.state.active,
  [pdsStateFocusColor]: themeDark.state.focus,
  [pdsStateDisabledColor]: themeDark.state.disabled,
  [hljsColor]: hljsColorDark,
  [hljsBackground]: hljsBackgroundDark,
  [hljsCommentColor]: hljsCommentColorDark,
  [hljsQuoteColor]: hljsQuoteColorDark,
  [hljsDoctagColor]: hljsDoctagColorDark,
  [hljsKeywordColor]: hljsKeywordColorDark,
  [hljsFormulaColor]: hljsFormulaColorDark,
  [hljsSectionColor]: hljsSectionColorDark,
  [hljsNameColor]: hljsNameColorDark,
  [hljsSelectorTagColor]: hljsSelectorTagColorDark,
  [hljsDeletionColor]: hljsDeletionColorDark,
  [hljsDeletionBackground]: hljsDeletionBackgroundDark,
  [hljsSubstColor]: hljsSubstColorDark,
  [hljsLiteralColor]: hljsLiteralColorDark,
  [hljsStringColor]: hljsStringColorDark,
  [hljsRegexpColor]: hljsRegexpColorDark,
  [hljsAdditionColor]: hljsAdditionColorDark,
  [hljsAdditionBackground]: hljsAdditionBackgroundDark,
  [hljsAttributeColor]: hljsAttributeColorDark,
  [hljsMetaStringColor]: hljsMetaStringColorDark,
  [hljsBuiltInColor]: hljsBuiltInColorDark,
  [hljsAttrColor]: hljsAttrColorDark,
  [hljsVariableColor]: hljsVariableColorDark,
  [hljsTemplateVariableColor]: hljsTemplateVariableColorDark,
  [hljsTypeColor]: hljsTypeColorDark,
  [hljsSelectorClassColor]: hljsSelectorClassColorDark,
  [hljsSelectorAttrColor]: hljsSelectorAttrColorDark,
  [hljsSelectorPseudoColor]: hljsSelectorPseudoColorDark,
  [hljsNumberColor]: hljsNumberColorDark,
  [hljsSymbolColor]: hljsSymbolColorDark,
  [hljsBulletColor]: hljsBulletColorDark,
  [hljsLinkColor]: hljsLinkColorDark,
  [hljsMetaColor]: hljsMetaColorDark,
  [hljsSelectorIdColor]: hljsSelectorIdColorDark,
  [hljsTitleColor]: hljsTitleColorDark,
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
        DEFAULT: `var(${pdsPrimaryColor})`,
        dark: themeDark.primary,
      },
      'background-base': {
        light: themeLight.background.base,
        DEFAULT: `var(${pdsBackgroundBaseColor})`,
        dark: themeDark.background.base,
      },
      'background-surface': {
        light: themeLight.background.surface,
        DEFAULT: `var(${pdsBackgroundSurfaceColor})`,
        dark: themeDark.background.surface,
      },
      'background-shading': {
        light: themeLight.background.shading,
        DEFAULT: `var(${pdsBackgroundShadingColor})`,
        dark: themeDark.background.shading,
      },
      'contrast-low': {
        light: themeLight.contrast.low,
        DEFAULT: `var(${pdsContrastLowColor})`,
        dark: themeDark.contrast.low,
      },
      'contrast-medium': {
        light: themeLight.contrast.medium,
        DEFAULT: `var(${pdsContrastMediumColor})`,
        dark: themeDark.contrast.medium,
      },
      'contrast-high': {
        light: themeLight.contrast.high,
        DEFAULT: `var(${pdsContrastHighColor})`,
        dark: themeDark.contrast.high,
      },
      'notification-success': {
        light: themeLight.notification.success,
        DEFAULT: `var(${pdsNotificationSuccessColor})`,
        dark: themeDark.notification.success,
      },
      'notification-warning': {
        light: themeLight.notification.warning,
        DEFAULT: `var(${pdsNotificationWarningColor})`,
        dark: themeDark.notification.warning,
      },
      'notification-error': {
        light: themeLight.notification.error,
        DEFAULT: `var(${pdsNotificationErrorColor})`,
        dark: themeDark.notification.error,
      },
      'notification-info': {
        light: themeLight.notification.info,
        DEFAULT: `var(${pdsNotificationInfoColor})`,
        dark: themeDark.notification.info,
      },
      'state-hover': {
        light: themeLight.state.hover,
        DEFAULT: `var(${pdsStateHoverColor})`,
        dark: themeDark.state.hover,
      },
      'state-active': {
        light: themeLight.state.active,
        DEFAULT: `var(${pdsStateActiveColor})`,
        dark: themeDark.state.active,
      },
      'state-focus': {
        light: themeLight.state.focus,
        DEFAULT: `var(${pdsStateFocusColor})`,
        dark: themeDark.state.focus,
      },
      'state-disabled': {
        light: themeLight.state.disabled,
        DEFAULT: `var(${pdsStateDisabledColor})`,
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
          DEFAULT: `var(${hljsCommentColor})`,
          dark: hljsCommentColorDark,
        },
        hljsQuote: {
          light: hljsQuoteColorLight,
          DEFAULT: `var(${hljsQuoteColor})`,
          dark: hljsQuoteColorDark,
        },
        hljsDoctag: {
          light: hljsDoctagColorLight,
          DEFAULT: `var(${hljsDoctagColor})`,
          dark: hljsDoctagColorDark,
        },
        hljsKeyword: {
          light: hljsKeywordColorLight,
          DEFAULT: `var(${hljsKeywordColor})`,
          dark: hljsKeywordColorDark,
        },
        hljsFormula: {
          light: hljsFormulaColorLight,
          DEFAULT: `var(${hljsFormulaColor})`,
          dark: hljsFormulaColorDark,
        },
        hljsSection: {
          light: hljsSectionColorLight,
          DEFAULT: `var(${hljsSectionColor})`,
          dark: hljsSectionColorDark,
        },
        hljsName: {
          light: hljsNameColorLight,
          DEFAULT: `var(${hljsNameColor})`,
          dark: hljsNameColorDark,
        },
        hljsSelectorTag: {
          light: hljsSelectorTagColorLight,
          DEFAULT: `var(${hljsSelectorTagColor})`,
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
          DEFAULT: `var(${hljsSubstColor})`,
          dark: hljsSubstColorDark,
        },
        hljsLiteral: {
          light: hljsLiteralColorLight,
          DEFAULT: `var(${hljsLiteralColor})`,
          dark: hljsLiteralColorDark,
        },
        hljsString: {
          light: hljsStringColorLight,
          DEFAULT: `var(${hljsStringColor})`,
          dark: hljsStringColorDark,
        },
        hljsRegexp: {
          light: hljsRegexpColorLight,
          DEFAULT: `var(${hljsRegexpColor})`,
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
          DEFAULT: `var(${hljsAttributeColor})`,
          dark: hljsAttributeColorDark,
        },
        hljsMetaString: {
          light: hljsMetaStringColorLight,
          DEFAULT: `var(${hljsMetaStringColor})`,
          dark: hljsMetaStringColorDark,
        },
        hljsBuiltIn: {
          light: hljsBuiltInColorLight,
          DEFAULT: `var(${hljsBuiltInColor})`,
          dark: hljsBuiltInColorDark,
        },
        hljsAttr: {
          light: hljsAttrColorLight,
          DEFAULT: `var(${hljsAttrColor})`,
          dark: hljsAttrColorDark,
        },
        hljsVariable: {
          light: hljsVariableColorLight,
          DEFAULT: `var(${hljsVariableColor})`,
          dark: hljsVariableColorDark,
        },
        hljsTemplateVariable: {
          light: hljsTemplateVariableColorLight,
          DEFAULT: `var(${hljsTemplateVariableColor})`,
          dark: hljsTemplateVariableColorDark,
        },
        hljsType: {
          light: hljsTypeColorLight,
          DEFAULT: `var(${hljsTypeColor})`,
          dark: hljsTypeColorDark,
        },
        hljsSelectorClass: {
          light: hljsSelectorClassColorLight,
          DEFAULT: `var(${hljsSelectorClassColor})`,
          dark: hljsSelectorClassColorDark,
        },
        hljsSelectorAttr: {
          light: hljsSelectorAttrColorLight,
          DEFAULT: `var(${hljsSelectorAttrColor})`,
          dark: hljsSelectorAttrColorDark,
        },
        hljsSelectorPseudo: {
          light: hljsSelectorPseudoColorLight,
          DEFAULT: `var(${hljsSelectorPseudoColor})`,
          dark: hljsSelectorPseudoColorDark,
        },
        hljsNumber: {
          light: hljsNumberColorLight,
          DEFAULT: `var(${hljsNumberColor})`,
          dark: hljsNumberColorDark,
        },
        hljsSymbol: {
          light: hljsSymbolColorLight,
          DEFAULT: `var(${hljsSymbolColor})`,
          dark: hljsSymbolColorDark,
        },
        hljsBullet: {
          light: hljsBulletColorLight,
          DEFAULT: `var(${hljsBulletColor})`,
          dark: hljsBulletColorDark,
        },
        hljsLink: {
          light: hljsLinkColorLight,
          DEFAULT: `var(${hljsLinkColor})`,
          dark: hljsLinkColorDark,
        },
        hljsMeta: {
          light: hljsMetaColorLight,
          DEFAULT: `var(${hljsMetaColor})`,
          dark: hljsMetaColorDark,
        },
        hljsSelectorId: {
          light: hljsSelectorIdColorLight,
          DEFAULT: `var(${hljsSelectorIdColor})`,
          dark: hljsSelectorIdColorDark,
        },
        hljsTitle: {
          light: hljsTitleColorLight,
          DEFAULT: `var(${hljsTitleColor})`,
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
