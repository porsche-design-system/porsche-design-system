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
 * The prop's type cell: its named type plus the recommended (non-deprecated) allowed
 * values, with any deprecated values listed separately so they are never presented as
 * recommended. Breakpoint-customizable props note the generic wrapper.
 */
const formatType = (meta: PropMeta): string => {
  const parts: string[] = [];

  if (Array.isArray(meta.allowedValues)) {
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

const buildTable = (heading: string, columns: string[], rows: string[][]): string =>
  [`### ${heading}`, '', markdownTable(columns, rows)].join('\n');

const propsTable = (propsMeta: NonNullable<ComponentMeta['propsMeta']>): string => {
  const rows = Object.entries(propsMeta)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, meta]: [string, PropMeta]) => [
      `${code(name)}${flags(meta)}`,
      formatType(meta),
      formatDefault(meta),
      escapeCell(meta.description ?? ''),
    ]);
  return buildTable('Properties', ['Property', 'Type', 'Default', 'Description'], rows);
};

const eventsTable = (eventsMeta: NonNullable<ComponentMeta['eventsMeta']>): string => {
  const rows = Object.entries(eventsMeta)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, meta]: [string, EventMeta]) => [
      `${code(name)}${flags(meta)}`,
      code(`CustomEvent<${meta.type}>`) + (meta.typeDetail ? `<br>${code(meta.typeDetail)}` : ''),
      escapeCell(meta.description ?? ''),
    ]);
  return buildTable('Events', ['Event', 'Type', 'Description'], rows);
};

const slotsTable = (slotsMeta: NonNullable<ComponentMeta['slotsMeta']>): string => {
  const rows = Object.entries(slotsMeta).map(([name, meta]: [string, SlotMeta]) => [
    `${name === '' ? '_(default)_' : code(name)}${flags(meta)}`,
    meta.isRequired ? 'yes' : 'no',
    (meta.allowedTagNames ?? []).map(code).join(' ') || '—',
    escapeCell(meta.description ?? ''),
  ]);
  return buildTable('Slots', ['Slot', 'Required', 'Allowed tag names', 'Description'], rows);
};

const cssVariablesTable = (cssVariablesMeta: NonNullable<ComponentMeta['cssVariablesMeta']>): string => {
  const rows = Object.entries(cssVariablesMeta).map(([name, meta]: [string, CssVariableMeta]) => [
    `${code(name)}${flags(meta)}`,
    meta.defaultValue ? code(meta.defaultValue) : '—',
    escapeCell(meta.description ?? ''),
  ]);
  return buildTable('CSS Variables', ['CSS Variable', 'Default', 'Description'], rows);
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
  ];

  if (meta.propsMeta && Object.keys(meta.propsMeta).length > 0) {
    sections.push(propsTable(meta.propsMeta));
  }
  if (meta.eventsMeta && Object.keys(meta.eventsMeta).length > 0) {
    sections.push(eventsTable(meta.eventsMeta));
  }
  if (meta.slotsMeta && Object.keys(meta.slotsMeta).length > 0) {
    sections.push(slotsTable(meta.slotsMeta));
  }
  if (meta.cssVariablesMeta && Object.keys(meta.cssVariablesMeta).length > 0) {
    sections.push(cssVariablesTable(meta.cssVariablesMeta));
  }

  return sections.join('\n\n');
};
