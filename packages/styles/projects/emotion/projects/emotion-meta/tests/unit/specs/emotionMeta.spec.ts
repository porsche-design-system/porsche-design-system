import { expect, it } from 'vitest';
import type { EmotionMeta, EmotionMetaTree } from '../../../src';
import { emotionMeta } from '../../../src';

// Recursively collect all leaf EmotionMeta entries from the tree
function collectLeaves(tree: EmotionMetaTree): EmotionMeta[] {
  return Object.values(tree).flatMap((node) =>
    'name' in node ? [node as EmotionMeta] : collectLeaves(node as EmotionMetaTree)
  );
}

const allEntries = collectLeaves(emotionMeta);

it('should match snapshot', () => {
  expect(emotionMeta).toMatchSnapshot();
});

it('should contain all expected top-level categories', () => {
  expect(Object.keys(emotionMeta)).toEqual(
    expect.arrayContaining(['blur', 'border', 'color', 'font', 'gradient', 'grid', 'mediaQuery', 'motion', 'shadow', 'spacing', 'typography'])
  );
});

it('every leaf should have name, value and description', () => {
  for (const entry of allEntries) {
    expect(entry.name, `missing name`).toBeTruthy();
    // value may be 0 (e.g. breakpointBase) — check for defined + non-empty-string only
    expect(entry.value, `${entry.name}: missing value`).not.toBeUndefined();
    expect(String(entry.value), `${entry.name}: empty value`).not.toBe('');
    expect(entry.description, `${entry.name}: missing description`).toBeTruthy();
  }
});

it('every leaf name should match its key in the tree', () => {
  function checkKeys(tree: EmotionMetaTree, path = ''): void {
    for (const [key, node] of Object.entries(tree)) {
      if ('name' in node) {
        expect((node as EmotionMeta).name, `key mismatch at ${path}.${key}`).toBe(key);
      } else {
        checkKeys(node as EmotionMetaTree, `${path}.${key}`);
      }
    }
  }

  checkKeys(emotionMeta);
});

it('no entry value should be the string "undefined"', () => {
  const bad = allEntries.filter((t) => t.value === 'undefined');
  expect(bad.map((t) => t.name)).toHaveLength(0);
});

it('no description should contain raw JSDoc syntax', () => {
  for (const entry of allEntries) {
    expect(entry.description, `${entry.name}: raw JSDoc in description`).not.toMatch(/\/\*\*?|\*\/|@\w+/);
  }
});
