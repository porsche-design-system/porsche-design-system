import * as domUtils from '../../../src/utils/dom';
import { CheckboxWrapper } from '../../../src/components/form/checkbox-wrapper/checkbox-wrapper';
import * as mutationObserverUtils from '../../../src/utils/mutation-observer';
jest.mock('../../../src/utils/dom');
jest.mock('../../../src/utils/slotted-styles');

describe('checkbox-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const checkbox = new CheckboxWrapper();

      checkbox.connectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const checkbox = new CheckboxWrapper();
      try {
        checkbox.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledTimes(1);
    });

    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const checkbox = new CheckboxWrapper();

      checkbox.componentWillLoad();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'unobserveMutations');
      const checkbox = new CheckboxWrapper();

      checkbox.disconnectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });
});
