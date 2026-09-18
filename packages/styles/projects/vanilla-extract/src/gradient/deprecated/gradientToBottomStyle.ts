import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

/** @deprecated This API will be removed with the next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` instead. */
export const gradientToBottomStyle = {
  background: `linear-gradient(to bottom, ${gradientStopsFadeDark});`,
} as const;
