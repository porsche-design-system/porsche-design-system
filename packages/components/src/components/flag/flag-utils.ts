import { FLAGS_MANIFEST } from '@porsche-design-system/assets';
import type { FlagName } from '../../types';
import { getCDNBaseURL } from '../../utils';

export const FLAG_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlagAriaAttribute = (typeof FLAG_ARIA_ATTRIBUTES)[number];

/** @deprecated */
export const FLAG_SIZES_DEPRECATED = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const;
export const FLAG_SIZES = [
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
  ...FLAG_SIZES_DEPRECATED,
] as const;
export type FlagSize = (typeof FLAG_SIZES)[number];

export const buildFlagUrl = (flagName: FlagName): string => {
  return `${getCDNBaseURL()}/flags/${FLAGS_MANIFEST[flagName] || FLAGS_MANIFEST.xx}`;
};
