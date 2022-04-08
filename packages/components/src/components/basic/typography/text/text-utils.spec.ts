import { isSizeInherit, setLineHeightOnSizeInherit, TextSize } from './text-utils';
import { BreakpointCustomizable } from '../../../../utils';
import * as transitionListenerUtils from '../../../../utils/transition-listener';
import { Headline } from '../headline/headline';

describe('isSizeInherit()', () => {
  it.each<[BreakpointCustomizable<TextSize>, boolean]>([
    ['inherit', true],
    [{ base: 'large', l: 'inherit' }, true],
    ['medium', false],
  ])('should for size %s return %s', (size, result) => {
    expect(isSizeInherit(size)).toBe(result);
  });
});

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
