import type { TailwindNode } from './types';

// The token/utility axis, recovered per leaf instead of grouped at the top level. A documented
// `TailwindThemeVariable` (has `value`) is always a `token`; a `TailwindUtility` (no `value`) is
// always a `utility`. This is the shared discriminant the skill generator and the future
// cross-solution renderer use, mirroring the scss `kindOf`.

/** Whether a leaf is a referenceable value (`token`) or a reusable applied style (`utility`). */
export type TailwindKind = 'token' | 'utility';

/** Derive a leaf's {@link TailwindKind} from its shape (`value` → token, otherwise `utility`). */
export const kindOf = (node: TailwindNode): TailwindKind => ('value' in node ? 'token' : 'utility');
