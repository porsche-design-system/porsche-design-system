import { readFileSync } from 'node:fs';
import { collectDepsFromFiles, trackedPackageJsonFiles } from './collect-deps.ts';
import { writeVerdict } from './lib/verdict.ts';

/**
 * Host-side (preflight) snapshot of everything the in-sandbox classify step
 * needs, so the update stage never calls git (F6: the sandbox worktree's .git
 * can point to an unmounted host gitdir). Preflight asserts a clean, reproducible
 * tree, so the working-tree read here equals the committed HEAD baseline.
 *
 * Writes:
 *   - package-json-files.json: the tracked package.json paths to re-read on disk
 *   - deps-baseline.json:      the merged pre-bump DepMap
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const files = trackedPackageJsonFiles();
  const deps = collectDepsFromFiles(files, (file) => readFileSync(file, 'utf8'));
  writeVerdict('package-json-files.json', { schemaVersion: 1, files });
  writeVerdict('deps-baseline.json', { schemaVersion: 1, deps });
  process.stdout.write(`[snapshot] ${files.length} package.json files, ${Object.keys(deps).length} deps\n`);
}
