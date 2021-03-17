import { breakpoint, mediaQuery } from '@porsche-design-system/utilities';
import type { Rule, JssStyle, Styles } from 'jss';
import { create } from 'jss';
import jssPluginSyntaxCamelCase from 'jss-plugin-camel-case';
import jssPluginSyntaxDefaultUnit from 'jss-plugin-default-unit';
import type { BreakpointCustomizable } from './breakpoint-customizable';
import { parseJSON } from './breakpoint-customizable';
import { getShadowRootHTMLElement } from './dom';

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
  plugins: [jssPluginSyntaxCamelCase(), jssPluginSyntaxDefaultUnit()],
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
    const styleEl = getShadowRootHTMLElement(host, 'style');
    if (styleEl) {
      styleEl.innerHTML = css;
    } else {
      const newStyleEl = document.createElement('style');
      newStyleEl.innerHTML = css;
      host.shadowRoot.prepend(newStyleEl);
    }
  }
};

export const buildHostStyles = (jssStyle: JssStyle): Styles<':host'> => ({ ':host': jssStyle });

export type GetStylesFunction = (value: any) => JssStyle;
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
          (result, breakpointValue) => ({
            ...result,
            [mediaQuery(breakpoint[breakpointValue])]: buildHostStyles(getStyles(value[breakpointValue])),
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
