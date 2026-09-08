import { easeInOut } from '@porsche-design-system/tokens';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  animateBar,
  getActiveElementIndex,
  getEndMetrics,
  getSanitizedActiveTabIndex,
  getStartMetrics,
  getTabMetrics,
  getUpcomingActiveElementIndex,
  isTabList,
  scrollTabIntoView,
} from './tabs-bar-utils';

const createTabs = (count: number): HTMLElement[] =>
  Array.from({ length: count }, () => document.createElement('button'));

const createScroller = (opts: {
  paddingInlineStart?: string;
  direction?: string;
  rect?: Partial<DOMRect>;
  scrollLeft?: number;
}): HTMLElement => {
  const scroller = document.createElement('div');

  vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    paddingInlineStart: opts.paddingInlineStart ?? '0',
    direction: opts.direction ?? 'ltr',
  } as CSSStyleDeclaration);

  scroller.getBoundingClientRect = vi.fn(
    () =>
      ({
        left: 0,
        right: 200,
        top: 0,
        bottom: 50,
        width: 200,
        height: 50,
        x: 0,
        y: 0,
        ...opts.rect,
      }) as DOMRect
  );

  const scrollArea = document.createElement('div');
  Object.defineProperty(scrollArea, 'scrollLeft', { value: opts.scrollLeft ?? 0, writable: true });
  const shadowRoot = { querySelector: vi.fn().mockReturnValue(scrollArea) };
  Object.defineProperty(scroller, 'shadowRoot', { value: shadowRoot, writable: true });

  return scroller;
};

const createTab = (rect: Partial<DOMRect>): HTMLElement => {
  const tab = document.createElement('button');
  tab.getBoundingClientRect = vi.fn(
    () =>
      ({
        left: 0,
        right: 50,
        top: 0,
        bottom: 50,
        width: 50,
        height: 50,
        x: 0,
        y: 0,
        ...rect,
      }) as DOMRect
  );
  return tab;
};

const createBar = (): HTMLElement => {
  const bar = document.createElement('span');
  bar.animate = vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
  });
  bar.getAnimations = vi.fn().mockReturnValue([]);
  return bar;
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getSanitizedActiveTabIndex()', () => {
  it.each([
    [undefined, 0, undefined],
    [null, 0, undefined],
    [2, 0, undefined],
    [-5, 2, undefined],
    [5, 2, undefined],
    [1.5, 3, undefined],
    [0, 3, 0],
    [3, 5, 3],
  ])('should for index: %s and tabElementsCount: %s return: %s', (index, tabElementsCount, expected) => {
    expect(getSanitizedActiveTabIndex(index as number, createTabs(tabElementsCount))).toBe(expected);
  });
});

describe('getActiveElementIndex()', () => {
  it('should return undefined when document.activeElement is not in tabs', () => {
    const tabs = createTabs(3);
    expect(getActiveElementIndex(tabs)).toBeUndefined();
  });

  it('should return undefined for an empty tabs array', () => {
    expect(getActiveElementIndex([])).toBeUndefined();
  });

  it('should return the index when document.activeElement matches a tab', () => {
    const tabs = createTabs(3);
    document.body.appendChild(tabs[1]);
    tabs[1].focus();

    expect(getActiveElementIndex(tabs)).toBe(1);

    document.body.removeChild(tabs[1]);
  });

  it('should return 0 when document.activeElement matches the first tab', () => {
    const tabs = createTabs(3);
    document.body.appendChild(tabs[0]);
    tabs[0].focus();

    expect(getActiveElementIndex(tabs)).toBe(0);

    document.body.removeChild(tabs[0]);
  });

  it('should return last index when document.activeElement matches the last tab', () => {
    const tabs = createTabs(4);
    document.body.appendChild(tabs[3]);
    tabs[3].focus();

    expect(getActiveElementIndex(tabs)).toBe(3);

    document.body.removeChild(tabs[3]);
  });

  it('should return undefined when a different element has focus', () => {
    const tabs = createTabs(3);
    const other = document.createElement('input');
    document.body.appendChild(other);
    other.focus();

    expect(getActiveElementIndex(tabs)).toBeUndefined();

    document.body.removeChild(other);
  });
});

