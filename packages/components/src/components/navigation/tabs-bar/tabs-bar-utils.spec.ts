import {
  addEnableTransitionClass,
  determineEnableTransitionClass,
  getFocusedTabIndex,
  getPrevNextTabIndex,
  getTransformationToActive,
  getTransformationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
  setBarStyle,
} from './tabs-bar-utils';
import * as tabBarUtils from './tabs-bar-utils';

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

describe('getPrevNextTabIndex()', () => {
  it('should return correct index for prev direction', () => {
    expect(getPrevNextTabIndex('prev', 5, 1)).toBe(0);
    expect(getPrevNextTabIndex('prev', 6, 2)).toBe(1);
  });

  it('should return correct index for next direction', () => {
    expect(getPrevNextTabIndex('next', 5, 1)).toBe(2);
    expect(getPrevNextTabIndex('next', 6, 2)).toBe(3);
  });
});

describe('getFocusedTabIndex()', () => {
  const getButtons = () => Array.from(document.querySelectorAll('button')) as HTMLElement[];

  beforeEach(() => {
    document.body.innerHTML = '';
    Array.from(Array(5)).forEach((_, i) => {
      const button = document.createElement('button');
      button.innerHTML = `Button ${i}`;
      document.body.appendChild(button);
    });
  });

  it('should return correct tabIndex of element in array', () => {
    const buttons = getButtons();
    buttons[2].focus();
    expect(getFocusedTabIndex(buttons)).toBe(2);
  });

  it('should return 0 when element does not match', () => {
    const buttons = getButtons();
    document.body.focus();
    expect(getFocusedTabIndex(buttons)).toBe(0);
  });
});

describe('setBarStyle()', () => {
  let barElement;

  beforeEach(() => {
    barElement = document.createElement('span');
  });

  it(`should remove ${enableTransitionClass} class and set transformation on barElement handling active to removed case`, () => {
    const spy = jest.spyOn(tabBarUtils, 'removeEnableTransitionClass');

    barElement.classList.add(enableTransitionClass);
    setBarStyle(
      [
        { offsetWidth: 15, offsetLeft: 0 },
        { offsetWidth: 15, offsetLeft: 30 },
      ] as HTMLElement[],
      undefined,
      barElement,
      undefined
    );

    expect(spy).toHaveBeenCalledWith(barElement);
    expect(barElement.classList.contains(enableTransitionClass)).toBe(false);
    expect(barElement.style.cssText).toBe('transform: translate3d(0rem,0,0); width: 0px;');
  });

  it(`should add ${enableTransitionClass} class and set transformation on barElement handling initial inactive + active to inactive cases`, () => {
    const spy = jest.spyOn(tabBarUtils, 'addEnableTransitionClass');

    setBarStyle(
      [
        { offsetWidth: 15, offsetLeft: 0 },
        { offsetWidth: 15, offsetLeft: 30 },
      ] as HTMLElement[],
      undefined,
      barElement,
      1
    );

    expect(spy).toHaveBeenCalledWith(barElement);
    expect(barElement.classList.contains(enableTransitionClass)).toBe(true);
    expect(barElement.style.cssText).toBe('transform: translate3d(2.34375rem,0,0); width: 0px;');
  });

  it(`should call determineEnableTransitionClass and set transformation on barElement handling initial active + active to active + inactive to active cases`, () => {
    const spy = jest.spyOn(tabBarUtils, 'determineEnableTransitionClass');

    setBarStyle(
      [
        { offsetWidth: 15, offsetLeft: 0 },
        { offsetWidth: 15, offsetLeft: 30 },
      ] as HTMLElement[],
      0,
      barElement,
      1
    );

    expect(spy).toHaveBeenCalledWith(0, 1, barElement);
    expect(barElement.classList.contains(enableTransitionClass)).toBe(true);
    expect(barElement.style.cssText).toBe('transform: translate3d(0rem,0,0); width: 0.9375rem;');
  });
});

// TODO: Can be used when keyboard handling is improved
// describe('getKeydownedSegmentedControlItem()', () => {
//   const createKeydownEvent = (key: string): KeyboardEvent => new KeyboardEvent('keydown', { key });
//
//   const createSegmentedControlItem = (opts: {
//     value: string;
//     // isDisabled?: boolean;
//   }): HTMLElement & SegmentedControlItem => {
//     const item = document.createElement('p-segmented-control-item') as unknown as HTMLElement & SegmentedControlItem;
//     item.id = opts.value;
//     item.value = opts.value;
//     // item.disabled = opts.isDisabled;
//     return item;
//   };
//
//   const children = ['a', 'b', 'c'].map((value) => createSegmentedControlItem({ value }));
//   const [child1, child2, child3] = children;
//   const host = document.createElement('div');
//   host.append(...children);
//   const childrenCollection = host.children;
//
//   const singleChildHost = document.createElement('div');
//   singleChildHost.append(child1.cloneNode());
//   const singleChildCollection = singleChildHost.children;
//
//   beforeEach(() => {
//     child2.disabled = undefined;
//   });
//
//   it('should return undefined for random keys', () => {
//     ['a', 'A', 'Enter', 'Escape', 'ArrowUp', 'Up', 'ArrowDown', 'Down', 'Shift', ' '].forEach((key) => {
//       const result = getKeydownedSegmentedControlItem(createKeydownEvent(key), 'a', childrenCollection);
//       expect(result).toBeUndefined();
//     });
//   });
//
//   it('should return element on ArrowLeft, Left, ArrowRight and Right key', () => {
//     ['ArrowLeft', 'Left', 'ArrowRight', 'Right'].forEach((key) => {
//       const result = getKeydownedSegmentedControlItem(createKeydownEvent(key), 'a', childrenCollection);
//       expect(children).toContain(result);
//     });
//   });
//
//   describe('on ArrowLeft keydown', () => {
//     const event = createKeydownEvent('ArrowLeft');
//
//     it('should return item before selected item', () => {
//       const result = getKeydownedSegmentedControlItem(event, 'b', childrenCollection);
//       expect(result).toEqual(child1);
//     });
//
//     it('should return item before selected item and skip disabled item', () => {
//       child2.disabled = true;
//       const result = getKeydownedSegmentedControlItem(event, 'c', childrenCollection);
//       expect(result).toEqual(child1);
//     });
//
//     it('should return last item if selected item is first', () => {
//       const result = getKeydownedSegmentedControlItem(event, 'a', childrenCollection);
//       expect(result).toEqual(child3);
//     });
//
//     it('should return same item for single item', () => {
//       const result1 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
//       expect(result1).toEqual(child1);
//       const result2 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
//       expect(result2).toEqual(child1);
//     });
//   });
//
//   describe('on ArrowRight keydown', () => {
//     const event = createKeydownEvent('ArrowRight');
//
//     it('should return item after selected item', () => {
//       const result = getKeydownedSegmentedControlItem(event, 'b', childrenCollection);
//       expect(result).toEqual(child3);
//     });
//
//     it('should return item after selected item and skip disabled item', () => {
//       child2.disabled = true;
//       const result = getKeydownedSegmentedControlItem(event, 'a', childrenCollection);
//       expect(result).toEqual(child3);
//     });
//
//     it('should return first item if selected item is last', () => {
//       const result = getKeydownedSegmentedControlItem(event, 'c', childrenCollection);
//       expect(result).toEqual(child1);
//     });
//
//     it('should return same item for single item', () => {
//       const result1 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
//       expect(result1).toEqual(child1);
//       const result2 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
//       expect(result2).toEqual(child1);
//     });
//   });
// });
