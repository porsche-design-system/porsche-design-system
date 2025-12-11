import { gradientFade } from '@porsche-design-system/tokens';

export const gradientToTopStyle = {
  background: `linear-gradient(to top, ${gradientFade} 100%);`,
} as const;
