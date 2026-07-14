import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import type { DepMap } from './classify-bump.ts';

const FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'] as const;

function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' });
}

export function collectDepsFromFiles(files: string[], read: (file: string) => string): DepMap {
  const map: DepMap = {};
  for (const file of files) {
    let raw: string;
    try {
      raw = read(file);
    } catch {
      continue;
    }
    const json = JSON.parse(raw) as Record<string, Record<string, string> | undefined>;
    for (const field of FIELDS) {
      Object.assign(map, json[field] ?? {});
    }
  }
  return map;
}

/** Enumerate tracked package.json files. Requires git — host-only (preflight). */
export function trackedPackageJsonFiles(): string[] {
  return git(['ls-files', '*package.json']).trim().split('\n').filter(Boolean);
}

/**
 * Collect deps for a git ref, or the working tree when ref is null. Requires
 * git for both enumeration and ref reads, so it runs host-side only (F6: the
 * sandbox worktree's .git can point to an unmounted host gitdir).
 */
export function collectDeps(ref: string | null): DepMap {
  const files = trackedPackageJsonFiles();
  return collectDepsFromFiles(files, (file) => (ref ? git(['show', `${ref}:${file}`]) : readFileSync(file, 'utf8')));
}
