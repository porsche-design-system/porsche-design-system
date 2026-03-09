import { TabsBar } from './tabs-bar';

const initComponent = (): TabsBar => {
  const component = new TabsBar();
  component.host = document.createElement('p-tabs-bar');
  return component;
};

const appendChildren = (host: HTMLElement, tag: 'a' | 'button', count = 3): HTMLElement[] => {
  return Array.from({ length: count }, (_, i) => {
    const el = document.createElement(tag);
    el.id = `${tag}-${i + 1}`;
    el.scrollIntoView = vi.fn();
    host.appendChild(el);
    return el;
  });
};

describe('defineTabs()', () => {
  it('should identify link children as tabs', () => {
    const component = initComponent();
    const elements = appendChildren(component.host, 'a');

    component['defineTabs']();

    expect(component['tabs']).toEqual(elements);
    expect(component['isTabList']).toBe(false);
  });

  it('should identify button children as tab list', () => {
    const component = initComponent();
    const elements = appendChildren(component.host, 'button');

    component['defineTabs']();

    expect(component['tabs']).toEqual(elements);
    expect(component['isTabList']).toBe(true);
  });

  it('should throw when children are of mixed types', () => {
    const component = initComponent();
    component.host.appendChild(document.createElement('a'));
    component.host.appendChild(document.createElement('button'));

    expect(() => component['defineTabs']()).toThrow();
  });
});

describe('slotchange listener', () => {
  beforeEach(() => {
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
  });

  const initComponentWithSlot = (
    activeTabIndex?: number
  ): { component: TabsBar; tabs: HTMLElement[]; slot: HTMLSlotElement } => {
    const component = initComponent();
    component.activeTabIndex = activeTabIndex;
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();
    component['scroller'] = document.createElement('div');
    const slot = document.createElement('slot') as HTMLSlotElement;
    component['slot'] = slot;
    return { component, tabs, slot };
  };

  it('should re-identify tabs on slotchange', () => {
    const { component, slot } = initComponentWithSlot(0);

    component.componentDidLoad();

    // add a new button child
    const newButton = document.createElement('button');
    newButton.scrollIntoView = vi.fn();
    component.host.appendChild(newButton);

    slot.dispatchEvent(new Event('slotchange'));

    expect(component['tabs']).toHaveLength(4);
    expect(component['tabs'][3]).toBe(newButton);
  });

  it('should scroll active tab into view on slotchange', () => {
    const { component, tabs, slot } = initComponentWithSlot(1);

    component.componentDidLoad();
    (tabs[1].scrollIntoView as ReturnType<typeof vi.fn>).mockClear();

    slot.dispatchEvent(new Event('slotchange'));

    expect(tabs[1].scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'instant', inline: 'center' })
    );
  });

  it('should not react to slotchange after disconnectedCallback', () => {
    const { component, tabs, slot } = initComponentWithSlot(1);

    component.componentDidLoad();
    component.disconnectedCallback();

    for (const tab of tabs) {
      (tab.scrollIntoView as ReturnType<typeof vi.fn>).mockClear();
    }

    // add a new child and dispatch slotchange
    const newButton = document.createElement('button');
    newButton.scrollIntoView = vi.fn();
    component.host.appendChild(newButton);

    slot.dispatchEvent(new Event('slotchange'));

    // tabs should not have been re-identified (still 3, not 4)
    expect(component['tabs']).toHaveLength(3);
    // no scrollIntoView calls
    for (const tab of tabs) {
      expect(tab.scrollIntoView).not.toHaveBeenCalled();
    }
  });
});

