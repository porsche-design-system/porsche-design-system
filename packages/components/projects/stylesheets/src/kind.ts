import type { StylesheetNode } from './types';

// The token/utility axis, recovered per leaf instead of grouped at the top level. A documented
// CSS variable (`CssVariableMeta`, carries `property`) is always a `token`; a `.scheme-*` class
// (`ColorSchemeClassMeta`, carries `selector`) is always a `utility`. This is the shared
// discriminant the (future) skill generator and cross-solution renderer use.

/** Whether a leaf is a referenceable value (`token`) or a reusable applied style (`utility`). */
export type StylesheetKind = 'token' | 'utility';

/** Derive a leaf's {@link StylesheetKind} from its shape (`property` → token, otherwise `utility`). */
export const kindOf = (node: StylesheetNode): StylesheetKind => ('property' in node ? 'token' : 'utility');
