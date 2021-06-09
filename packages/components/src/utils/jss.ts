import type { JssStyle, Rule, Styles } from 'jss';
import { create } from 'jss';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginDefaultUnit from 'jss-plugin-default-unit';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import type { BreakpointCustomizable } from './breakpoint-customizable';
import { parseJSON } from './breakpoint-customizable';
import { getShadowRootHTMLElement } from './dom';
import { mediaQuery } from './styles';
import type { BreakPoint } from './styles';

export type { Styles, JssStyle } from 'jss';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  interface CSSStyleSheet {
    replaceSync(style: string): void;
  }
  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

// NOTE: handpicked selection of plugins from jss-preset-default
const jss = create({
  plugins: [
    jssPluginGlobal(),
    jssPluginNested(),
    jssPluginCamelCase(),
    jssPluginDefaultUnit(),
    jssPluginSortMediaQueries({ combineMediaQueries: true }),
  ],
});

export const getCss = (jssStyles: Styles): string =>
  jss
    .createStyleSheet(jssStyles, {
      generateId: (rule: Rule) => rule.key,
    })
    .toString()
    // removes default '.' before class name, all unneeded whitespace, semi colons, escaping backslashes and new lines
    .replace(/\s\s+|\.\\(?=:)|[\n\\]+| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g, '$1');

export const supportsConstructableStylesheets = (): boolean => {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch (e) {
    return false;
  }
};

export const attachCss = (host: HTMLElement, css: string): void => {
  if (supportsConstructableStylesheets()) {
    const [sheet] = host.shadowRoot.adoptedStyleSheets;
    if (sheet) {
      sheet.replaceSync(css);
    } else {
      const newSheet = new CSSStyleSheet();
      newSheet.replaceSync(css);
      host.shadowRoot.adoptedStyleSheets = [newSheet];
    }
  } else {
    // NOTE: fallback for Firefox and Safari
    // old style needs to be removed and added again in safari to be recognized
    getShadowRootHTMLElement(host, 'style[jss]')?.remove();

    const styleEl = document.createElement('style');
    styleEl.setAttribute('jss', '');
    styleEl.innerHTML = css;
    host.shadowRoot.prepend(styleEl);
  }
};

export const buildHostStyles = (jssStyle: JssStyle): Styles<':host'> => ({ ':host': jssStyle });
export const buildGlobalStyles = (jssStyle: JssStyle): Styles<'@global'> => ({ '@global': jssStyle });

export type GetStylesFunction = (value?: any) => JssStyle;
export const buildResponsiveJss = <T>(
  rawValue: BreakpointCustomizable<T>,
  getStyles: GetStylesFunction
): Styles<':host'> => {
  const value: any = parseJSON(rawValue as any);

  return typeof value === 'object'
    ? Object.keys(value)
        // base styles are applied on root object, responsive styles are nested within
        // hence it is used as the initial object within reduce function
        .filter((key) => key !== 'base')
        .reduce(
          (result, breakpointValue: BreakPoint) => ({
            ...result,
            [mediaQuery(breakpointValue)]: buildHostStyles(getStyles(value[breakpointValue])),
          }),
          buildHostStyles(getStyles(value.base))
        )
    : buildHostStyles(getStyles(value));
};

/* eslint-disable-next-line @typescript-eslint/ban-types */
export const isObject = <T extends object>(obj: T): boolean => typeof obj === 'object' && !Array.isArray(obj);

// NOTE: taken from https://stackoverflow.com/a/48218209
/* eslint-disable-next-line @typescript-eslint/ban-types */
export const mergeDeep = <T extends object>(...objects: T[]): T => {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {} as T);
};
