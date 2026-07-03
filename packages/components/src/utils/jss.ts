import { type Breakpoint, getMediaQueryMin } from '@porsche-design-system/emotion';
import type { TagName } from '@porsche-design-system/shared';
// Local replacement for the types previously imported from the `jss` package. `jss` is no longer a
// dependency (see ./jss-custom-serializer.ts); these structural types stand in for `jss`'s
// `JssStyle`/`Styles` wherever plain CSS-in-JS objects are authored across the components package.
export interface JssStyle {
  [property: string]: any;
}
export type Styles<Name extends string | number | symbol = string> = Partial<Record<Name, JssStyle | string>>;

import { addImportantToEachRule } from '../styles';
import { type BreakpointCustomizable, parseJSON } from './breakpoint-customizable';
import { getShadowRootHTMLElement } from './dom';
import { hasPropValueChanged } from './has-prop-value-changed';
import { getCssCustom } from './jss-custom-serializer';
import { getTagNameWithoutPrefix } from './tag-name';

// Byte-for-byte custom serializer replacing jss@10 + jss-plugin-{global,nested,camel-case}
// + jss-plugin-sort-css-media-queries. Implementation in ./jss-custom-serializer.
export const getCss = (jssStyles: Styles): string => getCssCustom(jssStyles);

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
  const css = internalJss.getCachedComponentCss(host, getComponentCss, ...args);

  if (internalJss.getHasConstructableStylesheetSupport()) {
    const [sheet] = host.shadowRoot.adoptedStyleSheets;
    if (sheet) {
      sheet.replaceSync(css);
    } else {
      const newSheet = new CSSStyleSheet();
      newSheet.replaceSync(css);
      host.shadowRoot.adoptedStyleSheets = [newSheet];
    }
  } else {
    // NOTE: fallback for Safari
    // old style needs to be removed and added again in safari to be recognized
    getShadowRootHTMLElement(host, 'style[jss]')?.remove();

    const styleEl = document.createElement('style');
    styleEl.setAttribute('jss', '');
    styleEl.innerHTML = css;
    host.shadowRoot.prepend(styleEl);
  }
};

// TODO: this function does nothing but treats for unknowns reasons e.g. getThemedColors to be bundled into main chunk
export const doNothing = (): void => {
  addImportantToEachRule({});
  hasPropValueChanged(1, 1); // to force into main chunk
};

export type GetJssStyleFunction = (value?: any) => JssStyle;

export const buildResponsiveStyles = <T>(
  rawValue: BreakpointCustomizable<T>,
  getJssStyle: GetJssStyleFunction
): Styles => {
  const value = parseJSON(rawValue as any);

  return typeof value === 'object'
    ? Object.keys(value)
        // base styles are applied on root object, responsive styles are nested within
        // hence it is used as the initial object within reduce function
        .filter((key) => key !== 'base')
        .reduce(
          (result, breakpointValue: Breakpoint) => ({
            ...result,
            [getMediaQueryMin(breakpointValue as any)]: getJssStyle(value[breakpointValue]) as Styles,
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

export const internalJss = {
  getCachedComponentCss,
  getHasConstructableStylesheetSupport,
};
