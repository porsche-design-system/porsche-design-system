import * as domValidationUtils from '../../../../utils/dom/dom-validation';
import { TextListItem } from './text-list-item';

describe('text-list-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domValidationUtils, 'throwIfParentIsNotOfKind');
      const component = new TextListItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTextList');
    });
  });
});
