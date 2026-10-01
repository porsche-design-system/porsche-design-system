import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { describe, expect, it } from 'vitest';
import { baselinePath, generate } from '../../../figma/generate';
import type { Snapshot } from '../../../figma/snapshot';

// Every generated file, rendered from the frozen pull (npm run figma:freeze) the way figma:generate renders it.
const packageRoot = resolve(__dirname, '../../..');
const snapshotDir = resolve(__dirname, '__snapshots__');
const frozen: Snapshot = JSON.parse(readFileSync(resolve(__dirname, '../fixtures/library.json'), 'utf8'));
const { files } = generate(frozen, JSON.parse(readFileSync(resolve(packageRoot, baselinePath), 'utf8')), {
  getComponentMeta,
  tags: TAG_NAMES.filter((tag) => !(INTERNAL_TAG_NAMES as readonly string[]).includes(tag)),
  outputRoot: 'generated',
  fileUrl: 'https://www.figma.com/design/KEY/Library',
});
const generated = Object.keys(files)
  .filter((file) => file !== baselinePath)
  .sort();
const snapshotOf = (file: string): string => `${basename(file)}.snap`;

describe('generated files', () => {
  it.each(generated)('%s matches its snapshot', async (file) => {
    await expect(files[file]).toMatchFileSnapshot(resolve(snapshotDir, snapshotOf(file)));
  });

  it('has no snapshot left for a file that is no longer generated', () => {
    const expected = new Set(generated.map(snapshotOf));
    // file snapshots are written after this file runs, so a first run finds no folder yet
    const present = existsSync(snapshotDir) ? readdirSync(snapshotDir) : [];
    expect(present.filter((name) => !expected.has(name))).toEqual([]);
  });
});
