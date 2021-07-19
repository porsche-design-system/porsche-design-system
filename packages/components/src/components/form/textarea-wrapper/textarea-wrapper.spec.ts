import * as domUtils from '../../../utils/dom';
import { TextareaWrapper } from './textarea-wrapper';
import * as attributeObserverUtils from '../../../utils/attribute-observer';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('textarea-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeAttributes()', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new TextareaWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new TextareaWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'textarea');
    });

    it('should call observeAttributes()', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
      const component = new TextareaWrapper();
      component.componentWillLoad();

      expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveAttributes()', () => {
      const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
      const component = new TextareaWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
