import * as domValidationUtils from '../../../../utils/dom/dom-validation';
import { FlexItem } from './flex-item';

describe('flex-item', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind()', () => {
      const spy = jest.spyOn(domValidationUtils, 'throwIfParentIsNotOfKind');
      const component = new FlexItem();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pFlex');
    });
  });
});
