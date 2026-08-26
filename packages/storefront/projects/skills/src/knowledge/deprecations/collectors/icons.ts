import { componentMeta } from '@porsche-design-system/component-meta';
import { type DeprecationEntry, type DeprecationSource, publicWrapperExport } from '../types';

/**
 * Icon names do not publish a deprecation catalog of their own, so this collector reads the same
 * `component-meta` field as the component collector. One known consequence: both collectors build the
 * same `propValue/p-icon/name/<name>` id from the same `deprecatedValues` field. Both are empty today, so
 * nothing collides; the first deprecated icon fails the index's unique-id and component-parity gates
 * until icons own their metadata and the component collector stops claiming those values.
 */

/**
 * Icon names are not a separate artifact — they are `p-icon`'s `name` allowed values, so a deprecated
 * icon name would appear in `component-meta` as a `deprecatedValues` entry and be collected with every
 * other prop value. This collector therefore verifies the same field directly, which keeps the
 * category honest without duplicating what the component collector already reports.
 */
export const collectIconDeprecations = (): DeprecationSource => {
  const deprecatedNames = componentMeta['p-icon']?.propsMeta?.name?.deprecatedValues ?? [];
  const entries: DeprecationEntry[] = deprecatedNames.map((name) => ({
    id: `propValue/p-icon/name/${name}`,
    usageKind: 'propValue' as const,
    source: 'icons' as const,
    owner: 'p-icon',
    prop: 'name',
    identifier: String(name),
    message: '',
    reference: 'references/icons.md',
  }));
  return entries.length > 0
    ? {
        category: 'icons',
        origin: (framework) => `the \`p-icon\` \`name\` values exposed by ${publicWrapperExport(framework)}`,
        entries,
      }
    : {
        category: 'icons',
        origin: (framework) => `the \`p-icon\` \`name\` values exposed by ${publicWrapperExport(framework)}`,
        entries,
        expectedEmpty: true,
      };
};
