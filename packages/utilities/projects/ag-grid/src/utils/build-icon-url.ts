import { ICONS_MANIFEST, type IconName } from '@porsche-design-system/icons';
import { getCDNBaseURL } from './get-cdn-base-url';

const DEFAULT_ICON_NAME: IconName = 'question';

export const buildIconUrl = (iconName: IconName): string => {
  const iconFileName = ICONS_MANIFEST[iconName as keyof Record<IconName, string>];
  return iconFileName ? `${getCDNBaseURL()}/icons/${iconFileName}` : buildIconUrl(DEFAULT_ICON_NAME);
};
