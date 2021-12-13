import {
  calcSpaceForDirections,
  getAutoDirection,
  getPopoverMargin,
  isElementWithinViewport,
  addDocumentEventListener,
  onDocumentMousedown,
  onDocumentKeydown,
  POPOVER_DIRECTIONS,
  registeredPopovers,
  removeDocumentEventListener,
  updatePopoverStyles,
} from './popover-utils';
import type { PopoverDirection } from './popover-utils';
import * as popoverUtils from './popover-utils';
import * as utils from '../../../utils/jss';
import { Popover } from './popover';
import { getComponentCss } from './popover-styles';

type Rect = Pick<DOMRect, 'width' | 'height' | 'top' | 'left' | 'bottom' | 'right'>;

const size: Pick<Rect, 'width' | 'height'> = {
  width: 100,
  height: 100,
};

const rectCentered: Rect = { ...size, top: 450, left: 450, bottom: 450, right: 450 };
const rectExceededLeft: Rect = {
  ...size,
  top: 450,
  left: 15,
  bottom: 450,
  right: 115,
};
const rectExceededRight: Rect = {
  ...size,
  top: 450,
  left: 885,
  bottom: 450,
  right: 985,
};
const rectExceededTop: Rect = {
  ...size,
  top: 15,
  left: 450,
  bottom: 115,
  right: 450,
};
const rectExceededBottom: Rect = {
  ...size,
  top: 885,
  left: 450,
  bottom: 985,
  right: 450,
};

const mockBoundingClientRect = (element: HTMLDivElement, opts: Rect): void => {
  jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => opts as DOMRect);
};

const setViewport = () => {
  // clientWidth/Height mockBoundingClientRect is always 0 in JSDOM so we mock it
  Object.defineProperties(document.documentElement, {
    clientWidth: {
      value: 1000,
      configurable: true,
    },
    clientHeight: {
      value: 1000,
      configurable: true,
    },
  });
};

const mapDirectionToRect: { [key in PopoverDirection]: Rect } = {
  top: rectExceededTop,
  right: rectExceededRight,
  bottom: rectExceededBottom,
  left: rectExceededLeft,
};

const spacer = document.createElement('div');
const popover = document.createElement('div');

describe('updatePopoverStyles()', () => {
  const host = document.createElement('p-popover');
  host.attachShadow({ mode: 'open' });

  beforeAll(() => {
    setViewport();
  });

  beforeEach(() => {
    mockBoundingClientRect(spacer, rectCentered);
    mockBoundingClientRect(popover, rectCentered);
  });

  it('should call isElementWithinViewport()', () => {
    const spy = jest.spyOn(popoverUtils, 'isElementWithinViewport');
    updatePopoverStyles(host, spacer, popover, 'top');
    expect(spy).toBeCalledWith(spacer, popover, 'top');
  });

  it('should call getAutoDirection() and attachComponentCss()', () => {
    const getAutoDirectionSpy = jest.spyOn(popoverUtils, 'getAutoDirection');
    const attachComponentCssSpy = jest.spyOn(utils, 'attachComponentCss');

    jest.spyOn(popoverUtils, 'isElementWithinViewport').mockImplementationOnce(() => true);
    updatePopoverStyles(host, spacer, popover, 'top');
    expect(getAutoDirectionSpy).not.toBeCalled();
    expect(attachComponentCssSpy).not.toBeCalled();

    jest.spyOn(popoverUtils, 'isElementWithinViewport').mockImplementationOnce(() => false);
    updatePopoverStyles(host, spacer, popover, 'top');

    expect(getAutoDirectionSpy).toBeCalledWith(spacer, popover);
    expect(attachComponentCssSpy).toBeCalledWith(host, getComponentCss, 'bottom');
  });

  it('should call getPopoverMargin()', () => {
    const spy = jest.spyOn(popoverUtils, 'getPopoverMargin');
    updatePopoverStyles(host, spacer, popover, 'top');
    expect(spy).toBeCalledWith(spacer, popover, 'top');
  });

  it('should set margin to popover', () => {
    jest.spyOn(popoverUtils, 'getPopoverMargin').mockImplementationOnce(() => '1px');
    expect(popover.style.margin).toBe('0px');

    updatePopoverStyles(host, spacer, popover, 'top');
    expect(popover.style.margin).toBe('1px');
  });
});

