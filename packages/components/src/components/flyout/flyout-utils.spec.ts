import { beforeEach, vi } from 'vitest';
import * as jssUtils from './../../utils/jss';
import * as flyoutUtilsUtils from './flyout-utils';

class MockResizeObserver {
  constructor(callback: any) {
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
  let host: any;
  const stylesheetMock = {
    replaceSync: vi.fn(),
    insertRule: vi.fn(),
    deleteRule: vi.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    vi.clearAllMocks();
    global.CSSStyleSheet = vi.fn().mockImplementation(() => {
      return stylesheetMock;
    });
    host = new MockHTMLElement();
  });

  it('should not do anything if getHasConstructableStylesheetSupport() returns false', () => {
    const getHasConstructableStylesheetSupportSpy = vi
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(false);

    flyoutUtilsUtils.addStickyTopCssVarStyleSheet(host);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(flyoutUtilsUtils.stickyTopCssVarStyleSheetMap.get(host)).toBeUndefined();
  });

  it('should create new stylesheet and push it into host.adoptedStyleSheets and update --flyout-sticky-top var', () => {
    const getHasConstructableStylesheetSupportSpy = vi
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);

    flyoutUtilsUtils.addStickyTopCssVarStyleSheet(host);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(flyoutUtilsUtils.stickyTopCssVarStyleSheetMap.get(host)).toBe(stylesheetMock);
    expect(host.shadowRoot.adoptedStyleSheets).toStrictEqual([stylesheetMock]);

    expect(stylesheetMock.replaceSync).toHaveBeenCalledWith(':host{--p-flyout-sticky-top:0px}');
  });
});

describe('handleUpdateStickyTopCssVar()', () => {
  let host: any;
  const callbackMock = vi.fn();
  const mockResizeObserver = new MockResizeObserver(callbackMock);
  let header: any;
  const stylesheetMock = {
    replaceSync: vi.fn(),
    insertRule: vi.fn(),
    deleteRule: vi.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    vi.clearAllMocks();
    global.ResizeObserver = vi.fn().mockImplementation(() => {
      return mockResizeObserver;
    });
    global.CSSStyleSheet = vi.fn().mockImplementation(() => {
      return stylesheetMock;
    });
    host = new MockHTMLElement();
    header = new MockHTMLElement();
  });

  it('should not do anything if getHasConstructableStylesheetSupport() returns false', () => {
    const getHasConstructableStylesheetSupportSpy = vi
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(false);
    const getStickyTopResizeObserverSpy = vi.spyOn(flyoutUtilsUtils, 'getStickyTopResizeObserver');

    flyoutUtilsUtils.handleUpdateStickyTopCssVar(host, true, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(getStickyTopResizeObserverSpy).not.toHaveBeenCalled();
    // Instead of checking if updateStickyTopCssVarStyleSheet was called,
    // verify that replaceSync was NOT called
    expect(stylesheetMock.replaceSync).not.toHaveBeenCalled();
  });

  it('should create new resize observer and observe header if hasHeader true and resize observer undefined', () => {
    const getHasConstructableStylesheetSupportSpy = vi
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);
    const observeSpy = vi.spyOn(mockResizeObserver, 'observe');

    flyoutUtilsUtils.handleUpdateStickyTopCssVar(host, true, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();

    // Instead of checking if getStickyTopResizeObserver was called,
    // verify that a ResizeObserver was created and stored
    expect(flyoutUtilsUtils.stickyTopCssVarResizeObserverMap.has(host)).toBe(true);
    expect(flyoutUtilsUtils.stickyTopCssVarResizeObserverMap.get(host)).toBe(mockResizeObserver);

    expect(observeSpy).toHaveBeenCalledWith(header);
  });

  it('should remove resize observer and reset stickyTopCssVar if hasHeader is false and resize observer exists', () => {
    flyoutUtilsUtils.stickyTopCssVarResizeObserverMap.set(host, mockResizeObserver);
    flyoutUtilsUtils.stickyTopCssVarStyleSheetMap.set(host, stylesheetMock);

    const getHasConstructableStylesheetSupportSpy = vi
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);
    const disconnectSpy = vi.spyOn(mockResizeObserver, 'disconnect');

    flyoutUtilsUtils.handleUpdateStickyTopCssVar(host, false, header);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    // Instead of checking if updateStickyTopCssVarStyleSheet was called,
    // verify that the stylesheet was reset with 0px
    expect(stylesheetMock.replaceSync).toHaveBeenCalledWith(':host{--p-flyout-sticky-top:0px}');
    expect(disconnectSpy).toHaveBeenCalled();
    expect(flyoutUtilsUtils.stickyTopCssVarResizeObserverMap.get(host)).toBeUndefined();
  });
});

describe('updateStickyTopCssVarStyleSheet()', () => {
  let host: any;
  const stylesheetMock = {
    replaceSync: vi.fn(),
    insertRule: vi.fn(),
    deleteRule: vi.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    vi.clearAllMocks();
    host = new MockHTMLElement();
    global.CSSStyleSheet = vi.fn().mockImplementation(() => {
      return stylesheetMock;
    });
  });

  it('should update stylesheet correctly', () => {
    flyoutUtilsUtils.stickyTopCssVarStyleSheetMap.set(host, stylesheetMock);

    flyoutUtilsUtils.updateStickyTopCssVarStyleSheet(host, 10);

    expect(stylesheetMock.replaceSync).toHaveBeenCalledWith(':host{--p-flyout-sticky-top:10px}');
  });
});

describe('getStickyTopResizeObserver()', () => {
  let host: any;
  const callbackMock = vi.fn();
  const mockResizeObserver = new MockResizeObserver(callbackMock);

  beforeEach(() => {
    vi.clearAllMocks();
    host = new MockHTMLElement();
    global.ResizeObserver = vi.fn().mockImplementation(() => {
      return mockResizeObserver;
    });
  });

  it('should return new resize observer instance', () => {
    const observer = flyoutUtilsUtils.getStickyTopResizeObserver(host);

    expect(observer).toBe(mockResizeObserver);
  });
});
