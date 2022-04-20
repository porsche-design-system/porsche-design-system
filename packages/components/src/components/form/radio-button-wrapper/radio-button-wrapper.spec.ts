import * as domUtils from '../../../utils/dom';
import { RadioButtonWrapper } from './radio-button-wrapper';
import * as attributeObserverUtils from '../../../utils/attribute-observer';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('radio-button-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeAttributes() with correct parameters', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new RadioButtonWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'required'], expect.anything());
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined() with correct parameters', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new RadioButtonWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'input[type="radio"]');
    });

    it('should call observeAttributes() with correct parameters', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new RadioButtonWrapper();
      component.componentWillLoad();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'required'], expect.anything());
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveAttributes() with correct parameter', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
      const component = new RadioButtonWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
