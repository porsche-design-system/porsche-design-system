import { attachSlottedCss, getCachedSlottedCss, slottedCssMap } from './slotted-styles';
import * as slottedStyles from './slotted-styles';

/**
 * we need to use `node.innerHTML` or `node.textContent` instead of `node.innerText`
 * because of jsdom https://github.com/jsdom/jsdom/issues/1245
 */
describe('attachSlottedCss()', () => {
  beforeEach(() => {
    slottedCssMap.clear();
  });

  afterEach(() => {
    // cleanup
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should call getCachedSlottedCss() to retrieve cached css', () => {
    const host = document.createElement('p-some-component');
    host.attachShadow({ mode: 'open' });
    const spy = jest.spyOn(slottedStyles, 'getCachedSlottedCss').mockImplementation(() => '');

    attachSlottedCss(host, (h: HTMLElement) => 'some css');

    expect(spy).toHaveBeenCalledWith(host, expect.anything());
  });

  describe('for elements outside of shadow root', () => {
    beforeEach(() => {
      slottedCssMap.clear();
    });
    /**
     * todo: insertSlottedStyles should be a class and we should
     *       work on the instance. Else we can not empty the Map
     *       between tests. So each tag can only be used once
     *       for the tests outside of shadow root.
     *       If we would create an instance that keeps the
     *       state, we could just create a new one.
     */
    it('should add styles to document head', () => {
      expect(document.querySelectorAll('style').length).toBe(0);

      const element = document.createElement('p-element');
      document.body.append(element);
      attachSlottedCss(element, (h) => 'p-element { color: #ff00ff; }');
      const styleElements = document.querySelectorAll('style');

      expect(styleElements.length).toBe(1);
      expect(styleElements[0].textContent).toBe('p-element { color: #ff00ff; }');
    });

    // TODO: re-check test because of caching
    it('should prepend styles', () => {
      expect(document.querySelectorAll('style').length).toBe(0);

      const pElement = document.createElement('p-element');
      const spanElement = document.createElement('p-span');
      document.body.append(pElement);
      document.body.append(spanElement);
      attachSlottedCss(pElement, (h) => 'p-element { position: relative; color: #ff00ff; }');
      attachSlottedCss(spanElement, (h) => 'p-span { color: #ff00ff; }');
      attachSlottedCss(spanElement, (h) => 'p-span { position: relative; color: #ff00ff; }');
      attachSlottedCss(pElement, (h) => 'p-element { color: #ff00ff; }');
      attachSlottedCss(spanElement, (h) => 'p-span { color: #ff00ff; }');
      const styleElements = document.querySelectorAll('style');

      expect(styleElements.length).toBe(1);
      expect(styleElements[0].textContent).toBe('p-span { color: #ff00ff; }');
      // expect(styleElements[1].textContent).toBe('p-element { position: relative; color: #ff00ff; }');
    });
  });

  describe('for elements inside of shadow root', () => {
    let container: HTMLElement;

    beforeEach(() => {
      slottedCssMap.clear();
      container = document.createElement('p-container');
      const shadowRoot = container.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.appendChild(document.createTextNode('.foo { font-weight: strong; }'));
      shadowRoot.appendChild(style);
    });

    it('should prepend styles to the shadow root', () => {
      const element = document.createElement('p-element');
      container.shadowRoot.appendChild(element);

      expect(container.shadowRoot.querySelectorAll('style').length).toBe(1);
      attachSlottedCss(element, (h) => 'p-element { position: relative; color: #ff00ff; }');
      const styleElements = container.shadowRoot.querySelectorAll('style');

      expect(styleElements.length).toBe(2);
      expect(document.querySelectorAll('style').length).toBe(0);
      expect(styleElements[0].textContent).toBe('p-element { position: relative; color: #ff00ff; }');
    });

    it('should prepend styles only once per tag name', () => {
      const divElement = document.createElement('p-div');
      const spanElement = document.createElement('p-span');
      container.shadowRoot.appendChild(divElement);
      container.shadowRoot.appendChild(spanElement);

      expect(container.shadowRoot.querySelectorAll('style').length).toBe(1);
      attachSlottedCss(divElement, (h) => 'p-div { color: #ff00ff; }');
      attachSlottedCss(spanElement, (h) => 'p-span { position: relative; color: #ff00ff; }');
      attachSlottedCss(divElement, (h) => 'p-div { position: relative; color: #ff00ff; }');
      attachSlottedCss(spanElement, (h) => 'p-span { color: #ff00ff; }');
      attachSlottedCss(spanElement, (h) => 'p-span { color: #ff00ff; }');
      const styleElements = container.shadowRoot.querySelectorAll('style');

      expect(styleElements.length).toBe(3);
      expect(document.querySelectorAll('style').length).toBe(0);
      expect(styleElements[0].textContent).toBe('p-span { position: relative; color: #ff00ff; }');
      expect(styleElements[1].textContent).toBe('p-div { color: #ff00ff; }');
    });

    // TODO: does this test still make sense because of caching?
    it('should prepend for the same tag name for each shadow root', () => {
      const container2 = document.createElement('div');
      container2.attachShadow({ mode: 'open' });

      const divElement = document.createElement('p-div');
      const divElement2 = document.createElement('p-div');

      expect(container.shadowRoot.querySelectorAll('style').length).toBe(1);
      expect(container2.shadowRoot.querySelectorAll('style').length).toBe(0);
      container.shadowRoot.appendChild(divElement);
      container2.shadowRoot.appendChild(divElement2);
      attachSlottedCss(divElement, (h) => 'p-div { color: #ff00ff; }');
      attachSlottedCss(divElement2, (h) => '.div2 { position: relative; color: #ff00ff; }');
      const styleElements = container.shadowRoot.querySelectorAll('style');
      const styleElements2 = container2.shadowRoot.querySelectorAll('style');

      expect(styleElements.length).toBe(2);
      expect(styleElements2.length).toBe(1);
      expect(styleElements[0].textContent).toBe('p-div { color: #ff00ff; }');
      expect(styleElements2[0].textContent).toBe('p-div { color: #ff00ff; }');
    });
  });
});

