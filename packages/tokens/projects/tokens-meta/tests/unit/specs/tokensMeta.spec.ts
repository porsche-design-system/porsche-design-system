import { expect, it } from 'vitest';
import type { TokenMeta, TokensMetaTree } from '../../../src';
import { tokensMeta } from '../../../src';

// Recursively collect all leaf TokenMeta entries from the tree
function collectLeaves(tree: TokensMetaTree): TokenMeta[] {
  return Object.values(tree).flatMap((node) =>
    'name' in node ? [node as TokenMeta] : collectLeaves(node as TokensMetaTree)
  );
}

const allTokens = collectLeaves(tokensMeta);

it('should match snapshot', () => {
  expect(tokensMeta).toMatchSnapshot();
});

it('should preserve deterministic category order', () => {
  expect(Object.keys(tokensMeta)).toEqual([
    'blur',
    'border',
    'breakpoint',
    'color',
    'font',
    'gradient',
    'motion',
    'shadow',
    'spacing',
  ]);
  expect(Object.keys(tokensMeta.font as TokensMetaTree)).toEqual(['family', 'lineHeight', 'size', 'weight']);
});

it('every leaf should have name, value and description', () => {
  for (const token of allTokens) {
    expect(token.name, `missing name`).toBeTruthy();
    expect(token.value, `${token.name}: missing value`).toBeTruthy();
    expect(token.description, `${token.name}: missing description`).toBeTruthy();
  }
});

it('every leaf name should match its key in the tree', () => {
  function checkKeys(tree: TokensMetaTree, path = ''): void {
    for (const [key, node] of Object.entries(tree)) {
      if ('name' in node) {
        expect((node as TokenMeta).name, `key mismatch at ${path}.${key}`).toBe(key);
      } else {
        checkKeys(node as TokensMetaTree, `${path}.${key}`);
      }
    }
  }

  checkKeys(tokensMeta);
});

it('no token value should be the string "undefined"', () => {
  const bad = allTokens.filter((t) => t.value === 'undefined');
  expect(bad.map((t) => t.name)).toHaveLength(0);
});

it('no description should contain raw JSDoc syntax', () => {
  for (const token of allTokens) {
    expect(token.description, `${token.name}: raw JSDoc in description`).not.toMatch(/\/\*\*?|\*\/|@\w+/);
  }
});
