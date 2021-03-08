import type { Rule, Styles } from 'jss';
import jss from 'jss';
import preset from 'jss-preset-default';

export type { Styles } from 'jss';

declare global {
  interface CSSStyleSheet {
    replaceSync(style: string): void;
  }
  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

// TODO: check is this preset makes sense
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
