import {
  isWithinViewport,
  observeClickOutside,
  onClickOutside,
  POPOVER_DIRECTIONS,
  PopoverDirection,
  registeredPopovers,
  unobserveClickOutside,
} from './popover-utils';
import { Popover } from './popover';

type BoundingClientRectOpts = {
  element: HTMLDivElement;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

const mockBoundingClientRect = (opts?: BoundingClientRectOpts): void => {
  // defaults to center of viewport
  const { element, width = 100, height = 100, top = 450, left = 450, bottom = 450, right = 450 } = opts;

  jest.spyOn(element, 'getBoundingClientRect').mockImplementation(
    () =>
      ({
        width,
        height,
        top,
        left,
        bottom,
        right,
      } as DOMRect)
  );
};

const setViewport = () => {
  // clientWidth/Height is always 0 in JSDOM so we mock it
  Object.defineProperties(document.documentElement, {
    clientWidth: {
      value: 1000,
    },
    clientHeight: {
      value: 1000,
    },
  });
};

const exceedSpaceTopLeft = 15;
const exceedSpaceBottomRight = 985;
const placeElementOutside = (direction): number => {
  return direction === 'top' || direction === 'left' ? exceedSpaceTopLeft : exceedSpaceBottomRight;
};

describe('isWithinViewport', () => {
  setViewport();

  const spacer = document.createElement('div');
  const popover = document.createElement('div');

  describe('centered', () => {
    it.each<PopoverDirection>(POPOVER_DIRECTIONS)(
      'should be true when inside viewport for direction %s',
      (direction) => {
        mockBoundingClientRect({ element: spacer });
        mockBoundingClientRect({ element: popover });

        expect(isWithinViewport(spacer, popover, direction)).toBe(true);
      }
    );
  });

  it.each<PopoverDirection>(POPOVER_DIRECTIONS)('should be false when popover exceeds %s', (popoverDirection) => {
    const popoverPosition = {
      [popoverDirection]: placeElementOutside(popoverDirection),
    };

    mockBoundingClientRect({ element: spacer });
    mockBoundingClientRect({ element: popover, ...popoverPosition });

    expect(isWithinViewport(spacer, popover, popoverDirection)).toBe(false);
  });

  describe('isWithinXAxis', () => {
    mockBoundingClientRect({ element: popover });

    it.each<PopoverDirection>(['top', 'bottom'])(
      'should be false when spacer exceeds xAxis for direction %s',
      (direction) => {
        // left
        mockBoundingClientRect({ element: spacer, left: exceedSpaceTopLeft });
        expect(isWithinViewport(spacer, popover, direction)).toBe(false);
        // right
        mockBoundingClientRect({ element: spacer, right: exceedSpaceBottomRight });
        expect(isWithinViewport(spacer, popover, direction)).toBe(false);
      }
    );
  });

  describe('isWithinYAxis', () => {
    mockBoundingClientRect({ element: popover });

    it.each<PopoverDirection>(['left', 'right'])(
      'should be false when spacer exceeds yAxis for direction %s',
      (direction) => {
        // top
        mockBoundingClientRect({ element: spacer, top: exceedSpaceTopLeft });
        expect(isWithinViewport(spacer, popover, direction)).toBe(false);
        // bottom
        mockBoundingClientRect({ element: spacer, bottom: exceedSpaceBottomRight });
        expect(isWithinViewport(spacer, popover, direction)).toBe(false);
      }
    );
  });
});

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
