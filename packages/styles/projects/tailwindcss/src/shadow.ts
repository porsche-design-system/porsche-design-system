import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import { sizeLabel } from './shared';
import type { TailwindThemeVariable } from './types';

// Shadow.
const shadowValues: Record<string, string> = { sm: shadowSm, md: shadowMd, lg: shadowLg };
export const shadowThemeVariables: TailwindThemeVariable[] = (['sm', 'md', 'lg'] as const).map((size) => ({
  property: `--shadow-${size}`,
  value: shadowValues[size],
  classes: [`.shadow-${size}`],
  description: `Applies a **${sizeLabel[size]}** \`box-shadow\`.`,
  group: 'shadow',
}));

// Shadow — deprecated aliases.
/** @deprecated Use `shadowThemeVariables` (`--shadow-sm/md/lg`) instead. */
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

export const allShadowThemeVariables: TailwindThemeVariable[] = [...shadowThemeVariables, ...shadowDeprecatedThemeVariables];
