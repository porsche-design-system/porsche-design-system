import { kindOf } from './kind';
import type { ScssDeclaration } from './types';

// Canonical identity, owned by this package because `$name` versus `name()` is exactly what differs
// between styling solutions. The marker, the wording and the message helpers are the shared contract
// (`@porsche-design-system/shared/deprecation`).

/**
 * The canonical consumer-facing spelling of a declaration: a variable keeps its `$`-prefixed name, a
 * mixin gains `()`. Authored `replacement` values are derived from a current node through this, so a
 * rename of the recommended API cannot leave a deprecation pointing at a name that no longer exists.
 */
export const scssIdentifier = (node: ScssDeclaration): string =>
  kindOf(node) === 'token' ? node.name : `${node.name}()`;
