import * as throwIfParentIsNotOfKindUtils from '../../../../utils/validation/throwIfParentIsNotOfKind';
import { FlexItem } from './flex-item';

describe('flex-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind() with correct parameters', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new FlexItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pFlex');
    });
  });
});
