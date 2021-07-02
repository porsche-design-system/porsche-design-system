import * as domUtils from '../../../src/utils/dom';
import { TableRow } from '../../../src/components/layout/table/table-row/table-row';

describe('table-row', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new TableRow();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableBody');
    });
  });
});
