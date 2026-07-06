// object->CSS engine on @emotion/serialize + stylis, wrapped to reproduce the former JSS output
// contract (raw selector map -> one pretty-printed stylesheet). See jss-migration-plan-b-emotion.md.
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
  // Present on the top-level rule produced directly from a `compileBranch` call (see there):
  // jss uses a `@global`/scoped key's literal text as its selector verbatim (comma-spacing
  // included) whenever the key contains no `&`. Only "&"-derived nested rules (jss-plugin-nested's
  // `replaceParentRefs`) get recombined, which explicitly rejoins comma-lists with ', ' (space).
  verbatim?: string;
};

const CONTENT_TOKEN = (i: number): string => `"pdsc${i}"`;

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

// decl node -> "prop: value;" with JSS spacing (space after colon, space before !important)
const formatDecl = (el: AstNode): string => {
  const prop = el.props as string;
  const value = el.value.slice(prop.length + 1, -1).replace(/!important/g, ' !important');
  return `${prop}: ${value};`;
};

// stylis strips all whitespace around combinators (`details > div` -> `details>div`). Re-add
// jss-style spacing around bare `>`/`+`/`~` combinators, but only at paren-depth 0 and only when
// not escaped — `:nth-child(-n+4)` and `.current\+1` must stay untouched.
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

// selector list (for "&"-derived rules only) -> jss-plugin-nested's own ", " (comma+space) join,
// with combinator spacing restored per selector. Verbatim (non-"&") rules bypass this entirely —
// see `compileBranch`/`AstNode.verbatim`.
const formatSelectorList = (selectors: string[]): string => selectors.map(spaceCombinators).join(', ');

// serialize one selector branch's subtree to a flat stylis AST (nesting/`&` resolved). The FIRST
// top-level 'rule' node — the branch's own selector, matching `selector` exactly — is tagged
// `verbatim` so `printRule` prints the literal author text instead of reconstructing it (jss only
// recombines selectors that were actually derived via `&`; a plain `@global`/scoped key is used
// as-is, keeping whatever comma-spacing the author happened to type).
const compileBranch = (selector: string, subtree: any, content: string[]): AstNode[] => {
  const { styles: raw } = serializeStyles([normalizeValues(subtree, content)]);
  const ast = compile(`${selector}{${raw}}`) as AstNode[];
  const topRule = ast.find((el) => el.type === 'rule');
  if (topRule) topRule.verbatim = selector;
  return ast;
};

const decls = (el: AstNode): AstNode[] => (el.children as AstNode[]).filter((c) => c.type === 'decl');

