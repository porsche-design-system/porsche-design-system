import * as domUtils from '../../../utils/dom';
import { CheckboxWrapper } from './checkbox-wrapper';
import * as mutationObserverUtils from '../../../utils/mutation-observer';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('checkbox-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeAttributes()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeAttributes');
      const component = new CheckboxWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'required'], expect.anything());
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new CheckboxWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'input[type="checkbox"]');
    });

    it('should call observeAttributes()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeAttributes');
      const component = new CheckboxWrapper();
      component.componentWillLoad();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'required'], expect.anything());
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveAttributes()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'unobserveAttributes');
      const component = new CheckboxWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
