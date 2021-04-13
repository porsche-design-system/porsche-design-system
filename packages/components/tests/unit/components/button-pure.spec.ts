import * as transitionListenerUtils from '../../../src/utils/transition-listener';
import { ButtonPure } from '../../../src/components/action/button-pure/button-pure';
jest.mock('../../../src/utils/focus-handling');
jest.mock('../../../src/utils/button-handling');

describe('button-pure', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
  });

  it('should not call transitionListener for default size', () => {
    const buttonPure = new ButtonPure();
    buttonPure.componentDidLoad();

    expect(spy).toBeCalledTimes(0);
  });

  it('should call transitionListener when size="inherit"', () => {
    const buttonPure = new ButtonPure();
    buttonPure.size = 'inherit';
    buttonPure.componentDidLoad();

    expect(spy).toBeCalledTimes(1);
  });
});
