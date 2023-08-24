import {
  getFocusedTabIndex,
  getPrevNextTabIndex,
  getTransformation,
  sanitizeActiveTabIndex,
  setBarStyle,
} from './tabs-bar-utils';
import * as tabsBarUtils from './tabs-bar-utils';

describe('sanitizeActiveTabIndex()', () => {
  it.each([
    [undefined, 0, undefined],
    [null, 0, undefined],
    [2, 0, undefined],
    [-5, 2, undefined],
    [5, 2, undefined],
    [3, 5, 3],
  ])('should for index: %s and tabElementsCount: %s return: %s', (index, tabElementsCount, expected) => {
    expect(sanitizeActiveTabIndex(index as number, tabElementsCount)).toBe(expected);
  });
});

type Rect = Partial<Pick<DOMRect, 'width' | 'height' | 'top' | 'left' | 'bottom' | 'right'> & { offsetLeft: number }>;
const mockBoundingClientRect = (element: HTMLElement, opts: Rect): void => {
  jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => opts as DOMRect);
  jest.spyOn(element, 'offsetLeft', 'get').mockReturnValue(opts.offsetLeft);
};

describe('getTransformation()', () => {
  it.each<[Rect, string]>([
    [{ width: 0 }, 'transform: translate3d(0px,0,0);width: 0px'],
    [{ width: 0, offsetLeft: 0 }, 'transform: translate3d(0px,0,0);width: 0px'],
    [{ width: 0, offsetLeft: 0 }, 'transform: translate3d(0px,0,0);width: 0px'],
    [{ width: 15.12, offsetLeft: 30 }, 'transform: translate3d(30px,0,0);width: 15.12px'],
    [{ width: 15.13, offsetLeft: 0 }, 'transform: translate3d(0px,0,0);width: 15.13px'],
  ])('should for %s return: %s', (elSize, expected) => {
    const el = document.createElement('div');
    mockBoundingClientRect(el, elSize);
    expect(getTransformation(el)).toBe(expected);
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
  const el1 = document.createElement('div');
  mockBoundingClientRect(el1, { width: 15, offsetLeft: 0 });
  const el2 = document.createElement('div');
  mockBoundingClientRect(el2, { width: 15, offsetLeft: 30 });

  let barElement: HTMLElement;
  beforeEach(() => {
    barElement = document.createElement('span');
  });

  it('should not call getTransformation() if there is no active tabElement', () => {
    const spy = jest.spyOn(tabsBarUtils, 'getTransformation');
    setBarStyle([el1, el2], undefined, barElement);

    expect(spy).not.toBeCalled();
  });

  it('should call getTransformation() with correct parameters if there is an active tabElement ', () => {
    const spy = jest.spyOn(tabsBarUtils, 'getTransformation');
    setBarStyle([el1, el2], 1, barElement);

    expect(spy).toBeCalledWith(el1);
    expect(spy).toBeCalledWith(el2);
    expect(spy.mock.calls[0][0]).toBe(el2); // toBeCalledWith doesn't deep compare 🤷‍
  });

  it('should set result of getTransformation() as style on barElement', () => {
    jest.spyOn(tabsBarUtils, 'getTransformation').mockReturnValue('transform: translate3d(0px,0,0);width: 15px');
    setBarStyle([el1, el2], 0, barElement);

    expect(barElement.style.cssText).toBe('transform: translate3d(0px,0,0); width: 15px;');
  });

  it('should not reset animation on barElement when there is no selected tabElement', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    expect(barElement.style.animation).toBe('');

    setBarStyle([el1, el2], 0, barElement);

    expect(spy).not.toBeCalled();
  });

  it('should reset animation on barElement when there is a selected tabElement', () => {
    jest.useFakeTimers();
    let count = 0;
    const spy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      // we can then use fake timers to preserve the async nature of this call
      // @ts-ignore
      setTimeout(() => cb(100 * ++count), 100);
      return 0;
    });
    expect(barElement.style.animation).toBe('');

    el1.setAttribute('aria-selected', 'true');
    setBarStyle([el1, el2], 0, barElement);

    expect(barElement.style.animation).toBe('none');

    jest.runAllTimers();

    expect(spy).toBeCalledWith(expect.any(Function));
    expect(barElement.style.animation).toBe('');

    el1.removeAttribute('aria-selected');
    el2.setAttribute('aria-current', 'true');
    setBarStyle([el1, el2], 1, barElement);

    expect(barElement.style.animation).toBe('none');

    jest.runAllTimers();

    expect(spy).toBeCalledWith(expect.any(Function));
    expect(barElement.style.animation).toBe('');

    jest.useRealTimers();
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
