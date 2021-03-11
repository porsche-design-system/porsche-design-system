import {
  addEnableTransitionClass,
  getScrollActivePosition,
  getScrollPositionAfterPrevNextClick,
  getTransformationToActive,
  getTransformationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
  determineEnableTransitionClass,
} from '../../../src/components/navigation/tabs-bar/tabs-bar-utils';

fdescribe('tabs-bar', () => {
  describe('tabs-bar-utils', () => {
    const enableTransitionClass = 'p-tabs-bar__status-bar--enable-transition';

    describe('sanitizeActiveTabIndex()', () => {
      it.each([
        [undefined, 0, undefined],
        [undefined, 5, undefined],
        [2, 0, 0],
        [5, 5, 4],
        [3, 5, 3],
      ])('should for index %s and tabElementsCount %s return %s', (index, tabElementsCount, expected) => {
        expect(sanitizeActiveTabIndex(index, tabElementsCount)).toBe(expected);
      });
    });

    describe('getTransformationToInactive()', () => {
      it.each([
        [{}, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetWidth: 0 }, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetLeft: 0 }, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetWidth: 0, offsetLeft: 0 }, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetWidth: 15, offsetLeft: 30 }, 'transform: translate3d(2.34375rem,0,0); width: 0;'],
        [{ offsetWidth: 15, offsetLeft: 0 }, 'transform: translate3d(0.46875rem,0,0); width: 0;'],
      ])('should for %s return %s', (elementOffset, expected) => {
        expect(getTransformationToInactive(elementOffset as HTMLElement)).toBe(expected);
      });
    });

    describe('getTransformationToActive()', () => {
      it.each([
        [{}, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetWidth: 0 }, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetLeft: 0 }, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetWidth: 0, offsetLeft: 0 }, 'transform: translate3d(0,0,0); width: 0;'],
        [{ offsetWidth: 15, offsetLeft: 30 }, 'transform: translate3d(1.875rem,0,0); width: 0.9375rem;'],
        [{ offsetWidth: 15, offsetLeft: 0 }, 'transform: translate3d(0,0,0); width: 0.9375rem;'],
      ])('should for %s return %s', (elementOffset, expected) => {
        expect(getTransformationToActive(elementOffset as HTMLElement)).toBe(expected);
      });
    });

    describe('addEnableTransitionClass()', () => {
      it('should add "p-tabs-bar__status-bar--enable-transition" class', () => {
        const div = document.createElement('div');
        expect(div.classList.contains(enableTransitionClass)).toBe(false);

        addEnableTransitionClass(div);
        expect(div.classList.contains(enableTransitionClass)).toBe(true);
      });

      it('should add only one "p-tabs-bar__status-bar--enable-transition" class', () => {
        const div = document.createElement('div');
        expect(div.className).toBe('');
        addEnableTransitionClass(div);
        expect(div.className).toBe(enableTransitionClass);
        addEnableTransitionClass(div);
        expect(div.className).toBe(enableTransitionClass);
      });
    });

    describe('removeEnableTransitionClass()', () => {
      it('should remove "p-tabs-bar__status-bar--enable-transition" class', () => {
        const div = document.createElement('div');
        addEnableTransitionClass(div);
        expect(div.classList.contains(enableTransitionClass)).toBe(true);

        removeEnableTransitionClass(div);
        expect(div.classList.contains(enableTransitionClass)).toBe(false);
      });
    });

    describe('determineEnableTransitionClass()', () => {
      it('should remove "p-tabs-bar__status-bar--enable-transition" class if activeTabIndex is defined and prevActiveTabIndex is undefined', () => {
        const div = document.createElement('div');
        addEnableTransitionClass(div);
        expect(div.classList.contains(enableTransitionClass)).toBe(true);

        determineEnableTransitionClass(0, undefined, div);
        expect(div.classList.contains(enableTransitionClass)).toBe(false);
      });

      it('should add "p-tabs-bar__status-bar--enable-transition" class if activeTabIndex is undefined', () => {
        const div = document.createElement('div');
        expect(div.classList.contains(enableTransitionClass)).toBe(false);

        determineEnableTransitionClass(undefined, 0, div);
        expect(div.classList.contains(enableTransitionClass)).toBe(true);
      });
    });

    describe('getScrollActivePosition()', () => {
      it('should return scrollActivePosition if scrolling to last tab', () => {
        expect(getScrollActivePosition('next', 10, 11, undefined, 20, undefined, undefined, undefined)).toBe(16);
      });

      it('should return scrollActivePosition if direction is "next", next tab is set as active', () => {
        expect(getScrollActivePosition('next', 5, 11, undefined, 20, 20, undefined, undefined)).toBe(8);
      });

      it('should return scrollActivePosition if direction is "prev" and first tab is set as active', () => {
        expect(
          getScrollActivePosition('prev', 0, undefined, undefined, undefined, undefined, undefined, undefined)
        ).toBe(0);
      });

      it('should return scrollActivePosition if scrolling to previous tab', () => {
        expect(getScrollActivePosition('prev', 5, 10, 4, 20, undefined, 20, 5)).toBe(41);
      });
    });

    describe('getScrollPositionAfterPrevNextClick()', () => {
      it('should return scrollToMax if scroll step would exceed maximum', () => {
        const scrollToMax = 12;
        expect(getScrollPositionAfterPrevNextClick('next', 10, 2, scrollToMax)).toBe(scrollToMax);
      });

      it('should return scrollPositionAfterClick if direction is "next" and scroll does not exceed maximum', () => {
        expect(getScrollPositionAfterPrevNextClick('next', 10, 2, 20)).toBe(12);
      });

      it('should return 0 if scroll step would fall below minimum', () => {
        expect(getScrollPositionAfterPrevNextClick('prev', 2, 2, undefined)).toBe(0);
      });

      it('should return scrollPositionAfterClick if direction is "prev" and scroll does not fall below minimum', () => {
        expect(getScrollPositionAfterPrevNextClick('prev', 10, 2, undefined)).toBe(8);
      });
    });
  });
});
