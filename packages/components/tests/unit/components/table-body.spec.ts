import * as domUtils from '../../../src/utils/dom';
import { TableBody } from '../../../src/components/layout/table/table-body/table-body';

describe('table-body', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new TableBody();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTable');
    });
  });
});
