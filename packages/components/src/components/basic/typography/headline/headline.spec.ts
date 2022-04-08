import * as transitionListenerUtils from '../../../../utils/transition-listener';
import { Headline } from './headline';

describe('headline', () => {
  describe('componentDidLoad', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
    });

    it('should not call transitionListener for default variant', () => {
      const component = new Headline();
      component.componentDidLoad();

      expect(spy).not.toBeCalled();
    });

    it('should call transitionListener when variant="inherit"', () => {
      const component = new Headline();
      component.variant = 'inherit';
      component.componentDidLoad();

      expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
    });
  });
});
