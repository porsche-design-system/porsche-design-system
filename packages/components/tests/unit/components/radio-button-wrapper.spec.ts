import * as domUtils from '../../../src/utils/dom';
import { RadioButtonWrapper } from '../../../src/components/form/radio-button-wrapper/radio-button-wrapper';
import * as mutationObserverUtils from '../../../src/utils/mutation-observer';
jest.mock('../../../src/utils/dom');
jest.mock('../../../src/utils/slotted-styles');

describe('radio-button-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const radioButton = new RadioButtonWrapper();

      radioButton.connectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const radioButton = new RadioButtonWrapper();
      try {
        radioButton.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledTimes(1);
    });

    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const radioButton = new RadioButtonWrapper();

      radioButton.componentWillLoad();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'unobserveMutations');
      const radioButton = new RadioButtonWrapper();

      radioButton.disconnectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });
});
