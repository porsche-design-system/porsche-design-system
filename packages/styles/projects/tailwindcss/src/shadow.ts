import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import type { TailwindThemeVariable } from './types';

// Shadow.
export const shadow: TailwindThemeVariable[] = [
  {
    property: '--shadow-sm',
    value: shadowSm,
    classes: ['.shadow-sm'],
    description: 'Applies a **small** `box-shadow`.',
    group: 'shadow',
  },
  {
    property: '--shadow-md',
    value: shadowMd,
    classes: ['.shadow-md'],
    description: 'Applies a **medium** `box-shadow`.',
    group: 'shadow',
  },
  {
    property: '--shadow-lg',
    value: shadowLg,
    classes: ['.shadow-lg'],
    description: 'Applies a **large** `box-shadow`.',
    group: 'shadow',
  },
];

// Shadow — deprecated aliases.
/** @deprecated Use `shadow` (`--shadow-sm/md/lg`) instead. */
export const shadowDeprecatedThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--shadow-low',
    value: '--theme(--shadow-sm)',
    comment: 'alias (deprecated)',
    description: 'Alias for `--shadow-sm`. **Deprecated** — use `--shadow-sm` instead.',
    group: 'shadow',
  },
  {
    property: '--shadow-medium',
    value: '--theme(--shadow-md)',
    comment: 'alias (deprecated)',
    description: 'Alias for `--shadow-md`. **Deprecated** — use `--shadow-md` instead.',
    group: 'shadow',
  },
  {
    property: '--shadow-high',
    value: '--theme(--shadow-lg)',
    comment: 'alias (deprecated)',
    description: 'Alias for `--shadow-lg`. **Deprecated** — use `--shadow-lg` instead.',
    group: 'shadow',
  },
];

export const allShadowThemeVariables: TailwindThemeVariable[] = [...shadow, ...shadowDeprecatedThemeVariables];
