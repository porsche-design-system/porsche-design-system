import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { componentMeta } from '@porsche-design-system/component-meta';
import { emotionDeprecations } from '@porsche-design-system/emotion/meta';
import { scssDeprecations } from '@porsche-design-system/scss';
import { deprecationMessage, type PublishedDeprecation } from '@porsche-design-system/shared/deprecation';
import { tailwindDeprecations } from '@porsche-design-system/tailwindcss';
import { tokenDeprecations } from '@porsche-design-system/tokens-meta';
import { vanillaExtractDeprecations } from '@porsche-design-system/vanilla-extract/meta';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { styleAliasSource } from '@skills/knowledge/deprecations/collectors/styleAlias';
import type { DeprecationEntry, SourceCategory } from '@skills/knowledge/deprecations/types';
import { BASELINE_EFFORT, ENTRY_KINDS, SOURCE_CATEGORIES } from '@skills/knowledge/deprecations/types';
import { describe, expect, it } from 'vitest';

/**
 * The gate the whole audit rests on.
 *
 * The audit skill's central claim is that a deprecated API cannot be missing from the index. That is
 * only true if something checks — so every expectation below is derived from the source of truth
 * itself, never from the collector that reads it: a gate re-using a collector's own output would
 * agree with it by construction and prove nothing. For most sources that means re-reading the shipped
 * artifact; for the packages that publish their own catalog it means their `*DeprecationsMeta` —
 * authored for SCSS and Tailwind, which generate their shipped artifacts from them, and generated
 * from the `@deprecated` annotations for Emotion, vanilla-extract and tokens.
 *
 * A failure here means either a deprecation escaped the index (the audit would under-report against
 * every project) or a source grew a shape the collector does not understand.
 */
/**
 * Every source that publishes its own deprecated surface, with what it publishes and where the
 * collector reading it must get it from. They all expose the same shape, so one table drives the same
 * expectations for every one of them and a sixth source is a row rather than another thirty lines of
 * assertions.
 *
 * `expectedEmpty` records the release state the row is gated against: tokens publish an empty list
 * today, and saying so here is what keeps the other rows' emptiness a failure rather than a shrug.
 */
const METADATA_SOURCES: {
  category: SourceCategory;
  /** The package's published deprecated surface — the expectation, never the collector's output. */
  deprecations: PublishedDeprecation[];
  reference: string;
  collector: string;
  specifier: string;
  /** The release state the row is gated against: a package that legitimately publishes nothing. */
  expectedEmpty?: true;
}[] = [
  {
    category: 'scss',
    deprecations: scssDeprecations,
    reference: 'references/styles/scss.md',
    collector: 'scss.ts',
    specifier: '@porsche-design-system/scss',
  },
  {
    category: 'emotion',
    deprecations: emotionDeprecations,
    reference: 'references/styles/emotion.md',
    collector: 'emotion.ts',
    specifier: '@porsche-design-system/emotion/meta',
  },
  {
    category: 'vanillaExtract',
    deprecations: vanillaExtractDeprecations,
    reference: 'references/styles/vanilla-extract.md',
    collector: 'vanillaExtract.ts',
    specifier: '@porsche-design-system/vanilla-extract/meta',
  },
  {
    category: 'tailwindcss',
    deprecations: tailwindDeprecations,
    reference: 'references/styles/tailwindcss.md',
    collector: 'tailwindcss.ts',
    specifier: '@porsche-design-system/tailwindcss',
  },
  {
    category: 'tokens',
    deprecations: tokenDeprecations,
    reference: 'references/tokens.md',
    collector: 'tokens.ts',
    specifier: '@porsche-design-system/tokens-meta',
    expectedEmpty: true,
  },
];

const SOURCES = collectDeprecations();
const ENTRIES = SOURCES.flatMap((source) => source.entries);
const IDENTIFIERS = new Set(ENTRIES.map((entry) => entry.identifier));
const IDS = ENTRIES.map((entry) => entry.id);

const entriesOf = (category: (typeof SOURCE_CATEGORIES)[number]): Set<string> =>
  new Set(SOURCES.find((source) => source.category === category)?.entries.map((entry) => entry.identifier) ?? []);

/** The collected entries of a metadata-driven source, in collected order — order is part of the contract, so no `Set`. */
const entriesInOrder = (category: (typeof SOURCE_CATEGORIES)[number]): DeprecationEntry[] =>
  SOURCES.find((source) => source.category === category)?.entries ?? [];

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

  it('keeps the shared styleAlias adapter off the filesystem, for every metadata source', () => {
    // The metadata collectors delegate their entry construction here, so the "no parsing another
    // package's artifacts" guarantee now has to hold for this file as well as for each collector.
    expect(collectorSource('styleAlias.ts')).not.toMatch(/from 'node:(fs|path)'/);
  });

  describe.each(METADATA_SOURCES)(
    '$category',
    ({ category, deprecations, reference, collector, specifier, expectedEmpty }) => {
      const entries = (): DeprecationEntry[] => entriesInOrder(category);

      it('publishes the surface this release is gated against', () => {
        expect(deprecations.length === 0).toBe(Boolean(expectedEmpty));
      });

      it('collects every published deprecation exactly once, in catalog order', () => {
        expect(entries().map((entry) => entry.identifier)).toStrictEqual(deprecations.map((d) => d.identifier));
      });

      it('builds every rule id from the package identifier, so reports stay comparable', () => {
        expect(entries().map((entry) => entry.id)).toStrictEqual(
          deprecations.map((d) => `styleAlias/${category}/${d.identifier}`)
        );
      });

      it('carries the package wording and replacement onto every entry verbatim', () => {
        expect(entries().map((entry) => [entry.message, entry.replacement])).toStrictEqual(
          deprecations.map((d) => [deprecationMessage(d), d.deprecation.replacement])
        );
      });

      it('derives the entries from package metadata rather than the filesystem', () => {
        const source = collectorSource(collector);
        expect(source).toContain(`from '${specifier}'`);
        expect(source).toContain(reference);
        expect(source).not.toMatch(/from 'node:(fs|path)'/);
      });

      it('links every entry to the package reference', () => {
        expect([...new Set(entries().map((entry) => entry.reference))]).toStrictEqual(
          entries().length > 0 ? [reference] : []
        );
      });
    }
  );

  /**
   * What an empty category cannot prove about itself: that the day its package publishes something,
   * the adapter renders it. Gated on a fixture rather than on a token nobody has deprecated yet.
   */
  it('maps a published deprecation onto an entry, wording, replacement and reference alike', () => {
    const source = styleAliasSource({
      category: 'tokens',
      origin: 'a fixture',
      reference: 'references/tokens.md',
      deprecations: [
        { identifier: 'spacingLegacy', deprecation: { replacement: 'spacingStaticMd' } },
        { identifier: 'colorLegacy', deprecation: { message: 'Merged into the light-dark tokens.' } },
      ],
    });

    expect(source.expectedEmpty).toBeUndefined();
    expect(source.entries).toStrictEqual([
      {
        id: 'styleAlias/tokens/spacingLegacy',
        kind: 'styleAlias',
        source: 'tokens',
        identifier: 'spacingLegacy',
        message: 'This API will be removed with the next major release.',
        replacement: 'spacingStaticMd',
        reference: 'references/tokens.md',
      },
      {
        id: 'styleAlias/tokens/colorLegacy',
        kind: 'styleAlias',
        source: 'tokens',
        identifier: 'colorLegacy',
        message: 'Merged into the light-dark tokens.',
        reference: 'references/tokens.md',
      },
    ]);
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
