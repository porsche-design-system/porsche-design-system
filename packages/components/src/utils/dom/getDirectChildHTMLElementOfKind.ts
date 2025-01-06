import type { TagName } from '@porsche-design-system/shared';
import { paramCaseToCamelCase } from '../paramCaseToCamelCase';
import { type PrefixedTagNames, getPrefixedTagNames, getTagName } from '../tag-name';

export const getDirectChildHTMLElementOfKind = (element: HTMLElement, tagName: TagName): HTMLElement[] => {
  const children = Array.from(element.children) as HTMLElement[];
  const prefixedElementTagName = getPrefixedTagNames(element)[paramCaseToCamelCase(tagName) as keyof PrefixedTagNames];
  return Array.from(children).filter((el) => getTagName(el) === prefixedElementTagName);
};
