import type { StylesheetNode } from './types';

// Canonical identity, owned by this package because the custom property versus selector spelling is
// exactly what differs between styling solutions. The marker, the wording and the comment generator
// are the shared contract (`@porsche-design-system/shared/deprecation`).

/**
 * The canonical consumer-facing spelling of a declaration: the custom property of a CSS variable,
 * the selector of a color-scheme class. Discriminated by `property` rather than through `kindOf` so
 * the leaf type narrows, which is the same discriminant `kindOf` reads.
 *
 * Authored `replacement` values are derived from a current node through this, so a rename of the
 * recommended API cannot leave a deprecation pointing at a name that no longer exists.
 */
export const stylesheetIdentifier = (node: StylesheetNode): string =>
  'property' in node ? node.property : node.selector;
