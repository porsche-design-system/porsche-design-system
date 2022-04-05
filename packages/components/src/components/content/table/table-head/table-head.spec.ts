import * as domValidationUtils from '../../../../utils/dom/dom-validation';
import { TableHead } from './table-head';

describe('table-head', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domValidationUtils, 'throwIfParentIsNotOfKind');
      const component = new TableHead();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTable');
    });
  });
});
