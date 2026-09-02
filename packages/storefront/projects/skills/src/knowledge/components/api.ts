import type {
  ComponentMeta,
  CssVariableMeta,
  EventMeta,
  PropMeta,
  SlotMeta,
} from '@porsche-design-system/component-meta';
import { escapeCell, markdownTable } from '../../shared/markdown';
import { ICONS_REFERENCE, isIconUnion } from './icons';

/**
 * Renders component API tables from `componentMeta`. Deprecated entries remain visible, while
 * deprecated values are separated from recommended values.
 */

const code = (text: string | number): string => `\`${text}\``;

export type ComponentStatus = 'deprecated' | 'experimental';

export const componentStatus = (meta: {
  isDeprecated?: boolean;
  isExperimental?: boolean;
}): ComponentStatus | undefined =>
  meta.isDeprecated ? 'deprecated' : meta.isExperimental ? 'experimental' : undefined;

export const componentStatusFlag = (meta: { isDeprecated?: boolean; isExperimental?: boolean }): string => {
  const status = componentStatus(meta);
  return status ? ` _(${status})_` : '';
};

/**
 * Surfaces status from `componentMeta`, which is absent from the component's prose MDX.
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

const flags = (meta: { isDeprecated?: boolean; isExperimental?: boolean; isRequired?: boolean }): string =>
  [meta.isRequired && '(required)', meta.isDeprecated && '(deprecated)', meta.isExperimental && '(experimental)']
    .filter(Boolean)
    .map((flag) => ` _${flag}_`)
    .join('');

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
 * An `allowedValues` array containing only these represents a type union, not literal choices.
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

const formatType = (meta: PropMeta, iconNames: ReadonlySet<string>): string => {
  const parts: string[] = [];

  if (Array.isArray(meta.allowedValues) && !isTypeUnionDecomposition(meta.allowedValues)) {
    const deprecated = new Set(meta.deprecatedValues ?? []);
    const recommended = meta.allowedValues.filter((value) => !deprecated.has(value as string));
    const deprecatedValues = meta.allowedValues.filter((value) => deprecated.has(value as string));

    if (isIconUnion(recommended, iconNames)) {
      // Keep non-icon union members inline when replacing the icon enumeration with a reference.
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
 * Explains whether controlled props require consumers to write event values back.
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

export const parseRequiredParents = (requiredParent: string | string[] | undefined): string[] => {
  if (!requiredParent) {
    return [];
  }
  const raw = Array.isArray(requiredParent) ? requiredParent : requiredParent.split(',');
  return raw.map((tag) => tag.trim()).filter(Boolean);
};

/**
 * Resolves every top-level parent, including multi-parent sub-components, while guarding cycles.
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
    return [tag];
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
 * Maps sub-components to every top-level parent because they have no standalone reference.
 */
export const buildSubComponentMap = (
  componentMeta: Record<string, ComponentMeta>
): Record<string, { tag: string; meta: ComponentMeta }[]> => {
  const map: Record<string, { tag: string; meta: ComponentMeta }[]> = {};
  for (const [tag, meta] of Object.entries(componentMeta)) {
    if (parseRequiredParents(meta.requiredParent).length === 0) {
      continue;
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

export const renderComponentApi = (meta: ComponentMeta, iconNames: ReadonlySet<string> = new Set()): string => {
  const sections: string[] = ['## API', ...apiTables(meta, 3, iconNames)];
  return sections.join('\n\n');
};

/**
 * Renders sub-component APIs under their parent because they have no standalone reference.
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
