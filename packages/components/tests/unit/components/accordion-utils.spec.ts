import {
  setCollapsibleElementHeight,
  getContentWrapperHeight,
  throwIfCompactAndSizeIsSet,
  AccordionSize,
} from '../../../src/components/content/accordion/accordion-utils';
import { getSlottedCss } from '../../../src/components/content/accordion/accordion-styles';
import { BreakpointCustomizable } from '../../../src/utils';

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

  it('should not style.height when no element is present', () => {
    let error;
    try {
      setCollapsibleElementHeight(undefined, false, '200px');
    } catch (e) {
      error = e;
    }
    expect(error).toBe(undefined);
  });
});

describe('getContentWrapperHeight()', () => {
  it('should return height value with extra padding in rem', () => {
    expect(getContentWrapperHeight({ height: 16 } as DOMRectReadOnly, false)).toBe('1.5rem');
  });

  it('should return height value without extra padding for compact = true in rem', () => {
    expect(getContentWrapperHeight({ height: 16 } as DOMRectReadOnly, true)).toBe('1rem');
  });
});

describe('getSlottedCss()', () => {
  it('should contain correct css', () => {
    const host = document.createElement('p-accordion');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-accordion');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});

describe('throwIfCompactAndSizeIsSet()', () => {
  it.each([
    [true, 'medium', `Size of \'"medium"\' is ignored when compact is set to 'true' on p-accordion.`],
    [
      true,
      { base: 'small', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' },
      `Size of '{"base":"small","xs":"small","s":"medium","m":"small","l":"medium","xl":"small"}' is ignored when compact is set to 'true' on p-accordion.`,
    ],
    [false, 'medium', undefined],
    [false, 'small', undefined],
  ])('should throw error for compact = %s and size = %o', (compact, size, expected) => {
    const host = document.createElement('p-accordion');
    let error;
    try {
      throwIfCompactAndSizeIsSet(host, compact, size as BreakpointCustomizable<AccordionSize>);
    } catch (e) {
      error = e.message;
    }
    expect(error).toBe(expected);
  });
});
