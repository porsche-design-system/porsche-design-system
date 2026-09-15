import {
  getIndexOfStepWithStateCurrent,
  scrollStepperHorizontalItemIntoView,
  throwIfMultipleCurrentStates,
} from './stepper-horizontal-utils';

const createStepperItems = (states: string[]): HTMLPStepperHorizontalItemElement[] =>
  states.map((state) => ({ state }) as HTMLPStepperHorizontalItemElement);

// items are laid out at left = 100 * index with width 100; the scroll area is 200 wide at left 0,
// so centering item i means scrollTo left = 100 * i - 50
const createStepperItemsWithRects = (count: number): HTMLElement[] =>
  Array.from({ length: count }, (_, i) => {
    const el = document.createElement('div');
    el.getBoundingClientRect = vi.fn(() => ({ left: 100 * i, width: 100 }) as DOMRect);
    return el;
  });

type ScrollAreaMock = HTMLElement & { scrollTo: ReturnType<typeof vi.fn> };

// mimics p-scroller's shadow DOM with a .scroll element, matching what
// scrollStepperHorizontalItemIntoView queries internally
const createScroller = (): { scroller: HTMLElement; scrollArea: ScrollAreaMock } => {
  const scroller = document.createElement('div');
  const scrollArea = document.createElement('div') as unknown as ScrollAreaMock;
  Object.defineProperty(scrollArea, 'scrollLeft', { value: 0, writable: true });
  Object.defineProperty(scrollArea, 'scrollTo', { value: vi.fn(), writable: true });
  scrollArea.getBoundingClientRect = vi.fn(() => ({ left: 0, width: 200 }) as DOMRect);
  Object.defineProperty(scroller, 'shadowRoot', {
    value: { querySelector: vi.fn().mockReturnValue(scrollArea) },
    writable: true,
  });
  return { scroller, scrollArea };
};

describe('getIndexOfStepWithStateCurrent()', () => {
  it('should return -1 when no item has state "current"', () => {
    const items = createStepperItems(['complete', 'warning']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(-1);
  });

  it('should return -1 for an empty array', () => {
    expect(getIndexOfStepWithStateCurrent([])).toBe(-1);
  });

  it('should return the index of the item with state "current"', () => {
    const items = createStepperItems(['complete', 'current', 'undefined']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(1);
  });

  it('should return 0 when the first item has state "current"', () => {
    const items = createStepperItems(['current', 'complete']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(0);
  });

  it('should return the last index when the last item has state "current"', () => {
    const items = createStepperItems(['complete', 'complete', 'current']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(2);
  });

  it('should return the index of the first "current" item when multiple exist', () => {
    const items = createStepperItems(['complete', 'current', 'current']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(1);
  });
});

describe('throwIfMultipleCurrentStates()', () => {
  it('should not throw when no item has state "current"', () => {
    const host = document.createElement('p-stepper-horizontal');
    const items = createStepperItems(['complete', 'warning']);
    expect(() => throwIfMultipleCurrentStates(host, items)).not.toThrow();
  });

  it('should not throw when exactly one item has state "current"', () => {
    const host = document.createElement('p-stepper-horizontal');
    const items = createStepperItems(['complete', 'current', 'warning']);
    expect(() => throwIfMultipleCurrentStates(host, items)).not.toThrow();
  });

  it('should throw when multiple items have state "current"', () => {
    const host = document.createElement('p-stepper-horizontal');
    const items = createStepperItems(['current', 'current']);
    expect(() => throwIfMultipleCurrentStates(host, items)).toThrow();
  });

  it('should include the count of current states in the error message', () => {
    const host = document.createElement('p-stepper-horizontal');
    const items = createStepperItems(['current', 'current', 'current']);
    expect(() => throwIfMultipleCurrentStates(host, items)).toThrow(/3/);
  });

  it('should not throw for an empty array', () => {
    const host = document.createElement('p-stepper-horizontal');
    expect(() => throwIfMultipleCurrentStates(host, [])).not.toThrow();
  });
});

describe('scrollStepperHorizontalItemIntoView()', () => {
  it('should not throw or scroll when scroller is undefined', () => {
    const items = createStepperItemsWithRects(3);
    for (const item of items) {
      item.scrollIntoView = vi.fn();
    }
    expect(() => scrollStepperHorizontalItemIntoView(0, undefined, items)).not.toThrow();
    for (const item of items) {
      expect(item.scrollIntoView).not.toHaveBeenCalled();
    }
  });

  it('should not throw when items array is empty', () => {
    const { scroller } = createScroller();
    expect(() => scrollStepperHorizontalItemIntoView(0, scroller, [])).not.toThrow();
  });

  it('should not throw when scroller has no shadow root', () => {
    const items = createStepperItemsWithRects(3);
    const scroller = document.createElement('div');
    expect(() => scrollStepperHorizontalItemIntoView(0, scroller, items)).not.toThrow();
  });

  it('should not throw when scroller has no scroll area', () => {
    const items = createStepperItemsWithRects(3);
    const scroller = document.createElement('div');
    Object.defineProperty(scroller, 'shadowRoot', {
      value: { querySelector: vi.fn().mockReturnValue(null) },
    });
    expect(() => scrollStepperHorizontalItemIntoView(0, scroller, items)).not.toThrow();
  });

  it('should not scroll when stepIndex is undefined', () => {
    const items = createStepperItemsWithRects(3);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(undefined, scroller, items);
    expect(scrollArea.scrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when stepIndex is negative', () => {
    const items = createStepperItemsWithRects(3);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(-1, scroller, items);
    expect(scrollArea.scrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when stepIndex is out of range', () => {
    const items = createStepperItemsWithRects(3);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(5, scroller, items);
    expect(scrollArea.scrollTo).not.toHaveBeenCalled();
  });

  it('should scroll the scroll area with smooth behavior by default', () => {
    const items = createStepperItemsWithRects(3);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(1, scroller, items);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'smooth' });
  });

  it('should scroll the scroll area with instant behavior when isSmooth is false', () => {
    const items = createStepperItemsWithRects(3);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(1, scroller, items, false);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'instant' });
  });

  it('should center the correct item in the scroll area', () => {
    const items = createStepperItemsWithRects(5);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(3, scroller, items);
    expect(scrollArea.scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: 250, behavior: 'smooth' });
  });

  it('should scroll for the first item (index 0)', () => {
    const items = createStepperItemsWithRects(3);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(0, scroller, items);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: -50, behavior: 'smooth' });
  });

  it('should scroll for the last item', () => {
    const items = createStepperItemsWithRects(4);
    const { scroller, scrollArea } = createScroller();
    scrollStepperHorizontalItemIntoView(3, scroller, items);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: 250, behavior: 'smooth' });
  });
});
