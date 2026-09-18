import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import prettier from 'prettier';
import { getScriptEntry, getSharedScripts, type SharedBehaviour, scriptEntryTag } from '../plugins/entries.ts';
import { type PageModule, pageSuffix, renderPage } from '../plugins/jsx.ts';
import {
  assetsDirName,
  type Project,
  projects,
  scriptEntryName,
  sharedStyleName,
  styleEntryName,
} from '../plugins/projects.ts';
import { getPackageJson, getViteConfig, type Versions } from './generateProject.ts';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(packageDir, 'src');
const publicDir = path.join(packageDir, 'public');
const distDir = path.join(packageDir, 'dist');

/**
 * The shared Tailwind entry, copied next to every page as its `style.css`.
 *
 * Read once and written unchanged: it carries no relative path, so the same bytes work at any depth, and Tailwind's
 * automatic source detection scans the pages from the root of the generated Vite project.
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

const writeFile = (filePath: string, content: string): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`);
};

/**
 * Sets the modes of an emitted tree explicitly: `755` for folders, `644` for files.
 *
 * `fs.cpSync()` carries the mode of every source file over, and a bind mount does not always report a sane one – in
 * the Playwright container the copied assets come out write-only, which makes the generated project answer its own
 * images with a permission error and a VRT baseline record a page without them. What is emitted here are public
 * static files, so their modes are decided rather than inherited.
 */
const normalizePermissions = (target: string): void => {
  fs.chmodSync(target, 0o755);

  for (const entry of fs.readdirSync(target, { withFileTypes: true, recursive: true })) {
    fs.chmodSync(path.join(entry.parentPath, entry.name), entry.isDirectory() ? 0o755 : 0o644);
  }
};

const copyDir = (from: string, to: string): void => {
  if (fs.existsSync(from)) {
    fs.cpSync(from, to, { recursive: true });
    normalizePermissions(to);
  }
};

/**
 * Builds one project: the pages of a category plus everything that makes the output a Vite project of its own.
 *
 * `src/patterns/header/overlay/index.page.tsx` becomes `dist/patterns/src/header/overlay/index.html`, so a page sits
 * as deep below its category root in both trees and the relative paths of the pages carry over unchanged.
 */
const buildProject = async (project: Project, versions: Versions): Promise<number> => {
  const categoryDir = path.join(srcDir, project.category);
  const projectDir = path.join(distDir, project.category);
  const projectSrcDir = path.join(projectDir, 'src');

  // Files and folders starting with an underscore (layouts, partials, data) are inputs only, never pages.
  const files = fastGlob.sync('**/*', { cwd: categoryDir, onlyFiles: true, ignore: ['**/_*', '**/_*/**'] }).sort();
  const pageDirs: string[] = [];

  for (const relativePath of files) {
    const sourcePath = path.join(categoryDir, relativePath);
    const dirName = path.dirname(relativePath);
    // `path.dirname()` answers "." for a file at the root of the category, which is the root of the project here.
    const pageDir = dirName === '.' ? '' : dirName;

    if (relativePath.endsWith(pageSuffix)) {
      const pageModule = (await import(sourcePath)) as PageModule;
      const html = await renderPage(pageModule.default);

      if (!html.includes(scriptEntryTag)) {
        throw new Error(`[examples] "${relativePath}" does not reference its entry – is it using one of the layouts?`);
      }

      // Behaviour authored next to the page is inlined into the generated entry, like the shared one, so a page keeps
      // exactly one script – markup, utilities and behaviour of an example are read in one place.
      const behaviourPath = path.join(categoryDir, pageDir, scriptEntryName);
      const behaviour = fs.existsSync(behaviourPath) ? fs.readFileSync(behaviourPath, 'utf8') : undefined;

      writeFile(path.join(projectSrcDir, pageDir, 'index.html'), html);
      writeFile(path.join(projectSrcDir, pageDir, styleEntryName), sharedStyles);
      writeFile(
        path.join(projectSrcDir, pageDir, scriptEntryName),
        getScriptEntry({ behaviour, sharedBehaviour: readSharedBehaviour(html) })
      );

      pageDirs.push(pageDir);
      console.log(`✓ ${project.category}/${relativePath}`);
      continue;
    }

    // The behaviour of a page is consumed by its generated entry; any other TypeScript file is a build-time input.
    if (path.basename(relativePath) === scriptEntryName || /\.tsx?$/.test(relativePath)) {
      continue;
    }

    fs.mkdirSync(path.dirname(path.join(projectSrcDir, relativePath)), { recursive: true });
    fs.copyFileSync(sourcePath, path.join(projectSrcDir, relativePath));
  }

  // Both projects are self-contained: the examples repository does not allow imports across its workspaces. Nothing
  // from `assets/` is emitted – the shared styles and scripts are build inputs, inlined into the entries of the pages
  // using them, so an example is one page of markup, one stylesheet and one script.
  copyDir(publicDir, path.join(projectDir, 'public'));

  writeFile(
    path.join(projectDir, 'vite.config.ts'),
    await prettier.format(getViteConfig(project, pageDirs), {
      parser: 'typescript',
      printWidth: 120,
      singleQuote: true,
    })
  );
  writeFile(path.join(projectDir, 'package.json'), getPackageJson(project, versions));

  return pageDirs.length;
};

/**
 * Renders every `*.page.tsx` file to `index.html` and writes the two Vite projects around them.
 *
 * The output is not a website: it is the source of `@porsche-design-system/patterns` and
 * `@porsche-design-system/templates`, each built by its own generated `vite.config.ts` – which is also what injects
 * the Porsche Design System partials.
 */
const build = async (): Promise<void> => {
  fs.rmSync(distDir, { recursive: true, force: true });

  const versions = readVersions();
  let pageCount = 0;

  for (const project of projects) {
    pageCount += await buildProject(project, versions);
  }

  console.log(`\nBuilt ${pageCount} page(s) in ${projects.length} project(s) → ${path.relative(packageDir, distDir)}`);
};

await build();
