import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import prettier from 'prettier';
import {
  getScriptEntry,
  getSharedScripts,
  getStyleEntry,
  type SharedBehaviour,
  scriptEntryTag,
} from '../plugins/entries.ts';
import { type PageModule, pageSuffix, renderPage } from '../plugins/jsx.ts';
import { assetsDirName, type Project, projects, scriptEntryName, styleEntryName } from '../plugins/projects.ts';
import { getPackageJson, getViteConfig, type Versions } from './generateProject.ts';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(packageDir, 'src');
const publicDir = path.join(packageDir, 'public');
const distDir = path.join(packageDir, 'dist');

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

const copyDir = (from: string, to: string, filter?: (sourcePath: string) => boolean): void => {
  if (fs.existsSync(from)) {
    fs.cpSync(from, to, { recursive: true, filter });
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
      writeFile(path.join(projectSrcDir, pageDir, styleEntryName), getStyleEntry(pageDir));
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

  // Both projects are self-contained: the examples repository does not allow imports across its workspaces. Only the
  // shared stylesheet is emitted – the shared `*.js` are build inputs, inlined into the entry of every page using them.
  copyDir(path.join(srcDir, assetsDirName), path.join(projectSrcDir, assetsDirName), (from) => !from.endsWith('.js'));
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
