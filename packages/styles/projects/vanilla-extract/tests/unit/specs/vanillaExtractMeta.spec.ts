import { describe, expect, it } from 'vitest';
import * as publicApi from '../../../src';
import * as blurDeprecated from '../../../src/blur/deprecated';
import * as borderDeprecated from '../../../src/border/deprecated';
import * as colorDeprecated from '../../../src/color/deprecated';
import * as focusDeprecated from '../../../src/focus/deprecated';
import * as fontDeprecated from '../../../src/font/deprecated';
import * as gradientDeprecated from '../../../src/gradient/deprecated';
import * as motionDeprecated from '../../../src/motion/deprecated';
import * as shadowDeprecated from '../../../src/shadow/deprecated';
import * as spacingDeprecated from '../../../src/spacing/deprecated';
import * as typographyDeprecated from '../../../src/typography/deprecated';
import type { VanillaExtractNode } from '../../../vanillaExtractMeta/index';
import { vanillaExtractMeta } from '../../../vanillaExtractMeta/index';

// Recursively collect every leaf meta entry, descending into grouped metas
// (e.g. border.radius, color.background, spacing.fluid, motion.duration, the nested grid tree, …).
const collectEntries = (meta: Record<string, unknown>): VanillaExtractNode[] =>
  Object.values(meta).flatMap((value) =>
    value && typeof value === 'object' && 'name' in value
      ? [value as VanillaExtractNode]
      : collectEntries(value as Record<string, unknown>)
  );

const metaEntries = Object.values(vanillaExtractMeta).flatMap((category) => collectEntries(category));

// A leaf's payload lives under `value` (token) or `styles` (utility).
const payloadOf = (entry: VanillaExtractNode): unknown => ('value' in entry ? entry.value : entry.styles);

// The documented catalog is deprecation-free. Deprecated exports stay public (sourced from the
// `src/<domain>/deprecated` barrels) but are intentionally not documented, so they're excluded
// from the coverage check below rather than tracked in a parallel meta object.
const deprecatedNames = new Set(
  [
    blurDeprecated,
    borderDeprecated,
    colorDeprecated,
    focusDeprecated,
    fontDeprecated,
    gradientDeprecated,
    motionDeprecated,
    shadowDeprecated,
    spacingDeprecated,
    typographyDeprecated,
  ].flatMap((module) => Object.keys(module))
);

// Runtime value exports only — exclude the meta objects themselves (`vanillaExtractMeta` + every `*Meta`).
const isMetaExport = (name: string): boolean => name === 'vanillaExtractMeta' || name.endsWith('Meta');

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

describe('vanillaExtractMeta', () => {
  it('should be the source of truth for the current public API (no undocumented exports)', () => {
    const exportedNames = Object.keys(publicApi)
      .filter((name) => !isMetaExport(name) && !deprecatedNames.has(name))
      .sort();
    const metaNames = [...new Set(metaEntries.map(({ name }) => name))].sort();

    expect(exportedNames).toEqual(metaNames);
  });

  it('should reference the real public export for every entry', () => {
    for (const entry of metaEntries) {
      expect((publicApi as Record<string, unknown>)[entry.name]).toBe(payloadOf(entry));
    }
  });

  it('should match snapshot', () => {
    expect(serializeMeta(vanillaExtractMeta)).toMatchSnapshot();
  });
});
