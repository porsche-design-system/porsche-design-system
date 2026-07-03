import sortCSSmq from 'sort-css-media-queries';

// Local replacement for the types previously imported from the `jss` package. `jss` is no longer a
// dependency; these lightweight structural types stand in wherever plain CSS-in-JS objects are authored.
export interface JssStyle {
  [property: string]: any;
}
export type Styles<Name extends string = string> = Partial<Record<Name, JssStyle>>;

// Byte-for-byte reimplementation of the former jss@10 + jss-preset-default + jss-plugin-sort-css-media-queries
// setup used here (createGenerateId: rule => rule.key, combineMediaQueries: true). Mirrors the runtime
// serializer in packages/components/src/utils/jss-custom-serializer.ts, plus the two preset-default plugins
// this build-time path additionally relied on: default-unit (numeric px/ms/% units) and props-sort.

const UN_QUERIED = '__UN_QUERIED__';

type AnyRule =
  | { type: 'style'; selector: string; style: Record<string, any> }
  | { type: 'conditional'; query: string; rules: AnyRule[] }
  | { type: 'keyframe'; key: string; style: Record<string, any> }
  | { type: 'keyframes'; id: string; rules: AnyRule[] }
  | { type: 'container'; rules: AnyRule[] };

type BuildCtx = { keyframes: Record<string, string> };

// ---------- helpers (transcribed from jss core + plugins) ----------

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

// jss-plugin-default-unit: append px/ms/% to numeric values for known properties (0 for px stays unitless).
const px = 'px';
const ms = 'ms';
const percent = '%';
const defaultUnits: Record<string, string> = {
  'animation-delay': ms,
  'animation-duration': ms,
  'background-position': px,
  'background-position-x': px,
  'background-position-y': px,
  'background-size': px,
  border: px,
  'border-bottom': px,
  'border-bottom-left-radius': px,
  'border-bottom-right-radius': px,
  'border-bottom-width': px,
  'border-left': px,
  'border-left-width': px,
  'border-radius': px,
  'border-right': px,
  'border-right-width': px,
  'border-top': px,
  'border-top-left-radius': px,
  'border-top-right-radius': px,
  'border-top-width': px,
  'border-width': px,
  'border-block': px,
  'border-block-end': px,
  'border-block-end-width': px,
  'border-block-start': px,
  'border-block-start-width': px,
  'border-block-width': px,
  'border-inline': px,
  'border-inline-end': px,
  'border-inline-end-width': px,
  'border-inline-start': px,
  'border-inline-start-width': px,
  'border-inline-width': px,
  'border-start-start-radius': px,
  'border-start-end-radius': px,
  'border-end-start-radius': px,
  'border-end-end-radius': px,
  margin: px,
  'margin-bottom': px,
  'margin-left': px,
  'margin-right': px,
  'margin-top': px,
  'margin-block': px,
  'margin-block-end': px,
  'margin-block-start': px,
  'margin-inline': px,
  'margin-inline-end': px,
  'margin-inline-start': px,
  padding: px,
  'padding-bottom': px,
  'padding-left': px,
  'padding-right': px,
  'padding-top': px,
  'padding-block': px,
  'padding-block-end': px,
  'padding-block-start': px,
  'padding-inline': px,
  'padding-inline-end': px,
  'padding-inline-start': px,
  'mask-position-x': px,
  'mask-position-y': px,
  'mask-size': px,
  height: px,
  width: px,
  'min-height': px,
  'max-height': px,
  'min-width': px,
  'max-width': px,
  bottom: px,
  left: px,
  top: px,
  right: px,
  inset: px,
  'inset-block': px,
  'inset-block-end': px,
  'inset-block-start': px,
  'inset-inline': px,
  'inset-inline-end': px,
  'inset-inline-start': px,
  'box-shadow': px,
  'text-shadow': px,
  'column-gap': px,
  'column-rule': px,
  'column-rule-width': px,
  'column-width': px,
  'font-size': px,
  'font-size-delta': px,
  'letter-spacing': px,
  'text-decoration-thickness': px,
  'text-indent': px,
  'text-stroke': px,
  'text-stroke-width': px,
  'word-spacing': px,
  motion: px,
  'motion-offset': px,
  outline: px,
  'outline-offset': px,
  'outline-width': px,
  perspective: px,
  'perspective-origin-x': percent,
  'perspective-origin-y': percent,
  'transform-origin': percent,
  'transform-origin-x': percent,
  'transform-origin-y': percent,
  'transform-origin-z': percent,
  'transition-delay': ms,
  'transition-duration': ms,
  'vertical-align': px,
  'flex-basis': px,
  'shape-margin': px,
  size: px,
  gap: px,
  grid: px,
  'grid-gap': px,
  'row-gap': px,
  'grid-row-gap': px,
  'grid-column-gap': px,
  'grid-template-rows': px,
  'grid-template-columns': px,
  'grid-auto-rows': px,
  'grid-auto-columns': px,
  'box-shadow-x': px,
  'box-shadow-y': px,
  'box-shadow-blur': px,
  'box-shadow-spread': px,
  'font-line-height': px,
  'text-shadow-x': px,
  'text-shadow-y': px,
  'text-shadow-blur': px,
};
function addCamelCasedVersion(obj: Record<string, string>): Record<string, string> {
  const regExp = /(-[a-z])/g;
  const replace = (str: string): string => str[1].toUpperCase();
  const newObj: Record<string, string> = {};
  for (const key in obj) {
    newObj[key] = obj[key];
    newObj[key.replace(regExp, replace)] = obj[key];
  }
  return newObj;
}
const units = addCamelCasedVersion(defaultUnits);
function applyDefaultUnit(style: Record<string, any>): Record<string, any> {
  for (const prop in style) {
    const value = style[prop];
    if (typeof value === 'number' && Number.isNaN(value) === false) {
      const unit = units[prop];
      style[prop] = unit && !(value === 0 && unit === px) ? `${value}${unit}` : value.toString();
    }
  }
  return style;
}