describe('activeTabIndexHandler()', () => {
  const initComponentForHandler = (): { component: TabsBar; tabs: HTMLElement[]; bar: HTMLElement } => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();
    component['scroller'] = document.createElement('div');
    const bar = document.createElement('span');
    bar.animate = vi.fn();
    component['bar'] = bar;
    return { component, tabs, bar };
  };

  it('should scroll the new active tab into view with smooth behavior', () => {
    const { component, tabs } = initComponentForHandler();

    component.activeTabIndexHandler(2, 0);

    expect(tabs[2].scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth', inline: 'center' })
    );
  });

  it('should not scroll any tab when new index is out of range', () => {
    const { component, tabs } = initComponentForHandler();

    component.activeTabIndexHandler(5, 0);

    for (const tab of tabs) {
      expect(tab.scrollIntoView).not.toHaveBeenCalled();
    }
  });

  it('should animate the bar element', () => {
    const { component, bar } = initComponentForHandler();

    component.activeTabIndexHandler(1, 0);

    expect(bar.animate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ transform: expect.any(String), width: expect.any(String) }),
        expect.objectContaining({ transform: expect.any(String), width: expect.any(String) }),
      ]),
      expect.objectContaining({ duration: expect.any(Number), easing: expect.any(String) })
    );
  });

  it('should not animate the bar when both indices are out of range', () => {
    const { component, bar } = initComponentForHandler();

    component.activeTabIndexHandler(5, 10);

    expect(bar.animate).not.toHaveBeenCalled();
  });
});

describe('resizeObserver', () => {
  let resizeCallback: ResizeObserverCallback;
  const mockDisconnect = vi.fn();
  const mockObserve = vi.fn();

  beforeEach(() => {
    global.ResizeObserver = vi.fn().mockImplementation((callback: ResizeObserverCallback) => {
      resizeCallback = callback;
      return { observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() };
    });
  });

  const initComponentWithTabs = (activeTabIndex?: number): { component: TabsBar; tabs: HTMLElement[] } => {
    const component = initComponent();
    component.activeTabIndex = activeTabIndex;
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();
    // simulate scroller ref being set during render
    component['scroller'] = document.createElement('div');
    // simulate slot ref being set during render
    component['slot'] = document.createElement('slot') as HTMLSlotElement;
    return { component, tabs };
  };

  it('should scroll active tab into view on resize', () => {
    const { component, tabs } = initComponentWithTabs(1);

    component.componentDidLoad();
    resizeCallback([] as any, {} as any);

    expect(tabs[1].scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'instant', inline: 'center' })
    );
  });

  it('should not scroll any tab into view on resize when activeTabIndex is undefined', () => {
    const { component, tabs } = initComponentWithTabs(undefined);

    component.componentDidLoad();
    resizeCallback([] as any, {} as any);

    for (const tab of tabs) {
      expect(tab.scrollIntoView).not.toHaveBeenCalled();
    }
  });

  it('should observe the scroller element', () => {
    const { component } = initComponentWithTabs(0);

    component.componentDidLoad();

    expect(mockObserve).toHaveBeenCalledWith(component['scroller']);
  });

  it('should disconnect on disconnectedCallback', () => {
    const { component } = initComponentWithTabs(0);

    component.componentDidLoad();
    component.disconnectedCallback();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});

