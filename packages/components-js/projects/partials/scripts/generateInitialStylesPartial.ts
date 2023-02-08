import { joinArrayElementsToString, withoutTagsOption } from './utils';
import { INTERNAL_TAG_NAMES, TAG_NAMES, getMinifiedCss } from '@porsche-design-system/shared';
import { Styles } from 'jss';
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
} from '@porsche-design-system/utilities-v2';

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  ${withoutTagsOption}
  format?: Format;
};
type GetInitialStylesOptionsFormatHtml = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'html' };
type GetInitialStylesOptionsFormatJsx = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'jsx' };
type GetInitialStylesOptionsWithoutTags = Omit<GetInitialStylesOptions, 'format'>;`;

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
        '@media(hover:hover)': {
          transition: 'color var(--p-transition-duration, .24s) ease',
          '&:hover': {
            ...frostedGlassStyle,
            backgroundColor: themeLight.state.hover,
          },
        },
      },

      '@media(hover:hover)': {
        '[data-theme=dark] a:hover': {
          backgroundColor: themeDark.state.hover,
        },
      },

      'b, strong': {
        fontWeight: fontWeight.bold,
      },

      'em, i': {
        fontStyle: 'normal',
      },

      'a, button, input, select, textarea': {
        borderRadius: borderRadiusSmall,
        borderColor: 'transparent', // default value is needed for smooth transition
        '&:focus': {
          border: `${borderWidthBase} solid ${themeLight.state.focus}`,
        },
        '&:focus:not(:focus-visible)': {
          border: 0,
        },
      },

      '[data-theme=dark] a, button, input, select, textarea': {
        '&:focus': {
          border: `${borderWidthBase} solid ${themeDark.state.focus}`,
        },
      },

      // the following selectors don't work within ::slotted() pseudo selector, therefore we have to apply them via light DOM
      'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button, input[type=search]::-webkit-search-decoration, input::-webkit-calendar-picker-indicator':
        {
          WebkitAppearance: 'none',
          appearance: 'none',
        },
      'input[type=search]::-webkit-search-cancel-button, input::-webkit-calendar-picker-indicator': {
        display: 'none',
      },
    },
  };

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptionsWithoutTags): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, withoutTags, format }: GetInitialStylesOptions = {
    prefix: '',
    withoutTags: false,
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

  const markup = format === 'html'
    ? \`<style \$\{styleAttributes\}>\${styles}</style>\`
    : <style {...styleProps} dangerouslySetInnerHTML={{ __html: styles }} />;

  return withoutTags
    ? styles
    : markup;
}`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
};`;

  return [types, initialStylesFunction, helperFunction].join('\n\n');
};
