// POC — hand-rolled, zero-dependency-except-`sort-css-media-queries` serializer.
// Goal: byte-for-byte parity with jss@10 + jss-plugin-{global,nested,camel-case} +
// jss-plugin-sort-css-media-queries({ combineMediaQueries: true }) as configured in ./jss.ts,
// so `jss` can eventually be dropped as a dependency.
// Ported from scratch/jss-poc/serializeCss.cjs (see that folder for the validation harness).
import sortCSSmq from 'sort-css-media-queries';
import type { Styles } from './jss';

const UN_QUERIED = '__UN_QUERIED__';

type StyleRule = { type: 'style'; selector: string; style: Record<string, any> };
type ConditionalRule = { type: 'conditional'; query: string; rules: AnyRule[] };
type KeyframeRule = { type: 'keyframe'; key: string; style: Record<string, any> };
type KeyframesRule = { type: 'keyframes'; id: string; rules: KeyframeRule[] };
type ContainerRule = { type: 'container'; rules: AnyRule[] };
type AnyRule = StyleRule | ConditionalRule | KeyframeRule | KeyframesRule | ContainerRule;

type BuildCtx = { keyframes: Record<string, string> };

// ---------- helpers (transcribed 1:1 from jss core + plugins) ----------

function cloneStyle(style: any): any {
  if (style == null || typeof style !== 'object') return style;
  if (Array.isArray(style)) return style.map(cloneStyle);
  const out: Record<string, any> = {};
  for (const k in style) out[k] = cloneStyle(style[k]);
  return out;
}

const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
function escapeSelector(str: string): string {
  return str.replace(escapeRegex, '\\$1');
}

const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
function hyphenate(name: string): string {
  const h = name.replace(uppercasePattern, (m) => '-' + m.toLowerCase());
  return msPattern.test(h) ? '-' + h : h;
}

function convertCase(style: Record<string, any>): Record<string, any> {
  const converted: Record<string, any> = {};
  for (const prop in style) {
    const key = prop.indexOf('--') === 0 ? prop : hyphenate(prop);
    converted[key] = style[prop];
  }
  if (style.fallbacks) {
    converted.fallbacks = Array.isArray(style.fallbacks)
      ? style.fallbacks.map(convertCase)
      : convertCase(style.fallbacks);
  }
  return converted;
}

function join(value: any[], by: string): string {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '!important') break;
    if (result) result += by;
    result += value[i];
  }
  return result;
}

function toCssValue(value: any): any {
  if (!Array.isArray(value)) return value;
  let cssValue = '';
  if (Array.isArray(value[0])) {
    for (let i = 0; i < value.length; i++) {
      if (value[i] === '!important') break;
      if (cssValue) cssValue += ', ';
      cssValue += join(value[i], ' ');
    }
  } else {
    cssValue = join(value, ', ');
  }
  if (value[value.length - 1] === '!important') cssValue += ' !important';
  return cssValue;
}

function indentStr(str: string, indent: number): string {
  let result = '';
  for (let i = 0; i < indent; i++) result += '  ';
  return result + str;
}

function toCss(selector: string, style: Record<string, any>, options: { indent?: number }): string {
  let result = '';
  if (!style) return result;
  let indent = options.indent === undefined ? 0 : options.indent;
  const fallbacks = style.fallbacks;
  if (selector) indent++;

  const printDecl = (prop: string, value: any) => {
    if (result) result += '\n';
    result += indentStr(prop + ': ' + toCssValue(value) + ';', indent);
  };

  if (fallbacks) {
    if (Array.isArray(fallbacks)) {
      for (const fb of fallbacks) {
        for (const p in fb) if (fb[p] != null) printDecl(p, fb[p]);
      }
    } else {
      for (const p in fallbacks) if (fallbacks[p] != null) printDecl(p, fallbacks[p]);
    }
  }

  for (const prop in style) {
    const value = style[prop];
    if (value != null && prop !== 'fallbacks') printDecl(prop, value);
  }

  if (!result) return result;
  if (!selector) return result;
  indent--;
  result = '\n' + result + '\n';
  return indentStr(selector + ' {' + result, indent) + indentStr('}', indent);
}

