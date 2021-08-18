import { hasNamedSlot } from './dom';
import type { ExtendedIconName } from '../types';

export const hasIcon = (iconName: ExtendedIconName): boolean => {
  return iconName !== 'none';
};

export const hasSubline = (host: HTMLElement) => {
  return hasNamedSlot(host, 'subline');
};
