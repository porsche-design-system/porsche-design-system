import { getOffsetX, getOffsetY, calcOffsetX } from './popover-utils';
import * as popoverutils from './popover-utils';

describe('calcOffsetX()', () => {
  const popoverPositionLeft = 12;
  const viewportWidth = 1000;
  it.each<
    [
      {
        popoverPositionLeft: number;
        popoverOffsetLeft: number;
        popoverWidth: number;
        viewportWidth: number;
      },
      number
    ]
  >([
    [
      {
        popoverPositionLeft,
        popoverOffsetLeft: 20,
        popoverWidth: 100,
        viewportWidth,
      },
      popoverPositionLeft,
    ],
    [
      {
        popoverPositionLeft,
        popoverOffsetLeft: 900,
        popoverWidth: 100,
        viewportWidth,
      },
      -4,
    ],
    [
      {
        popoverPositionLeft,
        popoverOffsetLeft: 885,
        popoverWidth: 100,
        viewportWidth,
      },
      11,
    ],
    [
      {
        popoverPositionLeft,
        popoverOffsetLeft: 10,
        popoverWidth: 100,
        viewportWidth,
      },
      18,
    ],
    [
      {
        popoverPositionLeft,
        popoverOffsetLeft: 5,
        popoverWidth: 100,
        viewportWidth,
      },
      23,
    ],
  ])('should for %o return %s', (parameters, expected) => {
    const { popoverPositionLeft, popoverOffsetLeft, popoverWidth, viewportWidth } = parameters;
    expect(calcOffsetX(popoverPositionLeft, popoverOffsetLeft, popoverWidth, viewportWidth)).toBe(expected);
  });

  describe('getOffsetX()', () => {
    it('should use getBoundingClientRect on popover element', () => {
      const host = document.createElement('div');
      const boundingClientSpy = jest.spyOn(host, 'getBoundingClientRect');

      getOffsetX(host);

      expect(boundingClientSpy).toBeCalledTimes(1);
    });

    it('should call calcOffsetX with viewportWidth', () => {
      Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000 });
      const boundingClientSpy = jest.spyOn(popoverutils, 'calcOffsetX');
      const host = document.createElement('div');

      getOffsetX(host);

      expect(boundingClientSpy).toBeCalledWith(0, 0, 0, 1000);
    });
  });
});
