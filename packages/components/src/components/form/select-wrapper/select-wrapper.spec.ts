import * as domUtils from '../../../utils/dom';
import { SelectWrapper } from './select-wrapper';

describe('select-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new SelectWrapper();
      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'select');
    });
  });
});
