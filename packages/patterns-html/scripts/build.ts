import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import { expandIncludes } from '../plugins/htmlInclude.ts';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(packageDir, 'src');
const distDir = path.join(packageDir, 'dist');
const partialsDir = '_partials';

/**
 * Expands `@include` directives in every `.html` file and copies all other files verbatim.
 * No bundling, no hashing – the output is plain, relative-path HTML that can be opened anywhere.
 */
const build = (): void => {
  fs.rmSync(distDir, { recursive: true, force: true });

  const files = fastGlob.sync('**/*', { cwd: srcDir, onlyFiles: true, ignore: [`${partialsDir}/**`] }).sort();

  let pageCount = 0;
  let assetCount = 0;

  for (const relativePath of files) {
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
