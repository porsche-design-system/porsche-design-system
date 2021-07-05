import {
  getCollapsibleElementHeight,
  getContentWrapperHeight,
  getSlottedCss,
} from '../../../src/components/content/accordion/accordion-utils';

describe('getCollapsibleElementHeight()', () => {
  it('should return "200px" if isOpen = true', () => {
    expect(getCollapsibleElementHeight(true, '200px')).toBe('200px');
  });

  it('should return "0" if isOpen = false', () => {
    expect(getCollapsibleElementHeight(false, '200px')).toBe('0');
  });
});

describe('getContentWrapperHeight()', () => {
  it.each([
    [undefined, { height: 20 }, '1.25rem'],
    [{ blockSize: 300 }, undefined, '18.75rem'],
    [[{ blockSize: 300 }], undefined, '18.75rem'],
    [{ blockSize: 300 }, { height: 20 }, '18.75rem'],
    [[{ blockSize: 300 }], { height: 20 }, '18.75rem'],
  ])(
    'should for border boxSize = %o and contentRect = %o return %s',
    (borderBoxSize: ResizeObserverSize[], contentRect: DOMRectReadOnly, expected: string) => {
      expect(getContentWrapperHeight(borderBoxSize, contentRect)).toBe(expected);
    }
  );
});

describe('getSlottedCss() should contain correct css', () => {
  const host = document.createElement('p-accordion');
  expect(getSlottedCss(host)).toMatchSnapshot();
});
