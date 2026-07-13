import type {
  ComponentMeta,
  CssVariableMeta,
  EventMeta,
  PropMeta,
  SlotMeta,
} from '@porsche-design-system/component-meta';
import { escapeCell, markdownTable } from '../markdown';
import { ICONS_REFERENCE, isIconUnion } from './icons';

/**
 * Renders the props / slots / events / CSS-variable API tables for a component's
 * `references/components/<tag>/<tag>.md`, driven entirely from `componentMeta` (the
 * authoritative source). `reference.ts` owns creation of the file and its prose; this
 * module produces only the API and sub-component sections that get appended to it.
 *
 * Deprecation is surfaced, never silently dropped: a fully deprecated prop / slot /
 * event / variable is kept but flagged `(deprecated)`, and deprecated *values* are
 * split out of a prop's recommended value list into a separate `deprecated:` note so
 * they can never be read as a recommended value.
 */

const code = (text: string | number): string => `\`${text}\``;

/**
 * Component-level status for the roster row and headings: `'deprecated'` takes precedence over
 * `'experimental'` (a component is never both), `undefined` when neither applies.
 */
export type ComponentStatus = 'deprecated' | 'experimental';

/** The component-level status of a tag, or `undefined` when it is neither deprecated nor experimental. */
export const componentStatus = (meta: {
  isDeprecated?: boolean;
  isExperimental?: boolean;
}): ComponentStatus | undefined =>
  meta.isDeprecated ? 'deprecated' : meta.isExperimental ? 'experimental' : undefined;

/** Trailing status suffix for a heading or roster cell, e.g. ` _(deprecated)_`; empty when neither applies. */
export const componentStatusFlag = (meta: { isDeprecated?: boolean; isExperimental?: boolean }): string => {
  const status = componentStatus(meta);
  return status ? ` _(${status})_` : '';
};

/**
 * A prominent blockquote admonition surfacing a component's deprecated/experimental status, placed
 * directly under the `# <tag>` heading. Component-level status lives only on `componentMeta` (not the
 * prose MDX), so without this the agent would never learn a documented component is deprecated or
 * experimental. Returns `''` for a normal component.
 */
export const renderComponentStatusBanner = (meta: ComponentMeta): string => {
  if (meta.isDeprecated) {
    const detail = meta.deprecationMessage?.trim();
    return `> **Deprecated:** ${detail || 'This component is deprecated and will be removed in a future major release.'}`;
  }
  if (meta.isExperimental) {
    return '> **Experimental:** This component is experimental — its API may change in any release. Avoid relying on it in production.';
  }
  return '';
};

/** Trailing status markers appended to an item's name column. */
const flags = (meta: { isDeprecated?: boolean; isExperimental?: boolean; isRequired?: boolean }): string =>
  [meta.isRequired && '(required)', meta.isDeprecated && '(deprecated)', meta.isExperimental && '(experimental)']
    .filter(Boolean)
    .map((flag) => ` _${flag}_`)
    .join('');

/** Render a single allowed value the way it is written in source (string values quoted, others bare). */
const renderValue = (value: unknown): string => {
  if (value === null) {
    return code('undefined');
  }
  if (typeof value === 'string') {
    return code(`'${value}'`);
  }
  return code(String(value));
};

const formatDefault = (meta: PropMeta): string => {
  const { defaultValue } = meta;
  if (defaultValue === null || defaultValue === undefined) {
    return code('undefined');
  }
  if (typeof defaultValue === 'string') {
    return code(`'${defaultValue}'`);
  }
  if (typeof defaultValue === 'object') {
    return code(JSON.stringify(defaultValue));
  }
  return code(String(defaultValue));
};

/**
 * Primitive type keywords. When a prop's `allowedValues` array is composed *entirely* of these, it is
 * the decomposition of a union type (e.g. `value` → `['string', 'number', 'null']` for the type
 * `string | number | null`), not a set of enumerable string literals — so it must be rendered as the
 * type, not as quoted values (`'string'`).
 */
