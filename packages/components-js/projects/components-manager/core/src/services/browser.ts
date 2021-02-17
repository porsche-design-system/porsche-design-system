import { getHTMLScriptElement } from './browser-helper';

export function supportsEs2015Modules(): boolean {
  return 'noModule' in getHTMLScriptElement().prototype;
}

export function supportsCustomElements(): boolean {
  return 'customElements' in window;
}

export function addElementToHead(element: HTMLElement): void {
  document.head.appendChild(element);
}

export function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] {
  return document.createElement(tagName);
}
