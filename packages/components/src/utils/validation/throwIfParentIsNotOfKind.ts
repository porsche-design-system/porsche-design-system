import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';
import { isParentOfKind } from '../dom/isParentOfKind';

export const throwIfParentIsNotOfKind = (element: HTMLElement, tagName: TagNameCamelCase): void => {
  if (element.parentElement && !isParentOfKind(element, tagName)) {
    const allowedTagName = getPrefixedTagNames(element)[tagName];
    const actualTagName = getTagName(element.parentElement);
    throw new Error(
      `Parent HTMLElement of ${getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagName}`
    );
  }
};