describe('getUpcomingActiveElementIndex()', () => {
  it('should return undefined for an empty tabs array', () => {
    expect(getUpcomingActiveElementIndex('next', [], 0)).toBeUndefined();
    expect(getUpcomingActiveElementIndex('prev', [], 0)).toBeUndefined();
  });

  it('should return correct index for prev direction', () => {
    expect(getUpcomingActiveElementIndex('prev', createTabs(5), 1)).toBe(0);
    expect(getUpcomingActiveElementIndex('prev', createTabs(6), 2)).toBe(1);
  });

  it('should return correct index for next direction', () => {
    expect(getUpcomingActiveElementIndex('next', createTabs(5), 1)).toBe(2);
    expect(getUpcomingActiveElementIndex('next', createTabs(6), 2)).toBe(3);
  });

  it('should wrap to the last index when going prev from index 0', () => {
    expect(getUpcomingActiveElementIndex('prev', createTabs(5), 0)).toBe(4);
    expect(getUpcomingActiveElementIndex('prev', createTabs(3), 0)).toBe(2);
  });

  it('should wrap to index 0 when going next from the last index', () => {
    expect(getUpcomingActiveElementIndex('next', createTabs(5), 4)).toBe(0);
    expect(getUpcomingActiveElementIndex('next', createTabs(3), 2)).toBe(0);
  });

  it('should return 0 for a single tab regardless of direction', () => {
    expect(getUpcomingActiveElementIndex('next', createTabs(1), 0)).toBe(0);
    expect(getUpcomingActiveElementIndex('prev', createTabs(1), 0)).toBe(0);
  });
});

describe('getTabMetrics()', () => {
  it('should return { start: 0, width: 0, rtl: false } when tab is undefined in LTR', () => {
    const scroller = createScroller({});
    expect(getTabMetrics(scroller, undefined)).toEqual({ start: 0, width: 0, rtl: false });
  });

  it('should return { start: 0, width: 0, rtl: true } when tab is undefined in RTL', () => {
    const scroller = createScroller({ direction: 'rtl' });
    expect(getTabMetrics(scroller, undefined)).toEqual({ start: 0, width: 0, rtl: true });
  });

  it('should return correct metrics for a tab in LTR with no scroll and no padding', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tab = createTab({ left: 40, right: 90, width: 50 });

    const result = getTabMetrics(scroller, tab);
    expect(result).toEqual({ start: 40, width: 50, rtl: false });
  });

  it('should subtract paddingInlineStart from start in LTR', () => {
    const scroller = createScroller({ paddingInlineStart: '10px', rect: { left: 0, right: 200 } });
    const tab = createTab({ left: 40, right: 90, width: 50 });

    const result = getTabMetrics(scroller, tab);
    expect(result).toEqual({ start: 30, width: 50, rtl: false });
  });

  it('should add scrollLeft to start in LTR', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 }, scrollLeft: 100 });
    const tab = createTab({ left: 40, right: 90, width: 50 });

    const result = getTabMetrics(scroller, tab);
    expect(result).toEqual({ start: 140, width: 50, rtl: false });
  });

  it('should clamp start to 0 when calculated value is negative in LTR', () => {
    const scroller = createScroller({ paddingInlineStart: '60px', rect: { left: 0, right: 200 } });
    const tab = createTab({ left: 10, right: 60, width: 50 });

    const result = getTabMetrics(scroller, tab);
    // tabLeft(10) - scrollerLeft(0) + scrollLeft(0) - safeZone(60) = -50 → clamped to 0
    expect(result).toEqual({ start: 0, width: 50, rtl: false });
  });

  it('should return correct metrics for a tab in RTL with no scroll and no padding', () => {
    const scroller = createScroller({ direction: 'rtl', rect: { left: 0, right: 200 } });
    const tab = createTab({ left: 100, right: 150, width: 50 });

    const result = getTabMetrics(scroller, tab);
    // scrollerRight(200) - tabRight(150) - scrollLeft(0) - safeZone(0) = 50
    expect(result).toEqual({ start: 50, width: 50, rtl: true });
  });

  it('should subtract paddingInlineStart from start in RTL', () => {
    const scroller = createScroller({ direction: 'rtl', paddingInlineStart: '10px', rect: { left: 0, right: 200 } });
    const tab = createTab({ left: 100, right: 150, width: 50 });

    const result = getTabMetrics(scroller, tab);
    // scrollerRight(200) - tabRight(150) - scrollLeft(0) - safeZone(10) = 40
    expect(result).toEqual({ start: 40, width: 50, rtl: true });
  });

  it('should subtract scrollLeft in RTL (scrollLeft is negative in RTL)', () => {
    const scroller = createScroller({ direction: 'rtl', rect: { left: 0, right: 200 }, scrollLeft: -50 });
    const tab = createTab({ left: 100, right: 150, width: 50 });

    const result = getTabMetrics(scroller, tab);
    // scrollerRight(200) - tabRight(150) - scrollLeft(-50) - safeZone(0) = 200 - 150 - (-50) - 0 = 100
    expect(result).toEqual({ start: 100, width: 50, rtl: true });
  });

  it('should clamp start to 0 when calculated value is negative in RTL', () => {
    const scroller = createScroller({
      direction: 'rtl',
      paddingInlineStart: '60px',
      rect: { left: 0, right: 200 },
    });
    const tab = createTab({ left: 160, right: 200, width: 40 });

    const result = getTabMetrics(scroller, tab);
    // scrollerRight(200) - tabRight(200) - scrollLeft(0) - safeZone(60) = -60 → clamped to 0
    expect(result).toEqual({ start: 0, width: 40, rtl: true });
  });

  it('should handle scroller without shadowRoot gracefully (scrollLeft defaults to 0)', () => {
    const scroller = document.createElement('div');
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      paddingInlineStart: '0',
      direction: 'ltr',
    } as CSSStyleDeclaration);
    scroller.getBoundingClientRect = vi.fn(
      () => ({ left: 0, right: 200, top: 0, bottom: 50, width: 200, height: 50, x: 0, y: 0 }) as DOMRect
    );

    const tab = createTab({ left: 20, right: 70, width: 50 });
    const result = getTabMetrics(scroller, tab);
    expect(result).toEqual({ start: 20, width: 50, rtl: false });
  });

  it('should return the tab width from getBoundingClientRect', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tab = createTab({ left: 0, right: 120, width: 120 });

    const result = getTabMetrics(scroller, tab);
    expect(result.width).toBe(120);
  });
});

