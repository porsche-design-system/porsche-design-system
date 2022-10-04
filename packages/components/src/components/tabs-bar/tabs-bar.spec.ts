import { TabsBar } from './tabs-bar';
import * as tabsBarUtils from './tabs-bar-utils';
import * as breakpointObserverUtils from '../../utils/breakpoint-observer';
import * as childrenObserverUtils from '../../utils/children-observer';

jest.mock('../../utils/dom');
jest.mock('../../utils/slotted-styles');

describe('connectedCallback', () => {
  it('should call this.setTabElements()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.connectedCallback();

    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call observeChildren() with correct parameters', () => {
    const childrenObserverUtilsSpy = jest.spyOn(childrenObserverUtils, 'observeChildren');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;

    component.connectedCallback();

    expect(childrenObserverUtilsSpy).toBeCalledWith(host, expect.any(Function));
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.connectedCallback();
    expect(spy).toBeCalledWith();
  });
});

describe('componentDidLoad', () => {
  it('should call sanitizeActiveTabIndex() with correct parameters', () => {
    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex');
    const component = new TabsBar();
    const scroller = document.createElement('p-scroller');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();
    expect(spy).toBeCalledWith(undefined, 0);
  });

  it('should call this.addEventListeners()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    component['scrollerElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(component, 'addEventListeners' as any);

    component.componentDidLoad();
    expect(spy).toBeCalledWith();
  });
  it('should call this.observeBreakpointChange()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    component['scrollerElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.componentDidLoad();
    expect(spy).toBeCalledWith();
  });
  it('should call this.setBarStyle()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    component['scrollerElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(component, 'setBarStyle' as any);

    component.componentDidLoad();
    expect(spy).toBeCalledWith();
  });
});

describe('componentDidRender', () => {
  it('should call this.setBarStyle()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setBarStyle' as any);

    component.componentDidRender();
    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call this.setAccessibilityAttributes()', () => {
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;
    const spy = jest.spyOn(component, 'setAccessibilityAttributes' as any);

    component.componentDidRender();

    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveBreakpointChange() with correct parameter ', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    const component = new TabsBar();
    const host = document.createElement('p-tabs-bar');
    component.host = host;

    component.disconnectedCallback();
    expect(spy).toBeCalledWith(host);
  });
});

describe('this.observeBreakpointChange()', () => {
  it('should not call observeBreakpointChange() if size is not BreakpointCustomizable ', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;

    component['observeBreakpointChange']();
    expect(spy).not.toBeCalled();
  });

  it('should call observeBreakpointChange() if size is BreakpointCustomizable', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;
    component.size = { base: 'small', m: 'medium' };

    component['observeBreakpointChange']();
    expect(spy).toBeCalledWith(host, expect.any(Function));
  });
});
