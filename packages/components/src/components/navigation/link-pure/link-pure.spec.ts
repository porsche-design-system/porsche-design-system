import * as transitionListenerUtils from '../../../utils/transition-listener';
import { LinkPure } from './link-pure';

jest.mock('../../../utils/focus-handling');

describe('link-pure', () => {
  describe('componentDidLoad', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
    });

    it('should not call transitionListener for default size', () => {
      const component = new LinkPure();
      component.componentDidLoad();

      expect(spy).toBeCalledTimes(0);
    });

    it('should call transitionListener when size="inherit"', () => {
      const component = new LinkPure();
      component.size = 'inherit';
      component.componentDidLoad();

      expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
    });
  });
});
