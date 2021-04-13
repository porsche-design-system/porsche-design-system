import { isSizeInherit, TextSize } from '../../../src/components/basic/typography/text/text-utils';
import { BreakpointCustomizable } from '../../../src/utils';

describe('isSizeInherit()', () => {
  it.each<[BreakpointCustomizable<TextSize>, boolean]>([
    ['inherit', true],
    [{ base: 'large', l: 'inherit' }, true],
    ['medium', false],
  ])('should for size %s return %s', (size, result) => {
    expect(isSizeInherit(size)).toBe(result);
  });
});
