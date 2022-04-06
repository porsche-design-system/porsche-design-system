import * as throwIfParentIsNotOfKindUtils from '../../../../utils/dom/throwIfParentIsNotOfKind';
import { TableHeadRow } from './table-head-row';

describe('table-head-row', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new TableHeadRow();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableHead');
    });
  });
});
