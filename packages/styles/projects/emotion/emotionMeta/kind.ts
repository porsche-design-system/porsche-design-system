import type { EmotionNode } from './types';

/** Whether a leaf is a referenceable value (`token`) or a reusable applied style (`utility`). */
export const kindOf = (node: EmotionNode): 'token' | 'utility' => ('value' in node ? 'token' : 'utility');