describe('isTabList()', () => {
  it('should return true if the first tab is a button element', () => {
    const tabs = [document.createElement('button'), document.createElement('button')];
    expect(isTabList(tabs)).toBe(true);
  });

  it('should return false if the first tab is an anchor element', () => {
    const tabs = [document.createElement('a'), document.createElement('a')];
    expect(isTabList(tabs)).toBe(false);
  });

  it('should return false for an empty array', () => {
    expect(isTabList([])).toBe(false);
  });

  it('should return false if the first tab is neither a button nor an anchor', () => {
    const tabs = [document.createElement('div')];
    expect(isTabList(tabs)).toBe(false);
  });
});

describe('scrollTabIntoView()', () => {
  type ScrollAreaMock = HTMLElement & { scrollTo: ReturnType<typeof vi.fn> };

  const createScrollerWithScrollArea = (opts: {
    scrollLeft?: number;
    areaRect?: Partial<DOMRect>;
  }): { scroller: HTMLElement; scrollArea: ScrollAreaMock } => {
    const scroller = document.createElement('div');
    const scrollArea = document.createElement('div') as unknown as ScrollAreaMock;
    Object.defineProperty(scrollArea, 'scrollLeft', { value: opts.scrollLeft ?? 0, writable: true });
    Object.defineProperty(scrollArea, 'scrollTo', { value: vi.fn(), writable: true });
    scrollArea.getBoundingClientRect = vi.fn(
      () =>
        ({
          left: 0,
          right: 200,
          top: 0,
          bottom: 50,
          width: 200,
          height: 50,
          x: 0,
          y: 0,
          ...opts.areaRect,
        }) as DOMRect
    );
    Object.defineProperty(scroller, 'shadowRoot', {
      value: { querySelector: vi.fn().mockReturnValue(scrollArea) },
      writable: true,
    });
    return { scroller, scrollArea };
  };

  it('should not throw when scroller is undefined', () => {
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    expect(() => scrollTabIntoView(0, undefined, tabs)).not.toThrow();
  });

  it('should not throw when tabs array is empty', () => {
    const { scroller } = createScrollerWithScrollArea({});
    expect(() => scrollTabIntoView(0, scroller, [])).not.toThrow();
  });

  it('should not call scrollTo when newTabIndex is undefined', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({});
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    scrollTabIntoView(undefined, scroller, tabs);
    expect(scrollArea.scrollTo).not.toHaveBeenCalled();
  });

  it('should not call scrollTo when newTabIndex is out of range', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({});
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    scrollTabIntoView(5, scroller, tabs);
    expect(scrollArea.scrollTo).not.toHaveBeenCalled();
  });

  it('should not call scrollTo when newTabIndex is negative', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({});
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    scrollTabIntoView(-1, scroller, tabs);
    expect(scrollArea.scrollTo).not.toHaveBeenCalled();
  });

  it('should not throw and not call scrollTo when scroller has no shadow scroll area', () => {
    const scroller = document.createElement('div');
    Object.defineProperty(scroller, 'shadowRoot', {
      value: { querySelector: vi.fn().mockReturnValue(null) },
      writable: true,
    });
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    expect(() => scrollTabIntoView(0, scroller, tabs)).not.toThrow();
  });

  it('should center the active tab horizontally with smooth behavior by default', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({
      scrollLeft: 0,
      areaRect: { left: 0, right: 200, width: 200 },
    });
    // tab spans [220, 270], center = 245; area center = 100; delta = 145
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 220, right: 270, width: 50 })];
    scrollTabIntoView(1, scroller, tabs);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: 145, behavior: 'smooth' });
  });

  it('should center the active tab horizontally with instant behavior when isSmooth is false', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({
      scrollLeft: 0,
      areaRect: { left: 0, right: 200, width: 200 },
    });
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 220, right: 270, width: 50 })];
    scrollTabIntoView(1, scroller, tabs, false);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: 145, behavior: 'instant' });
  });

  it('should add the current scrollLeft to the computed delta', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({
      scrollLeft: 100,
      areaRect: { left: 0, right: 200, width: 200 },
    });
    // tab center = 145, area center = 100, delta = 45, targetLeft = 100 + 45 = 145
    const tabs = [createTab({ left: 120, right: 170, width: 50 })];
    scrollTabIntoView(0, scroller, tabs);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: 145, behavior: 'smooth' });
  });

  it('should compute a negative target scrollLeft when tab sits left of the visible area (RTL-like)', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({
      scrollLeft: 0,
      areaRect: { left: 0, right: 200, width: 200 },
    });
    // tab center = -125, area center = 100, delta = -225
    const tabs = [createTab({ left: -150, right: -100, width: 50 })];
    scrollTabIntoView(0, scroller, tabs);
    expect(scrollArea.scrollTo).toHaveBeenCalledWith({ left: -225, behavior: 'smooth' });
  });

  it('should call scrollTo on the inner scroll area only (not on the tab element)', () => {
    const { scroller, scrollArea } = createScrollerWithScrollArea({});
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    tabs[0].scrollIntoView = vi.fn();
    scrollTabIntoView(0, scroller, tabs);
    expect(scrollArea.scrollTo).toHaveBeenCalledTimes(1);
    expect(tabs[0].scrollIntoView).not.toHaveBeenCalled();
  });
});

