import { CDN_BASE_URL as ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/icons';
import type { IconName, TextSize } from '../../types';
import { TEXT_COLORS } from '../text/text-color';
import type { TextColorDeprecated } from '../text/text-color';

export const ICON_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type IconAriaAttribute = typeof ICON_ARIA_ATTRIBUTES[number];

export type IconSize = TextSize;

/** @deprecated */
export type IconColorDeprecated = TextColorDeprecated;
export const ICON_COLORS = [...TEXT_COLORS, 'state-disabled'] as const;
export type IconColor = typeof ICON_COLORS[number];

export const isUrl = (str: string): boolean => str?.length > 0 && /(\/)/.test(str);

const DEFAULT_ICON_NAME: IconName = 'arrow-right';

export const buildIconUrl = (iconNameOrSource: IconName | string = DEFAULT_ICON_NAME): string => {
  const cdnBaseUrl = ROLLUP_REPLACE_IS_STAGING === 'production' ? ICONS_CDN_BASE_URL : 'http://localhost:3001/icons';

  if (iconNameOrSource === null) {
    return buildIconUrl(DEFAULT_ICON_NAME);
  } else if (isUrl(iconNameOrSource)) {
    return iconNameOrSource;
  } else if (ICONS_MANIFEST[iconNameOrSource]) {
    return `${cdnBaseUrl}/${ICONS_MANIFEST[iconNameOrSource]}`;
  }

  return buildIconUrl(DEFAULT_ICON_NAME);
};
