import { Scroller } from './scroller';
import * as jsonUtils from '../../../utils/json';
import * as scrollingUtils from '../../../utils/scrolling';

describe('scrollToPositionHandler', () => {
  it('should call parseJSONAttribute() with correct parameters and set scrollPosition', () => {
    const component = new Scroller();
    component.scrollToPosition = { scrollPosition: 100 };
    component['scrollAreaElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(jsonUtils, 'parseJSONAttribute').mockReturnValue({ scrollPosition: 200 });
    jest.spyOn(scrollingUtils, 'scrollElementTo' as any).mockImplementation(() => {});

    component.scrollToPositionHandler();

    expect(spy).toBeCalledWith({ scrollPosition: 100 });
    expect(component.scrollToPosition).toStrictEqual({ scrollPosition: 200 });
  });

  it('should call scrollElementTo() with correct parameters if isSmooth', () => {
    const component = new Scroller();
    component.scrollToPosition = { scrollPosition: 100, isSmooth: true };
    component['scrollAreaElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(scrollingUtils, 'scrollElementTo').mockImplementation(() => {});

    component.scrollToPositionHandler();

    expect(spy).toBeCalledTimes(1);
  });

  it('should set scrollAreaElement.scrollLeft if !isSmooth', () => {
    const component = new Scroller();
    component.scrollToPosition = { scrollPosition: 100 };
    component['scrollAreaElement'] = document.createElement('p-scroller');

    component.scrollToPositionHandler();

    expect(component['scrollAreaElement'].scrollLeft).toBe(component.scrollToPosition.scrollPosition);
  });
});

describe('connectedCallback', () => {
  it('should call parseJSONAttribute() with correct parameter and set scrollPosition', () => {
    const component = new Scroller();
    component.scrollToPosition = { scrollPosition: 100 };
    component['scrollAreaElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(jsonUtils, 'parseJSONAttribute').mockReturnValue({ scrollPosition: 200 });

    component.connectedCallback();

    expect(spy).toBeCalledWith({ scrollPosition: 100 });
    expect(component.scrollToPosition).toStrictEqual({ scrollPosition: 200 });
  });
});

describe('componentDidLoad', () => {
  it('should call initIntersectionObserver()', () => {
    const component = new Scroller();
    const spy = jest.spyOn(component, 'initIntersectionObserver' as any);

    try {
      component.componentDidLoad();
    } catch {}

    expect(spy).toBeCalledTimes(1);
  });
  it('should call scrollToPositionHandler() if scrollToPosition', () => {
    const component = new Scroller();
    jest.spyOn(component, 'initIntersectionObserver' as any).mockImplementation(() => {});
    component.scrollToPosition = { scrollPosition: 100 };
    component['scrollAreaElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(component, 'scrollToPositionHandler');

    component.componentDidLoad();

    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentShouldUpdate', () => {
  it('should return true if prop name does not match scrollToPosition', () => {
    const component = new Scroller();
    expect(component.componentShouldUpdate(0, 0, 'theme')).toBe(true);
  });

  it('should return true if prop name matches "scrollToPosition" and isPrevHidden and isNextHidden are false', () => {
    const component = new Scroller();
    component['isPrevHidden'] = false;
    component['isNextHidden'] = false;
    expect(component.componentShouldUpdate(0, 0, 'scrollToPosition')).toBe(true);
  });

  it('should return false if prop name matches "scrollToPosition" and isPrevHidden is true', () => {
    const component = new Scroller();
    component['isPrevHidden'] = true;
    expect(component.componentShouldUpdate(0, 0, 'scrollToPosition')).toBe(false);
  });

  it('should return false if prop name matches "scrollToPosition" and isNextHidden is true', () => {
    const component = new Scroller();
    component['isNextHidden'] = true;
    expect(component.componentShouldUpdate(0, 0, 'scrollToPosition')).toBe(false);
  });
});
