import * as throwIfParentIsNotOfKindUtils from '../../../../utils/dom/throwIfParentIsNotOfKind';
import { FlexItem } from './flex-item';

describe('flex-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new FlexItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pFlex');
    });
  });
});
