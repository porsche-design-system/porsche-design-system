import * as domUtils from '../../../src/utils/dom';
import { TableRow } from '../../../src/components/layout/table/table-row/table-row';

describe('table-row', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOneOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOneOfKind');
      const component = new TableRow();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, ['pTable', 'pTableHead', 'pTableBody']);
    });
  });
});
