import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getImportSources, getMdxFiles, toRelativePath } from '../helpers/mdxDocs';

const mdxComponentsDir = path.resolve(__dirname, '../../../src/components/mdx');
const SHARED = 'shared';

/** Imported by MDX until "Normalize MDX pages" (#4780) turns its uses into Markdown links. */
const ALLOWED_STOREFRONT_IMPORTS = ['@/components/common/DocsLink'];

const componentFolders = fs
  .readdirSync(mdxComponentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== SHARED)
  .map(({ name }) => name)
  .sort();

const sharedModules = fs
  .readdirSync(path.join(mdxComponentsDir, SHARED))
  .map((file) => path.parse(file).name)
  .sort();

/** The first column of the inventory tables in the README: `Notification`, … – split at the `### Shared` section. */
const getInventory = () => {
  const readme = fs.readFileSync(path.join(mdxComponentsDir, 'README.md'), 'utf8');
  const [components, shared] = readme.split('## Inventory')[1].split('### Shared');
  const firstColumn = (markdown: string) => [...markdown.matchAll(/^\| `(\w+)`/gm)].map(([, name]) => name).sort();
  return { components: firstColumn(components), shared: firstColumn(shared) };
};

const componentImports = getMdxFiles().flatMap((file) =>
  getImportSources(file)
    .filter((source) => source.startsWith('@/components/'))
    .map((source) => ({ file: toRelativePath(file), source }))
);

describe('MDX components', () => {
  it('are imported by MDX from their own file in src/components/mdx', () => {
    const invalidImports = componentImports.filter(({ source }) => {
      const folder = /^@\/components\/mdx\/(\w+)\/\1$/.exec(source)?.[1];
      return !ALLOWED_STOREFRONT_IMPORTS.includes(source) && !(folder && componentFolders.includes(folder));
    });

    expect(
      invalidImports.map(({ file, source }) => `${file}: ${source}`),
      'Import MDX components from `@/components/mdx/<Name>/<Name>`; `shared/` is not for MDX.'
    ).toEqual([]);
  });

  it('each have a folder with a module of the same name', () => {
    expect(
      componentFolders.filter(
        (folder) => !['tsx', 'ts'].some((ext) => fs.existsSync(path.join(mdxComponentsDir, folder, `${folder}.${ext}`)))
      )
    ).toEqual([]);
  });

  it('are all used by MDX', () => {
    const usedFolders = new Set(componentImports.map(({ source }) => source.split('/')[3]));

    expect(componentFolders.filter((folder) => !usedFolders.has(folder))).toEqual([]);
  });

  it('are all listed in the inventory of the README', () => {
    const inventory = getInventory();

    expect(inventory.components).toEqual(componentFolders);
    expect(inventory.shared).toEqual(sharedModules);
  });
});
