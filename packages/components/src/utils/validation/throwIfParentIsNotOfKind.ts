import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName, throwException } from '..';
import { isParentOfKind } from '../dom/isParentOfKind';

export const throwIfParentIsNotOfKind = (element: HTMLElement, tagName: TagName): void => {
  if (element.parentElement && !isParentOfKind(element, tagName)) {
    const allowedTagName = getPrefixedTagNames(element)[tagName];
    const actualTagName = getTagName(element.parentElement);
    throwException(
      `parent HTMLElement of ${getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagName}.`
    );
  }
};