// plain rule: selector at `pad`, decls at `pad`+2
const printRule = (el: AstNode, pad: string): string => {
  const d = decls(el);
  if (!d.length) return '';
  const inner = d.map((x) => `${pad}  ${formatDecl(x)}`).join('\n');
  const selectorText = el.verbatim ?? formatSelectorList(el.props as string[]);
  return `${pad}${selectorText} {\n${inner}\n${pad}}\n`;
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

// @media/@supports block. The query line (and its closing brace) is ALWAYS at column 0, even
// when nested inside another conditional — this mirrors a jss quirk (jss-plugin-nested hoists
// conditionals to top-level siblings before stringifying, so a conditional never "knows" it was
// originally nested). `pad` only controls the CONTENT indent: it starts at '' normally, or '  '
// when the enclosing scope contains `@keyframes` (see `emitGroup`'s `hasKeyframes` — a
// jss-plugin-sort-css-media-queries@1.0.1-beta.0 bug where KeyframesRule.toString() mutates a
// shared `options.indent` object that every later sibling/conditional in that scope inherits),
// and increments by a further 2 spaces per level of TRUE conditional nesting (e.g.
// `@media(forced-colors)` nested inside `@media(min-width)`).
const printConditional = (query: string, children: AstNode[], pad: string): string => {
  let body = '';
  for (const child of children) {
    if (child.type === 'rule') {
      body += printRule(child, `${pad}  `);
    } else if (child.type === '@media' || child.type === '@supports' || child.type === '@container') {
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

// One compiled top-level key's AST, tagged with whether a `@keyframes` key was already
// encountered earlier in the overall styles object's iteration order (see `getCss`).
type Batch = { ast: AstNode[]; afterKeyframes: boolean };

// emit one group: keyframes, base rules, merged+sorted @media, then @supports.
//
// `afterKeyframes`/`hasKeyframesAnywhere` faithfully reproduce a jss bug (not an emotion/stylis
// requirement): jss-plugin-sort-css-media-queries@1.0.1-beta.0 monkey-patches RuleList.toString
// to share ONE mutable `options` object across every sibling rule — and critically, `@global`'s
// own container rule (`GlobalContainerRule.toString`) forwards that SAME object reference to its
// children without cloning it, so the mutation leaks from `@global`'s children out to whatever
// top-level (non-`@global`) rules are declared after it. jss core's `KeyframesRule.toString` (and
// `ConditionalRule.toString`) contain `if (options.indent == null) options.indent = 1`, which —
// because that options object is shared, not cloned per rule — permanently bumps the indent for
// every rule rendered AFTER the keyframes anywhere in the whole stylesheet, and for every
// conditional GROUP (conditionals are always grouped/rendered as a pass separate from, and after,
// plain rules, so they inherit the bump regardless of source order).
const emitGroup = (batches: Batch[], hasKeyframesAnywhere: boolean): string => {
  const keyframes: AstNode[] = [];
  const baseRules: { el: AstNode; afterKeyframes: boolean }[] = [];
  const mediaMap = new Map<string, AstNode[]>();
  const mediaOrder: string[] = [];
  // `@supports` and `@container` share handling: unlike min-width `@media` they have no natural
  // ordering to sort/merge by, so both emit in encounter order.
  const nonMergedConditionals: { query: string; children: AstNode[] }[] = [];
  // keep rules and nested conditionals; drop declarations/comments hoisted to block level
  const blockChildren = (el: AstNode): AstNode[] =>
    (el.children as AstNode[]).filter(
      (c) => c.type === 'rule' || c.type === '@media' || c.type === '@supports' || c.type === '@container'
    );

  for (const { ast, afterKeyframes } of batches) {
    for (const el of ast) {
      if (el.type === '@keyframes') {
        keyframes.push(el);
      } else if (el.type === '@media') {
        if (!mediaMap.has(el.value)) {
          mediaMap.set(el.value, []);
          mediaOrder.push(el.value);
        }
        mediaMap.get(el.value)!.push(...blockChildren(el));
      } else if (el.type === '@supports' || el.type === '@container') {
        nonMergedConditionals.push({ query: el.value, children: blockChildren(el) });
      } else if (el.type === 'rule' && (el.children as AstNode[]).some((c) => c.type === 'decl')) {
        baseRules.push({ el, afterKeyframes });
      }
    }
  }

  const sortedMedia = [...mediaOrder].sort((a, b) => minWidth(a) - minWidth(b));
  const condPad = hasKeyframesAnywhere ? '  ' : '';

  let out = '';
  for (const kf of keyframes) out += printKeyframes(kf);
  for (const { el, afterKeyframes } of baseRules) out += printRule(el, afterKeyframes ? '  ' : '');
  for (const q of sortedMedia) out += printConditional(q, mediaMap.get(q)!, condPad);
  for (const c of nonMergedConditionals) out += printConditional(c.query, c.children, condPad);
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
  const globalBatches: Batch[] = [];
  const scopedBatches: Batch[] = [];
  const styles = jssStyles as Record<string, any>;
  const content: string[] = [];

  // One continuous flag across the WHOLE styles object (not per-bucket): jss's `@global`
  // container forwards its shared mutable options object to its children without cloning it, so
  // once `@global` contains a `@keyframes` key, the indent bump leaks out to every rule declared
  // after `@global` too (e.g. a top-level scoped class declared after `@global`). See
  // `emitGroup`'s doc comment.
  let seenKeyframes = false;

  // Split top-level keys: @global rules (and top-level conditionals) emit first, scoped `.key`
  // rules after — mirrors jss's global-then-scoped ordering.
  for (const key in styles) {
    if (key === '@global') {
      for (const gk in styles['@global']) {
        if (gk.startsWith('@keyframes')) {
          const { styles: raw } = serializeStyles([normalizeValues({ [gk]: styles['@global'][gk] }, content)]);
          globalBatches.push({ ast: compile(raw) as AstNode[], afterKeyframes: seenKeyframes });
          seenKeyframes = true;
        } else {
          globalBatches.push({
            ast: compileBranch(gk, styles['@global'][gk], content),
            afterKeyframes: seenKeyframes,
          });
        }
      }
    } else if (isConditional(key)) {
      globalBatches.push({
        ast: [
          {
            type: key.startsWith('@media') ? '@media' : '@supports',
            value: key,
            props: [key],
            children: compileMap(styles[key], content),
          },
        ],
        afterKeyframes: seenKeyframes,
      });
    } else {
      scopedBatches.push({
        ast: compileBranch(`.${key}`, styles[key], content),
        afterKeyframes: seenKeyframes,
      });
    }
  }

  const css = (emitGroup(globalBatches, seenKeyframes) + emitGroup(scopedBatches, seenKeyframes)).replace(/\n+$/, '');
  // restore placeholdered `content` values verbatim
  return content.reduce((acc, value, i) => acc.replace(CONTENT_TOKEN(i), value), css);
};
