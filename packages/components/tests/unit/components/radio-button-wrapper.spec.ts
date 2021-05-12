import * as domUtils from '../../../src/utils/dom';
import { RadioButtonWrapper } from '../../../src/components/form/radio-button-wrapper/radio-button-wrapper';
import * as mutationObserverUtils from '../../../src/utils/mutation-observer';

jest.mock('../../../src/utils/dom');
jest.mock('../../../src/utils/slotted-styles');

describe('radio-button-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new RadioButtonWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new RadioButtonWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledTimes(1);
    });

    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new RadioButtonWrapper();
      component.componentWillLoad();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'unobserveMutations');
      const component = new RadioButtonWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });
});
