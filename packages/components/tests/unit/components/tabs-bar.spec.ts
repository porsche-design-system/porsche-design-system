import {
  addEnableTransitionClass,
  getScrollActivePosition,
  getScrollPositionAfterPrevNextClick,
  getXTranslationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
  determineEnableTransitionClass,
} from '../../../src/components/navigation/tabs-bar/tabs-bar-utils';

describe('tabs-bar', () => {
  describe('tabs-bar-utils', () => {
    const enableTransitionClass = 'p-tabs-bar__status-bar--enable-transition';

    describe('sanitizeActiveTabIndex()', () => {
      it('should return undefined if index is undefined and tabElementsCount is 0', () => {
        expect(sanitizeActiveTabIndex(undefined, 0)).toBe(undefined);
      });

      it('should return undefined if index is undefined and tabElementsCount is not 0', () => {
        expect(sanitizeActiveTabIndex(undefined, 5)).toBe(undefined);
      });

      it('should return 0 if tabElementsCount is 0', () => {
        expect(sanitizeActiveTabIndex(2, 0)).toBe(0);
      });

      it('should return 4 as maxIndex if index is 5 and tabElementsCount is 5', () => {
        expect(sanitizeActiveTabIndex(5, 5)).toBe(4);
      });

      it('should return 3 if index is 3 and tabElementsCount is 5', () => {
        expect(sanitizeActiveTabIndex(3, 5)).toBe(3);
      });
    });

    describe('getXTranslationToInactive()', () => {
      it('should return "0" if empty object is passed', () => {
        expect(getXTranslationToInactive({} as HTMLElement)).toBe('0');
      });

      it('should return "0" if offsetWidth is 0 and offsetLeft is not set', () => {
        expect(getXTranslationToInactive({ offsetWidth: 0 } as HTMLElement)).toBe('0');
      });

      it('should return "0" if offsetLeft is 0 and offsetWidth is not set', () => {
        expect(getXTranslationToInactive({ offsetLeft: 0 } as HTMLElement)).toBe('0');
      });

      it('should return "0" if offsetWidth is 0 and  offsetLeft is 0', () => {
        expect(getXTranslationToInactive({ offsetWidth: 0, offsetLeft: 0 } as HTMLElement)).toBe('0');
      });

      it('should return "2.34375rem" if offsetWidth is 30 and offsetLeft is 15', () => {
        expect(getXTranslationToInactive({ offsetWidth: 15, offsetLeft: 30 } as HTMLElement)).toBe('2.34375rem');
      });

      it('should return "0.46875rem" if offsetWidth is 15 and offsetLeft is 0', () => {
        expect(getXTranslationToInactive({ offsetWidth: 15, offsetLeft: 0 } as HTMLElement)).toBe('0.46875rem');
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
          expect(getScrollPositionAfterPrevNextClick('next', 10, 2, scrollToMax, undefined)).toBe(scrollToMax);
        });

        it('should return scrollPositionAfterClick if direction is "next" and scroll does not exceed maximum', () => {
          expect(getScrollPositionAfterPrevNextClick('next', 10, 2, 20, undefined)).toBe(12);
        });

        it('should return scrollToMin if scroll step would fall below minimum', () => {
          const scrollToMin = 0;
          expect(getScrollPositionAfterPrevNextClick('prev', 2, 2, undefined, scrollToMin)).toBe(scrollToMin);
        });

        it('should return scrollPositionAfterClick if direction is "prev" and scroll does not fall below minimum', () => {
          expect(getScrollPositionAfterPrevNextClick('prev', 10, 2, undefined, 0)).toBe(8);
        });
      });
    });
  });
});
