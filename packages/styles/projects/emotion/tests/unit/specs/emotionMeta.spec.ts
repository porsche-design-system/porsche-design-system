import { describe, expect, it } from 'vitest';
import type { EmotionMetaEntry } from '../../../emotionMeta/index';
import { emotionMeta } from '../../../emotionMeta/index';
import * as publicApi from '../../../src';

// Recursively collect every leaf meta entry, descending into grouped metas
// (e.g. border.radius, color.background, spacing.fluid, motion.duration, …).
const collectEntries = (meta: Record<string, unknown>): EmotionMetaEntry[] =>
  Object.values(meta).flatMap((value) =>
    value && typeof value === 'object' && 'name' in value
      ? [value as EmotionMetaEntry]
      : collectEntries(value as Record<string, unknown>)
  );

const metaEntries = Object.values(emotionMeta).flatMap((category) => collectEntries(category));

// Runtime value exports only — exclude the meta objects themselves (`emotionMeta` + every `*Meta`).
const isMetaExport = (name: string): boolean => name === 'emotionMeta' || name.endsWith('Meta');

// Make the snapshot diff-friendly: functions have no stable serialization, so record their source.
const serializeMeta = (value: unknown): unknown => {
  if (typeof value === 'function') {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(serializeMeta);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, serializeMeta(val)]));
  }
  return value;
};

describe('emotionMeta', () => {
  it('should be the source of truth for the public API (no undocumented exports)', () => {
    const exportedNames = Object.keys(publicApi)
      .filter((name) => !isMetaExport(name))
      .sort();
    const metaNames = [...new Set(metaEntries.map(({ name }) => name))].sort();

    expect(exportedNames).toEqual(metaNames);
  });

  it('should reference the real public export for every entry', () => {
    for (const { name, value } of metaEntries) {
      expect((publicApi as Record<string, unknown>)[name]).toBe(value);
    }
  });

  it('should match snapshot', () => {
    expect(serializeMeta(emotionMeta)).toMatchSnapshot();
  });
});
