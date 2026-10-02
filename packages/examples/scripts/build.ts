import fs from 'node:fs';
import path from 'node:path';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import prettier from 'prettier';
import { extractScripts, formatScriptEntry, getScriptEntry } from '../lib/entries.ts';
import { type Examples, exportFileName, getExportModule } from '../lib/exports.ts';
import { getPackageJson, getViteConfig, type Versions } from '../lib/generateProject.ts';
import { type PageModule, pageSuffix, renderPage } from '../lib/jsx.ts';
import { assertExampleMeta, type Example } from '../lib/meta.ts';
import {
  type Category,
  categories,
  getPagePath,
  type PageLocation,
  resolvePageLocation,
  scriptEntryName,
  styleEntryName,
} from '../lib/projects.ts';
import { distDir, generatedDir, listFiles, packageDir, readVersions, srcDir, writeFile } from '../lib/shared.ts';

/**
 * The shared Tailwind entry, copied next to every page as its `style.css`.
 *
 * Read once and written unchanged: it carries no relative path, so the same bytes work at any depth, and Tailwind's
 * automatic source detection scans the page from the root of its generated Vite project.
 */
const sharedStyles = fs.readFileSync(path.join(srcDir, styleEntryName), 'utf8');

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

/**
 * The files a page folder may contain: the page and nothing else.
 *
 * Markup, styles and behaviour of an example are all written in its component, so anything next to it would be a file
 * the generated project silently leaves behind.
 */
const assertPageFolder = (pageSourceDir: string, location: PageLocation): void => {
  const unexpected = fs
    .readdirSync(pageSourceDir, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name !== `index${pageSuffix}`)
    .map((file) => file.name);

  if (unexpected.length > 0) {
    throw new Error(
      `[examples] "${location.category}/${location.pageDir}" contains ${unexpected.join(', ')} – a page folder holds its page only: behaviour belongs into a <Script> of the page, media into public/examples/media/`
    );
  }
};

/**
 * Builds the project of one page and returns it as the package exports it: its meta and the files of its project.
 *
 * `src/patterns/header/overlay/index.page.tsx` becomes `dist/patterns/header/overlay/`, a Vite project with the page
 * as its `index.html`, the generated `main.js` – the `<Script>` elements of the page, moved out of it – and `style.css`
 * next to it, and its own `package.json` and `vite.config.ts`. It is self-contained – nothing is shared between two projects, because each one is handed to
 * StackBlitz on its own.
 */
const buildPage = async (entry: Category, location: PageLocation, versions: Versions): Promise<Example> => {
  const pageSourceDir = path.join(srcDir, location.category, location.pageDir);
  const projectDir = path.join(distDir, location.category, location.pageDir);
  const relativePath = `${location.category}/${location.pageDir}/index${pageSuffix}`;

  assertPageFolder(pageSourceDir, location);

  const pageModule = (await import(path.join(pageSourceDir, `index${pageSuffix}`))) as PageModule;
  const meta = assertExampleMeta(pageModule.meta, relativePath);
  const { html, scripts } = extractScripts(await renderPage(pageModule.default));

  writeFile(path.join(projectDir, 'index.html'), html);
  writeFile(path.join(projectDir, styleEntryName), sharedStyles);
  writeFile(path.join(projectDir, scriptEntryName), await formatScriptEntry(getScriptEntry(scripts)));
  writeFile(
    path.join(projectDir, 'vite.config.ts'),
    await prettier.format(getViteConfig(entry), { parser: 'typescript', printWidth: 120, singleQuote: true })
  );
  writeFile(path.join(projectDir, 'package.json'), getPackageJson(location, versions));

  console.log(`✓ ${relativePath}`);

  // Read back rather than kept from above, so the export carries the files byte for byte as they were written.
  const files = Object.fromEntries(
    listFiles(projectDir).map((file) => [file, fs.readFileSync(path.join(projectDir, file), 'utf8')])
  );

  return { path: getPagePath(location), ...meta, files };
};

/**
 * Renders every `*.page.tsx` file into a Vite project of its own, and writes the package export next to them – every
 * example with its meta and the files of its project (see `lib/exports.ts`).
 *
 * The output is not a website: it is the source `scripts/buildSite.ts` builds, and the project "Open in StackBlitz"
 * hands over – each built by its own generated `vite.config.ts`, which is also what injects the Porsche Design System
 * partials. The export is what the storefront imports and the knowledge skill reads (`skill/skill.ts`), which is why
 * this step needs nothing but the sources: it runs before `build:skills`, the wrappers and `scripts/buildSite.ts`.
 */
const build = async (): Promise<void> => {
  fs.rmSync(distDir, { recursive: true, force: true });

  const versions = readVersions();
  const examples: Examples = {};

  for (const entry of categories) {
    for (const location of locatePages(entry)) {
      const example = await buildPage(entry, location, versions);
      examples[example.path] = example;
    }
  }

  // Bundled into `dist/` afterwards by `rollup.config.mjs`, once the package has been typechecked with it.
  writeFile(path.join(generatedDir, exportFileName), getExportModule(examples));

  console.log(`\nBuilt ${Object.keys(examples).length} project(s) → ${path.relative(packageDir, distDir)}`);
};

await build();
