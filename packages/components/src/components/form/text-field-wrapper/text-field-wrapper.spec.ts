import * as domUtils from '../../../utils/dom';
import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import { TextFieldWrapper } from './text-field-wrapper';
import * as attributeObserverUtils from '../../../utils/attribute-observer';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('text-field-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeAttributes()', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new TextFieldWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
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

    it('should call observeAttributes()', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new TextFieldWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
    });
  });

  describe('componentWillRender', () => {
    it('should call throwIfUnitLengthExceeded()', () => {
      const component = new TextFieldWrapper();
      const spy = jest.spyOn(textFieldWrapperUtils, 'throwIfUnitLengthExceeded');

      try {
        component.componentWillRender();
      } catch (e) {}

      expect(spy).toBeCalledWith('');
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveAttributes()', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
      const component = new TextFieldWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