describe('isElementWithinViewport()', () => {
  beforeAll(() => {
    setViewport();
  });

  beforeEach(() => {
    mockBoundingClientRect(spacer, rectCentered);
    mockBoundingClientRect(popover, rectCentered);
  });

  describe('spacer & popover centered', () => {
    it.each<PopoverDirection>(POPOVER_DIRECTIONS)(
      'should return true when inside viewport for direction %s',
      (direction) => {
        expect(isElementWithinViewport(spacer, popover, direction)).toBe(true);
      }
    );
  });

  describe('popover exceeded', () => {
    it.each<PopoverDirection>(POPOVER_DIRECTIONS)('should return false when exceeds %s', (direction) => {
      mockBoundingClientRect(popover, mapDirectionToRect[direction]);
      expect(isElementWithinViewport(spacer, popover, direction)).toBe(false);
    });
  });

  describe('spacer exceeded', () => {
    it.each<PopoverDirection>(['top', 'bottom'])('should return false when exceeds %s', (direction) => {
      mockBoundingClientRect(spacer, mapDirectionToRect[direction]);
      expect(isElementWithinViewport(spacer, popover, 'left')).toBe(false);
    });
    it.each<PopoverDirection>(['top', 'bottom'])('should return false when exceeds %s', (direction) => {
      mockBoundingClientRect(spacer, mapDirectionToRect[direction]);
      expect(isElementWithinViewport(spacer, popover, 'right')).toBe(false);
    });
    it.each<PopoverDirection>(['left', 'right'])('should return false when exceeds %s', (direction) => {
      mockBoundingClientRect(spacer, mapDirectionToRect[direction]);
      expect(isElementWithinViewport(spacer, popover, 'top')).toBe(false);
    });
    it.each<PopoverDirection>(['left', 'right'])('should return false when exceeds %s', (direction) => {
      mockBoundingClientRect(spacer, mapDirectionToRect[direction]);
      expect(isElementWithinViewport(spacer, popover, 'bottom')).toBe(false);
    });
  });
});

describe('calcSpaceForDirections()', () => {
  it('should return correct space for all directions', () => {
    setViewport();
    mockBoundingClientRect(spacer, rectCentered);
    mockBoundingClientRect(popover, rectCentered);

    expect(calcSpaceForDirections(spacer, popover)).toEqual({
      top: 350,
      right: 450,
      bottom: 450,
      left: 350,
    });
  });
});

describe('getAutoDirection()', () => {
  it('should call calcSpaceForDirections', () => {
    const spy = jest.spyOn(popoverUtils, 'calcSpaceForDirections');

    getAutoDirection(spacer, popover);
    expect(spy).toBeCalledWith(spacer, popover);
  });

  it.each<PopoverDirection>(POPOVER_DIRECTIONS)(
    'should return bottom for direction %s when space is even on all directions',
    (direction) => {
      jest.spyOn(popoverUtils, 'calcSpaceForDirections').mockImplementationOnce(() => ({
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
      }));

      expect(getAutoDirection(spacer, popover)).toBe('bottom');
    }
  );

  it.each<PopoverDirection>(POPOVER_DIRECTIONS)('should return %s as direction with most space', (direction) => {
    jest.spyOn(popoverUtils, 'calcSpaceForDirections').mockImplementationOnce(() => ({
      top: 1,
      right: 1,
      left: 1,
      bottom: 1,
      // function returns direction with highest value
      [direction]: 2,
    }));

    expect(getAutoDirection(spacer, popover)).toBe(direction);
  });
});

