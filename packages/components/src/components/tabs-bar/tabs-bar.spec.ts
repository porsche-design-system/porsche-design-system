import { TabsBar } from './tabs-bar';
import * as tabsBarUtils from './tabs-bar-utils';
import * as jssUtils from '../../utils/jss';
import * as breakpointObserverUtils from '../../utils/breakpoint-observer';

describe('connectedCallback', () => {
  it('should call this.setTabElements()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    const child1 = document.createElement('button');
    const child2 = document.createElement('button');
    component.host.append(child1, child2);
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.connectedCallback();
    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    const child1 = document.createElement('button');
    const child2 = document.createElement('button');
    component.host.append(child1, child2);
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.connectedCallback();
    expect(spy).toBeCalledWith();
  });
});

describe('componentDidLoad', () => {
  it('should call sanitizeActiveTabIndex() with correct parameters', () => {
    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex');
    const component = new TabsBar();
    component['scrollerElement'] = document.createElement('p-scroller');

    component.componentDidLoad();
    expect(spy).toBeCalledWith(undefined, 0);
  });

  it('should call this.scrollActiveTabIntoView() with correct parameter when activeTabIndex !== undefined', () => {
    const component = new TabsBar();
    component['tabElements'] = [document.createElement('div')];
    component.activeTabIndex = 0;
    const spy = jest.spyOn(component, 'scrollActiveTabIntoView' as any).mockImplementation();

    component.componentDidLoad();
    expect(spy).toBeCalledWith(false);
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    component['scrollerElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.componentDidLoad();
    expect(spy).toBeCalledWith();
  });
});

describe('render', () => {
  it('should call this.setAccessibilityAttributes()', () => {
    jest.spyOn(jssUtils, 'attachComponentCss').mockImplementation();
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    const spy = jest.spyOn(component, 'setAccessibilityAttributes' as any);

    component.render();
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

describe('this.activeTabIndexHandler()', () => {
  it('should reset this.activeTabIndex to undefined for null', () => {
    const component = new TabsBar();
    jest.spyOn(component, 'scrollActiveTabIntoView' as any).mockImplementation();

    component.activeTabIndexHandler(0, null);
    expect(component.activeTabIndex).toBe(undefined);
  });

  it('should call this.setBarStyle()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setBarStyle' as any).mockImplementation();
    jest.spyOn(component, 'scrollActiveTabIntoView' as any).mockImplementation();

    component.activeTabIndexHandler(0, undefined);
    expect(spy).toBeCalledWith();
  });

  it('should call this.scrollActiveTabIntoView()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'scrollActiveTabIntoView' as any).mockImplementation();

    component.activeTabIndexHandler(0, undefined);
    expect(spy).toBeCalledWith();
  });
});

describe('this.observeBreakpointChange()', () => {
  it('should not call observeBreakpointChange() if size is not BreakpointCustomizable ', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');

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
