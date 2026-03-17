import { FLAGS_MANIFEST } from '@porsche-design-system/assets';
import type { FlagName } from '../../types';
import { getCDNBaseURL } from '../../utils';

export const FLAG_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlagAriaAttribute = (typeof FLAG_ARIA_ATTRIBUTES)[number];

export const FLAG_SIZES = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'inherit',
] as const;
export type FlagSize = (typeof FLAG_SIZES)[number];

export const buildFlagUrl = (flagName: FlagName): string => {
  return `${getCDNBaseURL()}/flags/${FLAGS_MANIFEST[flagName] || FLAGS_MANIFEST.xx}`;
};
