import { blurFrosted } from '@porsche-design-system/tokens';

/** @deprecated since v4.0.0, will be removed with next major release. Use backdropFilter: blurFrosted instead  */
export const frostedGlassStyle = {
  WebkitBackdropFilter: blurFrosted,
  backdropFilter: blurFrosted,
} as const;
