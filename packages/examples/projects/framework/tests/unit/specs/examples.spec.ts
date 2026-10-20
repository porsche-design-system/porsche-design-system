import fs from 'node:fs';
import path from 'node:path';
import { FRAMEWORKS } from '@porsche-design-system/shared';
import { assertExampleId } from '../../../lib/ids';
import type { FrameworkExampleMeta } from '../../../lib/meta';
import { exampleAppPaths, sourceFiles } from '../../../lib/sources';

const projectDir = path.resolve(__dirname, '../../..');
const srcDir = path.join(projectDir, 'src');
const packagesDir = path.resolve(projectDir, '../../..');

const metaFiles = fs.globSync('**/meta.ts', { cwd: srcDir }).sort();

const examples = await Promise.all(
  metaFiles.map(async (metaFile) => ({
    id: path.dirname(metaFile).split(path.sep).join('/'),
    meta: ((await import(path.join(srcDir, metaFile))) as { meta: FrameworkExampleMeta }).meta,
  }))
);

describe('src/**/meta.ts', () => {
  it('finds the examples', () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  it.each(examples.map(({ id }) => id))('%s is a valid id', (id) => {
    expect(assertExampleId(id)).toBe(id);
  });

  it.each(examples)('$id has a source in every example app', ({ meta }) => {
    const files = sourceFiles(meta.source);
    for (const framework of FRAMEWORKS) {
      expect(fs.existsSync(path.join(packagesDir, exampleAppPaths[framework], files[framework]))).toBe(true);
    }
  });

  it.each(examples)('$id lists PDS components only', ({ meta }) => {
    for (const component of meta.components) {
      expect(component).toMatch(/^p-[a-z-]+$/);
    }
  });

  it('gives every example a source of its own', () => {
    const reactFiles = examples.map(({ meta }) => sourceFiles(meta.source).react);
    expect(new Set(reactFiles).size).toBe(reactFiles.length);
  });

  it('holds nothing but the meta files and the descriptions next to them', () => {
    const files = fs
      .globSync('**/*', { cwd: srcDir, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => path.relative(srcDir, path.join(entry.parentPath, entry.name)));
    const exampleDirs = new Set(metaFiles.map((file) => path.dirname(file)));

    expect(
      files.filter(
        (file) => !['meta.ts', 'example.mdx'].includes(path.basename(file)) || !exampleDirs.has(path.dirname(file))
      )
    ).toEqual([]);
  });
});
