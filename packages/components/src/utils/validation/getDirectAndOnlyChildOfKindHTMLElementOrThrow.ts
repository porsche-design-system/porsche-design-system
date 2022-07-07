/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getTagName } from '../tag-name';
import { getDirectChildHTMLElements } from '../dom/getDirectChildHTMLElements';

// prettier-ignore
export function getDirectAndOnlyChildOfKindHTMLElementOrThrow<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getDirectAndOnlyChildOfKindHTMLElementOrThrow<E extends Element = Element>(element: HTMLElement, selector: string): E | null;
export function getDirectAndOnlyChildOfKindHTMLElementOrThrow(element: HTMLElement, selector: string): any {
  const directChildren = getDirectChildHTMLElements(element, selector);

  if (directChildren.length !== 1) {
    throw new Error(`${getTagName(element)} has to contain a single direct child of: ${selector}`);
  }

  return directChildren[0];
}
