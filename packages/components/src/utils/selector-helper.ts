export const getHTMLElement = (host: HTMLElement | ShadowRoot, selector: string): HTMLElement =>
  host.querySelector(selector);

export const getHTMLElements = (host: HTMLElement | ShadowRoot, selector: string): HTMLElement[] =>
  Array.from(host.querySelectorAll(selector));
