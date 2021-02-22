import { getHTMLScriptElement } from './browser-helper';

describe('browser-helper', () => {
  it('should return HTMLScriptElement for getHTMLScriptElement', () => {
    expect(getHTMLScriptElement()).toBe(HTMLScriptElement);
  });
});
