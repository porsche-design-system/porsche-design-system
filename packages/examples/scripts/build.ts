import fs from 'node:fs';
import path from 'node:path';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import prettier from 'prettier';
import { getScriptEntry, getSharedScripts, type SharedBehaviour, scriptEntryTag } from '../plugins/entries.ts';
import { type PageModule, pageSuffix, renderPage } from '../plugins/jsx.ts';
import {
  assetsDirName,
  type Category,
  categories,
  type PageLocation,
  resolvePageLocation,
  scriptEntryName,
  sharedStyleName,
  styleEntryName,
} from '../plugins/projects.ts';
import { getPackageJson, getViteConfig, type Versions } from './generateProject.ts';
import { distDir, packageDir, srcDir, writeFile } from './shared.ts';

/**
 * The shared Tailwind entry, copied next to every page as its `style.css`.
 *
 * Read once and written unchanged: it carries no relative path, so the same bytes work at any depth, and Tailwind's
 * automatic source detection scans the page from the root of its generated Vite project.
 */
const sharedStyles = fs.readFileSync(path.join(srcDir, assetsDirName, sharedStyleName), 'utf8');

/** Dependency versions of the generated projects – taken from this package, so they cannot drift apart. */
const readVersions = (): Versions => {
  const { dependencies, devDependencies } = JSON.parse(
    fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8')
  ) as { dependencies?: Versions; devDependencies?: Versions };

  return { ...dependencies, ...devDependencies };
};

/**
 * The shared behaviour a page needs, read from `src/assets/`.
 *
 * It is inlined into the page's entry instead of being imported from there, so an example is one file to read; the
 * source of a snippet stays single, it is just not emitted.
 */
const readSharedBehaviour = (html: string): SharedBehaviour[] =>
  getSharedScripts(html).map((fileName) => ({
    fileName,
    content: fs.readFileSync(path.join(srcDir, assetsDirName, fileName), 'utf8'),
  }));

/**
 * The pages of a category, located and checked.
 *
 * Every page becomes a project of its own, so two shapes are rejected that the per-category projects used to allow:
 * a page at the root of a category, whose project would contain every other page of it, and a page inside the folder
 * of another one, whose project would end up inside the other project.
 */
const locatePages = (entry: Category): PageLocation[] => {
  const locations = fastGlob
    .sync(`**/*${pageSuffix}`, { cwd: path.join(srcDir, entry.category), onlyFiles: true, ignore: ['**/_*/**'] })
    .sort()
    .map((relativePath) => {
      const location = resolvePageLocation(`${entry.category}/${relativePath}`);
      if (!location) {
        throw new Error(
          `[examples] "${entry.category}/${relativePath}" sits at the root of its category – every page needs a folder of its own, because it becomes a project of its own`
        );
      }
      return location;
    });

  for (const { pageDir } of locations) {
    const parent = locations.find((other) => pageDir.startsWith(`${other.pageDir}/`));
    if (parent) {
      throw new Error(
        `[examples] "${entry.category}/${pageDir}" is nested inside the page "${entry.category}/${parent.pageDir}" – their projects would overlap`
      );
    }
  }

  return locations;
};

/** The files a page folder may contain: the page, the behaviour authored next to it, and nothing that is emitted. */
const assertPageFolder = (pageSourceDir: string, location: PageLocation): void => {
  const unexpected = fs
    .readdirSync(pageSourceDir, { withFileTypes: true })
    .filter((file) => file.isFile() && !file.name.endsWith(pageSuffix) && file.name !== scriptEntryName)
    .map((file) => file.name);

  if (unexpected.length > 0) {
    throw new Error(
      `[examples] "${location.category}/${location.pageDir}" contains ${unexpected.join(', ')} – a page folder holds its page and its ${scriptEntryName} only; media belong into public/examples/media/`
    );
  }
};

/**
 * Builds the project of one page.
 *
 * `src/patterns/header/overlay/index.page.tsx` becomes `dist/patterns/header/overlay/`, a Vite project with the page
 * as its `index.html`, the generated `main.js` and `style.css` next to it, and its own `package.json` and
 * `vite.config.ts`. It is self-contained – nothing is shared between two projects, because each one is handed to
 * StackBlitz on its own.
 */
const buildPage = async (entry: Category, location: PageLocation, versions: Versions): Promise<void> => {
  const pageSourceDir = path.join(srcDir, location.category, location.pageDir);
  const projectDir = path.join(distDir, location.category, location.pageDir);
  const relativePath = `${location.category}/${location.pageDir}/index${pageSuffix}`;

  assertPageFolder(pageSourceDir, location);

  const pageModule = (await import(path.join(pageSourceDir, `index${pageSuffix}`))) as PageModule;
  const html = await renderPage(pageModule.default);

  if (!html.includes(scriptEntryTag)) {
    throw new Error(`[examples] "${relativePath}" does not reference its entry – is it using one of the layouts?`);
  }

  // Behaviour authored next to the page is inlined into the generated entry, like the shared one, so a page keeps
  // exactly one script – markup, utilities and behaviour of an example are read in one place.
  const behaviourPath = path.join(pageSourceDir, scriptEntryName);
  const behaviour = fs.existsSync(behaviourPath) ? fs.readFileSync(behaviourPath, 'utf8') : undefined;

  writeFile(path.join(projectDir, 'index.html'), html);
  writeFile(path.join(projectDir, styleEntryName), sharedStyles);
  writeFile(
    path.join(projectDir, scriptEntryName),
    getScriptEntry({ behaviour, sharedBehaviour: readSharedBehaviour(html) })
  );
  writeFile(
    path.join(projectDir, 'vite.config.ts'),
    await prettier.format(getViteConfig(entry), { parser: 'typescript', printWidth: 120, singleQuote: true })
  );
  writeFile(path.join(projectDir, 'package.json'), getPackageJson(location, versions));

  console.log(`✓ ${relativePath}`);
};

/**
 * Renders every `*.page.tsx` file into a Vite project of its own.
 *
 * The output is not a website: it is the source `scripts/buildSite.ts` builds, and the project "Open in StackBlitz"
 * hands over – each built by its own generated `vite.config.ts`, which is also what injects the Porsche Design System
 * partials.
 */
const build = async (): Promise<void> => {
  fs.rmSync(distDir, { recursive: true, force: true });

  const versions = readVersions();
  let pageCount = 0;

  for (const entry of categories) {
    for (const location of locatePages(entry)) {
      await buildPage(entry, location, versions);
      pageCount++;
    }
  }

  console.log(`\nBuilt ${pageCount} project(s) → ${path.relative(packageDir, distDir)}`);
};

await build();