describe('getStartMetrics()', () => {
  it('should grow from center of new tab when oldTabIndex is undefined (LTR)', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 50, right: 120, width: 70 })];

    const result = getStartMetrics(1, undefined, scroller, tabs);
    // start=50, width=70 → translateX = start + width/2 = 50 + 35 = 85
    expect(result).toEqual({ translateX: 85, width: 0 });
  });

  it('should grow from center of new tab when oldTabIndex is undefined (RTL)', () => {
    const scroller = createScroller({ direction: 'rtl', rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 150, right: 200, width: 50 }), createTab({ left: 80, right: 150, width: 70 })];

    const result = getStartMetrics(1, undefined, scroller, tabs);
    // RTL: start = scrollerRight(200) - tabRight(150) - scrollLeft(0) - safeZone(0) = 50, width=70
    // translateX = -1 * (50 + 70/2) = -85
    expect(result).toEqual({ translateX: -85, width: 0 });
  });

  it('should use old tab position and width when oldTabIndex is defined (LTR)', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 50, right: 120, width: 70 })];

    const result = getStartMetrics(1, 0, scroller, tabs);
    // old tab (index 0): start=0, width=50 → translateX = 0
    expect(result).toEqual({ translateX: 0, width: 50 });
  });

  it('should use old tab position and width when oldTabIndex is defined (RTL)', () => {
    const scroller = createScroller({ direction: 'rtl', rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 150, right: 200, width: 50 }), createTab({ left: 80, right: 150, width: 70 })];

    const result = getStartMetrics(1, 0, scroller, tabs);
    // RTL old tab (index 0): start = 200 - 200 - 0 - 0 = 0 → translateX = -1 * 0 = 0
    expect(result).toEqual({ translateX: -0, width: 50 });
  });

  it('should account for paddingInlineStart when growing from center (LTR)', () => {
    const scroller = createScroller({ paddingInlineStart: '10px', rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 40, right: 90, width: 50 })];

    const result = getStartMetrics(0, undefined, scroller, tabs);
    // start = 40 - 0 + 0 - 10 = 30, width=50 → translateX = 30 + 25 = 55
    expect(result).toEqual({ translateX: 55, width: 0 });
  });
});

