import { hasNamedSlot } from './dom';
import type { IconName } from '../types';

export type ExtendedIconName = IconName | 'none';

export const hasIcon = (iconName: ExtendedIconName): boolean => {
  return iconName !== 'none';
};

export const hasSubline = (host: HTMLElement) => {
  return hasNamedSlot(host, 'subline');
};
