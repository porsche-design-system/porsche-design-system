/* eslint-disable prefer-arrow/prefer-arrow-functions */
import {getHTMLElements} from './getHTMLElements';

// prettier-ignore
export function getShadowRootHTMLElements<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
// prettier-ignore
export function getShadowRootHTMLElements<K extends keyof SVGElementTagNameMap>(element: HTMLElement, selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
// prettier-ignore
export function getShadowRootHTMLElements<K extends keyof MathMLElementTagNameMap>(element: HTMLElement, selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;

export function getShadowRootHTMLElements(element: HTMLElement, selector: string): any {
  return getHTMLElements(element.shadowRoot, selector);
}