// jss-plugin-props-sort: sort props by length, then lexicographically for equal length.
function propsSort(style: Record<string, any>): Record<string, any> {
  const sorted: Record<string, any> = {};
  const props = Object.keys(style).sort((a, b) => (a.length === b.length ? (a > b ? 1 : -1) : a.length - b.length));
  for (const p of props) sorted[p] = style[p];
  return sorted;
}

// Full style-rule processing pipeline in preset-default order: camelCase -> default-unit -> props-sort.
function processStyle(style: Record<string, any>): Record<string, any> {
  return propsSort(applyDefaultUnit(convertCase(style)));
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

  const printDecl = (prop: string, value: any): void => {
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

function expandRule(
  rule: { type: 'style'; selector: string; style: Record<string, any> },
  containerArr: AnyRule[],
  ctx: BuildCtx
): void {
  let insertAt = containerArr.indexOf(rule) + 1;
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
      const newRule = { type: 'style' as const, selector, style: value };
      containerArr.splice(insertAt, 0, newRule);
      insertAt += 1;
      expandRule(newRule, containerArr, ctx);
      newRule.style = processStyle(resolveKeyframeRefs(newRule.style, ctx.keyframes));
    } else {
      const condNode = { type: 'conditional' as const, query: prop, rules: [] as AnyRule[] };
      containerArr.splice(insertAt, 0, condNode);
      insertAt += 1;
      const innerRule = { type: 'style' as const, selector: rule.selector, style: value };
      condNode.rules.push(innerRule);
      expandRule(innerRule, condNode.rules, ctx);
      innerRule.style = processStyle(resolveKeyframeRefs(innerRule.style, ctx.keyframes));
    }
  }

  rule.style = remaining;
}

function buildRuleList(stylesObj: Record<string, any>, opts: { scoped: boolean }, ctx: BuildCtx): AnyRule[] {
  const containerArr: AnyRule[] = [];
  const toExpand: { type: 'style'; selector: string; style: Record<string, any> }[] = [];

  for (const key in stylesObj) {
    const value = stylesObj[key];

    if (key === '@global') {
      containerArr.push({ type: 'container', rules: buildRuleList(value, { scoped: false }, ctx) });
    } else if (key.indexOf('@global ') === 0) {
      const node = { type: 'style' as const, selector: key.slice('@global '.length), style: value };
      containerArr.push(node);
      toExpand.push(node);
    } else if (conditionalKeyRegExp.test(key)) {
      containerArr.push({ type: 'conditional', query: key, rules: buildRuleList(value, opts, ctx) });
    } else if (keyframesKeyRegExp.test(key)) {
      const m = keyframesNameRegExp.exec(key);
      const name = m?.[1] ? m[1] : 'noname';
      const frames: AnyRule[] = [];
      for (const frameKey in value) {
        frames.push({ type: 'keyframe', key: frameKey, style: convertCase(value[frameKey]) });
      }
      ctx.keyframes[name] = name;
      containerArr.push({ type: 'keyframes', id: name, rules: frames });
    } else {
      const node = {
        type: 'style' as const,
        selector: opts.scoped === false ? key : '.' + escapeSelector(key),
        style: value,
      };
      containerArr.push(node);
      toExpand.push(node);
    }
  }

  for (const node of toExpand) {
    expandRule(node, containerArr, ctx);
    node.style = processStyle(resolveKeyframeRefs(node.style, ctx.keyframes));
  }

  return containerArr;
}

// ---------- stringify (combine + sort media queries) ----------

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
  if (rule.type === 'style') return toCss(rule.selector, rule.style, options);
  if (rule.type === 'keyframe') return toCss(rule.key, rule.style, options);
  if (rule.type === 'keyframes') {
    if (options.indent == null) options.indent = 1;
    const children = stringifyRuleList(rule.rules, options);
    return '@keyframes ' + rule.id + ' {' + (children ? '\n' + children + '\n' : '') + '}';
  }
  if (rule.type === 'container') return stringifyRuleList(rule.rules, options);
  return '';
}

function stringifyRuleList(rules: AnyRule[], options: { indent?: number }): string {
  let str = '';
  const { groups, order } = groupByQuery(rules);

  for (const q of order) {
    const group = groups[q];
    if (q !== UN_QUERIED) {
      let block = '\n' + q + ' {';
      for (const rule of group as { type: 'conditional'; query: string; rules: AnyRule[] }[]) {
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

export const getCss = (style: Styles): string => {
  const ctx: BuildCtx = { keyframes: {} };
  return stringifyRuleList(buildRuleList(cloneStyle(style), { scoped: true }, ctx), {});
};

export const getMinifiedCss = (style: Styles): string => {
  return getCss(style)
    .replace(/\.\\(?=:)/g, '') // remove default '.'
    .replace(/[\n\\]+/g, '') // remove backslashes
    .replace(/\s(?={)/g, '') // remove space before opening curly brace
    .replace(/;(?=\s*})/g, '') // remove semicolon before closing curly brace
    .replace(/(media)\s/g, '$1') // remove space after media
    .replace(/,\s/g, ',') // remove unneeded white space after comma separation
    .replace(/\s\s+/g, '') // remove white space
    .replace(/:\s(?=.*)/g, ':') // remove white space after colon
    .replace(/\n+/g, ''); // remove new line
};
