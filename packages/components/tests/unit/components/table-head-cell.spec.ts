import * as domUtils from '../../../src/utils/dom';
import { TableHeadCell } from '../../../src/components/layout/table/table-head-cell/table-head-cell';

describe('table-head-cell', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new TableHeadCell();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableRow');
    });
  });
});
