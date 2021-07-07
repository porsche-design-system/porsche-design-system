import {
  setCollapsibleElementHeight,
  getContentWrapperHeight,
} from '../../../src/components/content/accordion/accordion-utils';
import { getSlottedCss } from '../../../src/components/content/accordion/accordion-styles';

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
