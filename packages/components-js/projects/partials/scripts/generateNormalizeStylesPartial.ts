import normalize from 'normalize-jss';
import { create, JssStyle, Styles } from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import { color, font } from '@porsche-design-system/utilities';

export const generateNormalizeStylesPartial = (): string => {
  const types = `type GetNormalizeStylesOptions = {
  cdn?: Cdn;
  format?: Format;
};
type GetNormalizeStylesOptionsFormatHtml = GetNormalizeStylesOptions & { format: 'html' };
type GetNormalizeStylesOptionsFormatJsx = GetNormalizeStylesOptions & { format: 'jsx' }`;
  `;`;

  const htmlStyles: JssStyle = {
    textSizeAdjust: 'none',
    WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
    fontFamily: font.family,
  };

  const formElementStyles: JssStyle = {
    textSizeAdjust: 'none',
    WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
    fontFamily: font.family,
    fontSize: font.size.small.fontSize,
    lineHeight: font.size.small.lineHeight,
    // fontWeight: font.weight.regular,
    // fontStyle: 'normal',
    // fontVariant: 'normal',
    // overflowWrap: 'break-word',
    // hyphens: 'auto',
  };

  const anchorStyles: JssStyle = {
    color: 'inherit',
    textDecoration: 'underline',
  };

  const boldStyles: JssStyle = {
    fontWeight: font.weight.bold,
  };

  const emphasisStyles: JssStyle = {
    fontStyle: 'normal',
  };

  const hoverTransitionStyles: JssStyle = {
    transition: 'color var(--p-transition-duration, .24s) ease',
  };

  const hoverColorStyles: JssStyle = {
    color: color.state.hover,
  };

  const hoverColorStylesThemeDark: JssStyle = {
    color: color.darkTheme.state.hover,
  };

  const defaultFocusStyles: JssStyle = {
    outline: '1px solid transparent',
    outlineOffset: '1px',
  };

  const mozFocusInnerStyles: JssStyle = {
    border: 0,
  };

  const elFocusStyles: JssStyle = {
    outlineColor: 'currentColor',
  };

  const elFocusNotVisibleStyles: JssStyle = {
    outlineColor: 'transparent',
  };

  const normalizeCss = normalize[Object.keys(normalize)[0]];

  const addCustomStylesToNormalizeCss = (
    selector: string | string[],
    styles: JssStyle,
    nestedSelector?: string | string[]
  ) => {
    if (!normalizeCss[selector]) {
      normalizeCss[selector] = {};
    }
    if (nestedSelector && !normalizeCss[selector][nestedSelector]) {
      normalizeCss[selector][nestedSelector] = {};
    }
    for (const [key, value] of Object.entries(styles)) {
      nestedSelector
        ? (normalizeCss[selector][nestedSelector][`${key}`] = value)
        : (normalizeCss[selector][`${key}`] = value);
    }
  };

  const addHoverStyles = (): void => {
    addCustomStylesToNormalizeCss('@media(hover:hover)', hoverTransitionStyles, 'a');
    addCustomStylesToNormalizeCss('@media(hover:hover)', hoverTransitionStyles, 'a');
    addCustomStylesToNormalizeCss('@media(hover:hover)', hoverColorStyles, 'a:hover');
    addCustomStylesToNormalizeCss('@media(hover:hover)', hoverColorStylesThemeDark, 'a:hover');
  };

  const addFocusStyles = (): void => {
    const focusableElements = ['a', 'button', 'input', 'select', 'textarea'];
    addCustomStylesToNormalizeCss(['a, button, input, select, textarea'], defaultFocusStyles);

    for (const el of focusableElements) {
      addCustomStylesToNormalizeCss(`${el}::-moz-focus-inner`, mozFocusInnerStyles);
      addCustomStylesToNormalizeCss(`${el}:focus`, elFocusStyles);
      addCustomStylesToNormalizeCss(`${el}:focus:not(:focus-visible)`, elFocusNotVisibleStyles);
    }
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
    addCustomStylesToNormalizeCss('html', htmlStyles);
    addCustomStylesToNormalizeCss(['button, input, optgroup, select, textarea'], formElementStyles);
    addCustomStylesToNormalizeCss('a', anchorStyles);
    addCustomStylesToNormalizeCss(['b, strong'], boldStyles);
    addCustomStylesToNormalizeCss(['em, i'], emphasisStyles);
    addHoverStyles();
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
