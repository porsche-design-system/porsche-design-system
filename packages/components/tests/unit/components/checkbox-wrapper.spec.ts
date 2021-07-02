import * as domUtils from '../../../src/utils/dom';
import { CheckboxWrapper } from '../../../src/components/form/checkbox-wrapper/checkbox-wrapper';
import * as mutationObserverUtils from '../../../src/utils/mutation-observer';

jest.mock('../../../src/utils/dom');
jest.mock('../../../src/utils/slotted-styles');

describe('checkbox-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new CheckboxWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledWith(undefined, ['disabled'], expect.anything());
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

    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new CheckboxWrapper();
      component.componentWillLoad();

      expect(spy).toBeCalledWith(undefined, ['disabled'], expect.anything());
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'unobserveMutations');
      const component = new CheckboxWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
