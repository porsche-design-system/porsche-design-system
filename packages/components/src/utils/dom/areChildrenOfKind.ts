import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const areChildrenOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  const children = Array.from(element.children);

  return (
    children && children.every((child: HTMLElement) => getTagName(child) === getPrefixedTagNames(element)[tagName])
  );
};
