import * as flyoutUtilsUtils from './flyout-utils';
import {
  addStickyTopCssVarStyleSheet,
  getStickyTopResizeObserver,
  handleUpdateStickyTopCssVar,
  stickyTopCssVarResizeObserverMap,
  stickyTopCssVarStyleSheetMap,
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
  const stylesheetMock = {
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
    expect(stickyTopCssVarStyleSheetMap.get(host)).toBeUndefined();
  });

  it('should create new stylesheet and push it into host.adoptedStyleSheets and update --flyout-sticky-top var', () => {
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);
    const updateStickyTopCssVarStyleSheetSpy = jest.spyOn(flyoutUtilsUtils, 'updateStickyTopCssVarStyleSheet');

    addStickyTopCssVarStyleSheet(host);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(stickyTopCssVarStyleSheetMap.get(host)).toBe(stylesheetMock);
    expect(host.shadowRoot.adoptedStyleSheets).toStrictEqual([stylesheetMock]);
    expect(updateStickyTopCssVarStyleSheetSpy).toHaveBeenCalledWith(host, 0);
  });
});

describe('handleUpdateStickyTopCssVar()', () => {
  let host;
  const callbackMock = jest.fn();
  const mockResizeObserver = new MockResizeObserver(callbackMock);
  let header;
  const stylesheetMock = {
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
    host = new MockHTMLElement();
    header = new MockHTMLElement();
  });

  it('should not do anything if getHasConstructableStylesheetSupport() returns false', () => {
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(false);
    const getStickyTopResizeObserverSpy = jest.spyOn(flyoutUtilsUtils, 'getStickyTopResizeObserver');
    const updateStickyTopCssVarStyleSheetSpy = jest.spyOn(flyoutUtilsUtils, 'updateStickyTopCssVarStyleSheet');

    handleUpdateStickyTopCssVar(host, true, header);

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

    handleUpdateStickyTopCssVar(host, true, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(getStickyTopResizeObserverSpy).toHaveBeenCalled();
    expect(observeSpy).toHaveBeenCalledWith(header);
  });

  it('should remove resize observer and reset stickyTopCssVar if hasHeader is false and resize observer exists', () => {
    stickyTopCssVarResizeObserverMap.set(host, mockResizeObserver);
    stickyTopCssVarStyleSheetMap.set(host, stylesheetMock);
    const getHasConstructableStylesheetSupportSpy = jest
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);

    const updateStickyTopCssVarStyleSheetSpy = jest.spyOn(flyoutUtilsUtils, 'updateStickyTopCssVarStyleSheet');
    const disconnectSpy = jest.spyOn(mockResizeObserver, 'disconnect');

    handleUpdateStickyTopCssVar(host, false, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(updateStickyTopCssVarStyleSheetSpy).toHaveBeenCalledWith(host, 0);
    expect(disconnectSpy).toHaveBeenCalled();
    expect(stickyTopCssVarResizeObserverMap.get(host)).toBeUndefined();
  });
});

describe('updateStickyTopCssVarStyleSheet()', () => {
  let host;
  const stylesheetMock = {
    replaceSync: jest.fn(),
    insertRule: jest.fn(),
    deleteRule: jest.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    host = new MockHTMLElement();
    global.CSSStyleSheet = jest.fn().mockImplementation(() => {
      return stylesheetMock;
    });
  });

  it('should update stylesheet correctly', () => {
    stickyTopCssVarStyleSheetMap.set(host, stylesheetMock);
    const replaceSyncSpy = jest.spyOn(stylesheetMock, 'replaceSync');

    updateStickyTopCssVarStyleSheet(host, 10);

    expect(replaceSyncSpy).toHaveBeenCalledWith(':host{--p-flyout-sticky-top:10px}');
  });
});

describe('getStickyTopResizeObserver()', () => {
  let host;
  const callbackMock = jest.fn();
  const mockResizeObserver = new MockResizeObserver(callbackMock);

  beforeEach(() => {
    host = new MockHTMLElement();
    global.ResizeObserver = jest.fn().mockImplementation(() => {
      return mockResizeObserver;
    });
  });

  it('should return new resize observer instance', () => {
    const observer = getStickyTopResizeObserver(host);

    expect(observer).toBe(mockResizeObserver);
  });
});
