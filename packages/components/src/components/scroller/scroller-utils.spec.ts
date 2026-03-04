import { vi } from 'vitest';
import * as getHTMLElementsUtils from '../../utils/dom/getHTMLElements';
import { getScrollerElements } from './scroller-utils';

describe('getScrollerElements()', () => {
  it('should call getHTMLElements() with correct parameters', () => {
    const spy = vi.spyOn(getHTMLElementsUtils, 'getHTMLElements');
    const scroller = document.createElement('p-scroller');
    scroller.attachShadow({ mode: 'open' });

    getScrollerElements(scroller);
    expect(spy).toHaveBeenCalledWith(scroller.shadowRoot, '.scroll-area,.action-prev');
  });

  it('should return tuple result of getHTMLElements()', () => {
    const mockResult1 = document.createElement('div');
    mockResult1.id = 'mock-result-1';
    const mockResult2 = document.createElement('div');
    mockResult2.id = 'mock-result-2';
    vi.spyOn(getHTMLElementsUtils, 'getHTMLElements').mockReturnValue([mockResult1, mockResult2]);

    const scroller = document.createElement('p-scroller');
    scroller.attachShadow({ mode: 'open' });

    expect(getScrollerElements(scroller)).toEqual([mockResult1, mockResult2]);
  });
});