describe('setAccessibilityAttributes()', () => {
  it('should set role="tab", tabindex, and aria-selected on button children', () => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();
    component.activeTabIndex = 1;

    component['setAccessibilityAttributes']();

    expect(tabs[0].getAttribute('role')).toBe('tab');
    expect(tabs[0].getAttribute('tabindex')).toBe('-1');
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');

    expect(tabs[1].getAttribute('role')).toBe('tab');
    expect(tabs[1].getAttribute('tabindex')).toBe('0');
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');

    expect(tabs[2].getAttribute('role')).toBe('tab');
    expect(tabs[2].getAttribute('tabindex')).toBe('-1');
    expect(tabs[2].getAttribute('aria-selected')).toBe('false');
  });

  it('should set tabindex="0" on first button when activeTabIndex is undefined', () => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();
    component.activeTabIndex = undefined;

    component['setAccessibilityAttributes']();

    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    expect(tabs[1].getAttribute('tabindex')).toBe('-1');
    expect(tabs[2].getAttribute('tabindex')).toBe('-1');
  });

  it('should set aria-current on link children instead of role and aria-selected', () => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'a');
    component['defineTabs']();
    component.activeTabIndex = 2;

    component['setAccessibilityAttributes']();

    expect(tabs[0].hasAttribute('role')).toBe(false);
    expect(tabs[0].getAttribute('aria-current')).toBe('false');

    expect(tabs[1].hasAttribute('role')).toBe(false);
    expect(tabs[1].getAttribute('aria-current')).toBe('false');

    expect(tabs[2].hasAttribute('role')).toBe(false);
    expect(tabs[2].getAttribute('aria-current')).toBe('true');
  });

  it('should set aria-current="false" on all links when activeTabIndex is undefined', () => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'a');
    component['defineTabs']();
    component.activeTabIndex = undefined;

    component['setAccessibilityAttributes']();

    for (const tab of tabs) {
      expect(tab.getAttribute('aria-current')).toBe('false');
    }
  });

  it('should set aria-selected="false" on all buttons when activeTabIndex is out of range', () => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();
    component.activeTabIndex = 5;

    component['setAccessibilityAttributes']();

    for (const tab of tabs) {
      expect(tab.getAttribute('aria-selected')).toBe('false');
    }
  });

  it('should update attributes correctly when activeTabIndex changes', () => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();

    component.activeTabIndex = 0;
    component['setAccessibilityAttributes']();

    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');

    component.activeTabIndex = 2;
    component['setAccessibilityAttributes']();

    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[0].getAttribute('tabindex')).toBe('-1');
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(tabs[2].getAttribute('tabindex')).toBe('0');
  });
});

describe('onClick()', () => {
  const initComponentForClick = (): { component: TabsBar; tabs: HTMLElement[] } => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'button');
    component['defineTabs']();
    component.update = { emit: vi.fn() } as any;
    return { component, tabs };
  };

  it('should emit update event with correct activeTabIndex when a tab is clicked', () => {
    const { component, tabs } = initComponentForClick();

    component['onClick']({ target: tabs[2] } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 2 });
  });

  it('should emit update event when a nested element inside a tab is clicked', () => {
    const { component, tabs } = initComponentForClick();
    const nestedSpan = document.createElement('span');
    tabs[1].appendChild(nestedSpan);

    component['onClick']({ target: nestedSpan } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('should not emit update event when clicking outside of tabs', () => {
    const { component } = initComponentForClick();
    const outsideElement = document.createElement('div');

    component['onClick']({ target: outsideElement } as unknown as MouseEvent);

    expect(component.update.emit).not.toHaveBeenCalled();
  });

  it('should emit update event for link children', () => {
    const component = initComponent();
    const tabs = appendChildren(component.host, 'a');
    component['defineTabs']();
    component.update = { emit: vi.fn() } as any;

    component['onClick']({ target: tabs[0] } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });

  it('should emit correct index when a deeply nested element is clicked', () => {
    const { component, tabs } = initComponentForClick();
    const nestedSpan = document.createElement('span');
    const deepFont = document.createElement('font');
    nestedSpan.appendChild(deepFont);
    tabs[2].appendChild(nestedSpan);

    component['onClick']({ target: deepFont } as unknown as MouseEvent);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 2 });
  });
});