const PRIMITIVE_TYPE_KEYWORDS = new Set([
  'string',
  'number',
  'boolean',
  'null',
  'undefined',
  'object',
  'bigint',
  'symbol',
]);

const isTypeUnionDecomposition = (allowedValues: readonly unknown[]): boolean =>
  allowedValues.length > 0 &&
  allowedValues.every((value) => typeof value === 'string' && PRIMITIVE_TYPE_KEYWORDS.has(value));

/**
 * The prop's type cell: its named type plus the recommended (non-deprecated) allowed
 * values, with any deprecated values listed separately so they are never presented as
 * recommended. Breakpoint-customizable props note the generic wrapper.
 */
const formatType = (meta: PropMeta, iconNames: ReadonlySet<string>): string => {
  const parts: string[] = [];

  if (Array.isArray(meta.allowedValues) && !isTypeUnionDecomposition(meta.allowedValues)) {
    const deprecated = new Set(meta.deprecatedValues ?? []);
    const recommended = meta.allowedValues.filter((value) => !deprecated.has(value as string));
    const deprecatedValues = meta.allowedValues.filter((value) => deprecated.has(value as string));

    if (isIconUnion(recommended, iconNames)) {
      // Collapse the ~290-name icon enumeration to a pointer at the shared list, keeping any non-icon
      // extras (e.g. `'none'`) inline so they are not lost.
      const extras = recommended.filter((value) => !iconNames.has(value as string));
      if (extras.length > 0) {
        parts.push(extras.map(renderValue).join(' '));
      }
      parts.push(`one of ${iconNames.size} icon names — see [icon names](${ICONS_REFERENCE})`);
    } else {
      if (recommended.length > 0) {
        parts.push(recommended.map(renderValue).join(' '));
      }
      if (deprecatedValues.length > 0) {
        parts.push(`_deprecated:_ ${deprecatedValues.map(renderValue).join(' ')}`);
      }
    }
  } else {
    // boolean / string / number / aria-object props: the named type is the documentation
    parts.push(code(meta.type));
  }

  if (meta.isBreakpointCustomizable) {
    parts.push(code(`BreakpointCustomizable<${meta.type}>`));
  }

  return parts.join('<br>');
};

const buildTable = (heading: string, columns: string[], rows: string[][], level: number): string =>
  [`${'#'.repeat(level)} ${heading}`, '', markdownTable(columns, rows)].join('\n');

/**
 * Controlled-property notes from `componentMeta`'s `controlledMeta` — dropped entirely until now, so the
 * agent had no signal that a prop's state is owned by the consumer. Without it, `p-banner`/`p-modal`
 * read as if they hide themselves (they do not: the `dismiss` event fires but `open` stays `true` until
 * the consumer sets it back). `isInternallyMutated` marks the components that also update the prop
 * themselves (`p-select`, `p-carousel`, `p-pagination`, …) — there the consumer only needs to observe
 * the event, not write the value back.
 */
const controlledSection = (controlledMeta: NonNullable<ComponentMeta['controlledMeta']>, level: number): string => {
  const bullets = controlledMeta.map(({ props, event, isInternallyMutated }) => {
    const propList = props.map(code).join(', ');
    const noun = props.length > 1 ? 'controlled props' : 'a controlled prop';
    const objectPronoun = props.length > 1 ? 'them' : 'it';
    return isInternallyMutated
      ? `- ${propList} — ${noun}, but the component also updates ${objectPronoun} internally. Listen for the ${code(event)} event to observe changes; you do not have to write the value back.`
      : `- ${propList} — ${noun}: the component does **not** update ${objectPronoun} itself. Handle the ${code(event)} event and assign the new value to ${propList} yourself, or the change will not take effect.`;
  });
  return [`${'#'.repeat(level)} Controlled properties`, '', bullets.join('\n')].join('\n');
};

