import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

/** @deprecated This API will be removed with the next major release. background: `linear-gradient(to right, ${gradientStopsFadeDark});` instead. */
export const gradientToRightStyle = {
  background: `linear-gradient(to right, ${gradientStopsFadeDark});`,
} as const;
