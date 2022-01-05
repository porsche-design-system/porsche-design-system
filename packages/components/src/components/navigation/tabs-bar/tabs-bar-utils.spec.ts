import {
  addEnableTransitionClass,
  getScrollActivePosition,
  getScrollPositionAfterPrevNextClick,
  getTransformationToActive,
  getTransformationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
  determineEnableTransitionClass,
} from './tabs-bar-utils';

const enableTransitionClass = 'bar--enable-transition';

describe('sanitizeActiveTabIndex()', () => {
  it.each([
    [undefined, 0, undefined],
    [null, 0, undefined],
    ['asd', 0, undefined],
    [2, 0, undefined],
    [-5, 2, undefined],
    [5, 2, undefined],
    [3, 5, 3],
  ])('should for index %s and tabElementsCount %s return %s', (index, tabElementsCount, expected) => {
    expect(sanitizeActiveTabIndex(index as number, tabElementsCount)).toBe(expected);
  });
});

describe('getTransformationToInactive()', () => {
  it.each([
    [{}, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetWidth: 0 }, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetWidth: 0, offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetWidth: 15, offsetLeft: 30 }, 'transform: translate3d(2.34375rem,0,0); width: 0;'],
    [{ offsetWidth: 15, offsetLeft: 0 }, 'transform: translate3d(0.46875rem,0,0); width: 0;'],
  ])('should for %s return %s', (elementOffset, expected) => {
    expect(getTransformationToInactive(elementOffset as HTMLElement)).toBe(expected);
  });
});

describe('getTransformationToActive()', () => {
  it.each([
    [{}, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetWidth: 0 }, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetWidth: 0, offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetWidth: 15, offsetLeft: 30 }, 'transform: translate3d(1.875rem,0,0); width: 0.9375rem;'],
    [{ offsetWidth: 15, offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0.9375rem;'],
  ])('should for %s return %s', (elementOffset, expected) => {
    expect(getTransformationToActive(elementOffset as HTMLElement)).toBe(expected);
  });
});

describe('addEnableTransitionClass()', () => {
  it('should add "bar--enable-transition" class', () => {
    const div = document.createElement('div');
    expect(div.classList.contains(enableTransitionClass)).toBe(false);

    addEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);
  });

  it('should add only one "bar--enable-transition" class', () => {
    const div = document.createElement('div');
    expect(div.className).toBe('');
    addEnableTransitionClass(div);
    expect(div.className).toBe(enableTransitionClass);
    addEnableTransitionClass(div);
    expect(div.className).toBe(enableTransitionClass);
  });
});

describe('removeEnableTransitionClass()', () => {
  it('should remove "bar--enable-transition" class', () => {
    const div = document.createElement('div');
    addEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);

    removeEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(false);
  });
});

describe('determineEnableTransitionClass()', () => {
  it('should remove "bar--enable-transition" class if activeTabIndex is defined and prevActiveTabIndex is undefined', () => {
    const div = document.createElement('div');
    addEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);

    determineEnableTransitionClass(0, undefined, div);
    expect(div.classList.contains(enableTransitionClass)).toBe(false);
  });

  it('should add "bar--enable-transition" class if activeTabIndex is undefined', () => {
    const div = document.createElement('div');
    expect(div.classList.contains(enableTransitionClass)).toBe(false);

    determineEnableTransitionClass(undefined, 0, div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);
  });
});

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
