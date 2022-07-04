import * as throwIfParentIsNotOfKindUtils from '../../../../utils/validation/throwIfParentIsNotOfKind';
import * as throwIfElementHasAttributeUtils from '../../../../utils/validation/throwIfElementHasAttribute';
import { TableHeadCell } from './table-head-cell';

describe('table-head-cell', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind() with correct parameters', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new TableHeadCell();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTableHeadRow');
    });

    it('should call throwIfElementHasAttribute() with correct parameters', () => {
      const spy = jest.spyOn(throwIfElementHasAttributeUtils, 'throwIfElementHasAttribute');
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
