import { Text } from '../../../src/components/basic/typography/text/text';
import * as transitionListenerUtils from '../../../src/utils/transition-listener';

describe('text', () => {
  describe('componentDidLoad', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
    });

    it('should not call transitionListener for default size', () => {
      const component = new Text();
      component.componentDidLoad();

      expect(spy).toBeCalledTimes(0);
    });

    it('should call transitionListener when size="inherit"', () => {
      const component = new Text();
      component.size = 'inherit';
      component.componentDidLoad();

      expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
    });
  });
});
