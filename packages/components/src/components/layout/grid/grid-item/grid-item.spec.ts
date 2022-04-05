import * as domValidationUtils from '../../../../utils/dom/dom-validation';
import { GridItem } from './grid-item';

describe('grid-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domValidationUtils, 'throwIfParentIsNotOfKind');
      const component = new GridItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pGrid');
    });
  });
});
