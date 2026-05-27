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

it('colorContrast tokens should be ordered Higher→High→Medium→Low→Lower', () => {
  const lightDark = (emotionMeta.color as EmotionMetaTree).lightDark as EmotionMetaTree;
  const keys = Object.keys(lightDark).filter((k) => k.startsWith('colorContrast'));
  const variantOrder = ['Higher', 'High', 'Medium', 'Low', 'Lower'];
  for (let i = 0; i < variantOrder.length - 1; i++) {
    const a = keys.indexOf(`colorContrast${variantOrder[i]}`);
    const b = keys.indexOf(`colorContrast${variantOrder[i + 1]}`);
    if (a !== -1 && b !== -1) expect(a, `colorContrast${variantOrder[i]} should precede colorContrast${variantOrder[i + 1]}`).toBeLessThan(b);
  }
});

it('typography tokens should be ordered largest-to-smallest (5Xl before 2Xs)', () => {
  const keys = Object.keys(emotionMeta.typography as EmotionMetaTree);
  const idx5Xl = keys.findIndex((k) => k.includes('5Xl'));
  const idx2Xs = keys.findIndex((k) => k.includes('2Xs'));
  expect(idx5Xl, '5Xl tokens should exist').toBeGreaterThanOrEqual(0);
  expect(idx2Xs, '2Xs tokens should exist').toBeGreaterThanOrEqual(0);
  expect(idx5Xl, '5Xl should come before 2Xs').toBeLessThan(idx2Xs);
});
