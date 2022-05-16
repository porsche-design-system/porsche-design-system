import * as throwIfParentIsNotOfKindUtils from '../../../utils/dom/throwIfParentIsNotOfKind';
import { Scroller } from './scroller';

describe('scroller', () => {
  describe('connectedCallback', () => {
    it('should call throwIfParentIsNotOfKind() with correct parameters', () => {
      const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
      const component = new Scroller();

      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'pScroller');
    });
  });
});
