import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

/** @deprecated since v4.0.0, will be removed with next major release. background: `linear-gradient(to top, ${gradientStopsFadeDark});` instead  */
export const gradientToTopStyle = {
  background: `linear-gradient(to top, ${gradientStopsFadeDark});`,
} as const;
