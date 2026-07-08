import type {
  ComponentMeta,
  CssVariableMeta,
  EventMeta,
  PropMeta,
  SlotMeta,
} from '@porsche-design-system/component-meta';
import { escapeCell, markdownTable } from './markdown';
import { rawMetaReference } from './skillMd';
import type { Framework } from './skillTree';

/**
 * Renders the props / slots / events / CSS-variable API tables for a component's
 * `references/components/<tag>/<tag>.md`, driven entirely from `componentMeta` (the
 * authoritative source). TASK-03 owns creation of the file and its prose; this
 * module produces only the API section that gets appended to it.
 *
 * Deprecation is surfaced, never silently dropped: a fully deprecated prop / slot /
 * event / variable is kept but flagged `(deprecated)`, and deprecated *values* are
 * split out of a prop's recommended value list into a separate `deprecated:` note so
 * they can never be read as a recommended value.
 */

const code = (text: string | number): string => `\`${text}\``;

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
const PRIMITIVE_TYPE_KEYWORDS = new Set(['string', 'number', 'boolean', 'null', 'undefined', 'object', 'bigint', 'symbol']);

const isTypeUnionDecomposition = (allowedValues: readonly unknown[]): boolean =>
  allowedValues.length > 0 && allowedValues.every((value) => typeof value === 'string' && PRIMITIVE_TYPE_KEYWORDS.has(value));

/**
 * The prop's type cell: its named type plus the recommended (non-deprecated) allowed
 * values, with any deprecated values listed separately so they are never presented as
 * recommended. Breakpoint-customizable props note the generic wrapper.
 */
const formatType = (meta: PropMeta): string => {
  const parts: string[] = [];

  if (Array.isArray(meta.allowedValues) && !isTypeUnionDecomposition(meta.allowedValues)) {
    const deprecated = new Set(meta.deprecatedValues ?? []);
    const recommended = meta.allowedValues.filter((value) => !deprecated.has(value as string));
    const deprecatedValues = meta.allowedValues.filter((value) => deprecated.has(value as string));

    if (recommended.length > 0) {
      parts.push(recommended.map(renderValue).join(' '));
    }
    if (deprecatedValues.length > 0) {
      parts.push(`_deprecated:_ ${deprecatedValues.map(renderValue).join(' ')}`);
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

const propsTable = (propsMeta: NonNullable<ComponentMeta['propsMeta']>, level: number): string => {
  const rows = Object.entries(propsMeta)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, meta]: [string, PropMeta]) => [
      `${code(name)}${flags(meta)}`,
      formatType(meta),
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
const apiTables = (meta: ComponentMeta, level: number): string[] => {
  const tables: string[] = [];
  if (meta.propsMeta && Object.keys(meta.propsMeta).length > 0) {
    tables.push(propsTable(meta.propsMeta, level));
  }
  if (meta.eventsMeta && Object.keys(meta.eventsMeta).length > 0) {
    tables.push(eventsTable(meta.eventsMeta, level));
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
 * Render the `## API` section to append to a component's `<tag>.md`. Only tables that
 * have entries are emitted. The raw-meta link is the authoritative source pointer:
 * the local `../meta` sibling in the js skill, the js package's `/meta` subpath in the
 * framework skills (whose own `../meta` is only a re-export shim).
 */
export const renderComponentApi = (meta: ComponentMeta, framework: Framework): string => {
  const sections: string[] = [
    `## API\n\nAuthoritative API data: ${code(rawMetaReference(framework))} (\`component-meta\`). When these tables disagree with it, follow \`component-meta\`.`,
    ...apiTables(meta, 3),
  ];
  return sections.join('\n\n');
};

/**
 * Render the `## Sub-components` section appended to a parent component's `<tag>.md`.
 * Sub-components (e.g. `p-table-row`, `p-select-option`) have no standalone docs page —
 * they are only valid inside a parent — so their authoritative `component-meta` API is
 * documented here, under the parent, with each sub-component's tables demoted one level.
 */
export const renderSubComponents = (subComponents: { tag: string; meta: ComponentMeta }[]): string => {
  const blocks: string[] = [
    '## Sub-components',
    'These tags are only valid inside this component (see each one’s allowed parents). Their APIs come ' +
      'from the same authoritative `component-meta` as the parent above.',
  ];
  for (const { tag, meta } of subComponents) {
    blocks.push(`### \`${tag}\``);
    const parents = parseRequiredParents(meta.requiredParent);
    if (parents.length > 0) {
      blocks.push(`Allowed parent${parents.length > 1 ? 's' : ''}: ${parents.map(code).join(', ')}.`);
    }
    const tables = apiTables(meta, 4);
    blocks.push(...(tables.length > 0 ? tables : ['_No configurable properties, slots, events or CSS variables._']));
  }
  return blocks.join('\n\n');
};
