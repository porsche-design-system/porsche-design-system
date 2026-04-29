import type { AlignLabel, LinkButtonIconName, LinkTarget } from '../../types';
import type { LinkAriaAttribute } from '../../utils';

export type LinkPureIcon = LinkButtonIconName;
export type LinkPureAriaAttribute = LinkAriaAttribute;
export type LinkPureAlignLabel = AlignLabel;
export type LinkPureTarget = LinkTarget;

/** @deprecated */
export const LINK_PURE_SIZES_DEPRECATED = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large'] as const;
export const LINK_PURE_SIZES = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'inherit',
  ...LINK_PURE_SIZES_DEPRECATED,
] as const;
export type LinkPureSize = (typeof LINK_PURE_SIZES)[number];

export const LINK_PURE_COLORS = ['primary', 'contrast-higher', 'contrast-high', 'contrast-medium', 'inherit'] as const;
export type LinkPureColor = (typeof LINK_PURE_COLORS)[number];
