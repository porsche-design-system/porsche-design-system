import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName, paramCaseToCamelCase, throwException } from '..';
import { isParentOfKind } from '../dom';
import type { PrefixedTagNames } from '../tag-name';

export const throwIfParentIsNotOfKind = (element: HTMLElement, tagNameOrNames: TagName | TagName[]): void => {
  if (element.parentElement) {
    const tagNamesArray = Array.isArray(tagNameOrNames) ? tagNameOrNames : [tagNameOrNames];
    const matches = tagNamesArray.some((tagName) => isParentOfKind(element, tagName));

    if (!matches) {
      const allowedTagNames = tagNamesArray
        .map((tagName) => getPrefixedTagNames(element)[paramCaseToCamelCase(tagName) as keyof PrefixedTagNames])
        .join(' | ');
      const actualTagName = getTagName(element.parentElement);
      throwException(
        `parent HTMLElement of ${getTagName(element)} should be of kind ${allowedTagNames} but got ${actualTagName}.`
      );
    }
  }
};
