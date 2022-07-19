import * as throwIfElementHasAttributeUtils from '../../../../utils/validation/throwIfElementHasAttribute';
import { TableHeadCell } from './table-head-cell';

describe('connectedCallback', () => {
  it('should call throwIfElementHasAttribute() with correct parameters', () => {
    const spy = jest.spyOn(throwIfElementHasAttributeUtils, 'throwIfElementHasAttribute');
    const component = new TableHeadCell();
    component.host = document.createElement('p-table-head-cell');
    component.host.attachShadow({ mode: 'open' });

    const parent = document.createElement('p-table-head-row');
    parent.appendChild(component.host);

    try {
      component.connectedCallback();
    } catch {}

    expect(spy).toBeCalledWith(component.host, 'sort');
  });
});