describe('getPopoverMargin()', () => {
  beforeAll(() => {
    setViewport();
  });

  it.each<PopoverDirection>(POPOVER_DIRECTIONS)('should return 0 if within viewport for direction %s', (direction) => {
    mockBoundingClientRect(spacer, rectCentered);
    mockBoundingClientRect(popover, rectCentered);
    expect(getPopoverMargin(spacer, popover, direction)).toBe('0');
  });

  describe('for x-axis', () => {
    const scenarios: { spacer: Rect; popover: Rect; expected: string }[] = [
      {
        spacer: { ...rectCentered, width: 50 },
        popover: rectExceededLeft,
        expected: '0 0 0 1px',
      },
      {
        spacer: { ...rectExceededRight, width: 50, left: 14 },
        popover: rectExceededLeft,
        expected: '0 0 0 -1px',
      },
      {
        spacer: { ...rectCentered, width: 50 },
        popover: rectExceededRight,
        expected: '0 0 0 -1px',
      },
      {
        spacer: { ...rectCentered, width: 50, right: 986 },
        popover: rectExceededRight,
        expected: '0 0 0 1px',
      },
      {
        spacer: { ...rectCentered, width: 50 },
        popover: { ...rectExceededLeft, left: 12 },
        expected: '0 0 0 4px',
      },
      {
        spacer: { ...rectExceededLeft, width: 50, left: 13 },
        popover: rectExceededLeft,
        expected: '0 0 0 -2px',
      },
      {
        spacer: { ...rectCentered, width: 50 },
        popover: { ...rectExceededRight, right: 987 },
        expected: '0 0 0 -3px',
      },
      {
        spacer: { ...rectCentered, width: 50, right: 987 },
        popover: rectExceededRight,
        expected: '0 0 0 2px',
      },
    ];
    scenarios.forEach((scenario) => {
      it.each<PopoverDirection>(['top', 'bottom'])('should return correct margin for direction %s', (direction) => {
        mockBoundingClientRect(spacer, scenario.spacer);
        mockBoundingClientRect(popover, scenario.popover);

        expect(getPopoverMargin(spacer, popover, direction)).toEqual(scenario.expected);
      });
    });
  });

  describe('for y-axis', () => {
    const scenarios: { spacer: Rect; popover: Rect; expected: string }[] = [
      {
        spacer: { ...rectCentered, height: 50 },
        popover: rectExceededTop,
        expected: '1px 0 0 0',
      },
      {
        spacer: { ...rectCentered, height: 50, top: 14 },
        popover: rectExceededTop,
        expected: '-1px 0 0 0',
      },
      {
        spacer: { ...rectCentered, height: 50 },
        popover: rectExceededBottom,
        expected: '-1px 0 0 0',
      },
      {
        spacer: { ...rectCentered, height: 50, bottom: 986 },
        popover: rectExceededBottom,
        expected: '1px 0 0 0',
      },
      {
        spacer: { ...rectCentered, height: 50 },
        popover: { ...rectExceededTop, top: 12 },
        expected: '4px 0 0 0',
      },
      {
        spacer: { ...rectCentered, height: 50, top: 13 },
        popover: rectExceededTop,
        expected: '-2px 0 0 0',
      },
      {
        spacer: { ...rectCentered, height: 50 },
        popover: { ...rectExceededBottom, bottom: 987 },
        expected: '-3px 0 0 0',
      },
      {
        spacer: { ...rectCentered, height: 50, bottom: 987 },
        popover: rectExceededBottom,
        expected: '2px 0 0 0',
      },
    ];

    scenarios.forEach((scenario) => {
      it.each<PopoverDirection>(['left', 'right'])('should return correct margin for direction %s', (direction) => {
        mockBoundingClientRect(spacer, scenario.spacer);
        mockBoundingClientRect(popover, scenario.popover);

        expect(getPopoverMargin(spacer, popover, direction)).toEqual(scenario.expected);
      });
    });
  });
});

describe('addDocumentEventListener()', () => {
  const popover = new Popover();
  beforeEach(() => {
    registeredPopovers.length = 0;
  });

  it('should register eventListeners', () => {
    const spy = jest.spyOn(document, 'addEventListener');
    addDocumentEventListener(popover);

    expect(spy).toBeCalledWith('mousedown', onDocumentMousedown);
    expect(spy).toBeCalledWith('keydown', onDocumentKeydown);
    expect(spy).toBeCalledTimes(2);
  });

  it('should register eventListeners only once', () => {
    const spy = jest.spyOn(document, 'addEventListener');
    addDocumentEventListener(popover);
    addDocumentEventListener(popover);

    expect(spy).toBeCalledWith('mousedown', onDocumentMousedown);
    expect(spy).toBeCalledWith('keydown', onDocumentKeydown);
    expect(spy).toBeCalledTimes(2);
  });

  it('should push popover into registeredPopovers array', () => {
    addDocumentEventListener(popover);

    expect(registeredPopovers.length).toBe(1);
    expect(registeredPopovers[0]).toBe(popover);
  });

  it('should push popover into registeredPopovers array only once', () => {
    addDocumentEventListener(popover);
    addDocumentEventListener(popover);

    expect(registeredPopovers.length).toBe(1);
  });
});

describe('removeDocumentEventListener()', () => {
  beforeEach(() => {
    registeredPopovers.length = 0;
  });

  it('should not remove other element from registeredPopovers when already removed', () => {
    const popover1 = new Popover();
    const popover2 = new Popover();

    addDocumentEventListener(popover1);
    addDocumentEventListener(popover2);
    expect(registeredPopovers.length).toBe(2);

    removeDocumentEventListener(popover1);
    expect(registeredPopovers.length).toBe(1);
    expect(registeredPopovers[0]).toEqual(popover2);

    removeDocumentEventListener(popover1);
    expect(registeredPopovers.length).toBe(1);
    expect(registeredPopovers[0]).toEqual(popover2);
  });

  it('should remove correct element from registeredPopovers array', () => {
    const popover1 = new Popover();
    const popover2 = new Popover();
    const popover3 = new Popover();

    addDocumentEventListener(popover1);
    addDocumentEventListener(popover2);
    addDocumentEventListener(popover3);
    expect(registeredPopovers.length).toBe(3);

    removeDocumentEventListener(popover1);
    expect(registeredPopovers.length).toBe(2);
    expect(registeredPopovers[0]).toEqual(popover2);
    expect(registeredPopovers[1]).toEqual(popover3);

    removeDocumentEventListener(popover3);
    expect(registeredPopovers.length).toBe(1);
    expect(registeredPopovers[0]).toEqual(popover2);
  });

  it('should unregister eventListener if registeredPopovers array is empty', () => {
    const popover = new Popover();
    const spy = jest.spyOn(document, 'removeEventListener');

    registeredPopovers.push(popover);
    expect(registeredPopovers.length).toBe(1);

    removeDocumentEventListener(popover);
    expect(registeredPopovers.length).toBe(0);
    expect(spy).toBeCalledWith('mousedown', onDocumentMousedown);
    expect(spy).toBeCalledWith('keydown', onDocumentKeydown);
  });
});

