import type { TagName } from '@porsche-design-system/shared';
import type { BreakpointCustomizable } from './breakpoint-customizable';
import type { JssStyle, Styles } from 'jss';
import { create } from 'jss';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import { mediaQueryMin } from '@porsche-design-system/utilities-v2';
import type { Breakpoint } from '@porsche-design-system/utilities-v2';
import { parseJSON } from './breakpoint-customizable';
import { getShadowRootHTMLElement } from './dom';
import { addImportantToEachRule } from '../styles';
import { getTagName, getTagNameWithoutPrefix } from '.';

// NOTE: handpicked selection of plugins from jss-preset-default
const jss = create({
  plugins: [
    jssPluginGlobal(),
    jssPluginNested(),
    jssPluginCamelCase(),
    jssPluginSortMediaQueries({ combineMediaQueries: true }),
  ],
});

export const getCss = (jssStyles: Styles): string =>
  jss
    .createStyleSheet(jssStyles, {
      generateId: (rule) => rule.key,
    })
    .toString();

export const supportsConstructableStylesheets = (): boolean => {
  try {
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch {
    return false;
  }
};

// determine it once
const hasConstructableStylesheetSupport = supportsConstructableStylesheets();
// getter for easy mocking
export const getHasConstructableStylesheetSupport = (): boolean => hasConstructableStylesheetSupport;

type CssCacheMap = Map<string, string>;
export const componentCssMap = new Map<TagName, CssCacheMap>();

export const getCachedComponentCss = <T extends (...p: any[]) => string>(
  host: HTMLElement,
  getComponentCss: T,
  ...args: Parameters<T>
): string => {
  const tagName = getTagNameWithoutPrefix(host);

  if (!componentCssMap.has(tagName)) {
    componentCssMap.set(tagName, new Map());
  }

  const id = args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join('|');
  const cache = componentCssMap.get(tagName);

  if (!cache.has(id)) {
    cache.set(id, getComponentCss(...args));
  }

  return cache.get(id);
};

export const attachComponentCss = <T extends (...p: any[]) => string>(
  host: HTMLElement,
  getComponentCss: T,
  ...args: Parameters<T>
): void => {
  const css = getCachedComponentCss(host, getComponentCss, ...args);

  if (getHasConstructableStylesheetSupport()) {
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

export const buildSlottedStyles = (host: HTMLElement, jssStyle: JssStyle): Styles<'@global'> => ({
  '@global': {
    [getTagName(host)]: addImportantToEachRule(jssStyle),
  },
});

export type GetJssStyleFunction = (value?: any) => JssStyle;

export const buildResponsiveStyles = <T>(
  rawValue: BreakpointCustomizable<T>,
  getJssStyle: GetJssStyleFunction
): Styles => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const value = parseJSON(rawValue as any);

  return typeof value === 'object'
    ? Object.keys(value)
        // base styles are applied on root object, responsive styles are nested within
        // hence it is used as the initial object within reduce function
        .filter((key) => key !== 'base')
        .reduce(
          (result, breakpointValue: Breakpoint) => ({
            ...result,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            [mediaQueryMin(breakpointValue as any)]: getJssStyle(value[breakpointValue]) as Styles,
          }),
          getJssStyle(value.base) as Styles
        )
    : (getJssStyle(value) as Styles);
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
