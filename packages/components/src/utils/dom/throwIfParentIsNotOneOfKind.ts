import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';
import { isParentOfKind } from './isParentOfKind';

export const throwIfParentIsNotOneOfKind = (element: HTMLElement, tagNames: TagNameCamelCase[]): void => {
  if (!tagNames.some((tagName) => isParentOfKind(element, tagName))) {
    const prefixedTagNames = getPrefixedTagNames(element);
    const allowedTagNames = tagNames.map((tagName) => prefixedTagNames[tagName]).join(', ');
    const actualTagName = getTagName(element.parentElement);

    throw new Error(
      `Parent HTMLElement of ${getTagName(element)} should be one of kind ${allowedTagNames} but got ${actualTagName}`
    );
  }
};
