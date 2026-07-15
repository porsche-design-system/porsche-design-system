export interface Overrides {
  [key: string]: string | Overrides;
}

// Override keys may pin a single major via a trailing `@<major>` (e.g.
// "minimatch@9"). Scoped names start with "@", so only strip an "@<digits>"
// suffix, never the leading scope "@".
export function overrideBaseName(key: string): string {
  const at = key.lastIndexOf('@');
  if (at > 0 && /^\d+$/.test(key.slice(at + 1))) return key.slice(0, at);
  return key;
}

function childBaseNames(value: string | Overrides): string[] {
  if (typeof value === 'string') return [];
  return Object.keys(value).map(overrideBaseName);
}

// Targeted scope: only re-validate overrides related to THIS run's bumps, so the
// (expensive) relax→reinstall loop stays bounded. An override is a candidate when
// its own base name is in changedNames, or any object-form child is.
export function selectPruneCandidates(overrides: Overrides, changedNames: string[]): string[] {
  const changed = new Set(changedNames);
  const candidates = new Set<string>();
  for (const [key, value] of Object.entries(overrides)) {
    if (changed.has(overrideBaseName(key)) || childBaseNames(value).some((n) => changed.has(n))) {
      candidates.add(key);
    }
  }
  return [...candidates].sort();
}

export function shouldRemoveOverride(installClean: boolean, auditRegressed: boolean): boolean {
  return installClean && !auditRegressed;
}
