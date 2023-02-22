import { joinArrayElementsToString } from './utils';
import { INTERNAL_TAG_NAMES, TAG_NAMES, getMinifiedCss } from '@porsche-design-system/shared';
import { JssStyle, Styles } from 'jss';
import {
  themeDark,
  fontWeight,
  themeLight,
  fontFamily,
  fontHyphenationStyle,
  fontLineHeight,
  borderRadiusSmall,
  frostedGlassStyle,
  borderWidthBase,
  borderRadiusMedium,
} from '@porsche-design-system/utilities-v2';

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

export const getInsetJssStyle = (value: 'auto' | number = 0): JssStyle => {
  value = value === 0 || value === 'auto' ? value : (`${value}px` as any);
  return {
    top: value,
    left: value,
    right: value,
    bottom: value,
  };
};

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  format?: Format;
};`;

  const normalizeStyles: Styles = {
    '@global': {
      '*': {
        fontFamily: fontFamily,
        lineHeight: fontLineHeight,
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      },

      p: {
        fontWeight: fontWeight.regular,
        ...fontHyphenationStyle,
      },

      'h1, h2, h3, h4, h5, h6': {
        fontWeight: fontWeight.regular,
      },

      a: {
        color: 'inherit',
        textDecoration: 'underline',
        borderRadius: borderRadiusSmall,
        borderColor: 'transparent', // default value is needed for smooth transition
        '@media(hover:hover)': {
          transition: 'background-color var(--p-transition-duration, .24s) ease',
          '&:hover': {
            ...frostedGlassStyle,
            backgroundColor: themeLight.state.hover,
          },
          '[data-theme=dark] &:hover': {
            backgroundColor: themeDark.state.hover,
          },
        },
      },

      'b, strong': {
        fontWeight: fontWeight.bold,
      },

      'em, i': {
        fontStyle: 'normal',
      },

      'a, button': {
        position: 'relative',
        outline: 0, // hide default focus outline
        '&:focus::before': {
          content: '""',
          position: 'absolute',
          borderRadius: borderRadiusMedium,
          border: `${borderWidthBase} solid ${themeLight.state.focus}`,
          ...getInsetJssStyle(-4),
        },
        '&:focus:not(:focus-visible):not(:disabled)::before': {
          border: 0,
        },
      },

      'button:focus::before': getInsetJssStyle(-6),

      '[data-theme=dark] a, [data-theme=dark] button': {
        '&:focus::before': {
          border: `${borderWidthBase} solid ${themeDark.state.focus}`,
        },
        '&:disabled': {
          '&:focus::before': {
            border: 0,
          },
        },
      },

      // Pseudo-elements are not supported on these elements
      'input, select, textarea': {
        outline: `${borderWidthBase} solid transparent`,
        outlineOffset: '2px',
        '&:focus': {
          borderRadius: borderRadiusSmall,
          outlineColor: `${themeLight.state.focus}`,
        },
        '&:focus:not(:focus-visible)': {
          outlineColor: 'transparent',
        },
      },

      '[data-theme=dark] input, [data-theme=dark] select, [data-theme=dark] textarea': {
        '&:focus': {
          outlineColor: `${themeDark.state.focus}`,
        },
      },

      // the following selectors don't work within ::slotted() pseudo selector, therefore we have to apply them via light DOM
      'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button, input[type=search]::-webkit-search-decoration':
        {
          WebkitAppearance: 'none',
          appearance: 'none',
        },

      'input[type=search]::-webkit-search-cancel-button': {
        display: 'none',
      },

      'input::-webkit-calendar-picker-indicator': {
        filter: 'invert(3%) sepia(7%) saturate(2930%) hue-rotate(188deg) brightness(91%) contrast(103%)', // property color can not be used here, this is the filter for themeLight.primary
      },
      '[data-theme=dark] input::-webkit-calendar-picker-indicator': {
        filter: 'invert(97%) sepia(55%) saturate(2840%) hue-rotate(180deg) brightness(114%) contrast(103%)', // property color can not be used here, this is the filter for themeDark.primary
      },
      'input::-webkit-calendar-picker-indicator:hover': {
        cursor: 'pointer',
      },

      // Safari input type date and time has incorrect sizing
      'input::-webkit-datetime-edit': {
        display: 'block',
        padding: 0,
      },

      // Safari input type date and time has incorrect placeholder color for dark theme
      '[data-theme=dark] input::-webkit-datetime-edit': {
        WebkitTextFillColor: themeDark.primary,
      },
    },
  };

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptions & { format: 'jsx' }): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptions): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, format }: GetInitialStylesOptions = {
    prefix: '',
    format: 'html',
    ...opts,
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);

  throwIfRunInBrowser('getInitialStyles');

  const styleProps = { [\`data-pds-initial-styles\$\{prefix ? '-' + prefix : ''\}\`]: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const prefixedTagNamesStyles = prefixedTagNames.join() + '{visibility:hidden}.hydrated,.ssr{visibility:inherit}';
  const normalizeStyles = \`${getMinifiedCss(normalizeStyles)}\`;

  const styles = prefixedTagNamesStyles.concat(normalizeStyles);

  return format === 'html'
    ? \`<style \$\{styleAttributes\}>\${styles}</style>\`
    : <style {...styleProps} dangerouslySetInnerHTML={{ __html: styles }} />;
}`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
};`;

  return [types, initialStylesFunction, helperFunction].join('\n\n');
};
