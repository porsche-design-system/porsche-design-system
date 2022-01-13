import * as transitionListenerUtils from '../../../utils/transition-listener';
import { ButtonPure } from './button-pure';

jest.mock('../../../utils/button-handling');

describe('button-pure', () => {
  describe('componentDidLoad', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
    });

    it('should not call transitionListener for default size', () => {
      const component = new ButtonPure();
      component.componentDidLoad();

      expect(spy).toBeCalledTimes(0);
    });

    it('should call transitionListener when size="inherit"', () => {
      const component = new ButtonPure();
      component.size = 'inherit';
      component.componentDidLoad();

      expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
    });
  });
});
