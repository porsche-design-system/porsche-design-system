import { IconName } from '@porsche-design-system/icons';
import { hasNamedSlot } from '../../../utils';

export type ExtendedIconName = IconName | 'none';

export const hasIcon = (iconName: ExtendedIconName): boolean => {
  return iconName !== 'none';
};

export const hasSubline = (host: HTMLElement) => {
  return hasNamedSlot(host, 'subline');
};
