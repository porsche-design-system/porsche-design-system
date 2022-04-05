import * as domValidationUtils from '../../../../utils/dom/dom-validation';
import { TableBody } from './table-body';

describe('table-body', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domValidationUtils, 'throwIfParentIsNotOfKind');
      const component = new TableBody();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTable');
    });
  });
});
