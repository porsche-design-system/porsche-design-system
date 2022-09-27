import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { areAllChildrenOfKind } from '../dom/areAllChildrenOfKind';
import { getPrefixedTagNames, getTagName } from '..';

export const throwIfChildrenAreNotOfKind = (element: HTMLElement, tagName: TagNameCamelCase): void => {
  if (!areAllChildrenOfKind(element, tagName)) {
    const allowedTagName = getPrefixedTagNames(element)[tagName];
    const actualTagNames = Array.from(element.children)
      .map((child: HTMLElement) => getTagName(child))
      .filter((actualTagName) => actualTagName !== allowedTagName)
      .join(', ');

    throw new Error(
      `Child HTMLElements of ${getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagNames}`
    );
  }
};