describe('getCachedSlottedCss()', () => {
  beforeEach(() => {
    slottedCssMap.clear();
  });

  it('should return css provided by css function', () => {
    const host = document.createElement('p-some-element');
    const getSlottedCss = () => 'some css';

    expect(getCachedSlottedCss(host, getSlottedCss)).toBe('some css');
  });

  it('should keep CSS Cache clean', () => {
    const host1 = document.createElement('p-some-element');
    const host2 = document.createElement('my-prefix-p-some-element');
    const host3 = document.createElement('p-another-element');

    const getSlottedCss = () => 'some css';

    getCachedSlottedCss(host1, getSlottedCss);
    getCachedSlottedCss(host1, getSlottedCss);
    getCachedSlottedCss(host2, getSlottedCss);
    getCachedSlottedCss(host2, getSlottedCss);
    getCachedSlottedCss(host3, getSlottedCss);
    getCachedSlottedCss(host3, getSlottedCss);

    expect(slottedCssMap).toMatchSnapshot();
  });

  it('should call provided css function only once when it was already called before for the same host type', () => {
    const host1 = document.createElement('p-some-element');
    const host2 = document.createElement('p-some-element');
    const host3 = document.createElement('p-another-element');
    const getSlottedCss = jest.fn();

    getCachedSlottedCss(host1, getSlottedCss);

    expect(getSlottedCss).toHaveBeenCalledTimes(1);

    getCachedSlottedCss(host2, getSlottedCss);

    expect(getSlottedCss).toHaveBeenCalledTimes(1);

    getCachedSlottedCss(host3, getSlottedCss);

    expect(getSlottedCss).toHaveBeenCalledTimes(2);
  });

  it('should call provided css function again for prefixed version of host type', () => {
    const host = document.createElement('p-some-element');
    const hostPrefixed = document.createElement('my-prefix-p-some-element');
    const getSlottedCss = jest.fn();

    getCachedSlottedCss(host, getSlottedCss);

    expect(getSlottedCss).toHaveBeenCalledTimes(1);

    getCachedSlottedCss(hostPrefixed, getSlottedCss);

    expect(getSlottedCss).toHaveBeenCalledTimes(2);
  });
});
