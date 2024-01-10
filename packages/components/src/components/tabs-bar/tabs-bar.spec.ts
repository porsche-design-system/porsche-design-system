import { TabsBar } from './tabs-bar';
import * as tabsBarUtils from './tabs-bar-utils';
import * as jssUtils from '../../utils/jss';
import * as getShadowRootHTMLElementUtils from '../../utils/dom/getShadowRootHTMLElement';
import * as breakpointObserverUtils from '../../utils/breakpoint-observer';
import * as getOnlyChildrenOfKindHTMLElementOrThrowUtils from '../../utils/validation/getOnlyChildrenOfKindHTMLElementOrThrow';

const initComponent = (): TabsBar => {
  const component = new TabsBar();
  component.host = document.createElement('p-tabs-bar');
  return component;
};

describe('connectedCallback', () => {
  it('should call this.observeBreakpointChange()', () => {
    const component = initComponent();
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
    const component = initComponent();
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call sanitizeActiveTabIndex() with correct parameters', () => {
    const component = initComponent();
    component.activeTabIndex = 5;
    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledWith(5, 0);
    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentDidLoad', () => {
  it('should call this.scrollActiveTabIntoView() with correct parameter when activeTabIndex !== undefined', () => {
    const component = initComponent();
    component.activeTabIndex = 0;
    const spy = jest.spyOn(component, 'scrollActiveTabIntoView' as any).mockImplementation();
    jest
      .spyOn(getShadowRootHTMLElementUtils, 'getShadowRootHTMLElement')
      .mockReturnValue(document.createElement('slot'));

    component.componentDidLoad();
    expect(spy).toBeCalledWith(false);
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = initComponent();
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
    const component = initComponent();
    const spy = jest.spyOn(component, 'setAccessibilityAttributes' as any);

    component.render();
    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveBreakpointChange() with correct parameter', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    const component = initComponent();

    component.disconnectedCallback();
    expect(spy).toBeCalledWith(component.host);
  });
});

describe('this.activeTabIndexHandler()', () => {
  it('should call this.setTabElements', () => {
    const component = initComponent();
    const spy = jest.spyOn(component, 'setTabElements' as any);

    component.activeTabIndexHandler(0, null);
    expect(spy).toBeCalledWith();
    expect(spy).toBeCalledTimes(1);
  });

  it('should set this.direction to "next" if oldValue is smaller than this.internalTabIndex', () => {
    const component = initComponent();

    component.activeTabIndexHandler(0, 1);
    expect(component['direction']).toBe('prev');

    component['internalTabIndex'] = 2;
    jest.spyOn(component, 'setTabElements' as any).mockImplementation();

    component.activeTabIndexHandler(0, 1);
    expect(component['direction']).toBe('next');
  });

  it('should set this.direction to "next" if oldValue is undefined', () => {
    const component = initComponent();

    component.activeTabIndexHandler(0, 1);
    expect(component['direction']).toBe('prev');

    component.activeTabIndexHandler(0, undefined);
    expect(component['direction']).toBe('next');
  });

  it('should set this.direction to "prev" if oldValue is not smaller than this.internalTabIndex', () => {
    const component = initComponent();

    component.activeTabIndexHandler(0, undefined);
    expect(component['direction']).toBe('next');

    component['internalTabIndex'] = 1;

    component.activeTabIndexHandler(0, 2);
    expect(component['direction']).toBe('prev');
  });

  it('should call this.setBarStyle()', () => {
    const component = initComponent();
    const spy = jest.spyOn(component, 'setBarStyle' as any).mockImplementation();

    component.activeTabIndexHandler(0, undefined);
    expect(spy).toBeCalledWith();
  });

  it('should call this.scrollActiveTabIntoView()', () => {
    const component = initComponent();
    const spy = jest.spyOn(component, 'scrollActiveTabIntoView' as any).mockImplementation();

    component.activeTabIndexHandler(0, undefined);
    expect(spy).toBeCalledWith();
  });
});

describe('this.observeBreakpointChange()', () => {
  it('should not call observeBreakpointChange() if size is not BreakpointCustomizable ', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const component = initComponent();

    component['observeBreakpointChange']();
    expect(spy).not.toBeCalled();
  });

  it('should call observeBreakpointChange() if size is BreakpointCustomizable', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const component = initComponent();
    component.size = { base: 'small', m: 'medium' };

    component['observeBreakpointChange']();
    expect(spy).toBeCalledWith(component.host, expect.any(Function));
  });
});

describe('this.setTabElements()', () => {
  const getElements = (tag: 'a' | 'button'): HTMLElement[] =>
    Array.from(Array(3)).map((_, i) => {
      const el = document.createElement(tag);
      el.id = `${tag}-${i + 1}`;
      return el;
    });

  it('should call getOnlyChildrenOfKindHTMLElementOrThrow() with correct parameters', () => {
    const component = initComponent();
    const spy = jest.spyOn(getOnlyChildrenOfKindHTMLElementOrThrowUtils, 'getOnlyChildrenOfKindHTMLElementOrThrow');

    component['setTabElements']();
    expect(spy).toBeCalledWith(component.host, 'a,button');
  });

  it('should set this.tabElements', () => {
    const component = initComponent();
    const elements = getElements('a');
    jest
      .spyOn(getOnlyChildrenOfKindHTMLElementOrThrowUtils, 'getOnlyChildrenOfKindHTMLElementOrThrow')
      .mockReturnValue(elements);

    expect(component['tabElements']).toEqual([]);

    component['setTabElements']();
    expect(component['tabElements']).toEqual(elements);
  });

  it('should set this.areTabsButtons based on result of this.tabElements', () => {
    const component = initComponent();
    jest
      .spyOn(getOnlyChildrenOfKindHTMLElementOrThrowUtils, 'getOnlyChildrenOfKindHTMLElementOrThrow')
      .mockReturnValueOnce(getElements('a')) // 1st call
      .mockReturnValueOnce(getElements('button')); // 2nd call

    expect(component['areTabsButtons']).toBeUndefined();

    component['setTabElements']();
    expect(component['areTabsButtons']).toEqual(false);

    component['setTabElements']();
    expect(component['areTabsButtons']).toEqual(true);
  });

  it('should call sanitizeActiveTabIndex() with correct parameters', () => {
    const component = initComponent();
    component.activeTabIndex = 2;
    jest
      .spyOn(getOnlyChildrenOfKindHTMLElementOrThrowUtils, 'getOnlyChildrenOfKindHTMLElementOrThrow')
      .mockReturnValueOnce([])
      .mockReturnValueOnce(getElements('button'));

    const spy = jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex');

    component['setTabElements']();
    expect(spy).toBeCalledWith(component.activeTabIndex, 0);

    component['setTabElements']();
    expect(spy).toBeCalledWith(component.activeTabIndex, 3);
  });

  it('should set this.internalTabIndex based on result of sanitizeActiveTabIndex()', () => {
    const component = initComponent();
    jest.spyOn(tabsBarUtils, 'sanitizeActiveTabIndex').mockReturnValueOnce(0).mockReturnValueOnce(2);

    component['setTabElements']();
    expect(component['internalTabIndex']).toBe(0);

    component['setTabElements']();
    expect(component['internalTabIndex']).toBe(2);
  });
});