function replaceParentRefs(nestedProp: string, parentSelector: string): string {
  const parentSelectors = parentSelector.split(/\s*,\s*/g);
  const nestedSelectors = nestedProp.split(/\s*,\s*/g);
  let result = '';
  for (const parent of parentSelectors) {
    for (const nested of nestedSelectors) {
      if (result) result += ', ';
      result += nested.indexOf('&') !== -1 ? nested.replace(/&/g, parent) : parent + ' ' + nested;
    }
  }
  return result;
}

// jss core's `pluginKeyframesRule` is an always-on *internal* plugin (not part of our 4-plugin
// preset selection), independent of jss-plugin-nested/global/etc. It resolves `$keyframeName`
// refs in `animation`/`animation-name` values against a sheet-wide keyframes name->id map,
// registered as each `@keyframes` rule is created (in authoring order).
const keyframesRefRegExp = /\$([\w-]+)/g;
function resolveKeyframeRefs(style: Record<string, any>, keyframesMap: Record<string, string>): Record<string, any> {
  for (const prop of ['animation', 'animation-name']) {
    if (typeof style[prop] === 'string') {
      style[prop] = style[prop].replace(keyframesRefRegExp, (match: string, name: string) =>
        name in keyframesMap ? keyframesMap[name] : match
      );
    }
  }
  return style;
}

// ---------- rule tree construction ----------

const conditionalKeyRegExp = /@container|@media|@supports\s+/;
const keyframesKeyRegExp = /@keyframes\s+/;
const keyframesNameRegExp = /@keyframes\s+([\w-]+)/;

function expandRule(rule: StyleRule, containerArr: AnyRule[], ctx: BuildCtx): void {
  const idx = containerArr.indexOf(rule);
  let insertAt = idx + 1;
  const remaining: Record<string, any> = {};

  for (const prop in rule.style) {
    const value = rule.style[prop];
    const isNested = prop.indexOf('&') !== -1;
    const isConditional = prop[0] === '@';

    if (!isNested && !isConditional) {
      remaining[prop] = value;
      continue;
    }

    if (isNested) {
      const selector = replaceParentRefs(prop, rule.selector);
      const newRule: StyleRule = { type: 'style', selector, style: value };
      containerArr.splice(insertAt, 0, newRule);
      // NOTE: jss-plugin-nested's per-rule `options.index` cursor advances by exactly 1 per
      // matched key, regardless of how many descendant rules the recursive expansion below
      // inserts. Do NOT skip past them - `expandRule` recomputes its own splice position via
      // `containerArr.indexOf(rule)` on every call, so this stays correct even as the array
      // shifts underneath it. Byte-parity trap: getting this wrong reorders combined
      // media-query groups (see spinner circle:first-child/circle:last-child case).
      insertAt += 1;
      expandRule(newRule, containerArr, ctx);
      newRule.style = resolveKeyframeRefs(convertCase(newRule.style), ctx.keyframes);
    } else {
      const condNode: ConditionalRule = { type: 'conditional', query: prop, rules: [] };
      containerArr.splice(insertAt, 0, condNode);
      insertAt += 1;
      const innerRule: StyleRule = { type: 'style', selector: rule.selector, style: value };
      condNode.rules.push(innerRule);
      expandRule(innerRule, condNode.rules, ctx);
      innerRule.style = resolveKeyframeRefs(convertCase(innerRule.style), ctx.keyframes);
    }
  }

  rule.style = remaining;
}

