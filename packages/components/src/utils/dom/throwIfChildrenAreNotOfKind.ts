import { TagNameCamelCase } from 'shared/src';
import { areChildrenOfKind } from './areChildrenOfKind';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const throwIfChildrenAreNotOfKind = (element: HTMLElement, tagName: TagNameCamelCase): void => {
  if (!areChildrenOfKind(element, tagName)) {
    const allowedTagName = getPrefixedTagNames(element)[tagName];
    const actualTagNames = Array.from(element.children)
      .filter((child: HTMLElement) => getTagName(child) !== getPrefixedTagNames(element)[tagName])
      .map((child: HTMLElement) => getTagName(child))
      .join(', ');

    throw new Error(
      `Child HTMLElements of ${getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagNames}`
    );
  }
};
