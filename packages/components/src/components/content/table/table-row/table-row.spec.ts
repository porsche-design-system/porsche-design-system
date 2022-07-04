import * as throwIfParentIsNotOfKindUtils from '../../../../utils/validation/throwIfParentIsNotOfKind';
import { TableRow } from './table-row';

describe('table-row', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind() with correct parameters', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new TableRow();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableBody');
    });
  });
});
