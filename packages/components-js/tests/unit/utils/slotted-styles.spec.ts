import { insertSlottedStyles } from '../../../src/utils';

describe('slottedStyles', () => {
  describe('for elements outside of shadow root', () => {
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
      const element = document.createElement('div');
      document.body.append(element);
      insertSlottedStyles(element, 'div { color: #ff00ff; }');
      const styleElements = document.querySelectorAll('style');
      expect(styleElements.length).toBe(1);
      expect(styleElements[0].innerText).toBe('div{color:#ff00ff}');

      // cleanup
      styleElements[0].remove();
      element.remove();
    });

    it('should prepend styles (to be easy to overwrite) and only once per tag name', () => {
      expect(document.querySelectorAll('style').length).toBe(0);
      const pElement = document.createElement('p');
      const spanElement = document.createElement('span');
      document.body.append(pElement);
      document.body.append(spanElement);
      insertSlottedStyles(pElement, 'p { position: relative; color: #ff00ff; }');
      insertSlottedStyles(spanElement, 'span { color: #ff00ff; }');
      insertSlottedStyles(spanElement, 'span { position: relative; color: #ff00ff; }');
      insertSlottedStyles(pElement, 'p { color: #ff00ff; }');
      insertSlottedStyles(spanElement, 'span { color: #ff00ff; }');
      const styleElements = document.querySelectorAll('style');
      expect(styleElements.length).toBe(2);
      expect(styleElements[0].innerText).toBe('span{color:#ff00ff}');
      expect(styleElements[1].innerText).toBe('p{position:relative;color:#ff00ff}');

      // cleanup
      styleElements[0].remove();
      styleElements[1].remove();
      spanElement.remove();
      pElement.remove();
    });
  });

  describe('for elements inside of shadow root', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      const shadowRoot = container.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.appendChild(document.createTextNode('.foo { font-weight: strong; }'));
      shadowRoot.appendChild(style);
    });

    afterEach(() => {
      // cleanup
      container.remove();
    });

    it('should prepend styles to the shadow root', () => {
      const element = document.createElement('div');
      container.shadowRoot.appendChild(element);

      expect(container.shadowRoot.querySelectorAll('style').length).toBe(1);
      insertSlottedStyles(element, 'div { position: relative; color: #ff00ff; }');
      const styleElements = container.shadowRoot.querySelectorAll('style');
      expect(styleElements.length).toBe(2);
      expect(document.querySelectorAll('style').length).toBe(0);
      expect(styleElements[0].innerText).toBe('div{position:relative;color:#ff00ff}');
    });

    it('should prepend styles only once per tag name', () => {
      const divElement = document.createElement('div');
      const spanElement = document.createElement('span');
      container.shadowRoot.appendChild(divElement);
      container.shadowRoot.appendChild(spanElement);

      expect(container.shadowRoot.querySelectorAll('style').length).toBe(1);
      insertSlottedStyles(divElement, 'div { color: #ff00ff; }');
      insertSlottedStyles(spanElement, 'span { position: relative; color: #ff00ff; }');
      insertSlottedStyles(divElement, 'div { position: relative; color: #ff00ff; }');
      insertSlottedStyles(spanElement, 'span { color: #ff00ff; }');
      insertSlottedStyles(spanElement, 'span { color: #ff00ff; }');
      const styleElements = container.shadowRoot.querySelectorAll('style');
      expect(styleElements.length).toBe(3);
      expect(document.querySelectorAll('style').length).toBe(0);
      expect(styleElements[0].innerText).toBe('span{position:relative;color:#ff00ff}');
      expect(styleElements[1].innerText).toBe('div{color:#ff00ff}');
    });

    it('should prepend for the same tag name for each shadow root', () => {
      const container2 = document.createElement('div');
      container2.attachShadow({ mode: 'open' });

      const divElement = document.createElement('div');
      const divElement2 = document.createElement('div');

      expect(container.shadowRoot.querySelectorAll('style').length).toBe(1);
      expect(container2.shadowRoot.querySelectorAll('style').length).toBe(0);
      container.shadowRoot.appendChild(divElement);
      container2.shadowRoot.appendChild(divElement2);
      insertSlottedStyles(divElement, 'div { color: #ff00ff; }');
      insertSlottedStyles(divElement2, '.div2 { position: relative; color: #ff00ff; }');
      const styleElements = container.shadowRoot.querySelectorAll('style');
      const styleElements2 = container2.shadowRoot.querySelectorAll('style');
      expect(styleElements.length).toBe(2);
      expect(styleElements2.length).toBe(1);
      expect(styleElements[0].innerText).toBe('div{color:#ff00ff}');
      expect(styleElements2[0].innerText).toBe('.div2{position:relative;color:#ff00ff}');

      // cleanup
      container2.remove();
    });
  });
});
