import { FLAGS_MANIFEST } from '@porsche-design-system/assets';
import type { FlagName, TextSize } from '../../types';
import { getCDNBaseURL } from '../../utils';

export const FLAG_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlagAriaAttribute = (typeof FLAG_ARIA_ATTRIBUTES)[number];

export type FlagSize = TextSize;

export const buildFlagUrl = (flagName: FlagName): string => {
  return `${getCDNBaseURL()}/flags/${FLAGS_MANIFEST[flagName] || FLAGS_MANIFEST.de}`;
};
