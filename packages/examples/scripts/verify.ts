import fs from 'node:fs';
import path from 'node:path';
import { projects } from '../plugins/projects.ts';
import { buildGeneratedProject, distDir, packageDir, scratchDir } from './buildGeneratedProject.ts';

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

const verify = (): void => {
  if (!fs.existsSync(distDir)) {
    throw new Error('[examples] "dist" is missing – run the build first');
  }

  fs.rmSync(scratchDir, { recursive: true, force: true });

  for (const project of projects) {
    const outDir = buildGeneratedProject(project);
    const indexHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');

    // The three things the generated config is there for – without them the pages stay invisible and unstyled.
    for (const expected of ['data-pds-loader-script', '<link rel="stylesheet"', 'rel=preload']) {
      if (!indexHtml.includes(expected)) {
        throw new Error(`[examples] the built "${project.category}" overview is missing ${expected}`);
      }
    }
  }

  console.log(`\n✓ ${projects.length} project(s) built → ${path.relative(packageDir, scratchDir)}`);
};

verify();