describe('onDocumentMousedown()', () => {
  const popover = new Popover();
  popover.host = document.createElement('p-popover');
  document.body.appendChild(popover.host);
  let spy: jest.SpyInstance;

  beforeEach(() => {
    popover.open = false;
    registeredPopovers.length = 0;
    registeredPopovers.push(popover);
    spy = jest.spyOn(popoverUtils, 'onDocumentMousedown');
    document.addEventListener('mousedown', onDocumentMousedown);
  });
  afterEach(() => {
    document.removeEventListener('mousedown', onDocumentMousedown);
  });

  it('should do nothing when composedPath contains host', () => {
    popover.open = true;
    popover.host.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(spy).toBeCalledTimes(1);
    expect(popover.open).toBe(true);
  });

  it('should change open to false when composedPath does not include host', () => {
    popover.open = true;
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(spy).toBeCalledTimes(1);
    expect(popover.open).toBe(false);
  });

  it('should check composedPath only when open', () => {
    const clickEvent = new MouseEvent('mousedown');
    const spy1 = jest.spyOn(clickEvent, 'composedPath');
    onDocumentMousedown(clickEvent);
    expect(spy1).toBeCalledTimes(0);

    popover.open = true;
    onDocumentMousedown(clickEvent);
    expect(spy1).toBeCalledTimes(1);
  });

  it('should close correct popover', () => {
    const popover1 = new Popover();
    popover1.open = true;
    popover1.host = document.createElement('p-popover');
    document.body.appendChild(popover1.host);

    const popover2 = new Popover();
    registeredPopovers.push(popover1);
    registeredPopovers.push(popover2);

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(spy).toBeCalledTimes(1);
    expect(popover.open).toBe(false);
    expect(popover1.open).toBe(false);
    expect(popover2.open).toBe(false);
  });
});

describe('onDocumentKeydown()', () => {
  const popover = new Popover();
  popover.host = document.createElement('p-popover');
  document.body.appendChild(popover.host);
  let spy: jest.SpyInstance;

  beforeEach(() => {
    popover.open = false;
    registeredPopovers.length = 0;
    registeredPopovers.push(popover);
    spy = jest.spyOn(popoverUtils, 'onDocumentKeydown');
    document.addEventListener('keydown', onDocumentKeydown);
  });
  afterEach(() => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  ['SpaceBar', 'Enter', ' '].forEach((key) => {
    it(`should change open to false when composedPath does not include host for key ${key}`, () => {
      popover.open = true;
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

      expect(spy).toBeCalledTimes(1);
      expect(popover.open).toBe(false);
    });

    it(`should do nothing when composedPath contains host for key ${key}`, () => {
      popover.open = true;
      popover.host.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

      expect(spy).toBeCalledTimes(1);
      expect(popover.open).toBe(true);
    });

    it(`should check composedPath only when open for key ${key}`, () => {
      const keyboardEvent = new KeyboardEvent('keydown', { key });
      const spy1 = jest.spyOn(keyboardEvent, 'composedPath');
      onDocumentKeydown(keyboardEvent);
      expect(spy1).toBeCalledTimes(0);

      popover.open = true;
      onDocumentKeydown(keyboardEvent);
      expect(spy1).toBeCalledTimes(1);
    });
  });

  it.each(['Escape', 'Esc'])('should change open to false for key %s', (key) => {
    popover.open = true;
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

    expect(spy).toBeCalledTimes(1);
    expect(popover.open).toBe(false);
  });

  it.each(['Escape', 'Esc', ''])('should not check composedPath for key %s', (key) => {
    const keyboardEvent = new KeyboardEvent('keydown', { key });
    const spy = jest.spyOn(keyboardEvent, 'composedPath');
    onDocumentKeydown(keyboardEvent);

    expect(spy).toBeCalledTimes(0);
  });

  it('should close correct popover', () => {
    const popover1 = new Popover();
    popover1.open = true;
    popover1.host = document.createElement('p-popover');
    document.body.appendChild(popover1.host);

    const popover2 = new Popover();
    registeredPopovers.push(popover1);
    registeredPopovers.push(popover2);

    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(spy).toBeCalledTimes(1);
    expect(popover.open).toBe(false);
    expect(popover1.open).toBe(false);
    expect(popover2.open).toBe(false);
  });
});
