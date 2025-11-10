import { vi } from 'vitest';
import { Table } from './table';
import * as tableUtils from './table-utils';

describe('table', () => {
  describe('componentWillLoad', () => {
    it('should call warnIfCaptionIsMissing() with correct parameters', () => {
      const spy = vi.spyOn(tableUtils, 'warnIfCaptionIsMissing');
      const component = new Table();
      component.host = document.createElement('p-table');
      component.host.attachShadow({ mode: 'open' });
      component.caption = 'some valid caption';
      component.componentWillLoad();

      expect(spy).toHaveBeenCalledWith(component.host, 'some valid caption');
    });
  });
});
