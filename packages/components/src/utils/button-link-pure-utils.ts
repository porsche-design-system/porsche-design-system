import { hasNamedSlot } from './dom';
import type { LinkButtonPureIconName } from '../types';

export const hasVisibleIcon = (iconName: LinkButtonPureIconName): boolean => {
  return iconName !== 'none';
};

export const hasSlottedSubline = (host: HTMLElement): boolean => {
  return hasNamedSlot(host, 'subline');
};
