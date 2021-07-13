import { setCollapsibleElementHeight, getContentHeight, warnIfCompactAndSizeIsSet } from './accordion-utils';

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

  it('should throw error when no element is present', () => {
    let error;
    try {
      setCollapsibleElementHeight(undefined, false, '200px');
    } catch (e) {
      error = e;
    }
    expect(error).toBe(undefined);
  });
});

describe('getContentHeight()', () => {
  it('should return height value with extra padding in rem', () => {
    expect(getContentHeight({ height: 16 } as DOMRectReadOnly, false)).toBe('1.5rem');
  });

  it('should return height value without extra padding for compact = true in rem', () => {
    expect(getContentHeight({ height: 16 } as DOMRectReadOnly, true)).toBe('1rem');
  });
});

describe('warnIfCompactAndSizeIsSet()', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  it('should print warning when compact and size is defined', () => {
    const host = document.createElement('p-accordion');

    warnIfCompactAndSizeIsSet(host, true, 'small');
    warnIfCompactAndSizeIsSet(host, false, 'medium');
    expect(console.warn).toBeCalledTimes(0);

    warnIfCompactAndSizeIsSet(host, true, 'medium');
    warnIfCompactAndSizeIsSet(
      host,
      true,
      '{"base":"small","xs":"small","s":"medium","m":"small","l":"medium","xl":"small"}'
    );

    expect(console.warn).toBeCalledTimes(2);
  });
});
