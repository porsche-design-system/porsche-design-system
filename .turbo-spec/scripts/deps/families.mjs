// Shared lockstep-family policy — the single source of truth mirroring the
// "Lockstep families" table in .github/skills/pds-planning-policy/SKILL.md.
// A family is applied all-or-nothing (include every reported member or defer the
// whole family). Kept in one place so the planner skill and the check-families
// gate agree.

export const FAMILIES = {
  angular: ['@angular/**', 'ng-packagr', 'zone.js'],
  react: ['react', 'react-dom', '@types/react', '@types/react-dom'],
  'react-router': ['react-router', 'react-router-dom', '@react-router/**'],
  tailwind: ['tailwindcss', '@tailwindcss/**'],
  'ag-grid': [
    'ag-grid-community',
    'ag-grid-enterprise',
    'ag-grid-angular',
    'ag-grid-react',
    'ag-grid-vue3',
  ],
  'vanilla-extract': ['@vanilla-extract/**'],
  next: ['next', '@next/**'],
  vitest: ['vitest', '@vitest/ui'],
};

/** Convert a syncpack-style glob (`@scope/**`, exact name) to a RegExp. */
function patternToRegExp(pattern) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  // `**` matches anything (including `/`); `*` matches a single path segment.
  const body = escaped.replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*');
  return new RegExp(`^${body}$`);
}

const COMPILED = Object.entries(FAMILIES).map(([family, patterns]) => [
  family,
  patterns.map(patternToRegExp),
]);

/** The lockstep family a dependency belongs to, or `'other'`. */
export function familyOf(name) {
  for (const [family, regexps] of COMPILED) {
    if (regexps.some((re) => re.test(name))) return family;
  }
  return 'other';
}

/**
 * Group a list of dependency names by their lockstep family, excluding `'other'`.
 * @param {string[]} names
 * @returns {Map<string, string[]>} family -> member names
 */
export function membersByFamily(names) {
  const byFamily = new Map();
  for (const name of names) {
    const family = familyOf(name);
    if (family === 'other') continue;
    if (!byFamily.has(family)) byFamily.set(family, []);
    byFamily.get(family).push(name);
  }
  return byFamily;
}
