import { TabsBar } from './tabs-bar';
import * as tabsBarUtils from './tabs-bar-utils';
import * as resizeObserverUtils from '../../../utils/resize-observer';
import * as childrenObserverUtils from '../../../utils/children-observer';
import { isResizeObserverDefined, useMutationObserverFallbackOverride } from '../../../utils';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

afterEach(() => {
  useMutationObserverFallbackOverride(!isResizeObserverDefined());
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

    expect(childrenObserverUtilsSpy).toBeCalledWith(host, expect.anything());
  });

  it('should not add resize event listener to window if ResizeObserver is available', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(resizeObserverUtils, 'observeWindowResize');

    component.connectedCallback();

    expect(component['contentObserver']).toBeUndefined();
    expect(spy).not.toBeCalled();
  });

  it('should add resize event listener to window if ResizeObserver is unavailable', () => {
    useMutationObserverFallbackOverride(true);

    const utilsSpy = jest.spyOn(resizeObserverUtils, 'mutationObserverFallback');

    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    component.connectedCallback();

    expect(utilsSpy).toBeCalledWith(component, expect.anything());
  });
});

describe('componentDidLoad', () => {
  it('should call defineHTMLElements()', () => {
    const spy = jest.spyOn(resizeObserverUtils, 'observeWindowResize');

    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).not.toBeCalled();
  });

  it('should call sanitizeActiveTabIndex()', () => {
    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex');
    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).toBeCalledWith(undefined, 0);
  });

  it('should call observeResize() with correct parameters if ResizeObserver is available', () => {
    const spy = jest.spyOn(resizeObserverUtils, 'observeResize');
    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component.host = document.createElement('p-tabs-bar');
    component.host.attachShadow({ mode: 'open' });
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).toBeCalledWith(scroller, expect.anything(), { box: 'border-box' });
  });
});

describe('componentDidRender', () => {
  it('should call setBarStyle() and scrollActiveTabIntoView() if ResizeObserver is unavailable', () => {
    useMutationObserverFallbackOverride(true);

    const component = new TabsBar();
    const spy1 = jest.spyOn(component, 'setBarStyle' as any);
    const spy2 = jest.spyOn(component, 'scrollActiveTabIntoView' as any);

    component.componentDidRender();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
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
  it('should remove resize event listener if ResizeObserver is unavailable', () => {
    useMutationObserverFallbackOverride(true);

    const utilsSpy = jest.spyOn(resizeObserverUtils, 'removeMutationObserverFallback');

    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    component.disconnectedCallback();

    expect(utilsSpy).toBeCalledWith(component);
  });

  it('should call unobserveResize() with correct parameter if ResizeObserver is available', () => {
    const spy = jest.spyOn(resizeObserverUtils, 'unobserveResize');
    const component = new TabsBar();
    component.disconnectedCallback();

    expect(spy).toBeCalledWith(undefined);
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
