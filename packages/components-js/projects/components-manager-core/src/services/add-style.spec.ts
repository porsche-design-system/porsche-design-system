import { addInlineStyles, addStyles } from './add-style';
import * as browser from './browser';

describe('addStye', () => {
  const url = 'http://localhost/some-url.js';
  const otherUrl = 'http://some-other-url/';
  let styleTags: Node[];

  beforeEach(() => {
    styleTags = [];
    spyOn(browser, 'addElementToHead').and.callFake((addedStyle) => styleTags.push(addedStyle));
  });

  it('should add a style tag with the provided style source for addStyles', () => {
    addStyles(url);
    expect(browser.addElementToHead).toHaveBeenCalledTimes(1);
    addStyles(otherUrl);
    expect(browser.addElementToHead).toHaveBeenCalledTimes(2);
    const style1 = styleTags[0] as HTMLLinkElement;
    const style2 = styleTags[1] as HTMLLinkElement;
    expect(style1.rel).toBe('stylesheet');
    expect(style1.type).toBe('text/css');
    expect(style1.href).toBe(url);
    expect(style2.href).toBe(otherUrl);
  });

  it('should add an inline style tag with the provided styles for addInlineStyles', () => {
    const styles = 'body { color: #ff00ff; }';
    const otherStyles = 'body { background-color: pink; }';
    addInlineStyles(styles);
    expect(browser.addElementToHead).toHaveBeenCalledTimes(1);
    addInlineStyles(otherStyles);
    expect(browser.addElementToHead).toHaveBeenCalledTimes(2);
    const style1 = styleTags[0] as HTMLStyleElement;
    const style2 = styleTags[1] as HTMLStyleElement;
    expect(style1.innerHTML).toBe(styles);
    expect(style2.innerHTML).toBe(otherStyles);
  });
});
