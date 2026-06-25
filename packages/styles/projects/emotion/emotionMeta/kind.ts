import type { EmotionNode } from './types';

// The token/utility axis, recovered per leaf instead of grouped at the top level. A documented
// `EmotionToken` (has `value`) is always a `token`; an `EmotionUtility` (has `styles`) is always a
// `utility`. This is the shared discriminant the skill generator and cross-solution renderer use.

/** Whether a leaf is a referenceable value (`token`) or a reusable applied style (`utility`). */
export type EmotionKind = 'token' | 'utility';

/** Derive a leaf's {@link EmotionKind} from its shape (`value` → token, otherwise `utility`). */
export const kindOf = (node: EmotionNode): EmotionKind => ('value' in node ? 'token' : 'utility');
