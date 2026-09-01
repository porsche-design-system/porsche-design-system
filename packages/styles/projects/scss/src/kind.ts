import type { ScssMixin, ScssVariable } from './types';

/** Whether a declaration is a referenceable value (`token`) or a reusable applied style (`utility`). */
export const kindOf = (node: ScssVariable | ScssMixin): 'token' | 'utility' => ('value' in node ? 'token' : 'utility');
