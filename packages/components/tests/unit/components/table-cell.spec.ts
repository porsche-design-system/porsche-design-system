import * as domUtils from '../../../src/utils/dom';
import { TableCell } from '../../../src/components/layout/table/table-cell/table-cell';

describe('table-cell', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new TableCell();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableRow');
    });
  });
});
