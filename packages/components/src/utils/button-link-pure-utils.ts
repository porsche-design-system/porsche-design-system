import type { LinkButtonPureIconName } from '../types';
import { getTagName, isParentOfKind } from '.';

export const hasVisibleIcon = (iconName: LinkButtonPureIconName): boolean => {
  return iconName !== 'none';
};

export const warnIfParentIsPTextAndIconIsNone = (host: HTMLElement, iconName: LinkButtonPureIconName): void => {
  if (!hasVisibleIcon(iconName) && isParentOfKind(host, 'p-text')) {
    console.warn(`${getTagName(host)} should not be used inside p-text. Please use a <button> or <a> tag.`);
  }
};
