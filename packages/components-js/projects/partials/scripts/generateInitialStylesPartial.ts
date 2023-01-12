import { joinArrayElementsToString, withoutTagsOption } from './utils';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { create, Styles } from 'jss';
import {
  themeDark,
  fontSize,
  fontWeight,
  fontFamily,
  fontLineHeight,
  themeLight,
} from '@porsche-design-system/utilities-v2';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  ${withoutTagsOption}
  format?: Format;
  normalize?: boolean;
};
type GetInitialStylesOptionsFormatHtml = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'html' };
type GetInitialStylesOptionsFormatJsx = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'jsx' };
type GetInitialStylesOptionsWithoutTags = Omit<GetInitialStylesOptions, 'format'>;`;

  const normalizeStyles: Styles = {
    '@global': {
      html: {
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
        fontFamily: fontFamily,
      },

      'button, input, optgroup, select, textarea': {
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
        fontFamily: fontFamily,
        fontSize: fontSize.small,
        lineHeight: fontSize.small,
        fontWeight: fontLineHeight,
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
        '&::-moz-focus-inner': {
          border: 0,
        },
        '&:focus': {
          outlineColor: 'currentColor',
        },
        '&:focus:not(:focus-visible)': {
          outlineColor: 'transparent',
        },
      },
    },
  };

  const minifyCss = (css: string): string =>
    css.replace(/\s\s+|\.\\(?=:)|[\n\\]+| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g, '$1');

  const jss = create({
    plugins: [
      jssPluginGlobal(),
      jssPluginNested(),
      jssPluginCamelCase(),
      jssPluginSortMediaQueries({ combineMediaQueries: true }),
    ],
  });

  const getCss = (jssStyles: Styles): string =>
    jss
      .createStyleSheet(jssStyles, {
        generateId: (rule) => rule.key,
      })
      .toString();

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptionsWithoutTags): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, withoutTags, format, normalize }: GetInitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    format: 'html',
    normalize: false,
    ...opts,
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);

  throwIfRunInBrowser('getInitialStyles');

  const styleProps = { [\`data-pds-initial-styles\$\{prefix ? '-' + prefix : ''\}\`]: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const styles = prefixedTagNames.join() + '{visibility:hidden}.hydrated,.ssr{visibility:inherit}';

  const normalizeStyles = \`${minifyCss(getCss(normalizeStyles))}\`;

  const markup = format === 'html'
    ? \`<style \$\{styleAttributes\}>\${normalize ? styles.concat(normalizeStyles) : styles}</style>\`
    : <style {...styleProps} dangerouslySetInnerHTML={{ __html: normalize ? styles.concat(normalizeStyles) : styles }} />;

  return withoutTags
    ? styles
    : markup;
}`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
};`;

  return [types, initialStylesFunction, helperFunction].join('\n\n');
};
