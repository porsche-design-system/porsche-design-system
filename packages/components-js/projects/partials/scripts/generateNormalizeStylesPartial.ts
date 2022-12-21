import normalize from 'normalize-jss';
import { create, Styles } from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';

global.ROLLUP_REPLACE_IS_STAGING = 'production';

export const generateNormalizeStylesPartial = (): string => {
  const types = `type GetNormalizeStylesOptions = {
  cdn?: Cdn;
  format?: Format;
};
type GetNormalizeStylesOptionsWithoutTags = GetNormalizeStylesOptionsWithoutTags & { format: 'html' };
type GetNormalizeStylesOptionsWithoutTags = GetNormalizeStylesOptionsWithoutTags & { format: 'jsx' }`;
  `;`;

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

  const fontWeight = {
    thin: 100,
    regular: 400,
    semiBold: 600,
    bold: 700,
  };

  const normalizeCss = normalize[Object.keys(normalize)[0]];

  normalizeCss['html']['textSizeAdjust'] = 'none';
  normalizeCss['html']['WebkitTextSizeAdjust'] = 'none'; // stop iOS safari from adjusting font size when screen rotation is changing

  normalizeCss['a']['color'] = 'inherit';
  normalizeCss['a']['textDecoration'] = 'underline';
  normalizeCss['a']['outline'] = '1px solid transparent';
  normalizeCss['a']['outlineOffset'] = '1px';
  normalizeCss['a::-moz-focus-inner'] = {};
  normalizeCss['a::-moz-focus-inner']['border'] = 0;
  normalizeCss['a:focus'] = {};
  normalizeCss['a:focus']['outlineColor'] = 'currentcolor';
  normalizeCss['a:focus:not(:focus-visible)'] = {};
  normalizeCss['a:focus:not(:focus-visible)']['outlineColor'] = 'transparent';

  normalizeCss['b, strong']['fontWeight'] = fontWeight.bold;

  normalizeCss['em, i'] = {};
  normalizeCss['em, i']['fontStyle'] = 'normal';

  const normalizePDSCss = minifyCss(
    getCss({
      '@global': normalizeCss,
    })
  );

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

  const normalizeStyles = \`${normalizePDSCss}\`;

  return format === 'html' ? \`<style \$\{styleAttributes\}>\${normalizeStyles}</style>\` : <style {...styleProps} dangerouslySetInnerHTML={{ __html: normalizeStyles }}/>;
}`;

  return [types, normalizeStylesFunction].join('\n\n');
};
