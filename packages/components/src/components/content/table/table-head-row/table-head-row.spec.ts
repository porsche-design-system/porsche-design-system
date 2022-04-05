import * as domValidationUtils from '../../../../utils/dom/dom-validation';
import { TableHeadRow } from './table-head-row';

describe('table-head-row', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domValidationUtils, 'throwIfParentIsNotOfKind');
      const component = new TableHeadRow();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableHead');
    });
  });
});
