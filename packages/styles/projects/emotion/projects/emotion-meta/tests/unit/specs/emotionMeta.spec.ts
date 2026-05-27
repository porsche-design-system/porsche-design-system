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
    // Function exports (e.g. getFocusVisibleStyle, getSkeletonStyle) intentionally have no value
    if (entry.value !== undefined) {
      expect(String(entry.value), `${entry.name}: empty value`).not.toBe('');
    }
    expect(entry.description, `${entry.name}: missing description`).toBeTruthy();
  }
});

it('every leaf name should match its key in the tree', () => {
  function checkKeys(tree: EmotionMetaTree, path = ''): void {
    for (const [key, node] of Object.entries(tree)) {
      if ('name' in node) {
        const name = (node as EmotionMeta).name;
        // name equals the key, or is a @signature override that starts with the key followed by '('
        expect(name === key || name.startsWith(`${key}(`), `key mismatch at ${path}.${key}: "${name}"`).toBe(true);
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
