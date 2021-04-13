import { Text } from '../../../src/components/basic/typography/text/text';
import * as transitionListenerUtils from '../../../src/utils/transition-listener';

describe('button-pure', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
  });

  it('should not call transitionListener for default size', () => {
    const text = new Text();
    text.componentDidLoad();

    expect(spy).toBeCalledTimes(0);
  });

  it('should call transitionListener when size="inherit"', () => {
    const text = new Text();
    text.size = 'inherit';
    text.componentDidLoad();

    expect(spy).toBeCalledTimes(1);
  });
});
