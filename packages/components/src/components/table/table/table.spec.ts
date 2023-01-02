import * as tableUtils from './table-utils';
import { Table } from './table';

describe('connectedCallback', () => {
  it('should call warnIfCaptionIsUndefined() with correct parameters', () => {
    const spy = jest.spyOn(tableUtils, 'warnIfCaptionIsUndefined');
    const component = new Table();
    component.host = document.createElement('p-table');
    component.host.attachShadow({ mode: 'open' });
    component.caption = 'some valid caption';
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, 'some valid caption');
  });
});
