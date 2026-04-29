import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import type { IconName } from '../../types';
import { getCDNBaseURL } from '../../utils';

export const ICON_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type IconAriaAttribute = (typeof ICON_ARIA_ATTRIBUTES)[number];

/** @deprecated */
export const ICON_SIZES_DEPRECATED = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const;
export const ICON_SIZES = [
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
  ...ICON_SIZES_DEPRECATED,
] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export const ICON_COLORS = [
  'primary',
  'contrast-higher',
  'contrast-high',
  'contrast-medium',
  'contrast-low',
  'contrast-lower',
  'success',
  'warning',
  'error',
  'info',
  'inherit',
] as const;
export type IconColor = (typeof ICON_COLORS)[number];

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
