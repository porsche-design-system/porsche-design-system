/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getTagName } from '../tag-name';
import { getDirectChildHTMLElement } from '../dom/getDirectChildHTMLElement';

// prettier-ignore
export function getOnlyChildHTMLElementOrThrow<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getOnlyChildHTMLElementOrThrow<E extends Element = Element>(element: HTMLElement, selector: string): E | null;
export function getOnlyChildHTMLElementOrThrow(element: HTMLElement, selector: string): any {
  const directChild = getDirectChildHTMLElement(element, selector);

  // directChild can be null from querySelector()
  if (!directChild || directChild.previousElementSibling || directChild.nextElementSibling) {
    throw new Error(`${getTagName(element)} has to contain a single direct child of: ${selector}`);
  }

  return directChild; // Einzelkind
}
