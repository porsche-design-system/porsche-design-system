/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getTagNameWithoutPrefix, throwException } from '..';
import { getDirectChildHTMLElements } from '../dom/getDirectChildHTMLElements';

// prettier-ignore
export function getOnlyChildrenOfKindHTMLElementOrThrow<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getOnlyChildrenOfKindHTMLElementOrThrow<E extends Element = Element>(element: HTMLElement, selector: string): E[] | null;
export function getOnlyChildrenOfKindHTMLElementOrThrow(element: HTMLElement, selector: string): any {
  const directChildren = getDirectChildHTMLElements(element, selector);
  const notValid = directChildren.some((child) => child.tagName !== directChildren[0].tagName);

  if (notValid) {
    throwException(
      `child HTMLElements of ${getTagNameWithoutPrefix(element)} are invalid. Expected all of: ${selector.replace(
        /,/g,
        ' or '
      )}.`
    );
  }

  return directChildren;
}
