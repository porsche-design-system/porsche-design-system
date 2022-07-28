import { TabsBar } from './tabs-bar';
import * as tabsBarUtils from './tabs-bar-utils';
import * as resizeObserverUtils from '../../../utils/resize-observer';
import * as childrenObserverUtils from '../../../utils/children-observer';
import { isResizeObserverDefined, useResizeObserverFallbackOverride } from '../../../utils/resize-observer';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

afterEach(() => {
  useResizeObserverFallbackOverride(!isResizeObserverDefined());
});

describe('connectedCallback', () => {
  it('should call setTabElements()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.connectedCallback();

    expect(spy).toBeCalledTimes(1);
  });

  it('should call observeChildren()', () => {
    const childrenObserverUtilsSpy = jest.spyOn(childrenObserverUtils, 'observeChildren');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;

    component.connectedCallback();

    expect(childrenObserverUtilsSpy).toBeCalledWith(host, expect.any(Function));
  });

  it('should not add resize event listener to window if ResizeObserver is available', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(resizeObserverUtils, 'observeWindowResize');

    component.connectedCallback();

    expect(component['contentObserver']).toBeUndefined();
    expect(spy).not.toBeCalled();
  });

  it('should not add resize event listener to window if size is not BreakpointCustomizable ', () => {
    const utilsSpy = jest.spyOn(resizeObserverUtils, 'resizeObserverFallback');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;
    component.connectedCallback();

    expect(utilsSpy).not.toBeCalled();
  });

  it('should add resize event listener to window if size is BreakpointCustomizable and ResizeObserver is unavailable', () => {
    const utilsSpy = jest.spyOn(resizeObserverUtils, 'resizeObserverFallback');
    useResizeObserverFallbackOverride(true);

    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;
    component.size = "{base: 'small', m: 'medium'}";
    component.connectedCallback();

    expect(utilsSpy).toBeCalledWith(host, expect.any(Function));
  });
});

describe('componentDidLoad', () => {
  it('should call defineHTMLElements()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'defineHTMLElements' as any);
    const scroller = document.createElement('p-scroller');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).toBeCalledTimes(1);
  });

  it('should call sanitizeActiveTabIndex()', () => {
    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex');
    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).toBeCalledWith(undefined, 0);
  });

  it('should call observeResize() with correct parameters if size is BreakpointCustomizable and ResizeObserver is available', () => {
    const spy = jest.spyOn(resizeObserverUtils, 'observeResize');
    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component.size = "{base: 'small', m: 'medium'}";
    component.host = document.createElement('p-tabs-bar');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).toBeCalledWith(scroller, expect.any(Function), { box: 'border-box' });
  });

  it('should not call observeResize() if size is not BreakpointCustomizable', () => {
    const spy = jest.spyOn(resizeObserverUtils, 'observeResize');
    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).not.toBeCalled();
  });
});

describe('componentDidRender', () => {
  it('should call setBarStyle()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setBarStyle' as any);

    component.componentDidRender();

    expect(spy).toBeCalledTimes(1);
  });

  it('should call setAccessibilityAttributes()', () => {
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;
    const spy1 = jest.spyOn(component, 'setAccessibilityAttributes' as any);

    component.componentDidRender();

    expect(spy1).toBeCalledTimes(1);
  });
});

describe('disconnectedCallback', () => {
  // it('should remove resize event listener if size is BreakpointCustomizable and ResizeObserver is unavailable', () => {
  //   useResizeObserverFallbackOverride(true);
  //
  //   const utilsSpy = jest.spyOn(resizeObserverUtils, 'removeResizeObserverFallback');
  //
  //   const component = new TabsBar();
  //   component.host = document.createElement('p-tabs-bar');
  //   component.size = "{base: 'small', m: 'medium'}";
  //   component.disconnectedCallback();
  //
  //   expect(utilsSpy).toBeCalledWith(component.host);
  // });
  //
  // it('should not remove resize event listener if size is not BreakpointCustomizable', () => {
  //   useResizeObserverFallbackOverride(true);
  //
  //   const utilsSpy = jest.spyOn(resizeObserverUtils, 'removeResizeObserverFallback');
  //
  //   const component = new TabsBar();
  //   component.host = document.createElement('p-tabs-bar');
  //   component.size = "{base: 'small', m: 'medium'}";
  //   component.disconnectedCallback();
  //
  //   expect(utilsSpy).toBeCalledWith(component.host);
  // });

  it('should not call unobserveResize() if size is not BreakpointCustomizable', () => {
    const spy = jest.spyOn(resizeObserverUtils, 'unobserveResize');
    const component = new TabsBar();

    component.disconnectedCallback();

    expect(spy).not.toBeCalled();
  });

  it('should call unobserveResize() with correct parameter if size is BreakpointCustomizable and ResizeObserver is available', () => {
    const spy = jest.spyOn(resizeObserverUtils, 'unobserveResize');
    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component.size = "{base: 'small', m: 'medium'}";
    component.host = document.createElement('p-tabs-bar');
    component.host.attachShadow({ mode: 'open' });
    component['scrollerElement'] = scroller;

    component.disconnectedCallback();

    expect(spy).toBeCalledWith(scroller);
  });

  it('should call unobserveChildren()', () => {
    const childrenObserverUtilsSpy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;

    component.disconnectedCallback();

    expect(childrenObserverUtilsSpy).toBeCalledWith(host);
  });
});
