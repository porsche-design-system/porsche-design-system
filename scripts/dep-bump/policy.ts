import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Derives the dependency-update policy from .syncpackrc.json so there is a
// single source of truth. `ignored` = permanent holds (isIgnored groups, never
// updated). `minorOnly` = framework/styling families (target: "minor" groups,
// capped to minor/patch — majors are upgraded by hand).
export interface DependencyPolicy {
  ignored: string[];
  minorOnly: string[];
}

interface UpdateGroup {
  dependencies?: string[];
  isIgnored?: boolean;
  target?: string;
}

export function readDependencyPolicy(configPath = resolve(process.cwd(), '.syncpackrc.json')): DependencyPolicy {
  const config = JSON.parse(readFileSync(configPath, 'utf8')) as { updateGroups?: UpdateGroup[] };
  const groups = config.updateGroups ?? [];
  const ignored: string[] = [];
  const minorOnly: string[] = [];
  for (const group of groups) {
    const deps = group.dependencies ?? [];
    if (group.isIgnored) {
      ignored.push(...deps);
    } else if (group.target === 'minor' || group.target === 'patch') {
      minorOnly.push(...deps);
    }
  }
  return { ignored, minorOnly };
}

// Matches a package name against a syncpack dependency pattern. Supports scoped
// globs (`@scope/**`), single-segment prefix globs (`ag-grid-*`), and exact
// names. `*` matches within a path segment only (no `/`), matching syncpack.
export function matchesPattern(name: string, pattern: string): boolean {
  if (pattern.endsWith('/**')) {
    const scope = pattern.slice(0, -3);
    return name === scope || name.startsWith(`${scope}/`);
  }
  if (pattern.endsWith('*')) {
    const prefix = pattern.slice(0, -1);
    if (!name.startsWith(prefix)) return false;
    return !name.slice(prefix.length).includes('/');
  }
  return name === pattern;
}

export function matchesAny(name: string, patterns: string[]): boolean {
  return patterns.some((pattern) => matchesPattern(name, pattern));
}
