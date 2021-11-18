import { getOffsetX, getOffsetY, calcOffsetX, isClickInsideHost } from './popover-utils';
import * as popoverutils from './popover-utils';
import { Popover } from './popover';

describe('calcOffsetX()', () => {
  const popoverPositionLeft = 12;
  const viewportWidth = 1000;
  const popoverWidth = 100;

  it('should return popoverPositionLeft when there is enough space', () => {
    expect(calcOffsetX(popoverPositionLeft, 20, popoverWidth, viewportWidth)).toBe(popoverPositionLeft);
  });

  it('should return number < 1/2 width of host when viewport is exceeded on the right', () => {
    expect(calcOffsetX(popoverPositionLeft, 900, popoverWidth, viewportWidth)).toBe(-4);
    expect(calcOffsetX(popoverPositionLeft, 885, popoverWidth, viewportWidth)).toBe(11);
  });

  it('should return number > 1/2 width of host when viewport is exceeded on the left', () => {
    expect(calcOffsetX(popoverPositionLeft, 10, popoverWidth, viewportWidth)).toBe(18);
    expect(calcOffsetX(popoverPositionLeft, 5, popoverWidth, viewportWidth)).toBe(23);
  });
});

describe('getOffsetX()', () => {
  it('should call calcOffsetX', () => {
    // clientWidth is always 0 in JSDOM so we mock it
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000 });
    const calcOffsetXSpy = jest.spyOn(popoverutils, 'calcOffsetX');

    const host = document.createElement('div');
    // we need to mock getBoundingClientRect and offsetLeft since jsdom doesn't visually render it
    Object.defineProperty(host, 'offsetLeft', { value: 100 });
    jest.spyOn(host, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          left: 100,
          width: 100,
        } as DOMRect)
    );

    const result = getOffsetX(host);

    expect(calcOffsetXSpy).toBeCalledWith(100, 100, 100, 1000);
    // ensure hostWidth is subtracted
    expect(result).toBe(88);
  });
});

describe('isClickInsideHost()', () => {
  it('should be true when composedPath contains host', () => {
    const component = document.createElement('div');
    const clickEvent = new MouseEvent('click');
    jest.spyOn(clickEvent, 'composedPath').mockImplementation(() => [component]);

    expect(isClickInsideHost(component, true, clickEvent)).toBe(true);
  });

  it('should be false when closed', () => {
    const component = document.createElement('div');
    const clickEvent = new MouseEvent('click');
    jest.spyOn(clickEvent, 'composedPath').mockImplementation(() => [component]);

    expect(isClickInsideHost(component, false, clickEvent)).toBe(true);
  });

  it('should be false when composedPath does not include host', () => {
    const component = document.createElement('div');

    expect(isClickInsideHost(component, true, new MouseEvent('click'))).toBe(false);
  });

  it('should call composedPath when open', () => {
    const component = document.createElement('div');
    const clickEvent = new MouseEvent('click');
    const eventSpy = jest.spyOn(clickEvent, 'composedPath');

    isClickInsideHost(component, true, clickEvent);
    expect(eventSpy).toBeCalledTimes(1);
  });

  it('should not call composedPath when closed', () => {
    const component = document.createElement('div');
    const clickEvent = new MouseEvent('click');
    const eventSpy = jest.spyOn(clickEvent, 'composedPath');

    isClickInsideHost(component, false, clickEvent);
    expect(eventSpy).toBeCalledTimes(0);
  });
});
