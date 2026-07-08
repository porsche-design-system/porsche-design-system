import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { WRAPPER_SKILL_DIRS } from '../src/lib/skill/skillTree';

/**
 * Regenerate-and-diff gate. Run *after* `build:skill` has (re)written the four committed skill trees
 * from their current source (`component-meta` / MDX / styles / tokens). If regeneration changed
 * anything the committed trees carried, the working tree is now dirty under `WRAPPER_SKILL_DIRS` and
 * this fails the build — the honest check that the committed snapshot is not stale relative to source.
 *
 * `git status --porcelain` (rather than `git diff`) so additions and deletions of whole files count,
 * not just modifications, and without mutating the index.
 */
const REPO_ROOT = path.resolve(__dirname, '../../..');
const skillDirs = Object.values(WRAPPER_SKILL_DIRS);

const status = execFileSync('git', ['status', '--porcelain', '--', ...skillDirs], {
  cwd: REPO_ROOT,
  encoding: 'utf8',
});

if (status.trim().length > 0) {
  console.error(
    'Committed skill trees are out of date with their source (component-meta / MDX / styles / tokens).\n' +
      'Run `npm run build:skill` and commit the regenerated trees.\n\n' +
      'Drifted paths:\n' +
      status
  );
  try {
    const diff = execFileSync('git', ['--no-pager', 'diff', '--stat', '--', ...skillDirs], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    });
    if (diff.trim().length > 0) {
      console.error(`\nSummary of changes:\n${diff}`);
    }
  } catch {
    // The diff summary is best-effort; the porcelain status above already reported the drift.
  }
  process.exit(1);
}

console.log('Committed skill trees are in sync with their source.');
