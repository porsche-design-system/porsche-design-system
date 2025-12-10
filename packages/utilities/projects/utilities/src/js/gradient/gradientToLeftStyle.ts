import { gradientFade } from '@porsche-design-system/tokens';

export const gradientToLeftStyle = {
  background: `linear-gradient(to left, ${gradientFade} 100%);`,
} as const;
