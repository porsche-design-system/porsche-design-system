import * as domUtils from '../../../src/utils/dom';
import { GridItem } from '../../../src/components/layout/grid/grid-item/grid-item';

describe('grid-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
      const component = new GridItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pGrid');
    });
  });
});
