import { afterEach, describe, expect, it, vi } from 'vitest';
import { Drilldown } from './drilldown';

const initComponent = (): Drilldown => {
  const component = new Drilldown();
  component.host = document.createElement('p-drilldown');
  component.host.attachShadow({ mode: 'open' });
  const dialog = document.createElement('dialog');
  dialog.showModal = vi.fn(() => {
    dialog.open = true;
  });
  dialog.close = vi.fn(() => {
    dialog.open = false;
  });
  component['dialog'] = dialog;
  return component;
};

const createItem = (identifier: string): HTMLElement => {
  const item = document.createElement('p-drilldown-item');
  (item as any).identifier = identifier;
  return item;
};

describe('body scroll lock', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should lock body scrolling when opened', () => {
    const component = initComponent();

    component.openChangeHandler(true);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock body scrolling when closed', () => {
    const component = initComponent();
    component.openChangeHandler(true);

    component.openChangeHandler(false);

    expect(document.body.style.overflow).toBe('');
  });
});

describe('native dialog visibility', () => {
  it('should open the native dialog exactly once while open', () => {
    const component = initComponent();
    component.open = true;

    component.componentDidRender();
    component.componentDidRender();

    expect(component['dialog'].showModal).toHaveBeenCalledTimes(1);
  });

  it('should close the native dialog when open becomes false', () => {
    const component = initComponent();
    component.open = true;
    component.componentDidRender();
    component.open = false;

    component.componentDidRender();

    expect(component['dialog'].close).toHaveBeenCalledTimes(1);
  });
});

describe('internal update re-emit', () => {
  it('should re-emit internal item updates as public update event and stop their propagation', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.update = { emit: emitSpy } as any;
    const event = new CustomEvent('internalUpdate', { bubbles: true, detail: { activeIdentifier: 'item-2' } });
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    component.onInternalUpdate(event as any);

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({ activeIdentifier: 'item-2' });
  });

  it('should emit update with undefined identifier when the secondary drawer close is requested', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.update = { emit: emitSpy } as any;

    component['emitCloseSecondaryUpdate']();

    expect(emitSpy).toHaveBeenCalledWith({ activeIdentifier: undefined });
  });
});

describe('dismiss', () => {
  it('should emit dismiss on ESC (dialog cancel) and prevent native close', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;
    const event = new Event('cancel', { cancelable: true });

    component['onCancelDialog'](event);

    expect(event.defaultPrevented).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith();
  });

  it('should emit dismiss on backdrop click', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    component['onMouseDownDialog']({ target: { tagName: 'DIALOG' } } as any);
    component['onClickDialog']({ target: { tagName: 'DIALOG' } } as any);

    expect(emitSpy).toHaveBeenCalledWith();
  });

  it('should not emit dismiss when the pointer went down inside the drawer', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    component['onMouseDownDialog']({ target: { tagName: 'DIV' } } as any);
    component['onClickDialog']({ target: { tagName: 'DIALOG' } } as any);

    expect(emitSpy).not.toHaveBeenCalled();
  });
});

describe('initial item state', () => {
  it('should collect drilldown items and stay primary without an active identifier', () => {
    const component = initComponent();
    component.host.appendChild(createItem('a'));
    component.host.appendChild(createItem('b'));

    component.componentWillLoad();

    expect(component['drilldownItemElements']).toHaveLength(2);
    expect(component['primary']).toBe(true);
  });

  it('should mark the active item secondary on load', () => {
    const component = initComponent();
    const itemA = createItem('a');
    component.host.appendChild(itemA);
    component.activeIdentifier = 'a';

    component.componentWillLoad();

    expect((itemA as any).secondary).toBe(true);
    expect(component['primary']).toBe(true);
  });
});

describe('active item change', () => {
  it('should mark the newly active item secondary (desktop)', async () => {
    const component = initComponent();
    component['isDesktop'] = true;
    component['drawer'] = { animate: vi.fn(() => ({ finished: Promise.resolve() })) } as any;
    const itemA = createItem('a');
    component.host.appendChild(itemA);
    component['drilldownItemElements'] = [itemA] as any;
    component.activeIdentifier = 'a';

    await component.activeIdentifierChangeHandler('a', undefined);

    expect((itemA as any).secondary).toBe(true);
    expect(component['isSecondaryDrawerVisible']).toBe(true);
  });

  it('should clear the previously active item when the secondary drawer closes (desktop)', async () => {
    const component = initComponent();
    component['isDesktop'] = true;
    component['drawer'] = { animate: vi.fn(() => ({ finished: Promise.resolve() })) } as any;
    const itemA = createItem('a');
    (itemA as any).secondary = true;
    component.host.appendChild(itemA);
    component['drilldownItemElements'] = [itemA] as any;
    component.activeIdentifier = undefined;

    await component.activeIdentifierChangeHandler(undefined, 'a');

    expect((itemA as any).secondary).toBe(false);
    expect(component['isSecondaryDrawerVisible']).toBe(false);
    expect(component['primary']).toBe(true);
  });

  it('should activate the newly selected item and deactivate the previously active one', async () => {
    const component = initComponent();
    component['drawer'] = { animate: vi.fn(() => ({ finished: Promise.resolve() })) } as any;
    const itemA = createItem('a');
    const itemB = createItem('b');
    (itemA as any).secondary = true;
    component.host.appendChild(itemA);
    component.host.appendChild(itemB);
    component['drilldownItemElements'] = [itemA, itemB] as any;
    component.activeIdentifier = 'b';

    await component.activeIdentifierChangeHandler('b', 'a');

    expect((itemA as any).secondary).toBe(false);
    expect((itemB as any).secondary).toBe(true);
    expect(component['primary']).toBe(true);
    expect(component['isSecondaryDrawerVisible']).toBe(true);
  });

  it('should leave the primary level when navigating into a nested item', async () => {
    const component = initComponent();
    component['drawer'] = { animate: vi.fn(() => ({ finished: Promise.resolve() })) } as any;
    const itemA = createItem('a');
    const itemB = createItem('b');
    (itemA as any).secondary = true;
    component.host.appendChild(itemA);
    itemA.appendChild(itemB); // itemB lives one level deeper than itemA
    component['drilldownItemElements'] = [itemA, itemB] as any;
    component.activeIdentifier = 'b';

    await component.activeIdentifierChangeHandler('b', 'a');

    expect((itemA as any).secondary).toBe(false);
    expect((itemB as any).secondary).toBe(true);
    expect(component['primary']).toBe(false);
  });
});
