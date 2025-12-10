import { gradientFade } from '@porsche-design-system/tokens';

export const gradientToBottomStyle = {
  background: `linear-gradient(to bottom, ${gradientFade} 100%);`,
} as const;
