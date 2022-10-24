import { LinkTileAlign, throwIfAlignTopAndNotCompact } from './link-tile-utils';

describe('throwIfAlignTopAndNotCompact()', () => {
  it('should throw error when used with align top and compact false', () => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, 'top', false)).toThrowErrorMatchingInlineSnapshot(
      '"Usage of div is not valid. Top alignment is only possible when compact is true."'
    );
  });

  it.each<[LinkTileAlign, boolean]>([
    ['top', true],
    ['bottom', true],
    ['bottom', false],
  ])('should not throw error for align: %s and compact: %s', (align, compact) => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, align, compact)).not.toThrow();
  });
});
