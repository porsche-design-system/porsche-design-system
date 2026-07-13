import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import type { DepMap } from './classify-bump.ts';

const FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'] as const;

function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' });
}

export function collectDeps(ref: string | null): DepMap {
  const files = git(['ls-files', '*package.json']).trim().split('\n').filter(Boolean);
  const map: DepMap = {};
  for (const file of files) {
    let raw: string;
    try {
      raw = ref ? git(['show', `${ref}:${file}`]) : readFileSync(file, 'utf8');
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
