import * as domUtils from '../../../utils/dom';
import { CheckboxWrapper } from './checkbox-wrapper';
import * as attributeObserverUtils from '../../../utils/attribute-observer';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('checkbox-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeAttributes() with correct parameters', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new CheckboxWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'required'], expect.anything());
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined() with correct parameters', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new CheckboxWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'input[type="checkbox"]');
    });

    it('should call observeAttributes() with correct parameters', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new CheckboxWrapper();
      component.componentWillLoad();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'required'], expect.anything());
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveAttributes() with correct parameter', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
      const component = new CheckboxWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
