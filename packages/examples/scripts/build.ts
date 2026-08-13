import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import { type PageModule, pageSuffix, renderPage } from '../plugins/jsx.ts';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(packageDir, 'src');
const distDir = path.join(packageDir, 'dist');

// Tailwind entry: compiled by the `build:css` script, so it must not be copied verbatim like the other assets.
const cssEntry = 'assets/styles.css';

/**
 * Renders every `*.page.tsx` file to `index.html` and copies all other files verbatim.
 * No bundling, no hashing – the output is plain, relative-path HTML that can be opened anywhere.
 */
const build = async (): Promise<void> => {
  fs.rmSync(distDir, { recursive: true, force: true });

  // Files and folders starting with an underscore (layouts, partials, data) are inputs only, never pages.
  const files = fastGlob.sync('**/*', { cwd: srcDir, onlyFiles: true, ignore: ['**/_*', '**/_*/**'] }).sort();

  let pageCount = 0;
  let assetCount = 0;

  for (const relativePath of files) {
    if (relativePath === cssEntry) {
      continue;
    }

    const sourcePath = path.join(srcDir, relativePath);

    if (relativePath.endsWith(pageSuffix)) {
      // `foo/index.page.tsx` → `foo/index.html`, so the output URLs match the twins exactly.
      const targetPath = path.join(distDir, `${relativePath.slice(0, -pageSuffix.length)}.html`);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });

      const pageModule = (await import(sourcePath)) as PageModule;
      const html = await renderPage(pageModule.default);
      fs.writeFileSync(targetPath, html.endsWith('\n') ? html : `${html}\n`);
      pageCount++;
      console.log(`✓ ${relativePath}`);
      continue;
    }

    // Any other TypeScript file is a build-time input (helpers, types) and has no place in the output.
    if (/\.tsx?$/.test(relativePath)) {
      continue;
    }

    const targetPath = path.join(distDir, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
    assetCount++;
  }

  console.log(`\nBuilt ${pageCount} page(s), copied ${assetCount} asset(s) → ${path.relative(packageDir, distDir)}`);
};

await build();
