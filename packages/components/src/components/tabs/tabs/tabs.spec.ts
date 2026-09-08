import { Tabs } from './tabs';

const initComponent = (): Tabs => {
  const component = new Tabs();
  component.host = document.createElement('p-tabs');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

const appendTabsItems = (host: HTMLElement, count = 3): HTMLElement[] => {
  return Array.from({ length: count }, (_, i) => {
    const el = document.createElement('p-tabs-item');
    (el as any).label = `Tab ${i + 1}`;
    host.appendChild(el);
    return el;
  });
};

describe('defineTabsItems()', () => {
  it('should populate tabsItems with p-tabs-item children', () => {
    const component = initComponent();
    const items = appendTabsItems(component.host);

    component['defineTabsItems']();

    expect(component['tabsItems']).toEqual(items);
    expect(component['tabsItems']).toHaveLength(3);
  });

  it('should set tabsItems to empty array when host has no children', () => {
    const component = initComponent();

    component['defineTabsItems']();

    expect(component['tabsItems']).toEqual([]);
  });

  it('should throw when children are not of kind p-tabs-item', () => {
    const component = initComponent();
    component.host.appendChild(document.createElement('div'));

    expect(() => component['defineTabsItems']()).toThrow();
  });

  it('should update tabsItems when children change', () => {
    const component = initComponent();
    appendTabsItems(component.host, 2);

    component['defineTabsItems']();
    expect(component['tabsItems']).toHaveLength(2);

    const newItem = document.createElement('p-tabs-item');
    (newItem as any).label = 'Tab 3';
    component.host.appendChild(newItem);

    component['defineTabsItems']();
    expect(component['tabsItems']).toHaveLength(3);
    expect(component['tabsItems'][2]).toBe(newItem);
  });
});

describe('setAccessibilityAttributes()', () => {
  it('should set role="tabpanel" and aria-label on all tabs items', () => {
    const component = initComponent();
    const items = appendTabsItems(component.host);
    component['defineTabsItems']();
    component.activeTabIndex = 0;

    component['setAccessibilityAttributes']();

    items.forEach((item, i) => {
      expect(item.getAttribute('role')).toBe('tabpanel');
      expect(item.getAttribute('aria-label')).toBe(`Tab ${i + 1}`);
    });
  });

  it('should show active tab and hide inactive tabs', () => {
    const component = initComponent();
    const items = appendTabsItems(component.host);
    component['defineTabsItems']();
    component.activeTabIndex = 1;

    component['setAccessibilityAttributes']();

    expect(items[0].hasAttribute('hidden')).toBe(true);
    expect(items[0].hasAttribute('tabindex')).toBe(false);

    expect(items[1].hasAttribute('hidden')).toBe(false);
    expect(items[1].getAttribute('tabindex')).toBe('0');

    expect(items[2].hasAttribute('hidden')).toBe(true);
    expect(items[2].hasAttribute('tabindex')).toBe(false);
  });

  it('should hide all tabs when activeTabIndex is out of range', () => {
    const component = initComponent();
    const items = appendTabsItems(component.host);
    component['defineTabsItems']();
    component.activeTabIndex = 5;

    component['setAccessibilityAttributes']();

    for (const item of items) {
      expect(item.hasAttribute('hidden')).toBe(true);
      expect(item.hasAttribute('tabindex')).toBe(false);
    }
  });

  it('should update attributes correctly when activeTabIndex changes', () => {
    const component = initComponent();
    const items = appendTabsItems(component.host);
    component['defineTabsItems']();

    component.activeTabIndex = 0;
    component['setAccessibilityAttributes']();

    expect(items[0].hasAttribute('hidden')).toBe(false);
    expect(items[0].getAttribute('tabindex')).toBe('0');
    expect(items[1].hasAttribute('hidden')).toBe(true);

    component.activeTabIndex = 2;
    component['setAccessibilityAttributes']();

    expect(items[0].hasAttribute('hidden')).toBe(true);
    expect(items[0].hasAttribute('tabindex')).toBe(false);
    expect(items[2].hasAttribute('hidden')).toBe(false);
    expect(items[2].getAttribute('tabindex')).toBe('0');
  });

  it('should use the label property of each tab item for aria-label', () => {
    const component = initComponent();
    const items = appendTabsItems(component.host);
    (items[0] as any).label = 'Overview';
    (items[1] as any).label = 'Details';
    (items[2] as any).label = 'Settings';
    component['defineTabsItems']();
    component.activeTabIndex = 0;

    component['setAccessibilityAttributes']();

    expect(items[0].getAttribute('aria-label')).toBe('Overview');
    expect(items[1].getAttribute('aria-label')).toBe('Details');
    expect(items[2].getAttribute('aria-label')).toBe('Settings');
  });
});

describe('activeTabHandler()', () => {
  it('should emit update event with the new activeTabIndex', () => {
    const component = initComponent();
    component.update = { emit: vi.fn() } as any;

    component.activeTabHandler(2);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 2 });
  });

  it('should emit update event with index 0', () => {
    const component = initComponent();
    component.update = { emit: vi.fn() } as any;

    component.activeTabHandler(0);

    expect(component.update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });
});

describe('onTabsBarUpdate()', () => {
  it('should stop propagation of the event', () => {
    const component = initComponent();
    component.update = { emit: vi.fn() } as any;
    const event = new CustomEvent('update', { detail: { activeTabIndex: 1 } });
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    component['onTabsBarUpdate'](event);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should set activeTabIndex from event detail', () => {
    const component = initComponent();
    component.update = { emit: vi.fn() } as any;
    component.activeTabIndex = 0;

    const event = new CustomEvent('update', { detail: { activeTabIndex: 2 } });
    component['onTabsBarUpdate'](event);

    expect(component.activeTabIndex).toBe(2);
  });

  it('should set activeTabIndex to 0 from event detail', () => {
    const component = initComponent();
    component.update = { emit: vi.fn() } as any;
    component.activeTabIndex = 3;

    const event = new CustomEvent('update', { detail: { activeTabIndex: 0 } });
    component['onTabsBarUpdate'](event);

    expect(component.activeTabIndex).toBe(0);
  });
});

describe('slotchange listener', () => {
  const initComponentWithSlot = (): { component: Tabs; slot: HTMLSlotElement } => {
    const component = initComponent();
    appendTabsItems(component.host, 2);
    component['defineTabsItems']();
    const slot = document.createElement('slot') as HTMLSlotElement;
    component['slot'] = slot;
    return { component, slot };
  };

  it('should re-identify tabs items on slotchange', () => {
    const { component, slot } = initComponentWithSlot();

    component.componentDidLoad();
    expect(component['tabsItems']).toHaveLength(2);

    const newItem = document.createElement('p-tabs-item');
    (newItem as any).label = 'Tab 3';
    component.host.appendChild(newItem);

    slot.dispatchEvent(new Event('slotchange'));

    expect(component['tabsItems']).toHaveLength(3);
    expect(component['tabsItems'][2]).toBe(newItem);
  });

  it('should not react to slotchange after disconnectedCallback', () => {
    const { component, slot } = initComponentWithSlot();

    component.componentDidLoad();
    component.disconnectedCallback();

    const newItem = document.createElement('p-tabs-item');
    (newItem as any).label = 'Tab 3';
    component.host.appendChild(newItem);

    slot.dispatchEvent(new Event('slotchange'));

    // tabsItems should not have been re-identified (still 2, not 3)
    expect(component['tabsItems']).toHaveLength(2);
  });
});
