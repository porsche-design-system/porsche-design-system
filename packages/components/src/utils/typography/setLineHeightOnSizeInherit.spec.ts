import * as transitionListenerUtils from '../transition-listener';
import { setLineHeightOnSizeInherit } from './setLineHeightOnSizeInherit';

describe('setLineHeightOnSizeInherit()', () => {
  let spy: jest.SpyInstance;
  let elementTag;
  beforeEach(() => {
    spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
    elementTag = document.createElement('h1');
  });

  it('should not call transitionListener on non inherit size', () => {
    setLineHeightOnSizeInherit('headline-1', elementTag);
    expect(spy).not.toBeCalled();
  });

  it('should call transitionListener when size="inherit"', () => {
    setLineHeightOnSizeInherit('inherit', elementTag);

    expect(spy).toBeCalledWith(elementTag, 'font-size', expect.anything());
  });
});
