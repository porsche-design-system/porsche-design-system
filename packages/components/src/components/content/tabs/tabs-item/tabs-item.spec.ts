import * as throwIfParentIsNotOfKindUtils from '../../../../utils/dom/throwIfParentIsNotOfKind';
import { TabsItem } from './tabs-item';

describe('tabs-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind() with correct parameters', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new TabsItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTabs');
    });
  });
});
