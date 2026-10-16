import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getImportSources, getMdxFiles, toRelativePath } from '../helpers/mdxDocs';

const mdxComponentsDir = path.resolve(__dirname, '../../../src/components/mdx');
/** What Markdown syntax renders to, through `mdx-components.tsx`; MDX doesn't import it. */
const ELEMENTS = 'elements';

/**
 * The Storefront modules the MDX components may depend on. The registry (#4142) has to take each one along or replace
 * it, so a new dependency is a deliberate choice; an entry ending in `/` allows a folder.
 */
const STOREFRONT_DEPENDENCIES = [
  '@/components/common/DocsLink',
  '@/components/common/ThemeSelect',
  '@/hooks/useResizeHandle',
  '@/hooks/useStorefrontColorScheme',
  '@/hooks/useStorefrontFramework',
  '@/lib/stackblitz/createStackblitzMarkupFromSample',
  '@/links',
  '@/models/framework',
  '@/models/partials',
  '@/utils/examples',
  '@/utils/exampleMediaOrigin',
  '@/utils/getBasePath',
  '@/utils/getFlags',
  '@/utils/normalizeCodeBlock',
  '@/utils/partials/',
  '@/utils/porscheDesignSystemVersion',
  '@/utils/splitVanillaJsCode',
];

/** Imported by MDX until "Normalize MDX pages" (#4780) turns its uses into Markdown links. */
const ALLOWED_MDX_IMPORTS = ['@/components/common/DocsLink'];

const readDir = (...segments: string[]) =>
  fs.readdirSync(path.join(mdxComponentsDir, ...segments), { withFileTypes: true });

const topics = readDir()
  .filter((entry) => entry.isDirectory() && entry.name !== ELEMENTS)
  .map(({ name }) => name)
  .sort();

/** `content/Notification`, … */
const componentFolders = topics
  .flatMap((topic) =>
    readDir(topic)
      .filter((entry) => entry.isDirectory())
      .map(({ name }) => `${topic}/${name}`)
  )
  .sort();

/** The modules next to the component folders of a topic, or in `elements/`: `framework/FrameworkContent.tsx`, … */
const getHelpers = (folder: string) =>
  readDir(folder)
    .filter((entry) => entry.isFile() && /\.tsx?$/.test(entry.name))
    .map(({ name }) => `${folder}/${name}`);

const helpers = [ELEMENTS, ...topics].flatMap(getHelpers).sort();

/** The first column of the tables of each `### topic/` section of the README: `Notification`, `FrameworkContent.tsx`. */
const getInventory = () => {
  const readme = fs.readFileSync(path.join(mdxComponentsDir, 'README.md'), 'utf8');
  return readme
    .split(/^### /m)
    .slice(1)
    .flatMap((section) => {
      const folder = /^`(\w+)\/`/.exec(section)?.[1];
      return folder ? [...section.matchAll(/^\| `([\w.]+)`/gm)].map(([, name]) => `${folder}/${name}`) : [];
    })
    .sort();
};

const componentImports = getMdxFiles().flatMap((file) =>
  getImportSources(file)
    .filter((source) => source.startsWith('@/components/'))
    .map((source) => ({ file: toRelativePath(file), source }))
);

const storefrontImports = fs
  .readdirSync(mdxComponentsDir, { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.tsx?$/.test(file))
  .flatMap((file) =>
    Array.from(
      fs.readFileSync(path.join(mdxComponentsDir, file), 'utf8').matchAll(/from '(@\/[^']+)'/g),
      ([, source]) => ({ file, source })
    )
  );

describe('MDX components', () => {
  it('are imported by MDX from their folder: @/components/mdx/<topic>/<Name>', () => {
    const invalidImports = componentImports.filter(
      ({ source }) =>
        !ALLOWED_MDX_IMPORTS.includes(source) && !componentFolders.includes(source.replace('@/components/mdx/', ''))
    );

    expect(
      invalidImports.map(({ file, source }) => `${file}: ${source}`),
      'MDX imports components only from their folder, not their modules, the helpers or elements/.'
    ).toEqual([]);
  });

  it('each have a folder with a module of the same name and an index', () => {
    expect(
      componentFolders.filter((folder) => {
        const name = path.basename(folder);
        return (
          !fs.existsSync(path.join(mdxComponentsDir, folder, 'index.ts')) ||
          !['tsx', 'ts'].some((ext) => fs.existsSync(path.join(mdxComponentsDir, folder, `${name}.${ext}`)))
        );
      })
    ).toEqual([]);
  });

  it('are all used by MDX', () => {
    const usedFolders = new Set(componentImports.map(({ source }) => source.replace('@/components/mdx/', '')));

    expect(componentFolders.filter((folder) => !usedFolders.has(folder))).toEqual([]);
  });

  it('and their helpers are all listed in the inventory of the README, under their topic', () => {
    expect(getInventory()).toEqual([...componentFolders, ...helpers].sort());
  });

  it('depend only on the Storefront modules listed here', () => {
    const undeclared = storefrontImports.filter(
      ({ source }) =>
        !STOREFRONT_DEPENDENCIES.some((dependency) =>
          dependency.endsWith('/') ? source.startsWith(dependency) : source === dependency
        )
    );

    expect(
      undeclared.map(({ file, source }) => `${file}: ${source}`),
      'Import other MDX components relatively; add a new Storefront dependency to STOREFRONT_DEPENDENCIES on purpose.'
    ).toEqual([]);
  });
});
