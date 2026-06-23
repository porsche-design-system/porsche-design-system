import { blur } from './blur';
import { border } from './border';
import { color } from './color';
import { font } from './font';
import { motion } from './motion';
import { shadow } from './shadow';
import { spacing } from './spacing';
import type { CssVariableTokens } from '../types';

export { blur, border, color, font, motion, shadow, spacing };

// The documented CSS variable tokens, domain-keyed. Domain order is kept stable (it drives the
// emitted `variables.css` declaration order). `colorScheme` utilities are added in `meta.ts`.
export const cssVariableTokens = {
  color,
  font,
  spacing,
  border,
  blur,
  shadow,
  motion,
} satisfies CssVariableTokens;
