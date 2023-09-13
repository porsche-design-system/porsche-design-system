import type { TagName } from '@porsche-design-system/shared';
import { areAllChildrenOfKind } from '../dom/areAllChildrenOfKind';
import { getPrefixedTagNames, getTagName, getTagNameWithoutPrefix, paramCaseToCamelCase, throwException } from '..';

export const throwIfChildrenAreNotOfKind = (element: HTMLElement, tagName: TagName): void => {
  if (!areAllChildrenOfKind(element, tagName)) {
    const allowedTagName = getPrefixedTagNames(element)[paramCaseToCamelCase(tagName)];
    const actualTagNames = Array.from(element.children, getTagName)
      .filter((actualTagName) => actualTagName !== allowedTagName)
      .join(', ');

    throwException(
      `child HTMLElements of ${getTagNameWithoutPrefix(
        element
      )} should be of kind ${allowedTagName} but got ${actualTagNames}.`
    );
  }
};
