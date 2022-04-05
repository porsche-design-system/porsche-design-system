import * as domValidationUtils from '../../../../utils/dom/dom-validation';
import { TabsItem } from './tabs-item';

describe('tabs-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domValidationUtils, 'throwIfParentIsNotOfKind');
      const component = new TabsItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pTabs');
    });
  });
});
