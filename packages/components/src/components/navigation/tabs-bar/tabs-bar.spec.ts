import '../../../utils/match-media.mock';
import { TabsBar } from './tabs-bar';
import * as tabsBarUtils from './tabs-bar-utils';
import * as breakpointObserverUtils from '../../../utils/breakoint-observer';
import * as childrenObserverUtils from '../../../utils/children-observer';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('connectedCallback', () => {
  it('should call setTabElements()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.connectedCallback();

    expect(spy).toBeCalledWith();
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

  it('should not call observeBreakpointChange() if size is not BreakpointCustomizable ', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;
    component.connectedCallback();

    expect(spy).not.toBeCalled();
  });

  it('should call observeBreakpointChange() if size is BreakpointCustomizable', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const host = document.createElement('p-tabs-bar');
    const component = new TabsBar();
    component.host = host;
    component.size = "{base: 'small', m: 'medium'}";
    component.connectedCallback();

    expect(spy).toBeCalledWith(host, expect.any(Function));
  });
});

describe('componentDidLoad', () => {
  it('should call defineHTMLElements()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'defineHTMLElements' as any);
    const scroller = document.createElement('p-scroller');
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).toBeCalledWith();
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

  it('should call observeBreakpointChange() with correct parameters if size is BreakpointCustomizable', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const component = new TabsBar();
    const host = document.createElement('p-tabs-bar');
    const scroller = document.createElement('p-scroller');
    component.size = "{base: 'small', m: 'medium'}";
    component.host = host;
    component['scrollerElement'] = scroller;

    component.componentDidLoad();

    expect(spy).toBeCalledWith(host, expect.any(Function));
  });

  it('should not call observeBreakpointChange() if size is not BreakpointCustomizable', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
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

    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call setAccessibilityAttributes()', () => {
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
  it('should not call unobserveBreakpointChange() if size is not BreakpointCustomizable', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    const component = new TabsBar();

    component.disconnectedCallback();

    expect(spy).not.toBeCalled();
  });

  it('should call unobserveBreakpointChange() with correct parameter if size is BreakpointCustomizable', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    const component = new TabsBar();
    const host = document.createElement('p-tabs-bar');
    component.size = "{base: 'small', m: 'medium'}";
    component.host = host;

    component.disconnectedCallback();

    expect(spy).toBeCalledWith(host);
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
