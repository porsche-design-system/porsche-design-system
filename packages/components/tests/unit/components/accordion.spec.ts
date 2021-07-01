import * as resizeObserverUtils from '../../../src/utils/resize-observer';
import { Accordion } from '../../../src/components/content/accordion/accordion';
import * as slottedStylesUtils from '../../../src/utils/slotted-styles';

jest.mock('../../../src/utils/dom');
jest.mock('../../../src/utils/slotted-styles');

describe('accordion', () => {
  describe('connectedCallback', () => {
    it('should call insertSlottedStyles()', () => {
      const spy = jest.spyOn(slottedStylesUtils, 'insertSlottedStyles');
      const component = new Accordion();
      component.host = document.createElement('p-accordion');
      component.host.attachShadow({ mode: 'open' });
      component.connectedCallback();

      expect(spy).toBeCalledWith(component.host, expect.anything());
    });
  });

  describe('componentDidLoad', () => {
    it('should call observeResize()', () => {
      const spy = jest.spyOn(resizeObserverUtils, 'observeResize');
      const component = new Accordion();
      component.componentDidLoad();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveResize()', () => {
      const spy = jest.spyOn(resizeObserverUtils, 'unobserveResize');
      const component = new Accordion();
      component.disconnectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });
});
