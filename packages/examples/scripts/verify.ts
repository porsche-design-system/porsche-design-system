import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../plugins/projects.ts';

/**
 * Builds every generated project, to prove that `dist/` really is buildable source.
 *
 * The output of `scripts/build.ts` is not a website – opening it in a browser shows unstyled markup, because the
 * stylesheet, the bundle and the Porsche Design System partials are added by the generated `vite.config.ts`. This
 * script runs exactly that config, so a broken entry, a missing input or an unresolvable import fails here instead of
 * in the examples repository.
 *
 * The result is throwaway: it is written to `dist-tmp/`, which is git-ignored like `dist/`.
 */

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(packageDir, 'dist');
const scratchDir = path.join(packageDir, 'dist-tmp');

const verify = (): void => {
  if (!fs.existsSync(distDir)) {
    throw new Error('[examples] "dist" is missing – run the build first');
  }

  fs.rmSync(scratchDir, { recursive: true, force: true });

  for (const { category, packageName } of projects) {
    const projectDir = path.join(distDir, category);
    const outDir = path.join(scratchDir, category);

    console.log(`\n▸ building ${packageName}`);
    // The generated config resolves `root` against the working directory, which is how the project is built in the
    // examples repository as well. `--emptyOutDir` is required because the scratch directory is outside that root.
    execFileSync('npx', ['vite', 'build', '--outDir', outDir, '--emptyOutDir'], {
      cwd: projectDir,
      stdio: 'inherit',
    });

    const indexHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');

    // The three things the generated config is there for – without them the pages stay invisible and unstyled.
    for (const expected of ['data-pds-loader-script', '<link rel="stylesheet"', 'rel=preload']) {
      if (!indexHtml.includes(expected)) {
        throw new Error(`[examples] the built "${category}" overview is missing ${expected}`);
      }
    }
  }

  console.log(`\n✓ ${projects.length} project(s) built → ${path.relative(packageDir, scratchDir)}`);
};

verify();
