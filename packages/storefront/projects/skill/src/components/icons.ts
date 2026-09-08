import type { ComponentMeta } from '@porsche-design-system/component-meta';

/**
 * The shared icon-name reference (`references/icons.md`). The ~290-name icon union was previously
 * inlined into every icon-typed prop's type cell (~4.2 KB × ~9 components × 4 trees); every such
 * cell links here instead, so the full list lives once per tree.
 */

/** Skill-root-relative pointer to the shared icon-name list (see {@link renderIconsReference}). */
export const ICONS_REFERENCE = 'references/icons.md';

const code = (text: string): string => `\`${text}\``;

/**
 * The canonical icon-name set — `p-icon`'s own `name` allowed values. Every icon-typed prop
 * (`p-button` `icon`, `p-link` `icon`, `p-inline-notification` `actionIcon`, …) enumerates this same
 * ~290-name list; deriving it once from `component-meta` avoids a second source of truth and any new
 * dependency. Returns `[]` when `p-icon` is absent (skeleton runs), which disables the collapse.
 */
export const deriveIconNames = (componentMeta: Record<string, ComponentMeta>): string[] => {
  const values = componentMeta['p-icon']?.propsMeta?.name?.allowedValues;
  return Array.isArray(values) ? values.filter((value): value is string => typeof value === 'string') : [];
};

/** Render the `references/icons.md` body from the derived icon-name set. */
export const renderIconsReference = (iconNames: readonly string[]): string =>
  [
    '# Icon names',
    'Valid values for the icon-typed props across PDS components (e.g. `p-icon` `name`, `p-button` ' +
      '`icon`, `p-link` `icon`, `p-inline-notification` `actionIcon`). Pass one as a string, e.g. ' +
      '`icon="arrow-right"`. Each component reference links here instead of repeating the full list. ' +
      '(`p-flag` `name` uses a separate set of flag names, not listed here.)',
    iconNames.map((name) => code(name)).join(' '),
  ].join('\n\n');

/** Whether a prop's allowed values are the icon-name union (a superset of the full icon-name set). */
export const isIconUnion = (values: readonly unknown[], iconNames: ReadonlySet<string>): boolean => {
  if (iconNames.size === 0 || values.length < iconNames.size) {
    return false;
  }
  const valueSet = new Set(values);
  for (const name of iconNames) {
    if (!valueSet.has(name)) {
      return false;
    }
  }
  return true;
};
