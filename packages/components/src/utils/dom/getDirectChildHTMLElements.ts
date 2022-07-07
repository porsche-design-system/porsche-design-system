/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getHTMLElements } from './getHTMLElements';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

// prettier-ignore
export function getDirectChildHTMLElements<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K][];
// prettier-ignore
export function getDirectChildHTMLElements<E extends Element = Element>(element: HTMLElement, selector: string): E[];
export function getDirectChildHTMLElements(element: HTMLElement, selector: string): any {
  // querySelectorAll doesn't work with :scope pseudo class and comma separator in jsdom, yet
  // https://github.com/jsdom/jsdom/issues/3141
  // therefore we got a workaround so it works nicely when consumed from jsdom-polyfill package
  return transformSelectorToDirectChildSelector(selector)
    .split(',')
    .map((sel) => getHTMLElements(element, sel))
    .flat(); // might contain duplicates
}
