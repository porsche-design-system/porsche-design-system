import type { TextSize } from '../../types';
import type { BreakpointCustomizable } from '../breakpoint-customizable';
import { isSizeInherit } from './isSizeInherit';

describe('isSizeInherit()', () => {
  it.each<[BreakpointCustomizable<TextSize>, boolean]>([
    ['inherit', true],
    [{ base: 'large', l: 'inherit' }, true],
    ['medium', false],
  ])('should for size %s return %s', (size, result) => {
    expect(isSizeInherit(size)).toBe(result);
  });
});
