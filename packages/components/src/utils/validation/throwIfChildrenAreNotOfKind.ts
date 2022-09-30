import type { TagName } from '@porsche-design-system/shared';
import { areAllChildrenOfKind } from '../dom/areAllChildrenOfKind';
import { getPrefixedTagNames, getTagName, paramCaseToCamelCase } from '..';

export const throwIfChildrenAreNotOfKind = (element: HTMLElement, tagName: TagName): void => {
  if (!areAllChildrenOfKind(element, tagName)) {
    const allowedTagName = getPrefixedTagNames(element)[paramCaseToCamelCase(tagName)];
    const actualTagNames = Array.from(element.children)
      .map((child: HTMLElement) => getTagName(child))
      .filter((actualTagName) => actualTagName !== allowedTagName)
      .join(', ');

    throw new Error(
      `Child HTMLElements of ${getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagNames}`
    );
  }
};
