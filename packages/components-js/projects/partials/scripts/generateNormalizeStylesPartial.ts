import { create, JssStyle, Styles } from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import { color, font } from '@porsche-design-system/utilities';

// TODO: integrate into initializeStyles?
export const generateNormalizeStylesPartial = (): string => {
  const types = `type GetNormalizeStylesOptions = {
  cdn?: Cdn;
  format?: Format;
};
type GetNormalizeStylesOptionsFormatHtml = GetNormalizeStylesOptions & { format: 'html' };
type GetNormalizeStylesOptionsFormatJsx = GetNormalizeStylesOptions & { format: 'jsx' }`;
  `;`;

  const normalizeStyles: Styles = {
    '@global': {
      html: {
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
        fontFamily: font.family,
      },

      'button, input, optgroup, select, textarea': {
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
        fontFamily: font.family,
        fontSize: font.size.small.fontSize,
        lineHeight: font.size.small.lineHeight,
        fontWeight: font.weight.regular,
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
            color: color.state.hover,
          },
        },
      },

      '[data-theme="dark"] a:hover': {
        '@media(hover:hover)': {
          '&:hover': {
            color: color.darkTheme.state.hover,
          },
        },
      },

      'b, strong': {
        fontWeight: font.weight.bold,
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

  const getNormalizeStyles = (): string => {
    return minifyCss(getCss(normalizeStyles));
  };

  const normalizeStylesFunction = `export function getNormalizeStyles(opts?: GetNormalizeStylesOptionsFormatHtml): string;
export function getNormalizeStyles(opts?: GetNormalizeStylesOptionsFormatJsx): JSX.Element;
export function getNormalizeStyles(opts?: GetNormalizeStylesOptions): string | JSX.Element {
  const { format }: GetNormalizeStylesOptions = {
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getNormalizeStyles');

  const styleProps = { ['data-pds-normalize-styles']: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const normalizeStyles = \`${getNormalizeStyles()}\`;

  return format === 'html' ? \`<style \$\{styleAttributes\}>\${normalizeStyles}</style>\` : <style {...styleProps} dangerouslySetInnerHTML={{ __html: normalizeStyles }}/>;
}`;

  return [types, normalizeStylesFunction].join('\n\n');
};
