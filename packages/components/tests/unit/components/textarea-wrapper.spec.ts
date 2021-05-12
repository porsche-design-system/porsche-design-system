import * as domUtils from '../../../src/utils/dom';
import { TextareaWrapper } from '../../../src/components/form/textarea-wrapper/textarea-wrapper';
import * as mutationObserverUtils from '../../../src/utils/mutation-observer';

jest.mock('../../../src/utils/dom');
jest.mock('../../../src/utils/slotted-styles');

describe('textarea-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new TextareaWrapper();
      component.connectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('componentWillLoad', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new TextareaWrapper();
      try {
        component.componentWillLoad();
      } catch (e) {}

      expect(spy).toBeCalledTimes(1);
    });

    it('should call observeMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'observeMutations');
      const component = new TextareaWrapper();
      component.componentWillLoad();

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call unobserveMutations()', () => {
      const spy = jest.spyOn(mutationObserverUtils, 'unobserveMutations');
      const component = new TextareaWrapper();
      component.disconnectedCallback();

      expect(spy).toBeCalledTimes(1);
    });
  });
});
