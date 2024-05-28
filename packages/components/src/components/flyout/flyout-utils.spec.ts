import * as flyoutUtilsUtils from './flyout-utils';
import {
  addUpdateStickyTopCssVar,
  handleUpdateStickyTopCssVar,
  removeUpdateStickyTopCssVar,
  StickyTopCssVarState,
} from './flyout-utils';
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

describe('handleUpdateStickyTopCssVar()', () => {
  const mockReturnValue: StickyTopCssVarState = { ro: new MockResizeObserver(jest.fn()), sheet: new CSSStyleSheet() };
  let host;
  let header;

  beforeEach(() => {
    global.ResizeObserver = MockResizeObserver;
    host = document.createElement('div');
    header = document.createElement('div');
    Object.defineProperty(flyoutUtilsUtils, 'stickyTopCssVarState', { value: undefined });
  });

  it('should call addUpdateStickyTopCssVar() and set stickyTopCssVarState if header true and stickyTopCssVarState undefined', () => {
    const addUpdateStickyTopCssVarSpy = jest
      .spyOn(flyoutUtilsUtils, 'addUpdateStickyTopCssVar')
      .mockReturnValueOnce(mockReturnValue);
    const removeUpdateStickyTopCssVar = jest.spyOn(flyoutUtilsUtils, 'removeUpdateStickyTopCssVar');

    handleUpdateStickyTopCssVar(host, true, header);

    expect(addUpdateStickyTopCssVarSpy).toHaveBeenCalledWith(host, header);
    expect(flyoutUtilsUtils.stickyTopCssVarState).toBe(mockReturnValue);
    expect(removeUpdateStickyTopCssVar).not.toHaveBeenCalled();
  });

  it('should call removeUpdateStickyTopCssVar() and set stickyTopCssVarState if header false and stickyTopCssVarState truthy', () => {
    const addUpdateStickyTopCssVarSpy = jest.spyOn(flyoutUtilsUtils, 'addUpdateStickyTopCssVar');
    const removeUpdateStickyTopCssVar = jest
      .spyOn(flyoutUtilsUtils, 'removeUpdateStickyTopCssVar')
      .mockReturnValueOnce();
    Object.defineProperty(flyoutUtilsUtils, 'stickyTopCssVarState', { value: mockReturnValue });

    handleUpdateStickyTopCssVar(host, false, header);

    expect(addUpdateStickyTopCssVarSpy).not.toHaveBeenCalled();
    expect(removeUpdateStickyTopCssVar).toHaveBeenCalledWith(host, mockReturnValue);
    expect(flyoutUtilsUtils.stickyTopCssVarState).toBeUndefined();
  });
});

class MockHTMLElement {
  constructor() {
    this.shadowRoot = { adoptedStyleSheets: [] } as DocumentOrShadowRoot;
  }
  shadowRoot: DocumentOrShadowRoot;
  getBoundingClientRect() {
    return { height: 100 };
  }
}

describe('addUpdateStickyTopCssVar()', () => {
  let host, header;
  const callbackMock = jest.fn();
  let mockResizeObserver = new MockResizeObserver(callbackMock);

  let stylesheetMock = {
    replaceSync: jest.fn(),
    insertRule: jest.fn(),
    deleteRule: jest.fn(),
    cssRules: [],
  };

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

  it('should create new stylesheet and push it into host.shadowRoot.adoptedStyleSheets', () => {
    const observeSpy = jest.spyOn(mockResizeObserver, 'observe');
    addUpdateStickyTopCssVar(host, header);

    expect(host.shadowRoot.adoptedStyleSheets.length).toBe(1);
    expect(host.shadowRoot.adoptedStyleSheets[0]).toBe(stylesheetMock);
    expect(observeSpy).toHaveBeenCalledWith(header);
  });

  it('should return an object containing ResizeObserver and CSSStyleSheet', () => {
    const result = addUpdateStickyTopCssVar(host, header);
    expect(result).toHaveProperty('ro');
    expect(result).toHaveProperty('sheet');
  });
});

describe('removeUpdateStickyTopCssVar()', () => {
  const callbackMock = jest.fn();
  let mockResizeObserver = new MockResizeObserver(callbackMock);
  let host;
  let stylesheetMock = {
    replaceSync: jest.fn(),
    insertRule: jest.fn(),
    deleteRule: jest.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;
  const mockReturnValue: StickyTopCssVarState = { ro: mockResizeObserver, sheet: stylesheetMock };

  beforeEach(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => {
      return mockResizeObserver;
    });
    global.CSSStyleSheet = jest.fn().mockImplementation(() => {
      return stylesheetMock;
    });
    host = new MockHTMLElement();
    Object.defineProperty(flyoutUtilsUtils, 'stickyTopCssVarState', { value: mockReturnValue });
    host.shadowRoot.adoptedStyleSheets.push(stylesheetMock);
  });

  it('should disconnect resize observer and remove stylesheet', () => {
    const disconnectSpy = jest.spyOn(mockResizeObserver, 'disconnect');

    expect(host.shadowRoot.adoptedStyleSheets.length).toBe(1);
    expect(host.shadowRoot.adoptedStyleSheets[0]).toBe(stylesheetMock);

    removeUpdateStickyTopCssVar(host, flyoutUtilsUtils.stickyTopCssVarState);

    expect(disconnectSpy).toHaveBeenCalled();
    expect(host.shadowRoot.adoptedStyleSheets.length).toBe(0);
  });
});
