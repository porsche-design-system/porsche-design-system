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

      expect(spy).toBeCalledWith(undefined, 'pTableHeadRow');
    });

    it('should call throwIfElementHasAttribute()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfElementHasAttribute');
      const component = new TableHeadCell();
      component.host = document.createElement('p-table-head-cell');
      component.host.attachShadow({ mode: 'open' });

      const parent = document.createElement('p-table-head-row');
      parent.appendChild(component.host);

      try {
        component.connectedCallback();
      } catch (e) {
        console.log(e);
      }

      expect(spy).toBeCalledWith(component.host, 'sort');
    });
  });
});
