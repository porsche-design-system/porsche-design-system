import { Accordion } from './accordion';
import * as accordionUtils from './accordion-utils';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('accordion', () => {
  describe('componentWillLoad', () => {
    it('should call throwIfCompactAndSizeIsSet()', () => {
      const spy = jest.spyOn(accordionUtils, 'warnIfCompactAndSizeIsSet');
      const component = new Accordion();
      component.host = document.createElement('p-accordion');
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component.host, undefined, 'small');
    });
  });

  describe('componentDidLoad', () => {
    it('should call observeResize()', () => {
      const spy = jest.spyOn(accordionUtils, 'observeResize');
      const component = new Accordion();
      component.componentDidLoad();

      expect(spy).toBeCalledWith(undefined, expect.anything(), { box: 'border-box' });
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveResize()', () => {
      const spy = jest.spyOn(accordionUtils, 'unobserveResize');
      const component = new Accordion();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
