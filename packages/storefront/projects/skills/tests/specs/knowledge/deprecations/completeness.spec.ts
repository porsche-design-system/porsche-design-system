import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { componentMeta } from '@porsche-design-system/component-meta';
import {
  flatten,
  isDeprecated,
  type ScssBranch,
  scssDeprecationMessage,
  scssDeprecationsMeta,
  scssIdentifier,
} from '@porsche-design-system/scss';
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
 * partials and the index are generated from.
 *
 * A failure here means either a deprecation escaped the index (the audit would under-report against
 * every project) or a source grew a shape the collector does not understand.
 */
const require = createRequire(import.meta.url);
const packageRoot = (specifier: string): string => path.dirname(path.dirname(require.resolve(`${specifier}/skill`)));

/** Every deprecated SCSS declaration the package publishes, in catalog order. */
const SCSS_DEPRECATIONS = flatten(scssDeprecationsMeta as ScssBranch).filter(isDeprecated);

const SOURCES = collectDeprecations();
const ENTRIES = SOURCES.flatMap((source) => source.entries);
const IDENTIFIERS = new Set(ENTRIES.map((entry) => entry.identifier));
const IDS = ENTRIES.map((entry) => entry.id);

const entriesOf = (category: (typeof SOURCE_CATEGORIES)[number]): Set<string> =>
  new Set(SOURCES.find((source) => source.category === category)?.entries.map((entry) => entry.identifier) ?? []);

/** The collected SCSS entries in collected order — order is part of the contract here, so no `Set`. */
const scssEntries = (): DeprecationEntry[] => SOURCES.find((source) => source.category === 'scss')?.entries ?? [];

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

/** Public names a package's `src/<domain>/deprecated/` trees export, via the re-export graph. */
const deprecatedExportNames = (root: string): string[] => {
  const names: string[] = [];
  const visit = (indexFile: string, seen: Set<string>): void => {
    if (seen.has(indexFile) || !fs.existsSync(indexFile)) {
      return;
    }
    seen.add(indexFile);
    const dir = path.dirname(indexFile);
    const source = fs.readFileSync(indexFile, 'utf-8');
    const target = (specifier: string): string => {
      const base = path.resolve(dir, specifier);
      return fs.existsSync(`${base}.ts`) ? `${base}.ts` : path.join(base, 'index.ts');
    };
    for (const match of source.matchAll(/export\s+\*\s+from\s+'([^']+)'/g)) {
      visit(target(match[1] as string), seen);
    }
    for (const match of source.matchAll(/export\s*\{([^}]*)\}\s*from\s*'([^']+)'/g)) {
      for (const clause of (match[1] as string).split(',')) {
        const name = clause
          .split(/\s+as\s+/)
          .pop()
          ?.trim();
        if (name) {
          names.push(name);
        }
      }
    }
  };
  const src = path.join(root, 'src');
  for (const domain of fs.readdirSync(src)) {
    visit(path.join(src, domain, 'deprecated', 'index.ts'), new Set());
  }
  return [...new Set(names)].sort();
};

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

  it.each([
    ['emotion', '@porsche-design-system/emotion'],
    ['vanillaExtract', '@porsche-design-system/vanilla-extract'],
  ] as const)('collects every deprecated %s export', (category, specifier) => {
    const expected = deprecatedExportNames(packageRoot(specifier));
    expect(expected.length).toBeGreaterThan(0);
    expect([...entriesOf(category)].sort()).toStrictEqual(expected);
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
    const source = fs.readFileSync(
      path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../../../src/knowledge/deprecations/collectors/scss.ts'
      ),
      'utf-8'
    );
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
