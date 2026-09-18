import { blurFrosted } from '@porsche-design-system/tokens';

/** @deprecated This API will be removed with the next major release. Use backdropFilter: blurFrosted instead. */
export const frostedGlassStyle = {
  WebkitBackdropFilter: blurFrosted,
  backdropFilter: blurFrosted,
} as const;
