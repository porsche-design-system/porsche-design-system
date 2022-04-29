import { getScrollActivePosition, getScrollPositionAfterPrevNextClick } from './scroller-utils';

describe('getScrollActivePosition()', () => {
  it('should return scrollActivePosition = 16 if scrolling to last tab', () => {
    expect(
      getScrollActivePosition([{ offsetLeft: 20, offsetWidth: 0 }] as HTMLElement[], 'next', 0, undefined, undefined)
    ).toBe(16);
  });

  it('should return scrollActivePosition = 8 if direction is "next", next tab is set as active', () => {
    expect(
      getScrollActivePosition(
        [
          { offsetLeft: 20, offsetWidth: 0 },
          { offsetLeft: 0, offsetWidth: 0 },
        ] as HTMLElement[],
        'next',
        0,
        undefined,
        20
      )
    ).toBe(8);
  });

  it('should return scrollActivePosition = 0 if direction is "prev" and first tab is set as active', () => {
    expect(
      getScrollActivePosition([{ offsetLeft: 0, offsetWidth: 0 }] as HTMLElement[], 'prev', 0, undefined, undefined)
    ).toBe(0);
  });

  it('should return scrollActivePosition = 41 if scrolling to previous tab', () => {
    expect(
      getScrollActivePosition(
        [
          { offsetLeft: 0, offsetWidth: 0 },
          { offsetLeft: 20, offsetWidth: 5 },
        ] as HTMLElement[],
        'prev',
        1,
        4,
        20
      )
    ).toBe(41);
  });
});

describe('getScrollPositionAfterPrevNextClick()', () => {
  it('should return scrollToMax = 58 if scroll step would exceed maximum', () => {
    expect(
      getScrollPositionAfterPrevNextClick(
        [{ offsetLeft: 50, offsetWidth: 50 }] as HTMLElement[],
        { offsetWidth: 50, scrollLeft: 50 } as HTMLElement,
        'next'
      )
    ).toBe(58);
  });

  it('should return scrollPositionAfterClick = 60 if direction is "next" and scroll does not exceed maximum', () => {
    expect(
      getScrollPositionAfterPrevNextClick(
        [{ offsetLeft: 80, offsetWidth: 50 }] as HTMLElement[],
        { offsetWidth: 50, scrollLeft: 50 } as HTMLElement,
        'next'
      )
    ).toBe(60);
  });

  it('should return scrollToMin = 0 if scroll step would fall below minimum', () => {
    expect(
      getScrollPositionAfterPrevNextClick(
        [{ offsetLeft: 0, offsetWidth: 0 }] as HTMLElement[],
        { offsetWidth: 50, scrollLeft: 10 } as HTMLElement,
        'prev'
      )
    ).toBe(0);
  });

  it('should return scrollPositionAfterClick = 18 if direction is "prev" and scroll does not fall below minimum', () => {
    expect(
      getScrollPositionAfterPrevNextClick(
        [{ offsetLeft: 0, offsetWidth: 0 }] as HTMLElement[],
        { offsetWidth: 10, scrollLeft: 20 } as HTMLElement,
        'prev'
      )
    ).toBe(18);
  });
});
