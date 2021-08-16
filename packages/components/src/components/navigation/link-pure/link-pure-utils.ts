import { IconName } from '@porsche-design-system/icons';

export type ExtendedIconName = IconName | 'none';

// Unit test
export const hasIcon = (iconName: ExtendedIconName) => {
  return iconName !== 'none';
};
