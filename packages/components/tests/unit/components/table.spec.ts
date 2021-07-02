import * as slottedStylesUtils from '../../../src/utils/slotted-styles';
import * as tableUtils from '../../../src/components/layout/table/table-utils';
import { Table } from '../../../src/components/layout/table/table/table';

describe('table', () => {
  describe('connectedCallback', () => {
    it('should call insertSlottedStyles()', () => {
      const spy = jest.spyOn(slottedStylesUtils, 'insertSlottedStyles');
      const component = new Table();
      component.host = document.createElement('p-table');
      component.host.attachShadow({ mode: 'open' });
      component.connectedCallback();

      expect(spy).toBeCalledWith(component.host, expect.anything());
    });
  });

  describe('componentWillLoad', () => {
    it('should call warnIfCaptionIsUndefined()', () => {
      const spy = jest.spyOn(tableUtils, 'warnIfCaptionIsUndefined');
      const component = new Table();
      component.host = document.createElement('p-table');
      component.caption = 'some valid caption';
      component.host.attachShadow({ mode: 'open' });
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component.host, 'some valid caption');
    });
  });
});