const propsTable = (
  propsMeta: NonNullable<ComponentMeta['propsMeta']>,
  level: number,
  iconNames: ReadonlySet<string>
): string => {
  const rows = Object.entries(propsMeta)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, meta]: [string, PropMeta]) => [
      `${code(name)}${flags(meta)}`,
      formatType(meta, iconNames),
      formatDefault(meta),
      escapeCell(meta.description ?? ''),
    ]);
  return buildTable('Properties', ['Property', 'Type', 'Default', 'Description'], rows, level);
};

const eventsTable = (eventsMeta: NonNullable<ComponentMeta['eventsMeta']>, level: number): string => {
  const rows = Object.entries(eventsMeta)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, meta]: [string, EventMeta]) => [
      `${code(name)}${flags(meta)}`,
      code(`CustomEvent<${meta.type}>`) + (meta.typeDetail ? `<br>${code(meta.typeDetail)}` : ''),
      escapeCell(meta.description ?? ''),
    ]);
  return buildTable('Events', ['Event', 'Type', 'Description'], rows, level);
};

const slotsTable = (slotsMeta: NonNullable<ComponentMeta['slotsMeta']>, level: number): string => {
  const rows = Object.entries(slotsMeta).map(([name, meta]: [string, SlotMeta]) => [
    `${name === '' ? '_(default)_' : code(name)}${flags(meta)}`,
    meta.isRequired ? 'yes' : 'no',
    (meta.allowedTagNames ?? []).map(code).join(' ') || '—',
    escapeCell(meta.description ?? ''),
  ]);
  return buildTable('Slots', ['Slot', 'Required', 'Allowed tag names', 'Description'], rows, level);
};

const cssVariablesTable = (cssVariablesMeta: NonNullable<ComponentMeta['cssVariablesMeta']>, level: number): string => {
  const rows = Object.entries(cssVariablesMeta).map(([name, meta]: [string, CssVariableMeta]) => [
    `${code(name)}${flags(meta)}`,
    meta.defaultValue ? code(meta.defaultValue) : '—',
    escapeCell(meta.description ?? ''),
  ]);
  return buildTable('CSS Variables', ['CSS Variable', 'Default', 'Description'], rows, level);
};

/** The non-empty props/slots/events/CSS-variable tables for a component, headings at the given level. */
const apiTables = (meta: ComponentMeta, level: number, iconNames: ReadonlySet<string>): string[] => {
  const tables: string[] = [];
  if (meta.propsMeta && Object.keys(meta.propsMeta).length > 0) {
    tables.push(propsTable(meta.propsMeta, level, iconNames));
  }
  if (meta.eventsMeta && Object.keys(meta.eventsMeta).length > 0) {
    tables.push(eventsTable(meta.eventsMeta, level));
  }
  if (meta.controlledMeta && meta.controlledMeta.length > 0) {
    tables.push(controlledSection(meta.controlledMeta, level));
  }
  if (meta.slotsMeta && Object.keys(meta.slotsMeta).length > 0) {
    tables.push(slotsTable(meta.slotsMeta, level));
  }
  if (meta.cssVariablesMeta && Object.keys(meta.cssVariablesMeta).length > 0) {
    tables.push(cssVariablesTable(meta.cssVariablesMeta, level));
  }
  return tables;
};

/** Normalize `requiredParent` (a tag, a comma-list, or an array) to a list of parent tags. */
export const parseRequiredParents = (requiredParent: string | string[] | undefined): string[] => {
  if (!requiredParent) {
    return [];
  }
  const raw = Array.isArray(requiredParent) ? requiredParent : requiredParent.split(',');
  return raw.map((tag) => tag.trim()).filter(Boolean);
};

/**
 * The top-level (standalone, documented) ancestors of a tag: follow `requiredParent`
 * up until a component with no parent is reached. A sub-component may resolve to more
 * than one top-level parent (e.g. `p-select-option` belongs to both `p-select` and
 * `p-multi-select`), so it is documented under each. Guards against cycles.
 */
