import type { TailwindThemeVariable, TailwindUtility } from './types';

// Canonical identity, owned by this package because the custom property versus class spelling is
// exactly what differs between styling solutions. The marker, the wording and the message helpers are
// the shared contract (`@porsche-design-system/shared/deprecation`).

/**
 * The canonical consumer-facing spelling of a leaf: the custom property of a theme variable, the
 * class of a utility. Deliberately unprefixed — `prefix()` wraps an alias's *value* so it resolves
 * under a configured Tailwind prefix, while the declared property stays as written.
 *
 * Authored `replacement` values are derived from a current node through this, so a rename of the
 * recommended API cannot leave a deprecation pointing at a name that no longer exists.
 */
export const tailwindIdentifier = (node: TailwindThemeVariable | TailwindUtility): string =>
  'property' in node ? node.property : node.class;
