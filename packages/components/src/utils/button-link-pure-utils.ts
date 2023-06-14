import type { LinkButtonIconName } from '../types';
import { consoleWarn, getTagNameWithoutPrefix, isParentOfKind } from '.';

export const hasVisibleIcon = (iconName: LinkButtonIconName, iconSource: string): boolean => {
  return iconName !== 'none' || !!iconSource;
};

export const warnIfParentIsPTextAndIconIsNone = (
  host: HTMLElement,
  iconName: LinkButtonIconName,
  iconSource: string
): void => {
  if (!hasVisibleIcon(iconName, iconSource) && isParentOfKind(host, 'p-text')) {
    consoleWarn(
      `${getTagNameWithoutPrefix(host)} should not be used inside 'p-text'. Please use a <button> or <a> tag.`
    );
  }
};
