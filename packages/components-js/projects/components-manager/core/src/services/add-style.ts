import { addElementToHead, createElement } from './browser';

export function addStyles(src: string) {
  const link = createElement('link') as HTMLLinkElement;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = src;
  addElementToHead(link);
}

export function addInlineStyles(styles: string) {
  const style = createElement('style');
  style.appendChild(document.createTextNode(styles));
  addElementToHead(style);
}
