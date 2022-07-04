import * as throwIfParentIsNotOfKindUtils from '../../../../utils/validation/throwIfParentIsNotOfKind';
import { TableCell } from './table-cell';

describe('table-cell', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind() with correct parameters', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new TableCell();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableRow');
    });
  });
});
