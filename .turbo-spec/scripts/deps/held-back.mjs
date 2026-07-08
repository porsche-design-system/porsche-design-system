// Shared held-back dependency policy — mirrors the `isIgnored` updateGroup in
// .syncpackrc.json. These are upgraded deliberately, never by the automated
// workflow. Kept in one place so every gate agrees.

export const HELD_BACK_PATTERNS = [
  '@porsche-design-system/**',
  '@playwright/test',
  '@stencil/core',
];

/** Convert a syncpack-style glob (`@scope/**`, exact name) to a RegExp. */
function patternToRegExp(pattern) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  // `**` matches anything (including `/`); `*` matches a single path segment.
  const body = escaped.replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*');
  return new RegExp(`^${body}$`);
}

const COMPILED = HELD_BACK_PATTERNS.map(patternToRegExp);

/** True when `name` is on the held-back list. */
export function isHeldBack(name, patterns = HELD_BACK_PATTERNS) {
  const compiled = patterns === HELD_BACK_PATTERNS ? COMPILED : patterns.map(patternToRegExp);
  return compiled.some((re) => re.test(name));
}
