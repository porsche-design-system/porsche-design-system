import type { VanillaExtractNode } from './types';

/** Whether a leaf is a referenceable value (`token`) or a reusable applied style (`utility`). */
export const kindOf = (node: VanillaExtractNode): 'token' | 'utility' => ('value' in node ? 'token' : 'utility');
