import * as tableUtils from './table-utils';
import { Table } from './table';

describe('table', () => {
  describe('componentWillLoad', () => {
    it('should call warnIfCaptionIsUndefined()', () => {
      const spy = jest.spyOn(tableUtils, 'warnIfCaptionIsUndefined');
      const component = new Table();
      component.host = document.createElement('p-table');
      component.host.attachShadow({ mode: 'open' });
      component.caption = 'some valid caption';
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component.host, 'some valid caption');
    });
  });
});
