import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

/** @deprecated This API will be removed with the next major release. background: `linear-gradient(to top, ${gradientStopsFadeDark});` instead. */
export const gradientToTopStyle = {
  background: `linear-gradient(to top, ${gradientStopsFadeDark});`,
} as const;
