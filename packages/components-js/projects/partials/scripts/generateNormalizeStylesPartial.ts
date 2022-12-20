import { getBaseSlottedStyles } from '@porsche-design-system/components/src/styles';
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

  const normalizeCss = minifyCss(getCss(normalize));

  // TODO:
  const normalizePDSCss = getCss({
    '@global': { ...getBaseSlottedStyles({ withDarkTheme: true }) },
  });

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

  const normalizeStyles = \`${normalizeCss}\`;

  return format === 'html' ? \`<style \$\{styleAttributes\}>\${normalizeStyles}</style>\` : <style {...styleProps} dangerouslySetInnerHTML={{ __html: normalizeStyles }}/>;
}`;

  return [types, normalizeStylesFunction].join('\n\n');
};
