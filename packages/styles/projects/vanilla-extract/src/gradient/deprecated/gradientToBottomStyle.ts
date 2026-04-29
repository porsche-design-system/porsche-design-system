import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

/** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` instead  */
export const gradientToBottomStyle = {
  background: `linear-gradient(to bottom, ${gradientStopsFadeDark});`,
} as const;
