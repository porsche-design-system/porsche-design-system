import * as domUtils from '../../../src/utils/dom';
import { TableHead } from '../../../src/components/layout/table/table-head/table-head';

describe('table-head', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new TableHead();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTable');
    });
  });
});
