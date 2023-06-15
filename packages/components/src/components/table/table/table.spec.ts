import * as tableUtils from './table-utils';
import { Table } from './table';

describe('table', () => {
  describe('componentWillLoad', () => {
    it('should call warnIfCaptionIsMissing() with correct parameters', () => {
      const spy = jest.spyOn(tableUtils, 'warnIfCaptionIsMissing');
      const component = new Table();
      component.host = document.createElement('p-table');
      component.host.attachShadow({ mode: 'open' });
      component.caption = 'some valid caption';
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component.host, 'some valid caption');
    });
  });
});
