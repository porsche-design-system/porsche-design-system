import * as browserHelper from './browser-helper';
import { addElementToHead, supportsCustomElements, supportsEs2015Modules } from './browser';

describe('browser', () => {
  it('should return true for supportsEs2015Modules if es2015 modules are supported', () => {
    const spy = jest.spyOn(browserHelper, 'getHTMLScriptElement');
    spy.mockReturnValue({ prototype: { noModule: true } } as any);

    expect(supportsEs2015Modules()).toBe(true);
    expect(spy).toBeCalled();
    spy.mockRestore();
  });

  it('should return false for supportsEs2015Modules if es2015 modules are not supported', () => {
    const spy = jest.spyOn(browserHelper, 'getHTMLScriptElement');
    spy.mockReturnValue({ prototype: {} as HTMLScriptElement } as any);

    expect(supportsEs2015Modules()).toBe(false);
    expect(spy).toBeCalled();
    spy.mockRestore();
  });

  it('should return true for supportsCustomElements if custom elements are supported', () => {
    expect(supportsCustomElements()).toBe(true);
  });

  it('should return false for supportsCustomElements if custom elements are not supported', () => {
    const { customElements } = window;
    // @ts-ignore
    delete window.customElements;

    expect(supportsCustomElements()).toBe(false);

    window.customElements = customElements;
  });

  it('should add provided element to head for addElementToHead', () => {
    const style = document.createElement('style');
    addElementToHead(style);
    expect(style.parentElement).toBe(document.head);
    document.head.removeChild(style);
  });
});
