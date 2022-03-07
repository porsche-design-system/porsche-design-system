import { hasNamedSlot, isParentOfKind } from './dom';
import type { LinkButtonPureIconName } from '../types';
import { getTagName } from './tag-name';

export const hasVisibleIcon = (iconName: LinkButtonPureIconName): boolean => {
  return iconName !== 'none';
};

export const hasSlottedSubline = (host: HTMLElement): boolean => {
  return hasNamedSlot(host, 'subline');
};

export const throwIfParentIsPTextAndIconIsNone = (host: HTMLElement, iconName: LinkButtonPureIconName): void => {
  if (iconName === 'none' && host.parentElement && isParentOfKind(host, 'pText')) {
    console.warn(`${getTagName(host)} should not be used inside of p-text. Please use an native <button> or <link>`);
  }
};
