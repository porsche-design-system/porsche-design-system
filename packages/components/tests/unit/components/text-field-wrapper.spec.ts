import * as domUtils from '../../../src/utils/dom';
import { TextFieldWrapper } from '../../../src/components/form/text-field-wrapper/text-field-wrapper';
import * as mutationObserverUtils from '../../../src/utils/mutation-observer';

jest.mock('../../../src/utils/dom');
jest.mock('../../../src/utils/slotted-styles');

describe('text-field-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new TextFieldWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly'], expect.anything());
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new TextFieldWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      const selector = ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
        .map((type) => `input[type=${type}]`)
        .join(',');

      expect(spy).toBeCalledWith(undefined, selector);
    });

    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new TextFieldWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly'], expect.anything());
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'unobserveMutations');
      const component = new TextFieldWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
