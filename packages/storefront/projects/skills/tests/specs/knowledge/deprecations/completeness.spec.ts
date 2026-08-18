import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { componentMeta } from '@porsche-design-system/component-meta';
import { emotionDeprecationsMeta } from '@porsche-design-system/emotion/meta';
import {
  flatten,
  isDeprecated,
  type ScssBranch,
  scssDeprecationMessage,
  scssDeprecationsMeta,
  scssIdentifier,
} from '@porsche-design-system/scss';
import { vanillaExtractDeprecationsMeta } from '@porsche-design-system/vanilla-extract/meta';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import type { DeprecationEntry } from '@skills/knowledge/deprecations/types';
import { BASELINE_EFFORT, ENTRY_KINDS, SOURCE_CATEGORIES } from '@skills/knowledge/deprecations/types';
import { describe, expect, it } from 'vitest';

/**
 * The gate the whole audit rests on.
 *
 * The audit skill's central claim is that a deprecated API cannot be missing from the index. That is
 * only true if something checks — so every expectation below is derived from the source of truth
 * itself, never from the collector that reads it: a gate re-using a collector's own output would
 * agree with it by construction and prove nothing. For most sources that means re-reading the shipped
 * artifact; for SCSS it means the package's `scssDeprecationsMeta` catalog, which is what both the
 * partials and the index are generated from, and for Emotion and vanilla-extract their
 * `*DeprecationsMeta` catalogs, which the packages generate from the annotations on the exports.
 *
 * A failure here means either a deprecation escaped the index (the audit would under-report against
 * every project) or a source grew a shape the collector does not understand.
 */
const require = createRequire(import.meta.url);
const packageRoot = (specifier: string): string => path.dirname(path.dirname(require.resolve(`${specifier}/skill`)));

/** Every deprecated SCSS declaration the package publishes, in catalog order. */
const SCSS_DEPRECATIONS = flatten(scssDeprecationsMeta as ScssBranch).filter(isDeprecated);

/** Every deprecated Emotion export the package publishes, in catalog order. */
const EMOTION_DEPRECATIONS = Object.values(emotionDeprecationsMeta).flat();

/** Every deprecated vanilla-extract export the package publishes, in catalog order. */
const VANILLA_EXTRACT_DEPRECATIONS = Object.values(vanillaExtractDeprecationsMeta).flat();

const SOURCES = collectDeprecations();
const ENTRIES = SOURCES.flatMap((source) => source.entries);
const IDENTIFIERS = new Set(ENTRIES.map((entry) => entry.identifier));
const IDS = ENTRIES.map((entry) => entry.id);

const entriesOf = (category: (typeof SOURCE_CATEGORIES)[number]): Set<string> =>
  new Set(SOURCES.find((source) => source.category === category)?.entries.map((entry) => entry.identifier) ?? []);

/** The collected entries of a metadata-driven source, in collected order — order is part of the contract, so no `Set`. */
const entriesInOrder = (category: (typeof SOURCE_CATEGORIES)[number]): DeprecationEntry[] =>
  SOURCES.find((source) => source.category === category)?.entries ?? [];

const scssEntries = (): DeprecationEntry[] => entriesInOrder('scss');

const emotionEntries = (): DeprecationEntry[] => entriesInOrder('emotion');

const vanillaExtractEntries = (): DeprecationEntry[] => entriesInOrder('vanillaExtract');

/** The source of a collector, read from disk to prove what it may and may not touch. */
const collectorSource = (file: string): string =>
  fs.readFileSync(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      `../../../../src/knowledge/deprecations/collectors/${file}`
    ),
    'utf-8'
  );

