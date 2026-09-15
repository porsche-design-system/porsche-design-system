import type { TailwindThemeVariable, TailwindUtility } from './types';

/** Whether a declaration is a referenceable value (`token`) or a reusable applied style (`utility`). */
export const kindOf = (node: TailwindThemeVariable | TailwindUtility): 'token' | 'utility' =>
  'value' in node ? 'token' : 'utility';
