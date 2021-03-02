import { createElement, supportsEs2015Modules } from './browser';

export function addScript(src: string): void {
  if (supportsEs2015Modules()) {
    const script = createElement('script');
    script.src = src;
    script.type = 'module';

    document.body.appendChild(script);
  }
}
