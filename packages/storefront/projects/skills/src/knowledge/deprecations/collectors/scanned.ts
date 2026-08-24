import fs from 'node:fs';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { DeprecationEntry, DeprecationSource } from '../types';
import { partialsRoot } from './packageRoots';

/**
 * Collectors for the source categories that currently hold no deprecations *and* do not publish a
 * deprecated surface of their own: icons and partials.
 *
 * They exist precisely *because* those categories are empty. Declaring emptiness would be an
 * assertion nobody re-checks; these read the same markers a real collector would, so "nothing
 * deprecated here" is a checked result. Paired with the completeness gate — which fails a category
 * that is empty without an `expectedEmpty` declaration, and equally fails one that is declared empty
 * but is not — the day partials gain their first deprecation someone has to decide about it instead
 * of the index quietly staying short.
 *
 * A scan is the weaker of the two ways to verify that: it can name a file, never an API, and it only
 * finds a marker somebody already knew to write. Categories whose package publishes its own
 * deprecation catalog leave this file for a metadata adapter — as tokens and stylesheets did — and
 * this one shrinks as the remaining ones follow. Both that remain are tracked: partials are reworked
 * with the next major, and icons want package-owned metadata (`docs/icon-deprecation-metadata-design.md`).
 */

const DEPRECATION_MARKER = /@deprecated|\(deprecated\)/i;

/** Every `.ts` / `.mts` / `.css` / `.scss` source under `dir`, ignoring tests and build output. */
const sourceFiles = (dir: string, collected: string[] = []): string[] => {
  if (!fs.existsSync(dir)) {
    return collected;
  }
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (!['node_modules', 'dist', 'tests', '__snapshots__'].includes(item.name)) {
        sourceFiles(target, collected);
      }
    } else if (/\.(ts|mts|css|scss)$/.test(item.name) && !item.name.endsWith('.spec.ts')) {
      collected.push(target);
    }
  }
  return collected;
};

/**
 * Files under `root/src` carrying a deprecation marker. A non-empty result means the category has
 * gained a deprecation and needs a real collector — which is exactly what the gate reports.
 */
const markerHits = (root: string): string[] =>
  sourceFiles(path.join(root, 'src')).filter((file) => DEPRECATION_MARKER.test(fs.readFileSync(file, 'utf-8')));

/** Hits rendered as entries so a regression surfaces as content, not just a failed assertion. */
const hitsAsEntries = (category: DeprecationSource['category'], root: string): DeprecationEntry[] =>
  markerHits(root).map((file) => ({
    id: `${category}/${path.relative(root, file)}`,
    kind: 'styleAlias' as const,
    source: category,
    identifier: path.relative(root, file),
    message: 'Carries a deprecation marker but has no dedicated collector yet.',
  }));

const scanned = (category: DeprecationSource['category'], origin: string, root: string): DeprecationSource => {
  const entries = hitsAsEntries(category, root);
  return entries.length > 0 ? { category, origin, entries } : { category, origin, entries, expectedEmpty: true };
};

export const collectPartialDeprecations = (): DeprecationSource =>
  scanned('partials', 'the build-time partials', partialsRoot());

/**
 * Icon names are not a separate artifact — they are `p-icon`'s `name` allowed values, so a deprecated
 * icon name would appear in `component-meta` as a `deprecatedValues` entry and be collected with every
 * other prop value. This collector therefore verifies the same field directly, which keeps the
 * category honest without duplicating what the component collector already reports.
 */
export const collectIconDeprecations = (): DeprecationSource => {
  const deprecatedNames = componentMeta['p-icon']?.propsMeta?.name?.deprecatedValues ?? [];
  const entries: DeprecationEntry[] = deprecatedNames.map((name) => ({
    id: `value/p-icon/name/${name}`,
    kind: 'value' as const,
    source: 'icons' as const,
    owner: 'p-icon',
    prop: 'name',
    identifier: String(name),
    message: '',
    reference: 'references/icons.md',
  }));
  return entries.length > 0
    ? { category: 'icons', origin: "`p-icon`'s `name` allowed values", entries }
    : { category: 'icons', origin: "`p-icon`'s `name` allowed values", entries, expectedEmpty: true };
};
