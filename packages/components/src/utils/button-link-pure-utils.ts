import { getTagName, hasNamedSlot, isParentOfKind } from '.';
import type { LinkButtonPureIconName } from '../types';

export const hasVisibleIcon = (iconName: LinkButtonPureIconName): boolean => {
  return iconName !== 'none';
};

export const hasSlottedSubline = (host: HTMLElement): boolean => {
  return hasNamedSlot(host, 'subline');
};

export const warnIfParentIsPTextAndIconIsNone = (host: HTMLElement, iconName: LinkButtonPureIconName): void => {
  if (!hasVisibleIcon(iconName) && isParentOfKind(host, 'p-text')) {
    console.warn(`${getTagName(host)} should not be used inside of p-text. Please use a <button> or <a> tag.`);
  }
};
