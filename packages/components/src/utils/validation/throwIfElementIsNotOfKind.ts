import { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';
import { camelCase } from 'change-case';

export const throwIfElementIsNotOfKind = (host: HTMLElement, element: HTMLElement, tagName: TagName): void => {
  const prefixedTagName = getPrefixedTagNames(host)[camelCase(tagName)];
  const slotTagName = getTagName(element);

  if (slotTagName !== prefixedTagName) {
    throw new Error(`Slot "${element}" has to be a "${prefixedTagName}" but received "${slotTagName}"`);
  }
};
