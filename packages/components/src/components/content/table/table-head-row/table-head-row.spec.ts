import * as domUtils from '../../../../utils/dom';
import { TableHeadRow } from './table-head-row';

describe('table-head-row', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new TableHeadRow();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableHead');
    });
  });
});
