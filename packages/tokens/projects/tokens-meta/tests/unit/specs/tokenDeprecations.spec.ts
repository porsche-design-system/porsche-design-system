import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as tokens from '@porsche-design-system/tokens';
import { describe, expect, it } from 'vitest';
import { buildCatalogs, readTokenSources } from '../../../scripts/tokensMeta';
import { tokenDeprecations, tokensMeta } from '../../../src';
import type { TokenMeta, TokensMetaTree } from '../../../src/types/token-meta';

/**
 * The knowledge skill's deprecation index reads `tokenDeprecations`, so a legacy token missing from
 * it is one an audit would never flag — and a token in both projections is one it would report as
 * deprecated while the documentation still recommends it. Both are generated from the same exports,
 * so the expectations here are derived from those exports rather than from a written list.
 */

const leaves = (tree: TokensMetaTree): TokenMeta[] =>
  Object.values(tree).flatMap((node) => ('name' in node ? [node as TokenMeta] : leaves(node as TokensMetaTree)));

const CURRENT = leaves(tokensMeta);
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

  it('publishes every annotated export once, by its export name, in catalog order', () => {
    const annotated = SOURCES.filter(({ deprecation }) => deprecation).map(({ name }) => name);
    expect(tokenDeprecations.map(({ identifier }) => identifier).sort()).toStrictEqual(annotated.sort());
  });

  it('carries a marker for every entry, and no field the contract does not define', () => {
    const malformed = tokenDeprecations.filter(
      ({ deprecation }) =>
        !deprecation || Object.keys(deprecation).some((key) => !['replacement', 'note'].includes(key))
    );
    expect(malformed).toStrictEqual([]);
  });
});

describe('token catalogs', () => {
  it('classifies every token export into exactly one projection', () => {
    const classified = [...CURRENT.map(({ name }) => name), ...tokenDeprecations.map(({ identifier }) => identifier)];
    expect([...new Set(classified)]).toHaveLength(classified.length);
    expect([...classified].sort()).toStrictEqual(SOURCES.map(({ name }) => name).sort());
    expect(CURRENT.length).toBeGreaterThan(0);
  });

  it('documents every current token and marks none of them deprecated', () => {
    expect(CURRENT.filter((token) => 'deprecation' in token || !token.description.trim())).toStrictEqual([]);
  });

  it('resolves every token name to the value the package exports', () => {
    for (const { name, value } of CURRENT) {
      expect((tokens as Record<string, unknown>)[name], `${name}: value drifted from the token package`).toBe(value);
    }
  });

  it('is up to date with the declarations it is generated from', () => {
    expect({ tokensMeta, tokenDeprecations }).toStrictEqual(buildCatalogs(SOURCES));
  });
});

describe('deprecation annotations', () => {
  const LIFECYCLE = 'This API will be removed with the next major release.';

  it('reads the replacement from the {@link} reference, not from the sentence around it', () => {
    expect(
      fixture(`/** The recommended token. */
export const tokenB = '2px';

/**
 * The legacy token.
 * @deprecated Use {@link tokenB} instead. ${LIFECYCLE} Values changed slightly.
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

  it('treats the bare lifecycle sentence as the complete marker', () => {
    const [source] = fixture('/** A token. */\nexport const tokenA = 1;\n');
    const [deprecated] = fixture(`/**\n * A token.\n * @deprecated ${LIFECYCLE}\n */\nexport const tokenA = 1;\n`);
    expect(source.deprecation).toBeUndefined();
    expect(deprecated.deprecation).toStrictEqual({});
  });

  it('rejects an annotation that is not the sentence the shared contract generates', () => {
    expect(() => fixture('/**\n * A token.\n * @deprecated\n */\nexport const tokenA = 1;\n')).toThrow(
      /is not structured/
    );
    expect(() =>
      fixture(`/** The recommended token. */
export const tokenB = '2px';

/**
 * The legacy token.
 * @deprecated Values changed slightly. {@link tokenB}
 */
export const tokenA = '1px';
`)
    ).toThrow(/is not structured/);
  });

  it('rejects a replacement that is no token, resolvable in the file or not', () => {
    // Cross-file links do not resolve in the annotated file's scope, so the name is what is checked.
    expect(() =>
      fixture(`/**\n * A token.\n * @deprecated Use {@link tokenGone} instead. ${LIFECYCLE}\n */
export const tokenA = 1;
`)
    ).toThrow(/tokenGone/);
  });

  it('rejects a replacement that is itself deprecated', () => {
    expect(() =>
      fixture(`/**
 * The other legacy token.
 * @deprecated ${LIFECYCLE}
 */
export const tokenB = '2px';

/**
 * The legacy token.
 * @deprecated Use {@link tokenB} instead. ${LIFECYCLE}
 */
export const tokenA = '1px';
`)
    ).toThrow(/tokenB/);
  });

  it('keeps a deprecated export whose description was dropped', () => {
    expect(fixture(`/** @deprecated ${LIFECYCLE} */\nexport const tokenA = 1;\n`)).toHaveLength(1);
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
 * @deprecated Use {@link tokenB} instead. This API will be removed with the next major release.
 */
export const tokenA = '1px';
`);

  it('routes a deprecated export into the published list only, never into the documented catalog', () => {
    expect(buildCatalogs(sources, values)).toStrictEqual({
      tokensMeta: { tokenB: { name: 'tokenB', value: '2px', description: 'The recommended token.' } },
      tokenDeprecations: [{ usageKind: 'jsExport', identifier: 'tokenA', deprecation: { replacement: 'tokenB' } }],
    });
  });
});
