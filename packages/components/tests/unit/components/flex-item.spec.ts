import * as domUtils from '../../../src/utils/dom';
import { FlexItem } from '../../../src/components/layout/flex/flex-item/flex-item';

describe('flex-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new FlexItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pFlex');
    });
  });
});
