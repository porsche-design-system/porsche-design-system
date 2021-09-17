import type { JssStyle, Rule, Styles } from 'jss';
import { create } from 'jss';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginDefaultUnit from 'jss-plugin-default-unit';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import type { BreakpointCustomizable } from './breakpoint-customizable';
import { parseJSON } from './breakpoint-customizable';
import { getShadowRootHTMLElement, getTagName } from './dom';
import { addImportantToEachRule, mediaQuery } from './styles';
import type { Breakpoint } from './styles';
import { TagName } from '@porsche-design-system/shared';

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

type CssCacheMap = Map<string, string>;
export const constructedCssMap = new Map<TagName, CssCacheMap>();

export const getCachedConstructedCss = <T extends (...p: any[]) => string>(
  host: HTMLElement,
  getComponentCss: T,
  ...args: Parameters<T>
): string => {
  const [, tagName] = /^(?:.*-)?(p-.*)$/i.exec(getTagName(host)) as unknown as [any, TagName];

  if (!constructedCssMap.has(tagName)) {
    constructedCssMap.set(tagName, new Map());
  }

  const id = JSON.stringify(args);
  const cache = constructedCssMap.get(tagName);

  if (!cache.has(id)) {
    cache.set(id, getComponentCss(...args));
  }

  return cache.get(id);
};

export const attachConstructedCss = <T extends (...p: any[]) => string>(
  host: HTMLElement,
  getComponentCss: T,
  ...args: Parameters<T>
): void => {
  const css = getCachedConstructedCss(host, getComponentCss, ...args);

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
export const buildSlottedStyles = (host: HTMLElement, jssStyle: JssStyle): Styles<'@global'> =>
  buildGlobalStyles({
    [getTagName(host)]: addImportantToEachRule(jssStyle),
  });

export type GetStylesFunction = (value?: any) => JssStyle;
export const buildResponsiveHostStyles = <T>(
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
          (result, breakpointValue: Breakpoint) => ({
            ...result,
            [mediaQuery(breakpointValue)]: buildHostStyles(getStyles(value[breakpointValue])),
          }),
          buildHostStyles(getStyles(value.base))
        )
    : buildHostStyles(getStyles(value));
};

export const buildResponsiveStyles = <T>(rawValue: BreakpointCustomizable<T>, getStyles: GetStylesFunction): Styles => {
  const value: any = parseJSON(rawValue as any);

  return typeof value === 'object'
    ? Object.keys(value)
        // base styles are applied on root object, responsive styles are nested within
        // hence it is used as the initial object within reduce function
        .filter((key) => key !== 'base')
        .reduce(
          (result, breakpointValue: Breakpoint) => ({
            ...result,
            [mediaQuery(breakpointValue)]: getStyles(value[breakpointValue]) as Styles,
          }),
          getStyles(value.base) as Styles
        )
    : (getStyles(value) as Styles);
};

export const isObject = <T extends Record<string, any>>(obj: T): boolean =>
  typeof obj === 'object' && !Array.isArray(obj);

// NOTE: taken from https://stackoverflow.com/a/48218209
export const mergeDeep = <T extends Record<string, any>>(...objects: T[]): T => {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key: keyof T) => {
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
