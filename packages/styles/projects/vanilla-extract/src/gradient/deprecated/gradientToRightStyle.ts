import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

/** @deprecated since v4.0.0, will be removed with next major release. background: `linear-gradient(to right, ${gradientStopsFadeDark});` instead  */
export const gradientToRightStyle = {
  background: `linear-gradient(to right, ${gradientStopsFadeDark});`,
} as const;
