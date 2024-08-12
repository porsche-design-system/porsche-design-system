import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import type { IconName, TypographyTextColorDeprecated, TextSize } from '../../types';
import { TYPOGRAPHY_TEXT_COLORS } from '../../utils/typography/typography-text-color';
import { getCDNBaseURL } from '../../utils';

export const ICON_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type IconAriaAttribute = (typeof ICON_ARIA_ATTRIBUTES)[number];

export type IconSize = TextSize;

/** @deprecated */
export type IconColorDeprecated = TypographyTextColorDeprecated;
export const ICON_COLORS = [...TYPOGRAPHY_TEXT_COLORS, 'state-disabled'] as const;
export type IconColor = (typeof ICON_COLORS)[number];

export const isUrl = (str: string): boolean => str?.length > 0 && /(\/)/.test(str);

const DEFAULT_ICON_NAME: IconName = 'arrow-right';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const buildIconUrl = (iconNameOrSource: IconName | string = DEFAULT_ICON_NAME): string => {
  if (iconNameOrSource === null) {
    return buildIconUrl(DEFAULT_ICON_NAME);
  } else if (isUrl(iconNameOrSource)) {
    return iconNameOrSource;
  } else if (ICONS_MANIFEST[iconNameOrSource as keyof Record<IconName, string>]) {
    return `${getCDNBaseURL()}/icons/${ICONS_MANIFEST[iconNameOrSource as keyof Record<IconName, string>]}`;
  }

  return buildIconUrl(DEFAULT_ICON_NAME);
};
