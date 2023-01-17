import { joinArrayElementsToString, withoutTagsOption } from './utils';
import { INTERNAL_TAG_NAMES, TAG_NAMES, getMinifiedCss } from '@porsche-design-system/shared';
import { Styles } from 'jss';
import {
  themeDark,
  fontSize,
  fontWeight,
  fontFamily,
  fontLineHeight,
  themeLight,
} from '@porsche-design-system/utilities-v2';

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  ${withoutTagsOption}
  format?: Format;
  // Standard normalize.css styles won't bei applied by using this option
  applyWithNormalizeStyles?: boolean;
};
type GetInitialStylesOptionsFormatHtml = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'html' };
type GetInitialStylesOptionsFormatJsx = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'jsx' };
type GetInitialStylesOptionsWithoutTags = Omit<GetInitialStylesOptions, 'format'>;`;

  const normalizeStyles: Styles = {
    '@global': {
      '*:not(html,h1,h2,h3,h4,h5,h6)': {
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
        // font shorthand declaration does not work for styling a, button, input, optgroup, select, textarea
        fontFamily: fontFamily,
        fontSize: fontSize.small,
        lineHeight: fontLineHeight,
        fontWeight: fontWeight,
        fontStyle: 'normal',
        fontVariant: 'normal',
        overflowWrap: 'break-word',
        hyphens: 'auto',
      },

      a: {
        color: 'inherit',
        textDecoration: 'underline',
        '@media(hover:hover)': {
          transition: 'color var(--p-transition-duration, .24s) ease',
          '&:hover': {
            color: themeLight.state.hover,
          },
        },
      },

      '[data-theme="dark"] a:hover': {
        '@media(hover:hover)': {
          '&:hover': {
            color: themeDark.state.hover,
          },
        },
      },

      'b, strong': {
        fontWeight: fontWeight.bold,
      },

      'em, i': {
        fontStyle: 'normal',
      },

      'a, button, input, select, textarea': {
        outline: '1px solid transparent',
        outlineOffset: '1px',
        '&:focus': {
          outlineColor: 'currentColor',
        },
        '&:focus:not(:focus-visible)': {
          outlineColor: 'transparent',
        },
      },
    },
  };

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptionsWithoutTags): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, withoutTags, format, applyWithNormalizeStyles }: GetInitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    format: 'html',
    applyWithNormalizeStyles: false,
    ...opts,
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);

  throwIfRunInBrowser('getInitialStyles');

  const styleProps = { [\`data-pds-initial-styles\$\{prefix ? '-' + prefix : ''\}\`]: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const prefixedTagNamesStyles = prefixedTagNames.join() + '{visibility:hidden}.hydrated,.ssr{visibility:inherit}';

  const normalizeStyles = \`${getMinifiedCss(normalizeStyles)}\`;

  const styles = applyWithNormalizeStyles ? prefixedTagNamesStyles.concat(normalizeStyles) : prefixedTagNamesStyles;

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
