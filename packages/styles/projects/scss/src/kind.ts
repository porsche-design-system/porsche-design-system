import type { ScssNode } from './types';

// The token/utility axis, recovered per leaf instead of grouped at the top level. A documented
// `ScssVariable` (has `value`) is always a `token`; a `ScssMixin` (has `raw`) is always a `utility`.
// This is the shared discriminant the skill generator and the future cross-solution renderer use.

/** Whether a leaf is a referenceable value (`token`) or a reusable applied style (`utility`). */
export type ScssKind = 'token' | 'utility';

/** Derive a leaf's {@link ScssKind} from its shape (`value` → token, otherwise `utility`). */
export const kindOf = (node: ScssNode): ScssKind => ('value' in node ? 'token' : 'utility');
