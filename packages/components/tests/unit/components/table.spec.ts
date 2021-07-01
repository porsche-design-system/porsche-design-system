import * as slottedStylesUtils from '../../../src/utils/slotted-styles';
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
});
