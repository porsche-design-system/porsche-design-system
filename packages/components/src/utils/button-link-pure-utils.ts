import type { LinkButtonIconName } from '../types';

export const hasVisibleIcon = (iconName: LinkButtonIconName, iconSource: string): boolean => {
  return iconName !== 'none' || !!iconSource;
};
