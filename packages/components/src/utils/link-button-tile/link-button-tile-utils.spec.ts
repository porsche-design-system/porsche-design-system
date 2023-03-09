import type { LinkTileAlign, ButtonTileAlign } from './link-button-tile-utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { throwIfAlignTopAndNotCompact } from './link-button-tile-utils';

describe('throwIfAlignTopAndNotCompact()', () => {
  it.each<[LinkTileAlign | ButtonTileAlign, BreakpointCustomizable<boolean>]>([
    ['top', false],
    ['top', 'false'],
  ])('should throw error for align: %s and compact: %s', (align, compact) => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, align, compact)).toThrowErrorMatchingInlineSnapshot(
      '"Usage of div is not valid. Top alignment is only possible when compact is true."'
    );
  });

  it.each<[LinkTileAlign | ButtonTileAlign, BreakpointCustomizable<boolean>]>([
    ['top', true],
    ['bottom', true],
    ['bottom', false],
    ['top', { base: true, xs: false, m: true }],
    ['top', 'true'],
  ])('should not throw error for align: %s and compact: %s', (align, compact) => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, align, compact)).not.toThrow();
  });
});
