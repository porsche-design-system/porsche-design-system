import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import type { IconName } from '@porsche-design-system/icons';
import { getCDNBaseURL } from './get-cdn-base-url';

export const isUrl = (str: string): boolean => str?.length > 0 && /(\/)/.test(str);

const DEFAULT_ICON_NAME: IconName = 'arrow-right';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const buildIconUrl = (iconNameOrSource: IconName | string = DEFAULT_ICON_NAME): string => {
  if (iconNameOrSource === null) {
    return buildIconUrl(DEFAULT_ICON_NAME);
  }
  if (isUrl(iconNameOrSource)) {
    return iconNameOrSource;
  }
  if (ICONS_MANIFEST[iconNameOrSource as keyof Record<IconName, string>]) {
    return `${getCDNBaseURL()}/icons/${ICONS_MANIFEST[iconNameOrSource as keyof Record<IconName, string>]}`;
  }

  return buildIconUrl(DEFAULT_ICON_NAME);
};