describe('getEndMetrics()', () => {
  it('should shrink to center of old tab when newTabIndex is undefined (LTR)', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 50, right: 120, width: 70 })];

    const result = getEndMetrics(undefined, 0, scroller, tabs);
    // old tab (index 0): start=0, width=50 → translateX = 0 + 25 = 25
    expect(result).toEqual({ translateX: 25, width: 0 });
  });

  it('should shrink to center of old tab when newTabIndex is undefined (RTL)', () => {
    const scroller = createScroller({ direction: 'rtl', rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 150, right: 200, width: 50 }), createTab({ left: 80, right: 150, width: 70 })];

    const result = getEndMetrics(undefined, 1, scroller, tabs);
    // RTL old tab (index 1): start = 200 - 150 - 0 - 0 = 50, width=70
    // translateX = -1 * (50 + 35) = -85
    expect(result).toEqual({ translateX: -85, width: 0 });
  });

  it('should use new tab position and width when newTabIndex is defined (LTR)', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 50, right: 120, width: 70 })];

    const result = getEndMetrics(1, 0, scroller, tabs);
    // new tab (index 1): start=50, width=70 → translateX = 50
    expect(result).toEqual({ translateX: 50, width: 70 });
  });

  it('should use new tab position and width when newTabIndex is defined (RTL)', () => {
    const scroller = createScroller({ direction: 'rtl', rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 150, right: 200, width: 50 }), createTab({ left: 80, right: 150, width: 70 })];

    const result = getEndMetrics(0, 1, scroller, tabs);
    // RTL new tab (index 0): start = 200 - 200 - 0 - 0 = 0 → translateX = -1 * 0 = 0
    expect(result).toEqual({ translateX: -0, width: 50 });
  });

  it('should account for paddingInlineStart (LTR)', () => {
    const scroller = createScroller({ paddingInlineStart: '10px', rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 40, right: 90, width: 50 })];

    const result = getEndMetrics(0, undefined, scroller, tabs);
    // start = 40 - 0 + 0 - 10 = 30, width=50 → translateX = 30
    expect(result).toEqual({ translateX: 30, width: 50 });
  });
});

