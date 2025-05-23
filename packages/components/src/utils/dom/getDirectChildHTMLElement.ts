/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getHTMLElement } from './getHTMLElement';
import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

// prettier-ignore
export function getDirectChildHTMLElement<K extends keyof HTMLElementTagNameMap>(
  element: HTMLElement,
  selector: K
): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getDirectChildHTMLElement<E extends Element = Element>(
  element: HTMLElement,
  selector: string
): E | null;
export function getDirectChildHTMLElement(element: HTMLElement, selector: string): any {
  // querySelector(All) doesn't work with :scope pseudo class and comma separator in jsdom, yet
  // https://github.com/jsdom/jsdom/issues/3141
  // therefore we got a workaround so it works nicely when consumed from jsdom-polyfill package
  return (
    transformSelectorToDirectChildSelector(selector)
      .split(',')
      .map((sel) => getHTMLElement(element, sel))
      .filter((x) => x)[0] || null // comma separated selector might return null, so we have to filter
  );
}
