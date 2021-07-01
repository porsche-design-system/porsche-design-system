import * as domUtils from '../../../src/utils/dom';
import { TextListItem } from '../../../src/components/content/text-list/text-list-item/text-list-item';

describe('text-list-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new TextListItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTextList');
    });
  });
});
