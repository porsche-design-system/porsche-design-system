import { createElement, supportsEs2015Modules } from './browser';

export function addScript(src: string): void {
  if (supportsEs2015Modules()) {
    const script = createElement('script');
    script.src = src;
    script.setAttribute('crossorigin', ''); // needs to match link preload

    document.body.appendChild(script);
  }
}