describe('animateBar()', () => {
  it('should return early when scroller is falsy', () => {
    const bar = createBar();
    animateBar(0, undefined, undefined as unknown as HTMLElement, [document.createElement('button')], bar);
    expect(bar.animate).not.toHaveBeenCalled();
  });

  it('should return early when bar is falsy', () => {
    const scroller = createScroller({});
    animateBar(0, undefined, scroller, [document.createElement('button')], undefined as unknown as HTMLElement);
  });

  it('should return early when tabs array is empty', () => {
    const scroller = createScroller({});
    const bar = createBar();
    animateBar(0, undefined, scroller, [], bar);
    expect(bar.animate).not.toHaveBeenCalled();
  });

  it('should return early when both newTabIndex and oldTabIndex are out of range', () => {
    const scroller = createScroller({});
    const bar = createBar();
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    animateBar(5, 10, scroller, tabs, bar);
    expect(bar.animate).not.toHaveBeenCalled();
  });

  it('should return early when both newTabIndex and oldTabIndex are undefined', () => {
    const scroller = createScroller({});
    const bar = createBar();
    const tabs = [createTab({ left: 0, right: 50, width: 50 })];
    animateBar(undefined, undefined, scroller, tabs, bar);
    expect(bar.animate).not.toHaveBeenCalled();
  });

  it('should call bar.animate with correct keyframes when transitioning between tabs (LTR)', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 50, right: 120, width: 70 })];
    const bar = createBar();

    animateBar(1, 0, scroller, tabs, bar);

    expect(bar.animate).toHaveBeenCalledTimes(1);
    const [keyframes, options] = (bar.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    // start: old tab (index 0) → translateX=0, width=50
    expect(keyframes[0]).toEqual({ transform: 'translate3d(0px,0,0)', width: '50px' });
    // end: new tab (index 1) → translateX=50, width=70
    expect(keyframes[1]).toEqual({ transform: 'translate3d(50px,0,0)', width: '70px' });
    expect(options.duration).toBe(400);
  });

  it('should call bar.animate growing from center when oldTabIndex is undefined (LTR)', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 80, width: 80 })];
    const bar = createBar();

    animateBar(0, undefined, scroller, tabs, bar);

    expect(bar.animate).toHaveBeenCalledTimes(1);
    const [keyframes] = (bar.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    // start: center of new tab → translateX = 0 + 80/2 = 40, width=0
    expect(keyframes[0]).toEqual({ transform: 'translate3d(40px,0,0)', width: '0px' });
    // end: new tab → translateX = 0, width=80
    expect(keyframes[1]).toEqual({ transform: 'translate3d(0px,0,0)', width: '80px' });
  });

  it('should call bar.animate shrinking to center when newTabIndex is undefined (LTR)', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 80, width: 80 })];
    const bar = createBar();

    animateBar(undefined, 0, scroller, tabs, bar);

    expect(bar.animate).toHaveBeenCalledTimes(1);
    const [keyframes] = (bar.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    // start: old tab → translateX = 0, width=80
    expect(keyframes[0]).toEqual({ transform: 'translate3d(0px,0,0)', width: '80px' });
    // end: center of old tab → translateX = 0 + 80/2 = 40, width=0
    expect(keyframes[1]).toEqual({ transform: 'translate3d(40px,0,0)', width: '0px' });
  });

  it('should use easeInOut easing from tokens', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 50, width: 50 }), createTab({ left: 50, right: 100, width: 50 })];
    const bar = createBar();

    animateBar(1, 0, scroller, tabs, bar);

    const [, options] = (bar.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(options.easing).toBe(easeInOut);
  });

  it('should call bar.animate with correct keyframes in RTL', () => {
    const scroller = createScroller({ direction: 'rtl', rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 150, right: 200, width: 50 }), createTab({ left: 80, right: 150, width: 70 })];
    const bar = createBar();

    animateBar(1, 0, scroller, tabs, bar);

    expect(bar.animate).toHaveBeenCalledTimes(1);
    const [keyframes] = (bar.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    // RTL old tab (index 0): start = 200 - 200 = 0 → translateX = -1 * 0 = 0
    expect(keyframes[0]).toEqual({ transform: 'translate3d(0px,0,0)', width: '50px' });
    // RTL new tab (index 1): start = 200 - 150 = 50 → translateX = -1 * 50 = -50
    expect(keyframes[1]).toEqual({ transform: 'translate3d(-50px,0,0)', width: '70px' });
  });

  it('should animate when only newTabIndex is valid and oldTabIndex is out of range', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 60, width: 60 })];
    const bar = createBar();

    animateBar(0, 99, scroller, tabs, bar);

    expect(bar.animate).toHaveBeenCalledTimes(1);
    const [keyframes] = (bar.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    // oldTabIndex sanitized to undefined → grow from center: translateX = 0 + 60/2 = 30, width=0
    expect(keyframes[0]).toEqual({ transform: 'translate3d(30px,0,0)', width: '0px' });
    // end: new tab → translateX = 0, width=60
    expect(keyframes[1]).toEqual({ transform: 'translate3d(0px,0,0)', width: '60px' });
  });

  it('should animate when only oldTabIndex is valid and newTabIndex is out of range', () => {
    const scroller = createScroller({ rect: { left: 0, right: 200 } });
    const tabs = [createTab({ left: 0, right: 60, width: 60 })];
    const bar = createBar();

    animateBar(99, 0, scroller, tabs, bar);

    expect(bar.animate).toHaveBeenCalledTimes(1);
    const [keyframes] = (bar.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    // start: old tab → translateX = 0, width=60
    expect(keyframes[0]).toEqual({ transform: 'translate3d(0px,0,0)', width: '60px' });
    // newTabIndex sanitized to undefined → shrink to center: translateX = 0 + 60/2 = 30, width=0
    expect(keyframes[1]).toEqual({ transform: 'translate3d(30px,0,0)', width: '0px' });
  });
});
