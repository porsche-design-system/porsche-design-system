import { isSizeInherit, TextSize } from './text-utils';
import { BreakpointCustomizable } from '../../../../utils';

describe('isSizeInherit()', () => {
  it.each<[BreakpointCustomizable<TextSize>, boolean]>([
    ['inherit', true],
    [{ base: 'large', l: 'inherit' }, true],
    ['medium', false],
  ])('should for size %s return %s', (size, result) => {
    expect(isSizeInherit(size)).toBe(result);
  });
});
