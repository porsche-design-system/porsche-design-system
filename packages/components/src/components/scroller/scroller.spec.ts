import { vi } from 'vitest';
import * as jsonUtils from '../../utils/json';
import { Scroller } from './scroller';

const initComponent = (): Scroller => {
  const component = new Scroller();
  component.host = document.createElement('p-scroller');
  component.host.attachShadow({ mode: 'open' });

  const scrollArea = document.createElement('div');
  const sentinelLeft = document.createElement('span');
  const sentinelRight = document.createElement('span');

  scrollArea.appendChild(sentinelLeft);
  scrollArea.appendChild(sentinelRight);
  component.host.shadowRoot.appendChild(scrollArea);

  component['scrollArea'] = scrollArea;
  component['sentinelLeft'] = sentinelLeft;
  component['sentinelRight'] = sentinelRight;

  return component;
};

describe('initIntersectionObserver()', () => {
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockDisconnect: ReturnType<typeof vi.fn>;
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockDisconnect = vi.fn();

    // IntersectionObserver isn't available in jsdom
    window.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        unobserve: vi.fn(),
        disconnect: mockDisconnect,
      };
    }) as any;
  });

  it('should create IntersectionObserver with scrollArea as root and threshold 0.1', () => {
    const component = initComponent();

    component['initIntersectionObserver']();

    expect(window.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: component['scrollArea'],
      threshold: 0.1,
    });
  });

  it('should observe sentinelLeft and sentinelRight', () => {
    const component = initComponent();

    component['initIntersectionObserver']();

    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledWith(component['sentinelLeft']);
    expect(mockObserve).toHaveBeenCalledWith(component['sentinelRight']);
  });

  it('should set isIndicatorPrevHidden to true when sentinelLeft is intersecting', () => {
    const component = initComponent();
    component['isIndicatorPrevHidden'] = false;

    component['initIntersectionObserver']();

    intersectionCallback(
      [{ target: component['sentinelLeft'], isIntersecting: true }] as unknown as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );

    expect(component['isIndicatorPrevHidden']).toBe(true);
  });

  it('should set isIndicatorPrevHidden to false when sentinelLeft is not intersecting', () => {
    const component = initComponent();
    component['isIndicatorPrevHidden'] = true;

    component['initIntersectionObserver']();

    intersectionCallback(
      [{ target: component['sentinelLeft'], isIntersecting: false }] as unknown as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );

    expect(component['isIndicatorPrevHidden']).toBe(false);
  });

  it('should set isIndicatorNextHidden to true when sentinelRight is intersecting', () => {
    const component = initComponent();
    component['isIndicatorNextHidden'] = false;

    component['initIntersectionObserver']();

    intersectionCallback(
      [{ target: component['sentinelRight'], isIntersecting: true }] as unknown as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );

    expect(component['isIndicatorNextHidden']).toBe(true);
  });

  it('should set isIndicatorNextHidden to false when sentinelRight is not intersecting', () => {
    const component = initComponent();
    component['isIndicatorNextHidden'] = true;

    component['initIntersectionObserver']();

    intersectionCallback(
      [{ target: component['sentinelRight'], isIntersecting: false }] as unknown as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );

    expect(component['isIndicatorNextHidden']).toBe(false);
  });

  it('should handle both sentinels in a single callback invocation', () => {
    const component = initComponent();

    component['initIntersectionObserver']();

    intersectionCallback(
      [
        { target: component['sentinelLeft'], isIntersecting: false },
        { target: component['sentinelRight'], isIntersecting: true },
      ] as unknown as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );

    expect(component['isIndicatorPrevHidden']).toBe(false);
    expect(component['isIndicatorNextHidden']).toBe(true);
  });

  it('should store the IntersectionObserver instance', () => {
    const component = initComponent();

    component['initIntersectionObserver']();

    expect(component['intersectionObserver']).toBeDefined();
    expect(component['intersectionObserver'].observe).toBeDefined();
  });
});

describe('scrollToPositionHandler()', () => {
  it('should call parseJSONAttribute() with scrollToPosition', () => {
    const spy = vi.spyOn(jsonUtils, 'parseJSONAttribute');
    const component = initComponent();
    component['scrollArea'].scrollTo = vi.fn();
    component.scrollToPosition = { scrollPosition: 200, isSmooth: true };

    component.scrollToPositionHandler();

    expect(spy).toHaveBeenCalledWith({ scrollPosition: 200, isSmooth: true });
  });

  it('should call scrollArea.scrollTo() with smooth behavior when isSmooth is true', () => {
    const component = initComponent();
    const scrollToSpy = vi.fn();
    component['scrollArea'].scrollTo = scrollToSpy;
    component.scrollToPosition = { scrollPosition: 300, isSmooth: true };

    component.scrollToPositionHandler();

    expect(scrollToSpy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });

  it('should call scrollArea.scrollTo() with instant behavior when isSmooth is false', () => {
    const component = initComponent();
    const scrollToSpy = vi.fn();
    component['scrollArea'].scrollTo = scrollToSpy;
    component.scrollToPosition = { scrollPosition: 150, isSmooth: false };

    component.scrollToPositionHandler();

    expect(scrollToSpy).toHaveBeenCalledWith({ left: 150, behavior: 'instant' });
  });

  it('should call scrollArea.scrollTo() with instant behavior when isSmooth is undefined', () => {
    const component = initComponent();
    const scrollToSpy = vi.fn();
    component['scrollArea'].scrollTo = scrollToSpy;
    component.scrollToPosition = { scrollPosition: 100 };

    component.scrollToPositionHandler();

    expect(scrollToSpy).toHaveBeenCalledWith({ left: 100, behavior: 'instant' });
  });

  it('should not call scrollTo() when scrollArea is undefined', () => {
    const component = initComponent();
    const scrollToSpy = vi.fn();
    component['scrollArea'].scrollTo = scrollToSpy;
    component['scrollArea'] = undefined;
    component.scrollToPosition = { scrollPosition: 200, isSmooth: true };

    component.scrollToPositionHandler();

    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});

describe('scroll()', () => {
  it('should call scrollBy() with negative left value and smooth behavior for direction "prev"', () => {
    const component = initComponent();
    const scrollBySpy = vi.fn();
    component['scrollArea'].scrollBy = scrollBySpy;
    Object.defineProperty(component['scrollArea'], 'offsetWidth', { value: 400 });

    component['scroll']('prev');

    expect(scrollBySpy).toHaveBeenCalledWith({ left: -200, behavior: 'smooth' });
  });

  it('should call scrollBy() with positive left value and smooth behavior for direction "next"', () => {
    const component = initComponent();
    const scrollBySpy = vi.fn();
    component['scrollArea'].scrollBy = scrollBySpy;
    Object.defineProperty(component['scrollArea'], 'offsetWidth', { value: 400 });

    component['scroll']('next');

    expect(scrollBySpy).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
  });

  it('should use half of scrollArea offsetWidth as scroll distance', () => {
    const component = initComponent();
    const scrollBySpy = vi.fn();
    component['scrollArea'].scrollBy = scrollBySpy;
    Object.defineProperty(component['scrollArea'], 'offsetWidth', { value: 600 });

    component['scroll']('next');

    expect(scrollBySpy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });
});