const topLevelAncestors = (
  tag: string,
  componentMeta: Record<string, ComponentMeta>,
  seen: Set<string> = new Set()
): string[] => {
  if (seen.has(tag)) {
    return [];
  }
  seen.add(tag);
  const parents = parseRequiredParents(componentMeta[tag]?.requiredParent);
  if (parents.length === 0) {
    return [tag]; // no parent → this is a top-level component
  }
  const ancestors = new Set<string>();
  for (const parent of parents) {
    for (const ancestor of topLevelAncestors(parent, componentMeta, seen)) {
      ancestors.add(ancestor);
    }
  }
  return [...ancestors];
};

/**
 * Map each top-level component tag to the sub-components (tags with a `requiredParent`)
 * that resolve to it, sorted for a deterministic tree. Sub-components have no standalone
 * docs page, so their authoritative API is documented under their parent(s).
 */
export const buildSubComponentMap = (
  componentMeta: Record<string, ComponentMeta>
): Record<string, { tag: string; meta: ComponentMeta }[]> => {
  const map: Record<string, { tag: string; meta: ComponentMeta }[]> = {};
  for (const [tag, meta] of Object.entries(componentMeta)) {
    if (parseRequiredParents(meta.requiredParent).length === 0) {
      continue; // top-level component, not a sub-component
    }
    for (const ancestor of topLevelAncestors(tag, componentMeta)) {
      (map[ancestor] ??= []).push({ tag, meta });
    }
  }
  for (const entries of Object.values(map)) {
    entries.sort((a, b) => a.tag.localeCompare(b.tag));
  }
  return map;
};

/**
 * Render the `## API` section to append to a component's `<tag>.md`. Only tables that
 * have entries are emitted. The "component-meta is authoritative" rule and the raw-meta
 * location are stated once in SKILL.md's core rules rather than per file.
 */
export const renderComponentApi = (meta: ComponentMeta, iconNames: ReadonlySet<string> = new Set()): string => {
  // The "component-meta is authoritative" rule and the raw-meta location live once in SKILL.md's core
  // rules (always in context when the skill is active), so the per-file preamble that repeated it in all
  // 58 component references is dropped — just the heading and the tables remain here.
  const sections: string[] = ['## API', ...apiTables(meta, 3, iconNames)];
  return sections.join('\n\n');
};

/**
 * Render the `## Sub-components` section appended to a parent component's `<tag>.md`.
 * Sub-components (e.g. `p-table-row`, `p-select-option`) have no standalone docs page —
 * they are only valid inside a parent — so their authoritative `component-meta` API is
 * documented here, under the parent, with each sub-component's tables demoted one level.
 */
export const renderSubComponents = (
  subComponents: { tag: string; meta: ComponentMeta }[],
  iconNames: ReadonlySet<string> = new Set()
): string => {
  const blocks: string[] = [
    '## Sub-components',
    'These tags are only valid inside the parent(s) listed under each one — often this component, but ' +
      'some are shared and list a different parent (e.g. a tag documented here via a common ancestor). ' +
      'Their APIs come from the same authoritative `component-meta` as the parent above.',
  ];
  for (const { tag, meta } of subComponents) {
    blocks.push(`### \`${tag}\`${componentStatusFlag(meta)}`);
    const banner = renderComponentStatusBanner(meta);
    if (banner) {
      blocks.push(banner);
    }
    const parents = parseRequiredParents(meta.requiredParent);
    if (parents.length > 0) {
      blocks.push(`Allowed parent${parents.length > 1 ? 's' : ''}: ${parents.map(code).join(', ')}.`);
    }
    const tables = apiTables(meta, 4, iconNames);
    blocks.push(...(tables.length > 0 ? tables : ['_No configurable properties, slots, events or CSS variables._']));
  }
  return blocks.join('\n\n');
};
