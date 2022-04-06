import * as throwIfParentIsNotOfKindUtils from '../../../../utils/dom/throwIfParentIsNotOfKind';
import { TableRow } from './table-row';

describe('table-row', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new TableRow();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableBody');
    });
  });
});