/** Every deprecated entity `component-meta` declares, as `<kind> <tag> <name>` labels. */
const componentMetaExpectations = (): string[] => {
  const expected: string[] = [];
  for (const [tag, meta] of Object.entries(componentMeta)) {
    if (meta.isDeprecated) {
      expected.push(`component ${tag}`);
    }
    for (const [name, prop] of Object.entries(meta.propsMeta ?? {})) {
      if (prop.isDeprecated) {
        expected.push(`prop ${tag} ${name}`);
      }
      for (const value of prop.deprecatedValues ?? []) {
        expected.push(`value ${tag} ${name} ${value}`);
      }
    }
    for (const [name, event] of Object.entries(meta.eventsMeta ?? {})) {
      if (event.isDeprecated) {
        expected.push(`event ${tag} ${name}`);
      }
    }
    for (const [name, slot] of Object.entries(meta.slotsMeta ?? {})) {
      if (slot.isDeprecated) {
        expected.push(`slot ${tag} ${name}`);
      }
    }
    for (const [name, cssVariable] of Object.entries(meta.cssVariablesMeta ?? {})) {
      if (cssVariable.isDeprecated) {
        expected.push(`cssVariable ${tag} ${name}`);
      }
    }
  }
  return expected.sort();
};

/** The same labels, rebuilt from what the index actually collected. */
const componentIndexLabels = (): string[] =>
  SOURCES.flatMap((source) => source.entries)
    .filter((entry) => entry.source === 'components' || entry.source === 'icons')
    .map((entry) =>
      entry.kind === 'value'
        ? `value ${entry.owner} ${entry.prop} ${entry.identifier}`
        : `${entry.kind} ${entry.owner ?? ''} ${entry.identifier}`.replace('  ', ' ').trim()
    )
    .map((label) => (label.startsWith('component ') ? label : label))
    .sort();

/** Custom properties in the generated Tailwind theme preceded by a deprecated-alias marker. */
const tailwindDeprecatedNames = (): string[] => {
  const lines = fs
    .readFileSync(path.join(packageRoot('@porsche-design-system/tailwindcss'), 'dist', 'index.css'), 'utf-8')
    .split('\n');
  const names: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const property = (lines[i] as string).match(/^\s*(--[\w-]+)\s*:/);
    if (property && /^\s*\/\*\s*alias \(deprecated\)\s*\*\/\s*$/.test(lines[i - 1] as string)) {
      names.push(property[1] as string);
    }
  }
  return names.sort();
};

