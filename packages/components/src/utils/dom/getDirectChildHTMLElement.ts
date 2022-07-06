/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getHTMLElement } from './getHTMLElement';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

// prettier-ignore
export function getDirectChildHTMLElement<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getDirectChildHTMLElement<E extends Element = Element>(element: HTMLElement, selector: string): E | null;
export function getDirectChildHTMLElement(element: HTMLElement, selector: string): any {
  return getHTMLElement(element, transformSelectorToDirectChildSelector(selector));
}
