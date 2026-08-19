import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Project } from '../plugins/projects.ts';

/**
 * Building a generated project, shared by `verify.ts` and `previewProject.ts`.
 *
 * Both need the same thing – run the generated `vite.config.ts` and get the built site – for different reasons: the
 * one to prove that `dist/` is buildable source, the other to serve the result. Keeping it in one place means the
 * preview cannot drift into building the project differently from the check that guards it.
 */

export const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Where `scripts/build.ts` writes the generated projects. */
export const distDir = path.join(packageDir, 'dist');

/** Throwaway output of the builds below – git-ignored like `dist/`. */
export const scratchDir = path.join(packageDir, 'dist-tmp');

/** Root of a generated project, the working directory its `vite.config.ts` expects. */
export const getProjectDir = (project: Project): string => path.join(distDir, project.category);

/** Where the built site of a generated project ends up. */
export const getOutDir = (project: Project): string => path.join(scratchDir, project.category);

/**
 * Builds one generated project with its own `vite.config.ts`.
 *
 * The config resolves `root` against the working directory, which is how the project is built in the examples
 * repository as well, so it is run from the project root. `--emptyOutDir` is required because the output lands
 * outside that root.
 */
export const buildGeneratedProject = (project: Project): string => {
  const projectDir = getProjectDir(project);

  if (!fs.existsSync(projectDir)) {
    throw new Error(`[examples] "dist/${project.category}" is missing – run the build first`);
  }

  const outDir = getOutDir(project);

  console.log(`\n▸ building ${project.packageName}`);
  execFileSync('npx', ['vite', 'build', '--outDir', outDir, '--emptyOutDir'], {
    cwd: projectDir,
    stdio: 'inherit',
  });

  return outDir;
};
