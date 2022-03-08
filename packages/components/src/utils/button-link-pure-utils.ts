import { hasNamedSlot, isParentOfKind } from './dom';
import type { LinkButtonPureIconName } from '../types';
import { getTagName } from './tag-name';

export const hasVisibleIcon = (iconName: LinkButtonPureIconName): boolean => {
  return iconName !== 'none';
};

export const hasSlottedSubline = (host: HTMLElement): boolean => {
  return hasNamedSlot(host, 'subline');
};

export const warnIfParentIsPTextAndIconIsNone = (host: HTMLElement, iconName: LinkButtonPureIconName): void => {
  if (!hasVisibleIcon(iconName) && isParentOfKind(host, 'pText')) {
    console.warn(`${getTagName(host)} should not be used inside of p-text. Please use a <button> or <a> tag.`);
  }
};
