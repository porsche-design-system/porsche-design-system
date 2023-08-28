import { TabsBar } from './tabs-bar';
import * as tabsBarUtils from './tabs-bar-utils';
import * as jssUtils from '../../utils/jss';
import * as getShadowRootHTMLElementUtils from '../../utils/dom/getShadowRootHTMLElement';
import * as breakpointObserverUtils from '../../utils/breakpoint-observer';

describe('connectedCallback', () => {
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

describe('componentWillLoad', () => {
  it('should call this.setTabElements()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call sanitizeActiveTabIndex() with correct parameters', () => {
    const component = new TabsBar();
    component.activeTabIndex = 5;
    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledWith(5, 0);
    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentDidLoad', () => {
  it('should call this.scrollActiveTabIntoView() with correct parameter when activeTabIndex !== undefined', () => {
    const component = new TabsBar();
    component.activeTabIndex = 0;
    const spy = jest.spyOn(component, 'scrollActiveTabIntoView' as any).mockImplementation();
    jest
      .spyOn(getShadowRootHTMLElementUtils, 'getShadowRootHTMLElement')
      .mockReturnValue(document.createElement('slot'));

    component.componentDidLoad();
    expect(spy).toBeCalledWith(false);
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = new TabsBar();
    component.host = document.createElement('p-tabs-bar');
    component['scrollerElement'] = document.createElement('p-scroller');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);
    jest
      .spyOn(getShadowRootHTMLElementUtils, 'getShadowRootHTMLElement')
      .mockReturnValue(document.createElement('slot'));

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
  it('should call unobserveBreakpointChange() with correct parameter', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    const component = new TabsBar();
    const host = document.createElement('p-tabs-bar');
    component.host = host;

    component.disconnectedCallback();
    expect(spy).toBeCalledWith(host);
  });
});

describe('this.activeTabIndexHandler()', () => {
  it('should call this.setTabElements', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.activeTabIndexHandler(0, null);
    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call this.sanitizeActiveTabIndex() with correct parameters', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex' as any);

    component.activeTabIndexHandler(2, null);
    expect(spy).toBeCalledWith(2, 0);
    expect(spy).toBeCalledTimes(1);
  });

  // TODO: missing
  xit('should set this.direction', () => {});

  it('should call this.setBarStyle()', () => {
    const component = new TabsBar();
    const spy = jest.spyOn(component, 'setBarStyle' as any).mockImplementation();

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
    const component = new TabsBar();
    const host = document.createElement('p-tabs-bar');
    component.host = host;
    component.size = { base: 'small', m: 'medium' };

    component['observeBreakpointChange']();
    expect(spy).toBeCalledWith(host, expect.any(Function));
  });
});