describe('deprecation index completeness', () => {
  it('covers every source category exactly once, in declaration order', () => {
    expect(SOURCES.map((source) => source.category)).toStrictEqual([...SOURCE_CATEGORIES]);
  });

  it('has a unique id per entry', () => {
    expect(IDS.length).toBe(new Set(IDS).size);
  });

  it('has a baseline effort for every entry kind', () => {
    expect(Object.keys(BASELINE_EFFORT).sort()).toStrictEqual([...ENTRY_KINDS].sort());
  });

  it('collects every deprecated entity component-meta declares', () => {
    expect(componentIndexLabels()).toStrictEqual(componentMetaExpectations());
  });

  it('has a non-empty component-meta expectation set to gate against', () => {
    expect(componentMetaExpectations().length).toBeGreaterThan(0);
  });

  it('collects every deprecated vanillaExtract export exactly once, in catalog order', () => {
    const expected = VANILLA_EXTRACT_DEPRECATIONS.map(({ name }) => name);
    expect(expected.length).toBeGreaterThan(0);
    expect(vanillaExtractEntries().map((entry) => entry.identifier)).toStrictEqual(expected);
  });

  it('builds every vanillaExtract rule id from the package identifier, so reports stay comparable', () => {
    expect(vanillaExtractEntries().map((entry) => entry.id)).toStrictEqual(
      VANILLA_EXTRACT_DEPRECATIONS.map(({ name }) => `styleAlias/vanillaExtract/${name}`)
    );
  });

  it('carries every vanillaExtract annotation onto its entry verbatim', () => {
    expect(vanillaExtractEntries().map((entry) => entry.message)).toStrictEqual(
      VANILLA_EXTRACT_DEPRECATIONS.map(({ deprecation }) => deprecation.message)
    );
  });

  it('derives the vanillaExtract entries from package metadata rather than the filesystem', () => {
    const source = collectorSource('vanillaExtract.ts');
    expect(source).toContain("from '@porsche-design-system/vanilla-extract/meta'");
    expect(source).not.toMatch(/from 'node:(fs|path)'/);
  });

  it('links every vanillaExtract entry to the vanilla-extract reference', () => {
    expect([...new Set(vanillaExtractEntries().map((entry) => entry.reference))]).toStrictEqual([
      'references/styles/vanilla-extract.md',
    ]);
  });

  it('collects every deprecated Emotion export exactly once, in catalog order', () => {
    const expected = EMOTION_DEPRECATIONS.map(({ name }) => name);
    expect(expected.length).toBeGreaterThan(0);
    expect(emotionEntries().map((entry) => entry.identifier)).toStrictEqual(expected);
  });

  it('builds every Emotion rule id from the package identifier, so reports stay comparable', () => {
    expect(emotionEntries().map((entry) => entry.id)).toStrictEqual(
      EMOTION_DEPRECATIONS.map(({ name }) => `styleAlias/emotion/${name}`)
    );
  });

  it('carries every Emotion annotation onto its entry verbatim', () => {
    expect(emotionEntries().map((entry) => entry.message)).toStrictEqual(
      EMOTION_DEPRECATIONS.map(({ deprecation }) => deprecation.message)
    );
  });

  it('derives the Emotion entries from package metadata rather than the filesystem', () => {
    const source = collectorSource('emotion.ts');
    expect(source).toContain("from '@porsche-design-system/emotion/meta'");
    expect(source).not.toMatch(/from 'node:(fs|path)'/);
  });

  it('links every Emotion entry to the Emotion reference', () => {
    expect([...new Set(emotionEntries().map((entry) => entry.reference))]).toStrictEqual([
      'references/styles/emotion.md',
    ]);
  });

  it('collects every deprecated SCSS declaration exactly once, in catalog order', () => {
    const expected = SCSS_DEPRECATIONS.map(scssIdentifier);
    expect(expected.length).toBeGreaterThan(0);
    expect(scssEntries().map((entry) => entry.identifier)).toStrictEqual(expected);
  });

  it('builds every SCSS rule id from the package identifier, so reports stay comparable', () => {
    expect(scssEntries().map((entry) => entry.id)).toStrictEqual(
      SCSS_DEPRECATIONS.map((node) => `styleAlias/scss/${scssIdentifier(node)}`)
    );
  });

  it('carries the package wording and replacement onto every SCSS entry verbatim', () => {
    expect(scssEntries().map((entry) => [entry.message, entry.replacement])).toStrictEqual(
      SCSS_DEPRECATIONS.map((node) => [scssDeprecationMessage(node), node.deprecation.replacement])
    );
  });

  it('derives the SCSS entries from package metadata rather than the filesystem', () => {
    const source = collectorSource('scss.ts');
    expect(source).toContain("from '@porsche-design-system/scss'");
    expect(source).not.toMatch(/from 'node:(fs|path)'/);
  });

  it('links every SCSS entry to the SCSS reference', () => {
    expect([...new Set(scssEntries().map((entry) => entry.reference))]).toStrictEqual(['references/styles/scss.md']);
  });

  it('collects every deprecated Tailwind custom-property alias', () => {
    const expected = tailwindDeprecatedNames();
    expect(expected.length).toBeGreaterThan(0);
    expect([...entriesOf('tailwindcss')].sort()).toStrictEqual(expected);
  });

  /**
   * The declaration and the reality must agree in both directions. An undeclared empty category means
   * a collector silently stopped finding anything; a declared-empty category that is not empty means a
   * source gained its first deprecation and nobody decided what to do about it.
   */
  it.each([...SOURCE_CATEGORIES])('declares %s empty if and only if it is empty', (category) => {
    const source = SOURCES.find((candidate) => candidate.category === category);
    expect(source, `${category} is missing from the index`).toBeDefined();
    expect(Boolean(source?.expectedEmpty)).toBe(source?.entries.length === 0);
  });

  it('leaves no entry without an identifier', () => {
    expect(ENTRIES.filter((entry) => !entry.identifier)).toStrictEqual([]);
  });

  it('gives every entry either a replacement or a verbatim message to act on', () => {
    const actionable = ENTRIES.filter((entry) => Boolean(entry.replacement) || Boolean(entry.message));
    expect(actionable.length).toBe(ENTRIES.length);
  });

  it('has collected a meaningful number of deprecations', () => {
    expect(IDENTIFIERS.size).toBeGreaterThan(100);
  });
});
