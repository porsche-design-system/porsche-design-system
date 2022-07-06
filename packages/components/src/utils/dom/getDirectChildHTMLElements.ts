/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getHTMLElements } from './getHTMLElements';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

// prettier-ignore
export function getDirectChildHTMLElements<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K][];
// prettier-ignore
export function getDirectChildHTMLElements<E extends Element = Element>(element: HTMLElement, selector: string): E[];
export function getDirectChildHTMLElements(element: HTMLElement, selector: string): any {
  return getHTMLElements(element, transformSelectorToDirectChildSelector(selector));
}
