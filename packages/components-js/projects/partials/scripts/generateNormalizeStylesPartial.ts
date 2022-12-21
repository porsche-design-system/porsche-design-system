import normalize from 'normalize-jss';
import { create, Styles } from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import { color, font, fontFamily } from '@porsche-design-system/utilities';

export const generateNormalizeStylesPartial = (): string => {
  const types = `type GetNormalizeStylesOptions = {
  cdn?: Cdn;
  format?: Format;
};
type GetNormalizeStylesOptionsFormatHtml = GetNormalizeStylesOptions & { format: 'html' };
type GetNormalizeStylesOptionsFormatJsx = GetNormalizeStylesOptions & { format: 'jsx' }`;
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

  const normalizeCss = normalize[Object.keys(normalize)[0]];

  normalizeCss['html']['textSizeAdjust'] = 'none';
  normalizeCss['html']['WebkitTextSizeAdjust'] = 'none'; // stop iOS safari from adjusting font size when screen rotation is changing
  normalizeCss['html']['fontFamily'] = fontFamily;
  // TODO: line-height, some default text styles should be provided and margin + padding is reset

  normalizeCss['a']['color'] = 'inherit';
  normalizeCss['a']['textDecoration'] = 'underline';

  normalizeCss['@media(hover:hover)'] = {};
  normalizeCss['@media(hover:hover)']['a'] = {};
  normalizeCss['@media(hover:hover)']['a']['transition'] = 'color var(--p-transition-duration, .24s) ease';
  normalizeCss['@media(hover:hover)']['a:hover'] = {};
  normalizeCss['@media(hover:hover)']['a:hover']['color'] = color.state.hover;

  normalizeCss['@media(hover:hover)']['[data-theme="dark"] a'] = {};
  normalizeCss['@media(hover:hover)']['[data-theme="dark"] a']['transition'] =
    'color var(--p-transition-duration, .24s) ease';
  normalizeCss['@media(hover:hover)']['[data-theme="dark"] a:hover'] = {};
  normalizeCss['@media(hover:hover)']['[data-theme="dark"] a:hover']['color'] = color.darkTheme.state.hover;

  normalizeCss['b, strong']['fontWeight'] = font.weight.bold;

  normalizeCss['em, i'] = {};
  normalizeCss['em, i']['fontStyle'] = 'normal';

  const addFocusStyles = (): void => {
    const focusableElements = ['a', 'button', 'input', 'select', 'textarea'];
    const focusableElementsString = focusableElements.join(',');
    normalizeCss[focusableElementsString] = {};
    normalizeCss[focusableElementsString]['outline'] = '1px solid transparent';
    normalizeCss[focusableElementsString]['outlineOffset'] = '1px';

    // TODO: use focus() from utilities?
    for (const el of focusableElements) {
      normalizeCss[`${el}::-moz-focus-inner`] = {};
      normalizeCss[`${el}::-moz-focus-inner`]['border'] = 0;
      normalizeCss[`${el}:focus`] = {};
      normalizeCss[`${el}:focus`]['outlineColor'] = 'currentColor';
      normalizeCss[`${el}:focus:not(:focus-visible)`] = {};
      normalizeCss[`${el}:focus:not(:focus-visible)`]['outlineColor'] = 'transparent';
    }
  };

  const getNormalizeStyles = (): string => {
    addFocusStyles();
    return minifyCss(
      getCss({
        '@global': { ...normalizeCss },
      })
    );
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
