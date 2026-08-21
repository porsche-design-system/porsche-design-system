import { kindOf } from './kind';
import type { ScssMixin, ScssVariable } from './types';

/**
 * The canonical consumer-facing spelling of a declaration: a variable keeps its `$`-prefixed name, a
 * mixin gains `()`. Authored `replacement` values are derived from a current declaration through
 * this, so a rename cannot leave a deprecation pointing at a name that no longer exists.
 */
export const scssIdentifier = (node: ScssVariable | ScssMixin): string =>
  kindOf(node) === 'token' ? node.name : `${node.name}()`;
