import { breakpoint, mediaQuery } from '@porsche-design-system/utilities';
import type { Rule, JssStyle, Styles } from 'jss';
import { create } from 'jss';
import jssPluginSyntaxCamelCase from 'jss-plugin-camel-case';
import jssPluginSyntaxDefaultUnit from 'jss-plugin-default-unit';
import { parseJSON } from './breakpoint-customizable';

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
    // TODO: keep space before !important
    // TODO: remove last semi colon
    .replace(/\s\s+|\.\\(?=:)|[\n\\]+| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g, '$1');

export const attachCss = (host: HTMLElement, css: string): void => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  host.shadowRoot.adoptedStyleSheets = [sheet];
};

export const buildHostStyles = (jssStyle: JssStyle): Styles<':host'> => ({ ':host': jssStyle });

export const buildResponsiveJss = <T>(rawValue: T, getStyles: (x: T) => JssStyle): Styles<':host'> => {
  const value = parseJSON(rawValue as any);

  return typeof value === 'object'
    ? Object.keys(value)
        .filter((key) => key !== 'base')
        .reduce(
          (res, bp) => ({
            ...res,
            [mediaQuery(breakpoint[bp])]: buildHostStyles(getStyles(value[bp])),
          }),

          buildHostStyles(getStyles((value as any).base))
        )
    : buildHostStyles(getStyles(value as any));
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
