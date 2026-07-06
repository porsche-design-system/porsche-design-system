// object->CSS engine on @emotion/serialize + stylis: a raw JSS-style selector map -> one
// pretty-printed stylesheet string. `@emotion/serialize` flattens the style object to a CSS
// declaration string (camelCase->kebab, `&` nesting kept); `stylis` resolves nesting/at-rules
// into a flat AST that we pretty-print. Output is semantically equivalent to the former JSS
// output (same rules/values, same cascade order) but not byte-identical to it.
import { serializeStyles } from '@emotion/serialize';
// stylis ships no bundled types; vitest transpiles (esbuild) so this runs regardless.
// @ts-expect-error
import { compile } from 'stylis';

// Loose replacements for jss's `Styles`/`JssStyle` (the style-object contract for getCss and the
// *-styles.ts authoring files). Kept permissive on purpose — csstype's strict property typing
// would surface hundreds of errors across the ~50 style files.
export type JssStyle = Record<string, any>;
// generic params mirror jss's `Styles<Name, Data, Theme>` so existing `Styles<...>` usages still
// typecheck; they're intentionally ignored (the map stays permissive).
export type Styles<_Name = string, _Data = unknown, _Theme = undefined> = Record<string, any>;

type AstNode = {
  type: string;
  props: string | string[];
  value: string;
  children: AstNode[] | string;
};

const CONTENT_TOKEN = (i: number): string => `"pdsc${i}"`;

// non-mutating pre-walk:
// - stringify every numeric value so Emotion never auto-appends `px`
// - swap `content` string values for a quoted placeholder. Emotion's serializer validates the
//   `content` property and throws in dev on values it can't parse (e.g. PDS's `"" !important`);
//   the placeholder always passes, and getCss restores the real value verbatim afterwards.
const normalizeValues = (o: any, content: string[]): any => {
  if (Array.isArray(o)) return o.map((v) => normalizeValues(v, content));
  if (o && typeof o === 'object') {
    const r: Record<string, any> = {};
    for (const k in o) {
      const v = o[k];
      if (k === 'content' && typeof v === 'string') {
        r[k] = CONTENT_TOKEN(content.push(v) - 1);
      } else {
        r[k] = typeof v === 'number' ? String(v) : normalizeValues(v, content);
      }
    }
    return r;
  }
  return o;
};

// decl node -> "prop: value;" (space after colon, space before !important)
const formatDecl = (el: AstNode): string => {
  const prop = el.props as string;
  const value = el.value.slice(prop.length + 1, -1).replace(/!important/g, ' !important');
  return `${prop}: ${value};`;
};

const decls = (el: AstNode): AstNode[] => (el.children as AstNode[]).filter((c) => c.type === 'decl');

