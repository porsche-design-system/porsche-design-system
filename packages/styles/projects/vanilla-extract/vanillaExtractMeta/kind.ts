import type { VanillaExtractNode } from './types';

// The token/utility axis, recovered per leaf instead of grouped at the top level. A documented
// `VanillaExtractToken` (has `value`) is always a `token`; a `VanillaExtractUtility` (has `styles`) is
// always a `utility`. This is the shared discriminant the skill generator and cross-solution renderer use.

/** Whether a leaf is a referenceable value (`token`) or a reusable applied style (`utility`). */
export type VanillaExtractKind = 'token' | 'utility';

/** Derive a leaf's {@link VanillaExtractKind} from its shape (`value` → token, otherwise `utility`). */
export const kindOf = (node: VanillaExtractNode): VanillaExtractKind => ('value' in node ? 'token' : 'utility');
