import { observeClickOutside, onClickOutside, registeredPopovers, unobserveClickOutside } from './popover-utils';
import * as popoverutils from './popover-utils';
import { Popover } from './popover';

// describe('calcOffsetX()', () => {
//   const popoverPositionLeft = 12;
//   const viewportWidth = 1000;
//   const popoverWidth = 100;
//
//   it('should return popoverPositionLeft when there is enough space', () => {
//     expect(calcOffsetX(popoverPositionLeft, 20, popoverWidth, viewportWidth)).toBe(popoverPositionLeft);
//   });
//
//   it('should return number < 1/2 width of host when viewport is exceeded on the right', () => {
//     expect(calcOffsetX(popoverPositionLeft, 900, popoverWidth, viewportWidth)).toBe(-4);
//     expect(calcOffsetX(popoverPositionLeft, 885, popoverWidth, viewportWidth)).toBe(11);
//   });
//
//   it('should return number > 1/2 width of host when viewport is exceeded on the left', () => {
//     expect(calcOffsetX(popoverPositionLeft, 10, popoverWidth, viewportWidth)).toBe(18);
//     expect(calcOffsetX(popoverPositionLeft, 5, popoverWidth, viewportWidth)).toBe(23);
//   });
// });

// describe('getOffsetX()', () => {
//   it('should call calcOffsetX', () => {
//     // clientWidth is always 0 in JSDOM so we mock it
//     Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000 });
//     const calcOffsetXSpy = jest.spyOn(popoverutils, 'calcOffsetX');
//
//     const host = document.createElement('div');
//     // we need to mock getBoundingClientRect and offsetLeft since jsdom doesn't visually render it
//     Object.defineProperty(host, 'offsetLeft', { value: 100 });
//     jest.spyOn(host, 'getBoundingClientRect').mockImplementation(
//       () =>
//         ({
//           left: 100,
//           width: 100,
//         } as DOMRect)
//     );
//
//     const result = getOffsetX(host);
//
//     expect(calcOffsetXSpy).toBeCalledWith(100, 100, 100, 1000);
//     // ensure hostWidth is subtracted
//     expect(result).toBe(88);
//   });
// });

describe('onClickOutside()', () => {
  beforeEach(() => {
    registeredPopovers.length = 0;
  });

  it('should keep popover open when composedPath contains host', () => {
    const popover = new Popover();
    popover.open = true;
    registeredPopovers.push(popover);

    const clickEvent = new MouseEvent('mousedown');
    jest.spyOn(clickEvent, 'composedPath').mockImplementation(() => [popover.host]);
    onClickOutside(clickEvent);

    expect(popover.open).toBe(true);
  });

  it('should close popover when composedPath does not include host', () => {
    const popover = new Popover();
    popover.open = true;
    registeredPopovers.push(popover);

    onClickOutside(new MouseEvent('mousedown'));

    expect(popover.open).toBe(false);
  });

  it('should check composedPath only when open', () => {
    const popover = new Popover();
    registeredPopovers.push(popover);

    const clickEvent = new MouseEvent('mousedown');
    const spy = jest.spyOn(clickEvent, 'composedPath');
    onClickOutside(clickEvent);
    expect(spy).toBeCalledTimes(0);

    popover.open = true;
    onClickOutside(clickEvent);
    expect(spy).toBeCalledTimes(1);
  });

  it('should check every popover in registeredPopovers', () => {
    const popover1 = new Popover();
    const popover2 = new Popover();
    registeredPopovers.push(popover1);
    registeredPopovers.push(popover2);

    registeredPopovers.forEach((x) => (x.open = true));

    const clickEvent = new MouseEvent('mousedown');
    const spy = jest.spyOn(clickEvent, 'composedPath');
    onClickOutside(clickEvent);
    expect(spy).toBeCalledTimes(2);
  });
});

describe('observeClickOutside()', () => {
  beforeEach(() => {
    registeredPopovers.length = 0;
  });

  it('should register eventListener', () => {
    const popover = new Popover();

    const spy = jest.spyOn(document, 'addEventListener');
    observeClickOutside(popover);

    expect(spy).toBeCalledWith('mousedown', expect.anything());
  });

  it('should push popover into registeredPopovers array', () => {
    const popover = new Popover();
    observeClickOutside(popover);

    expect(registeredPopovers.length).toBe(1);
    expect(registeredPopovers[0]).toBe(popover);
  });

  it('should not push popover into registeredPopovers array when already exists', () => {
    const popover = new Popover();
    registeredPopovers.push(popover);
    observeClickOutside(popover);

    expect(registeredPopovers.length).toBe(1);
  });
});

describe('unobserveClickOutside()', () => {
  beforeEach(() => {
    registeredPopovers.length = 0;
  });

  it('should remove correct element from registeredPopovers', () => {
    const popover1 = new Popover();
    const popover2 = new Popover();
    const popover3 = new Popover();

    observeClickOutside(popover1);
    observeClickOutside(popover2);
    observeClickOutside(popover3);
    expect(registeredPopovers.length).toBe(3);

    unobserveClickOutside(popover1);
    expect(registeredPopovers.length).toBe(2);
    expect(registeredPopovers[0]).toEqual(popover2);
    expect(registeredPopovers[1]).toEqual(popover3);

    unobserveClickOutside(popover3);
    expect(registeredPopovers.length).toBe(1);
    expect(registeredPopovers[0]).toEqual(popover2);
  });

  it('should removeEventListener if registeredPopovers gets empty', () => {
    const popover1 = new Popover();
    const spy = jest.spyOn(document, 'removeEventListener');

    registeredPopovers.push(popover1);
    expect(registeredPopovers.length).toBe(1);

    unobserveClickOutside(popover1);
    expect(registeredPopovers.length).toBe(0);
    expect(spy).toBeCalledWith('mousedown', expect.anything());
  });
});
