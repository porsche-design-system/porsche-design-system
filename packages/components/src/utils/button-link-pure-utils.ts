import type { AlignLabel, LinkButtonIconName, LinkTarget, TextSize, TextWeight } from '../types';
import { getTagName, isParentOfKind } from '.';
import type { LinkAriaAttribute } from '../components/link/link-utils';

export type LinkPureIcon = LinkButtonIconName;
export type LinkPureAriaAttribute = LinkAriaAttribute;
export type LinkPureAlignLabel = AlignLabel;
export type LinkPureWeight = TextWeight;
export type LinkPureSize = TextSize;
export type LinkPureTarget = LinkTarget;

export const hasVisibleIcon = (iconName: LinkButtonIconName, iconSource: string): boolean => {
  return iconName !== 'none' || !!iconSource;
};

export const warnIfParentIsPTextAndIconIsNone = (
  host: HTMLElement,
  iconName: LinkButtonIconName,
  iconSource: string
): void => {
  if (!hasVisibleIcon(iconName, iconSource) && isParentOfKind(host, 'p-text')) {
    console.warn(`${getTagName(host)} should not be used inside p-text. Please use a <button> or <a> tag.`);
  }
};
