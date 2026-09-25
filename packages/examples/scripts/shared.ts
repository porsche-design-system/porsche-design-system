import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import { categories, type PageLocation } from '../plugins/projects.ts';
import { mediaPath } from '../src/_media.ts';

/**
 * Paths and file helpers shared by the scripts of this package.
 *
 * ```text
 * dist/        # scripts/build.ts     – one Vite project per page, the StackBlitz source
 * dist-site/   # scripts/buildSite.ts – one self-contained HTML file per page, what the storefront serves
 * dist-tmp/    # scripts/previewSite.ts – dist-site/ rewritten to the local CDN, never shipped
 * ```
 *
 * All three are git-ignored.
 */

export const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const srcDir = path.join(packageDir, 'src');
export const distDir = path.join(packageDir, 'dist');
export const siteDir = path.join(packageDir, 'dist-site');
export const scratchDir = path.join(packageDir, 'dist-tmp');

/** The media of the examples, below `public/` at the very path the pages reference them by – see `src/_media.ts`. */
export const mediaSourceDir = path.join(packageDir, 'public', mediaPath);

/** Where `scripts/buildSite.ts` puts the media: once, next to the categories, as `public/examples/media/` does. */
export const siteMediaDir = path.join(siteDir, path.basename(mediaPath));

export const writeFile = (filePath: string, content: string): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`);
};

/**
 * Sets the modes of an emitted tree explicitly: `755` for folders, `644` for files.
 *
 * `fs.cpSync()` carries the mode of every source file over, and a bind mount does not always report a sane one – in
 * the Playwright container the copied media came out write-only, which made the server answer its own images with a
 * permission error and a VRT baseline record a page without them. What is emitted here are public static files, so
 * their modes are decided rather than inherited.
 */
const normalizePermissions = (target: string): void => {
  fs.chmodSync(target, 0o755);

  for (const entry of fs.readdirSync(target, { withFileTypes: true, recursive: true })) {
    fs.chmodSync(path.join(entry.parentPath, entry.name), entry.isDirectory() ? 0o755 : 0o644);
  }
};

export const copyDir = (from: string, to: string): void => {
  fs.cpSync(from, to, { recursive: true });
  normalizePermissions(to);
};

/** Every file below a folder, relative to it, sorted – `index.html`, `main.js`, … */
export const listFiles = (dir: string): string[] => fastGlob.sync('**/*', { cwd: dir, onlyFiles: true }).sort();

/**
 * The generated projects in `dist/`, one per page, found by their `package.json`.
 *
 * Read from the output rather than from the source tree, so `buildSite.ts` and `verify.ts` handle exactly what
 * `build.ts` wrote – a page that failed to generate is missing here, not silently rebuilt from a stale folder.
 */
export const listProjects = (): PageLocation[] =>
  categories.flatMap(({ category }) =>
    fastGlob
      .sync('**/package.json', { cwd: path.join(distDir, category), onlyFiles: true })
      .sort()
      .map((packageJsonPath) => ({ category, pageDir: path.dirname(packageJsonPath) }))
  );
