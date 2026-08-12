import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import { expandIncludes } from '../plugins/htmlInclude.ts';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(packageDir, 'src');
const distDir = path.join(packageDir, 'dist');

// Tailwind entry: compiled by the `build:css` script, so it must not be copied verbatim like the other assets.
const cssEntry = 'assets/patterns.css';

/**
 * Expands `@include` directives in every `.html` file and copies all other files verbatim.
 * No bundling, no hashing – the output is plain, relative-path HTML that can be opened anywhere.
 */
const build = (): void => {
  fs.rmSync(distDir, { recursive: true, force: true });

  // Files and folders starting with an underscore (partials, data) are inputs only, never pages.
  const files = fastGlob.sync('**/*', { cwd: srcDir, onlyFiles: true, ignore: ['**/_*', '**/_*/**'] }).sort();

  let pageCount = 0;
  let assetCount = 0;

  for (const relativePath of files) {
    if (relativePath === cssEntry) {
      continue;
    }

    const sourcePath = path.join(srcDir, relativePath);
    const targetPath = path.join(distDir, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });

    if (path.extname(relativePath) === '.html') {
      const html = expandIncludes(fs.readFileSync(sourcePath, 'utf8'), { rootDir: srcDir, filePath: sourcePath });
      fs.writeFileSync(targetPath, html.endsWith('\n') ? html : `${html}\n`);
      pageCount++;
      console.log(`✓ ${relativePath}`);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
      assetCount++;
    }
  }

  console.log(`\nBuilt ${pageCount} page(s), copied ${assetCount} asset(s) → ${path.relative(packageDir, distDir)}`);
};

build();
