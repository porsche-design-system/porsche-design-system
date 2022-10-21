import { throwIfAlignTopAndNotCompact } from './link-tile-utils';

describe('throwIfAlignTopWithoutCompact()', () => {
  it('should throw error when used with align top and compact false', () => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, 'top', false)).toThrowErrorMatchingInlineSnapshot(
      '"Usage of div is not valid. Top alignment is only possible when compact is true."'
    );
  });

  it('should not throw error when used with align top and compact true', () => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, 'top', true)).not.toThrow();
  });

  it('should not throw error when used with align bottom and compact true', () => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, 'bottom', true)).not.toThrow();
  });

  it('should not throw error when used with align bottom and compact false', () => {
    const divElement = document.createElement('div');
    expect(() => throwIfAlignTopAndNotCompact(divElement, 'bottom', false)).not.toThrow();
  });
});
