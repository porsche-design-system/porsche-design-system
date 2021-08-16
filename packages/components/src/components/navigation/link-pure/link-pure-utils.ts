import { IconName } from '@porsche-design-system/icons';

export type ExtendedIconName = IconName | 'none';

export const hasIcon = (iconName: ExtendedIconName): boolean => {
  return iconName !== 'none';
};
