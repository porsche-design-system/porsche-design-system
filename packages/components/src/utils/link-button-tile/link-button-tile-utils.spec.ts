import type { BreakpointCustomizable } from '../../types';
import type { TileAlign } from '../';
import { throwIfAlignTopAndNotCompact } from './link-button-tile-utils';

describe('throwIfAlignTopAndNotCompact()', () => {
  it.each<[TileAlign, BreakpointCustomizable<boolean>]>([
    ['top', false],
    ['top', 'false'],
    ['top', { base: false }],
    ['top', '{base: false, l: false}'],
  ])('should throw error for align: %s and compact: %s', (align, compact) => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, align, compact)).toThrowError(
      /\[Porsche Design System\] usage of div is not valid\. align='top' is only possible with compact='true'\./
    );
  });

  it.each<[TileAlign, BreakpointCustomizable<boolean>]>([
    ['top', true],
    ['bottom', true],
    ['bottom', false],
    ['top', { base: true, xs: false, m: true }],
    ['top', { base: false, l: true }],
    ['top', 'true'],
    ['top', ''], // HTML boolean attribute shorthand
  ])('should not throw error for align: %s and compact: %s', (align, compact) => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, align, compact)).not.toThrow();
  });
});
