import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as tokens from '@porsche-design-system/tokens';
import { describe, expect, it } from 'vitest';
import { buildCatalogs, readTokenSources } from '../../../scripts/tokensMeta';
import { tokenDeprecations } from '../../../src';
import { flattenTokenDeprecations } from '../../../src/deprecationList';
import { tokenDeprecationsMeta, tokensMeta } from '../../../src/lib/tokensMeta';
import type { TokenMeta, TokensMetaTree } from '../../../src/types/token-meta';

/**
 * The knowledge skill's deprecation index reads `tokenDeprecations`, so a legacy token missing from
 * it is one an audit would never flag — and a token in both catalogs is one it would report as
 * deprecated while the documentation still recommends it. Both catalogs are generated from the same
 * exports, so the expectations here are derived from those exports rather than from a written list.
 */

const leaves = (tree: TokensMetaTree): TokenMeta[] =>
  Object.values(tree).flatMap((node) => ('name' in node ? [node as TokenMeta] : leaves(node as TokensMetaTree)));

const CURRENT = leaves(tokensMeta);
const DEPRECATED = flattenTokenDeprecations(tokenDeprecationsMeta);
/** The exports the catalogs are generated from, re-read here so they are gated on their own input. */
const SOURCES = readTokenSources();

/** A fixture token module, read through the checker exactly like the real declarations are. */
const fixture = (source: string) => {
  // realpath: TypeScript resolves the symlinked macOS temp dir, and would then not find the entry.
  const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'pds-tokens-')));
  const entry = path.join(directory, 'index.ts');
  fs.writeFileSync(entry, source);
  try {
    return readTokenSources(entry, directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
};

describe('tokenDeprecations', () => {
  it('is published and empty in this release', () => {
    expect(tokenDeprecations).toStrictEqual([]);
  });

  it('publishes every deprecated token once, by its export name, in catalog order', () => {
    expect(tokenDeprecations).toStrictEqual(
      DEPRECATED.map(({ name, deprecation }) => ({ identifier: name, deprecation }))
    );
  });
});

describe('token catalogs', () => {
  it('classifies every token export into exactly one catalog', () => {
    const classified = [...CURRENT, ...DEPRECATED].map(({ name }) => name);
    expect([...new Set(classified)]).toHaveLength(classified.length);
    expect([...classified].sort()).toStrictEqual(SOURCES.map(({ name }) => name).sort());
    expect(CURRENT.length).toBeGreaterThan(0);
  });

  it('indexes every annotated export, documented or not', () => {
    const annotated = SOURCES.filter(({ deprecation }) => deprecation).map(({ name }) => name);
    expect(DEPRECATED.map(({ name }) => name).sort()).toStrictEqual(annotated.sort());
  });

  it('documents every current token and marks none of them deprecated', () => {
    expect(CURRENT.filter((token) => 'deprecation' in token || !token.description.trim())).toStrictEqual([]);
  });

  it('marks every deprecated token and documents none of them', () => {
    expect(DEPRECATED.filter((token) => !token.deprecation || 'description' in token)).toStrictEqual([]);
  });

  it('spells out every current root domain in the deprecated catalog, so an empty one was checked', () => {
    expect(Object.keys(tokenDeprecationsMeta)).toStrictEqual(Object.keys(tokensMeta));
  });

  it('resolves every token name to the value the package exports', () => {
    for (const { name, value } of [...CURRENT, ...DEPRECATED]) {
      expect((tokens as Record<string, unknown>)[name], `${name}: value drifted from the token package`).toBe(value);
    }
  });
});

describe('deprecation annotations', () => {
  it('reads the replacement from the {@link} reference, not from the sentence around it', () => {
    expect(
      fixture(`/** The recommended token. */
export const tokenB = '2px';

/**
 * The legacy token.
 * @deprecated Values changed slightly. {@link tokenB}
 */
export const tokenA = '1px';
`)
    ).toStrictEqual([
      { name: 'tokenB', description: 'The recommended token.', directory: '' },
      {
        name: 'tokenA',
        description: 'The legacy token.',
        directory: '',
        deprecation: { replacement: 'tokenB', note: 'Values changed slightly.' },
      },
    ]);
  });

  it('treats a bare annotation as the complete marker, so the shared default wording applies', () => {
    const [source] = fixture('/** A token. */\nexport const tokenA = 1;\n');
    const [deprecated] = fixture('/**\n * A token.\n * @deprecated\n */\nexport const tokenA = 1;\n');
    expect(source.deprecation).toBeUndefined();
    expect(deprecated.deprecation).toStrictEqual({});
  });

  it('keeps a deprecated export whose description was dropped', () => {
    expect(fixture('/** @deprecated */\nexport const tokenA = 1;\n')).toHaveLength(1);
  });

  it('reads no export that is neither documented nor deprecated', () => {
    expect(fixture('// Not JSDoc.\nexport const tokenA = 1;\n')).toStrictEqual([]);
  });
});

describe('generated classification', () => {
  const values = { tokenA: '1px', tokenB: '2px' };
  const sources = fixture(`/** The recommended token. */
export const tokenB = '2px';

/**
 * The legacy token.
 * @deprecated {@link tokenB}
 */
export const tokenA = '1px';
`);

  it('routes a deprecated export into the deprecated catalog only, without its description', () => {
    expect(buildCatalogs(sources, values)).toStrictEqual({
      tokensMeta: { tokenB: { name: 'tokenB', value: '2px', description: 'The recommended token.' } },
      tokenDeprecationsMeta: { tokenA: { name: 'tokenA', value: '1px', deprecation: { replacement: 'tokenB' } } },
    });
  });

  it('rejects a replacement that is no token, resolvable in the file or not', () => {
    const unknown = fixture('/**\n * A token.\n * @deprecated {@link tokenGone}\n */\nexport const tokenA = 1;\n');
    // Cross-file links do not resolve in the annotated file's scope, so the name is what is checked.
    expect(unknown[0].deprecation).toStrictEqual({ replacement: 'tokenGone' });
    expect(() => buildCatalogs(unknown, values)).toThrow(/tokenGone/);
  });

  it('rejects a replacement that is itself deprecated', () => {
    const deprecated = fixture(`/**
 * The other legacy token.
 * @deprecated
 */
export const tokenB = '2px';

/**
 * The legacy token.
 * @deprecated {@link tokenB}
 */
export const tokenA = '1px';
`);
    expect(() => buildCatalogs(deprecated, values)).toThrow(/tokenB/);
  });
});
