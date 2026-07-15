import { coerce, diff as semverDiff, gt } from 'semver';

// Shared semver classification used by both datasets: the "updated" list
// (classify-bump.ts) tags each applied change, and the "held-back" list
// (held-back.ts) tags each available-but-not-applied gap. Kept in one place so
// the two tables label bumps identically.

export type SemverLevel = 'major' | 'minor' | 'patch' | 'prerelease' | 'unknown';

const LEVELS: Record<string, SemverLevel> = {
  major: 'major',
  premajor: 'major',
  minor: 'minor',
  preminor: 'minor',
  patch: 'patch',
  prepatch: 'patch',
  prerelease: 'prerelease',
};

// Classifies the jump from `from` to `to`. Ranges/prefixes (^, ~, workspace:*)
// are coerced to their base version; a pre-<level> jump is folded to <level>
// (a 2.0.0-beta major is still a major). Returns 'unknown' if either side is
// unparseable so callers never mislabel a bump.
export function classifyLevel(from: string, to: string): SemverLevel {
  const a = coerce(from);
  const b = coerce(to);
  if (!a || !b) return 'unknown';
  const level = semverDiff(a.version, b.version);
  if (level === null) return 'patch'; // equal base versions (e.g. range-only change)
  return LEVELS[level] ?? 'unknown';
}

// True when `to` is a strictly greater version than `from` (after coercion).
export function isNewer(from: string, to: string): boolean {
  const a = coerce(from);
  const b = coerce(to);
  if (!a || !b) return false;
  return gt(b, a);
}
