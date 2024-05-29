import * as flyoutUtilsUtils from './flyout-utils';
import {
  addStickyTopCssVarStyleSheet,
  getStickyTopResizeObserver,
  handleUpdateStickyTopCssVar,
  stickyTopCssVarResizeObserver,
  stickyTopCssVarStyleSheet,
  updateStickyTopCssVarStyleSheet,
} from './flyout-utils';
import * as jssUtils from './../../utils/jss';
import { expect } from '@jest/globals';

class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  public callback: any;
  observe() {}
  unobserve() {}
  disconnect() {}
}

class MockHTMLElement {
  constructor() {
    this.shadowRoot = { adoptedStyleSheets: [] } as DocumentOrShadowRoot;
  }
  shadowRoot: DocumentOrShadowRoot;
  getBoundingClientRect() {
    return { height: 100 };
  }
}

describe('addStickyTopCssVarStyleSheet()', () => {
  let host;
  let stylesheetMock = {
    replaceSync: jest.fn(),
    insertRule: jest.fn(),
    deleteRule: jest.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    global.CSSStyleSheet = jest.fn().mockImplementation(() => {
      return stylesheetMock;
    });
    host = new MockHTMLElement();
  });

  it('should not do anything if getHasConstructableStylesheetSupport() returns false', () => {
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(false);

    addStickyTopCssVarStyleSheet(host);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(stickyTopCssVarStyleSheet).toBeUndefined();
  });

  it('should create new stylesheet and push it into host.adoptedStyleSheets and update --flyout-sticky-top var', () => {
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);
    const updateStickyTopCssVarStyleSheetSpy = jest.spyOn(flyoutUtilsUtils, 'updateStickyTopCssVarStyleSheet');

    addStickyTopCssVarStyleSheet(host);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(stickyTopCssVarStyleSheet).toBe(stylesheetMock);
    expect(host.shadowRoot.adoptedStyleSheets).toStrictEqual([stylesheetMock]);
    expect(updateStickyTopCssVarStyleSheetSpy).toHaveBeenCalledWith(0);
  });
});

describe('handleUpdateStickyTopCssVar()', () => {
  const callbackMock = jest.fn();
  let mockResizeObserver = new MockResizeObserver(callbackMock);
  let header;
  let stylesheetMock = {
    replaceSync: jest.fn(),
    insertRule: jest.fn(),
    deleteRule: jest.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => {
      return mockResizeObserver;
    });
    global.CSSStyleSheet = jest.fn().mockImplementation(() => {
      return stylesheetMock;
    });
    header = new MockHTMLElement();
  });

  it('should not do anything if getHasConstructableStylesheetSupport() returns false', () => {
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(false);
    const getStickyTopResizeObserverSpy = jest.spyOn(flyoutUtilsUtils, 'getStickyTopResizeObserver');
    const updateStickyTopCssVarStyleSheetSpy = jest.spyOn(flyoutUtilsUtils, 'updateStickyTopCssVarStyleSheet');

    handleUpdateStickyTopCssVar(true, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(getStickyTopResizeObserverSpy).not.toHaveBeenCalled();
    expect(updateStickyTopCssVarStyleSheetSpy).not.toHaveBeenCalled();
  });

  it('should create new resize observer and observe header if hasHeader true and resize observer undefined', () => {
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);
    const getStickyTopResizeObserverSpy = jest
      .spyOn(flyoutUtilsUtils, 'getStickyTopResizeObserver')
      .mockReturnValueOnce(mockResizeObserver);
    const observeSpy = jest.spyOn(mockResizeObserver, 'observe');

    handleUpdateStickyTopCssVar(true, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(getStickyTopResizeObserverSpy).toHaveBeenCalled();
    expect(observeSpy).toHaveBeenCalledWith(header);
  });

  it('should remove resize observer and reset stickyTopCssVar if hasHeader is false and resize observer exists', () => {
    Object.defineProperty(flyoutUtilsUtils, 'stickyTopCssVarResizeObserver', { value: mockResizeObserver });
    Object.defineProperty(flyoutUtilsUtils, 'stickyTopCssVarStyleSheet', { value: stylesheetMock });
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);

    const updateStickyTopCssVarStyleSheetSpy = jest.spyOn(flyoutUtilsUtils, 'updateStickyTopCssVarStyleSheet');
    const disconnectSpy = jest.spyOn(mockResizeObserver, 'disconnect');

    handleUpdateStickyTopCssVar(false, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(updateStickyTopCssVarStyleSheetSpy).toHaveBeenCalledWith(0);
    expect(disconnectSpy).toHaveBeenCalled();
    expect(stickyTopCssVarResizeObserver).toBeUndefined();
  });
});

describe('updateStickyTopCssVarStyleSheet()', () => {
  let stylesheetMock = {
    replaceSync: jest.fn(),
    insertRule: jest.fn(),
    deleteRule: jest.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    global.CSSStyleSheet = jest.fn().mockImplementation(() => {
      return stylesheetMock;
    });
  });

  it('should update stylesheet correctly', () => {
    Object.defineProperty(flyoutUtilsUtils, 'stickyTopCssVarStyleSheet', { value: stylesheetMock });
    const replaceSyncSpy = jest.spyOn(stylesheetMock, 'replaceSync');

    updateStickyTopCssVarStyleSheet(10);

    expect(replaceSyncSpy).toHaveBeenCalledWith(':host{--p-flyout-sticky-top:10px}');
  });
});

describe('getStickyTopResizeObserver()', () => {
  const callbackMock = jest.fn();
  let mockResizeObserver = new MockResizeObserver(callbackMock);

  beforeEach(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => {
      return mockResizeObserver;
    });
  });

  it('should return new resize observer instance', () => {
    const observer = getStickyTopResizeObserver();

    expect(observer).toBe(mockResizeObserver);
  });
});
