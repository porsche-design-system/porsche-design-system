import { breakpoint, mediaQuery } from '@porsche-design-system/utilities';
import type { Rule, JssStyle, Styles } from 'jss';
import jss from 'jss';
import preset from 'jss-preset-default';
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

// TODO: check if this preset makes sense
jss.setup(preset());

export const getCss = (jssStyles: Styles): string =>
  jss
    .createStyleSheet(jssStyles, {
      generateId: (rule: Rule) => rule.key,
    })
    .toString()
    // TODO: keep space before !important
    // TODO: remove last semi colon
    .replace(/  |\.\\(?=:)|[\n\\]+| (?={)|;(?=\n})|(?!:) /g, '');

export const attachCss = (host: HTMLElement, css: string): void => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  host.shadowRoot.adoptedStyleSheets = [sheet];
};

export const buildHostStyles = (jss: JssStyle): Styles<':host'> => ({ ':host': jss });

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

export const isObject = <T extends object>(obj: T): boolean => obj && typeof obj === 'object';

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
