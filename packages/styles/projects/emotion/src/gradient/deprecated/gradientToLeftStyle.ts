import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

/** @deprecated This API will be removed with the next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark});` instead. */
export const gradientToLeftStyle = {
  background: `linear-gradient(to left, ${gradientStopsFadeDark});`,
} as const;