// stylis strips whitespace around combinators (`a > b` -> `a>b`). Re-add spaces around bare
// `>`/`+`/`~` combinators, but only at paren-depth 0 and only when not escaped, so
// `:nth-child(-n+4)` and `.current\+1` stay untouched. Some components rely on a direct-child
// `>` combinator (e.g. tag-dismissible's safari <15.5 fix, PR #1941); keeping it spaced also
// makes the emitted CSS readable.
const spaceCombinators = (selector: string): string => {
  let depth = 0;
  let out = '';
  for (let i = 0; i < selector.length; i++) {
    const c = selector[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    if (depth === 0 && (c === '>' || c === '+' || c === '~') && selector[i - 1] !== '\\') {
      out += ` ${c} `;
    } else {
      out += c;
    }
  }
  return out.replace(/ {2,}/g, ' ').trim();
};

// plain rule: selector at `pad`, decls at `pad`+2
const printRule = (el: AstNode, pad: string): string => {
  const d = decls(el);
  if (!d.length) return '';
  const inner = d.map((x) => `${pad}  ${formatDecl(x)}`).join('\n');
  const selector = (el.props as string[]).map(spaceCombinators).join(',');
  return `${pad}${selector} {\n${inner}\n${pad}}\n`;
};

// keyframes: name at col 0, step at 2, decl at 4
const printKeyframes = (el: AstNode): string => {
  const steps = (el.children as AstNode[])
    .map((step) => {
      const inner = (step.children as AstNode[]).map((d) => `    ${formatDecl(d)}`).join('\n');
      return `  ${(step.props as string[]).join(', ')} {\n${inner}\n  }`;
    })
    .join('\n');
  return `${el.value} {\n${steps}\n}\n`;
};

// @media/@supports/@container block; children may be rules or nested conditionals
const printConditional = (query: string, children: AstNode[], pad: string): string => {
  let body = '';
  for (const child of children) {
    if (child.type === 'rule') {
      body += printRule(child, `${pad}  `);
    } else if (
      child.type === '@media' ||
      child.type === '@supports' ||
      child.type === '@container' ||
      child.type === '@starting-style'
    ) {
      body += printConditional(child.value, child.children as AstNode[], `${pad}  `);
    }
  }
  return `${query} {\n${body}}\n\n`;
};

// mobile-first: ascending min-width; media without min-width sorts after, in encounter order
const minWidth = (q: string): number => {
  const m = q.match(/min-width:\s*(\d+)/);
  return m ? Number(m[1]) : Infinity;
};

// serialize one selector branch's subtree to a flat stylis AST (nesting/`&` resolved)
const compileBranch = (selector: string, subtree: any, content: string[]): AstNode[] => {
  const { styles: raw } = serializeStyles([normalizeValues(subtree, content)]);
  return compile(`${selector}{${raw}}`) as AstNode[];
};

// emit one group of top-level nodes: keyframes, base rules, merged+sorted @media, then
// @supports/@container. `@media` blocks merge by query and sort ascending by min-width (mobile
// first); `@supports`/`@container` have no natural ordering, so they emit in encounter order.
// Base rules emit before conditionals so conditional queries override the base cascade.
const emitGroup = (nodes: AstNode[]): string => {
  const keyframes: AstNode[] = [];
  const baseRules: AstNode[] = [];
  const mediaMap = new Map<string, AstNode[]>();
  const mediaOrder: string[] = [];
  const nonMergedConditionals: { query: string; children: AstNode[] }[] = [];
  // keep rules and nested conditionals; drop declarations/comments hoisted to block level
  const blockChildren = (el: AstNode): AstNode[] =>
    (el.children as AstNode[]).filter(
      (c) =>
        c.type === 'rule' ||
        c.type === '@media' ||
        c.type === '@supports' ||
        c.type === '@container' ||
        c.type === '@starting-style'
    );

  for (const el of nodes) {
    if (el.type === '@keyframes') {
      keyframes.push(el);
    } else if (el.type === '@media') {
      if (!mediaMap.has(el.value)) {
        mediaMap.set(el.value, []);
        mediaOrder.push(el.value);
      }
      mediaMap.get(el.value)!.push(...blockChildren(el));
    } else if (el.type === '@supports' || el.type === '@container' || el.type === '@starting-style') {
      nonMergedConditionals.push({ query: el.value, children: blockChildren(el) });
    } else if (el.type === 'rule' && (el.children as AstNode[]).some((c) => c.type === 'decl')) {
      baseRules.push(el);
    }
  }

  const sortedMedia = [...mediaOrder].sort((a, b) => minWidth(a) - minWidth(b));

  let out = '';
  for (const kf of keyframes) out += printKeyframes(kf);
  for (const el of baseRules) out += printRule(el, '');
  for (const q of sortedMedia) out += printConditional(q, mediaMap.get(q)!, '');
  for (const c of nonMergedConditionals) out += printConditional(c.query, c.children, '');
  return out;
};

const isConditional = (key: string): boolean => key.startsWith('@media') || key.startsWith('@supports');

// Compile a style map to a flat list of top-level stylis nodes.
// @global children keep their selector verbatim; other selector keys become `.key`;
// a top-level @media/@supports key wraps its (recursively compiled) body in a conditional node.
const compileMap = (map: Record<string, any>, content: string[]): AstNode[] => {
  const nodes: AstNode[] = [];
  for (const key in map) {
    if (key === '@global') {
      for (const gk in map['@global']) {
        if (gk.startsWith('@keyframes')) {
          nodes.push(
            ...(compile(serializeStyles([normalizeValues({ [gk]: map['@global'][gk] }, content)]).styles) as AstNode[])
          );
        } else {
          nodes.push(...compileBranch(gk, map['@global'][gk], content));
        }
      }
    } else if (isConditional(key)) {
      nodes.push({
        type: key.startsWith('@media') ? '@media' : '@supports',
        value: key,
        props: [key],
        children: compileMap(map[key], content),
      });
    } else {
      nodes.push(...compileBranch(`.${key}`, map[key], content));
    }
  }
  return nodes;
};

export const getCss = (jssStyles: Styles): string => {
  const globalNodes: AstNode[] = [];
  const scopedNodes: AstNode[] = [];
  const styles = jssStyles as Record<string, any>;
  const content: string[] = [];

  // Split top-level keys: @global rules (and top-level conditionals) emit first, scoped `.key`
  // rules after — mirrors jss's global-then-scoped ordering.
  for (const key in styles) {
    if (key === '@global') {
      for (const gk in styles['@global']) {
        if (gk.startsWith('@keyframes')) {
          globalNodes.push(
            ...(compile(serializeStyles([normalizeValues({ [gk]: styles['@global'][gk] }, content)]).styles) as AstNode[])
          );
        } else {
          globalNodes.push(...compileBranch(gk, styles['@global'][gk], content));
        }
      }
    } else if (isConditional(key)) {
      globalNodes.push({
        type: key.startsWith('@media') ? '@media' : '@supports',
        value: key,
        props: [key],
        children: compileMap(styles[key], content),
      });
    } else {
      scopedNodes.push(...compileBranch(`.${key}`, styles[key], content));
    }
  }

  const css = (emitGroup(globalNodes) + emitGroup(scopedNodes)).replace(/\n+$/, '');
  // restore placeholdered `content` values verbatim
  return content.reduce((acc, value, i) => acc.replace(CONTENT_TOKEN(i), value), css);
};
