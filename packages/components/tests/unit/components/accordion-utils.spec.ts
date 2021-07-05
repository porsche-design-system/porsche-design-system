import {
  setCollapsibleElementHeight,
  getContentWrapperHeight,
  getSlottedCss,
} from '../../../src/components/content/accordion/accordion-utils';

describe('setCollapsibleElementHeight()', () => {
  it('should set style.height on element to "200px" if isOpen = true', () => {
    const collapsible = document.createElement('div');

    expect(collapsible.style.height).toBe('');

    setCollapsibleElementHeight(collapsible, true, '200px');

    expect(collapsible.style.height).toBe('200px');
  });

  it('should set style.height on element to "0" if isOpen = false', () => {
    const collapsible = document.createElement('div');

    expect(collapsible.style.height).toBe('');

    setCollapsibleElementHeight(collapsible, false, '200px');

    expect(collapsible.style.height).toBe('0px');
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
