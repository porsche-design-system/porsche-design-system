import { type TagName } from '@porsche-design-system/shared';
import { type PrefixedTagNames, getPrefixedTagNames, getTagName } from '../tag-name';
import { paramCaseToCamelCase } from '../paramCaseToCamelCase';

export const getDirectChildHTMLElementOfKind = (element: HTMLElement, tagName: TagName): HTMLElement[] => {
  const children = Array.from(element.children) as HTMLElement[];
  const prefixedElementTagName = getPrefixedTagNames(element)[paramCaseToCamelCase(tagName) as keyof PrefixedTagNames];
  return Array.from(children).filter((el) => getTagName(el) === prefixedElementTagName);
};
