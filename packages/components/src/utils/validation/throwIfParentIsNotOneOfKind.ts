import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';
import { isParentOfKind } from '../dom/isParentOfKind';

export const throwIfParentIsNotOneOfKind = (element: HTMLElement, tagNames: TagNameCamelCase[]): void => {
  if (element.parentElement && !tagNames.some((tagName) => isParentOfKind(element, tagName))) {
    const actualTagName = getTagName(element.parentElement);
    const prefixedTagNames = getPrefixedTagNames(element);
    const allowedTagNames = tagNames.map((tagName) => prefixedTagNames[tagName]).join(', ');

    throw new Error(
      `Parent HTMLElement of ${getTagName(element)} should be one of kind ${allowedTagNames} but got ${actualTagName}`
    );
  }
};