function buildRuleList(stylesObj: Record<string, any>, opts: { scoped: boolean }, ctx: BuildCtx): AnyRule[] {
  const containerArr: AnyRule[] = [];
  const toExpand: StyleRule[] = [];

  for (const key in stylesObj) {
    const value = stylesObj[key];

    if (key === '@global') {
      containerArr.push({ type: 'container', rules: buildRuleList(value, { scoped: false }, ctx) });
    } else if (key.indexOf('@global ') === 0) {
      const selector = key.slice('@global '.length);
      const node: StyleRule = { type: 'style', selector, style: value };
      containerArr.push(node);
      toExpand.push(node);
    } else if (conditionalKeyRegExp.test(key)) {
      containerArr.push({ type: 'conditional', query: key, rules: buildRuleList(value, opts, ctx) });
    } else if (keyframesKeyRegExp.test(key)) {
      const m = keyframesNameRegExp.exec(key);
      const name = m?.[1] ? m[1] : 'noname';
      const frames: KeyframeRule[] = [];
      for (const frameKey in value) {
        frames.push({ type: 'keyframe', key: frameKey, style: convertCase(value[frameKey]) });
      }
      ctx.keyframes[name] = name; // scoped:false always holds in this codebase (keyframes only ever authored inside @global)
      containerArr.push({ type: 'keyframes', id: name, rules: frames });
    } else {
      const selector = opts.scoped === false ? key : '.' + escapeSelector(key);
      const node: StyleRule = { type: 'style', selector, style: value };
      containerArr.push(node);
      toExpand.push(node);
    }
  }

  for (const node of toExpand) {
    expandRule(node, containerArr, ctx);
    node.style = resolveKeyframeRefs(convertCase(node.style), ctx.keyframes);
  }

  return containerArr;
}

// ---------- stringify (combine + sort media queries, shared mutable indent quirk) ----------

function groupByQuery(rules: AnyRule[]): { groups: Record<string, AnyRule[]>; order: string[] } {
  const groups: Record<string, AnyRule[]> = {};
  const order: string[] = [];
  for (const r of rules) {
    const q = r.type === 'conditional' ? r.query : UN_QUERIED;
    if (!(q in groups)) {
      order.push(q);
      groups[q] = [];
    }
    groups[q].push(r);
  }
  order.sort((a, b) => {
    const aw = a === UN_QUERIED ? 0 : a.length;
    const bw = b === UN_QUERIED ? 0 : b.length;
    if (aw > 0 && bw > 0) return sortCSSmq(a, b);
    return aw - bw;
  });
  return { groups, order };
}

function stringifyRule(rule: AnyRule, options: { indent?: number }): string {
  if (rule.type === 'style') {
    return toCss(rule.selector, rule.style, options);
  }
  if (rule.type === 'keyframe') {
    return toCss(rule.key, rule.style, options);
  }
  if (rule.type === 'keyframes') {
    if (options.indent == null) options.indent = 1; // KeyframesRule.toString default-options mutation quirk
    const children = stringifyRuleList(rule.rules, options);
    const wrapped = children ? '\n' + children + '\n' : '';
    return '@keyframes ' + rule.id + ' {' + wrapped + '}';
  }
  if (rule.type === 'container') {
    // GlobalContainerRule.toString: transparent passthrough, no own indent scope.
    return stringifyRuleList(rule.rules, options);
  }
  return '';
}

function stringifyRuleList(rules: AnyRule[], options: { indent?: number }): string {
  let str = '';
  const { groups, order } = groupByQuery(rules);

  for (const q of order) {
    const group = groups[q];
    if (q !== UN_QUERIED) {
      let block = '\n' + q + ' {';
      for (const rule of group as ConditionalRule[]) {
        const css = stringifyRuleList(rule.rules, { indent: (options.indent || 0) + 1 });
        if (!css) continue;
        block += '\n' + css;
      }
      block += '\n}\n';
      str += block;
    } else {
      for (const rule of group) {
        const css = stringifyRule(rule, options);
        if (!css) continue;
        if (str) str += '\n';
        str += css;
      }
    }
  }

  return str;
}

export const getCssCustom = (jssStyles: Styles): string => {
  const cloned = cloneStyle(jssStyles);
  const ctx: BuildCtx = { keyframes: {} };
  const rules = buildRuleList(cloned, { scoped: true }, ctx);
  return stringifyRuleList(rules, {});
};