describe('onKeydown()', () => {
  const initComponentForKeydown = (
    tag: 'a' | 'button',
    opts: { hasPTabsParent?: boolean; activeTabIndex?: number } = {}
  ): { component: TabsBar; tabs: HTMLElement[] } => {
    const component = initComponent();
    const tabs = appendChildren(component.host, tag);
    component['defineTabs']();
    component.update = { emit: vi.fn() } as any;
    component['hasPTabsParent'] = opts.hasPTabsParent ?? false;
    component.activeTabIndex = opts.activeTabIndex;

    // mock focus for buttons
    for (const tab of tabs) {
      tab.focus = vi.fn();
    }

    return { component, tabs };
  };

  const createKeyboardEvent = (key: string, target: HTMLElement): KeyboardEvent & { target: HTMLElement } => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    Object.defineProperty(event, 'target', { value: target });
    event.preventDefault = vi.fn();
    return event as KeyboardEvent & { target: HTMLElement };
  };

  it('should focus next button on ArrowRight', () => {
    const { component, tabs } = initComponentForKeydown('button');
    // simulate first tab as the active element
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('ArrowRight', tabs[0]);
    component['onKeydown'](event);

    expect(tabs[1].focus).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should focus previous button on ArrowLeft', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[1], configurable: true });

    const event = createKeyboardEvent('ArrowLeft', tabs[1]);
    component['onKeydown'](event);

    expect(tabs[0].focus).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should wrap around to last button on ArrowLeft from first', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('ArrowLeft', tabs[0]);
    component['onKeydown'](event);

    expect(tabs[2].focus).toHaveBeenCalled();
  });

  it('should wrap around to first button on ArrowRight from last', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[2], configurable: true });

    const event = createKeyboardEvent('ArrowRight', tabs[2]);
    component['onKeydown'](event);

    expect(tabs[0].focus).toHaveBeenCalled();
  });

  it('should focus first button on Home', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[2], configurable: true });

    const event = createKeyboardEvent('Home', tabs[2]);
    component['onKeydown'](event);

    expect(tabs[0].focus).toHaveBeenCalled();
  });

  it('should focus last button on End', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('End', tabs[0]);
    component['onKeydown'](event);

    expect(tabs[2].focus).toHaveBeenCalled();
  });

  it('should emit update event on ArrowRight when hasPTabsParent is true', () => {
    const { component, tabs } = initComponentForKeydown('button', { hasPTabsParent: true, activeTabIndex: 0 });

    const event = createKeyboardEvent('ArrowRight', tabs[0]);
    component['onKeydown'](event);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('should not emit update event on ArrowRight when hasPTabsParent is false', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('ArrowRight', tabs[0]);
    component['onKeydown'](event);

    expect(component.update.emit).not.toHaveBeenCalled();
  });

  it('should preventDefault for link targets on ArrowRight', () => {
    const { component, tabs } = initComponentForKeydown('a');
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('ArrowRight', tabs[0]);
    component['onKeydown'](event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not focus tabs on arrow keys for link children', () => {
    const { component, tabs } = initComponentForKeydown('a');
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('ArrowRight', tabs[0]);
    component['onKeydown'](event);

    // links are not focused programmatically, only buttons are
    for (const tab of tabs) {
      expect(tab.focus).not.toHaveBeenCalled();
    }
  });

  it('should temporarily remove tabindex on Tab key for button target', () => {
    vi.useFakeTimers();
    const { component, tabs } = initComponentForKeydown('button');
    tabs[0].tabIndex = 0;

    const event = createKeyboardEvent('Tab', tabs[0]);
    component['onKeydown'](event);

    expect(tabs[0].getAttribute('tabindex')).toBeNull();

    vi.advanceTimersByTime(0);

    expect(tabs[0].tabIndex).toBe(0);
    vi.useRealTimers();
  });

  it('should not modify tabindex on Tab key for link target', () => {
    const { component, tabs } = initComponentForKeydown('a');
    tabs[0].setAttribute('tabindex', '0');

    const event = createKeyboardEvent('Tab', tabs[0]);
    component['onKeydown'](event);

    expect(tabs[0].getAttribute('tabindex')).toBe('0');
  });

  it('should not react to unhandled keys', () => {
    const { component, tabs } = initComponentForKeydown('button');

    const event = createKeyboardEvent('Enter', tabs[0]);
    component['onKeydown'](event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    for (const tab of tabs) {
      expect(tab.focus).not.toHaveBeenCalled();
    }
  });

  it('should handle legacy "Left" key name', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[1], configurable: true });

    const event = createKeyboardEvent('Left', tabs[1]);
    component['onKeydown'](event);

    expect(tabs[0].focus).toHaveBeenCalled();
  });

  it('should handle legacy "Right" key name', () => {
    const { component, tabs } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('Right', tabs[0]);
    component['onKeydown'](event);

    expect(tabs[1].focus).toHaveBeenCalled();
  });

  it('should emit update event on Home when hasPTabsParent is true', () => {
    const { component, tabs } = initComponentForKeydown('button', { hasPTabsParent: true, activeTabIndex: 2 });

    const event = createKeyboardEvent('Home', tabs[2]);
    component['onKeydown'](event);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });

  it('should emit update event on End when hasPTabsParent is true', () => {
    const { component, tabs } = initComponentForKeydown('button', { hasPTabsParent: true, activeTabIndex: 0 });

    const event = createKeyboardEvent('End', tabs[0]);
    component['onKeydown'](event);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 2 });
  });

  it('should emit update event on ArrowLeft when hasPTabsParent is true', () => {
    const { component, tabs } = initComponentForKeydown('button', { hasPTabsParent: true, activeTabIndex: 1 });

    const event = createKeyboardEvent('ArrowLeft', tabs[1]);
    component['onKeydown'](event);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });

  it('should use activeTabIndex when hasPTabsParent is true instead of document.activeElement', () => {
    const { component, tabs } = initComponentForKeydown('button', { hasPTabsParent: true, activeTabIndex: 2 });
    // even though document.activeElement is tabs[0], hasPTabsParent should use activeTabIndex (2)
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const event = createKeyboardEvent('ArrowLeft', tabs[0]);
    component['onKeydown'](event);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('should default to index 0 when hasPTabsParent is true and activeTabIndex is undefined', () => {
    const { component, tabs } = initComponentForKeydown('button', { hasPTabsParent: true, activeTabIndex: undefined });

    const event = createKeyboardEvent('ArrowRight', tabs[0]);
    component['onKeydown'](event);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('should not preventDefault when target is a non-button/non-link element', () => {
    const { component } = initComponentForKeydown('button');
    Object.defineProperty(document, 'activeElement', { value: document.createElement('button'), configurable: true });
    const scrollerDiv = document.createElement('div');

    const event = createKeyboardEvent('ArrowRight', scrollerDiv);
    component['onKeydown'](event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should preventDefault for link targets on Home and End', () => {
    const { component, tabs } = initComponentForKeydown('a');
    Object.defineProperty(document, 'activeElement', { value: tabs[0], configurable: true });

    const homeEvent = createKeyboardEvent('Home', tabs[2]);
    component['onKeydown'](homeEvent);
    expect(homeEvent.preventDefault).toHaveBeenCalled();

    const endEvent = createKeyboardEvent('End', tabs[0]);
    component['onKeydown'](endEvent);
    expect(endEvent.preventDefault).toHaveBeenCalled();
  });
});

describe('componentShouldUpdate()', () => {
  it('should return false when new and old values are the same', () => {
    const component = initComponent();

    expect(component.componentShouldUpdate('value', 'value')).toBe(false);
  });

  it('should return true when new and old values differ', () => {
    const component = initComponent();

    expect(component.componentShouldUpdate('new', 'old')).toBe(true);
  });

  it('should return false when both values are undefined', () => {
    const component = initComponent();

    expect(component.componentShouldUpdate(undefined, undefined)).toBe(false);
  });
});

describe('componentWillLoad()', () => {
  it('should identify tabs during initialization', () => {
    const component = initComponent();
    appendChildren(component.host, 'button');

    component.componentWillLoad();

    expect(component['tabs']).toHaveLength(3);
    expect(component['isTabList']).toBe(true);
  });

  it('should identify links during initialization', () => {
    const component = initComponent();
    appendChildren(component.host, 'a');

    component.componentWillLoad();

    expect(component['tabs']).toHaveLength(3);
    expect(component['isTabList']).toBe(false);
  });
});
