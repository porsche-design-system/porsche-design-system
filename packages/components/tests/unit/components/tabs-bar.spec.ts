import {
  sanitizeActiveTabIndex,
  getXTranslationToInactive,
  addEnableTransitionClass,
  removeEnableTransitionClass,
  toggleEnableTransitionClass,
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

      describe('toggleEnableTransitionClass()', () => {
        it('should remove "p-tabs-bar__status-bar--enable-transition" class if activeTabIndex is defined and prevActiveTabIndex is undefined', () => {
          const div = document.createElement('div');
          addEnableTransitionClass(div);
          expect(div.classList.contains(enableTransitionClass)).toBe(true);

          toggleEnableTransitionClass(0, undefined, div);
          expect(div.classList.contains(enableTransitionClass)).toBe(false);
        });
        it('should add "p-tabs-bar__status-bar--enable-transition" class if activeTabIndex is undefined', () => {
          const div = document.createElement('div');
          expect(div.classList.contains(enableTransitionClass)).toBe(false);

          toggleEnableTransitionClass(undefined, 0, div);
          expect(div.classList.contains(enableTransitionClass)).toBe(true);
        });
      });
    });
  });
});
