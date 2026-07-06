import { serializeStyles } from '@emotion/serialize';
import { compile, type Element } from 'stylis';

// Loose replacements for jss's `Styles`/`JssStyle` (permissive on purpose — see components' emotionCss).
export type JssStyle = Record<string, any>;
export type Styles<_Name = string, _Data = unknown, _Theme = undefined> = Record<string, any>;

// `prop: value;` — space after colon, space before !important (matches jss authoring style)
const formatDecl = (el: Element): string => {
  const prop = el.props as string;
  const value = el.value.slice(prop.length + 1, -1).replace(/!important/g, ' !important');
  return `${prop}: ${value};`;
};

// rule/at-rule with direct declarations, `header` at `pad`, decls at `pad`+2
const printBlock = (header: string, el: Element, pad: string): string => {
  const decls = (el.children as Element[]).filter((c) => c.type === 'decl');
  if (!decls.length) return '';
  const inner = decls.map((d) => `${pad}  ${formatDecl(d)}`).join('\n');
  return `${pad}${header} {\n${inner}\n${pad}}\n`;
};

const printRule = (el: Element, pad: string): string => printBlock((el.props as string[]).join(', '), el, pad);

// @media/@supports block; children may be rules or nested conditionals
const printConditional = (query: string, children: Element[], pad = ''): string => {
  let body = '';
  for (const child of children) {
    if (child.type === 'rule') body += printRule(child, `${pad}  `);
    else if (child.type === '@media' || child.type === '@supports')
      body += printConditional(child.value, child.children as Element[], `${pad}  `);
  }
  return `${pad}${query} {\n${body}${pad}}\n`;
};

const minWidth = (q: string): number => {
  const m = q.match(/min-width:\s*(\d+)/);
  return m ? Number(m[1]) : Infinity;
};

// serialize one selector branch to a flat stylis AST (nesting resolved; numbers get auto-px)
const compileBranch = (selector: string, subtree: any): Element[] =>
  compile(`${selector}{${serializeStyles([subtree]).styles}}`);

// top-level selector key -> emitted selector. Pseudo/attribute/at selectors stay verbatim;
// plain identifiers become classes (mirrors jss's key-as-generated-class behaviour).
const toSelector = (key: string): string => (/^[a-zA-Z][\w-]*$/.test(key) ? `.${key}` : key);

export const getCss = (style: Styles): string => {
  const base: Element[] = [];
  const mediaMap = new Map<string, Element[]>();
  const mediaOrder: string[] = [];

  const collect = (ast: Element[]): void => {
    for (const el of ast) {
      if (el.type === '@media') {
        if (!mediaMap.has(el.value)) {
          mediaMap.set(el.value, []);
          mediaOrder.push(el.value);
        }
        mediaMap
          .get(el.value)!
          .push(...(el.children as Element[]).filter((c) => c.type === 'rule' || c.type === '@media' || c.type === '@supports'));
      } else if (el.type === 'rule' && (el.children as Element[]).some((c) => c.type === 'decl')) {
        base.push(el);
      } else if (el.type === '@font-face' || el.type === '@keyframes' || el.type === '@supports') {
        base.push(el);
      }
    }
  };

  for (const key in style) {
    if (key === '@global') {
      for (const gk in style['@global']) collect(compileBranch(gk, style['@global'][gk]));
    } else if (key === '@font-face') {
      const value = style['@font-face'];
      for (const face of Array.isArray(value) ? value : [value]) {
        collect(compile(`@font-face{${serializeStyles([face]).styles}}`));
      }
    } else if (key.startsWith('@media') || key.startsWith('@supports')) {
      const inner: Element[] = [];
      for (const sk in style[key]) {
        if (sk === '@global') {
          for (const gk in style[key]['@global']) inner.push(...compileBranch(gk, style[key]['@global'][gk]));
        } else {
          inner.push(...compileBranch(toSelector(sk), style[key][sk]));
        }
      }
      const type = key.startsWith('@media') ? '@media' : '@supports';
      // synthetic node (not stylis-parsed) — only the fields this file's `collect`/`print*` helpers
      // actually read are populated; cast since real Element has more (unused) internal fields
      collect([{ type, value: key, props: [key], children: inner } as Element]);
    } else {
      collect(compileBranch(toSelector(key), style[key]));
    }
  }

  let out = '';
  for (const el of base) {
    if (el.type === '@font-face') out += printBlock('@font-face', el, '');
    else if (el.type === 'rule') out += printRule(el, '');
    else out += printConditional(el.value, el.children as Element[]);
  }
  for (const q of [...mediaOrder].sort((a, b) => minWidth(a) - minWidth(b))) {
    out += printConditional(q, mediaMap.get(q)!);
  }
  return out.replace(/\n+$/, '');
};

export const getMinifiedCss = (style: Styles): string => {
  return getCss(style)
    .replace(/[\n\\]+/g, '') // remove backslashes and newlines
    .replace(/\s(?={)/g, '') // remove space before opening curly brace
    .replace(/;(?=\s*})/g, '') // remove semicolon before closing curly brace
    .replace(/(media)\s/g, '$1') // remove space after media
    .replace(/,\s/g, ',') // remove unneeded white space after comma separation
    .replace(/\s\s+/g, '') // remove white space
    .replace(/:\s(?=.*)/g, ':') // remove white space after colon
    .replace(/\n+/g, ''); // remove new line
};
