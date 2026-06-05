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
