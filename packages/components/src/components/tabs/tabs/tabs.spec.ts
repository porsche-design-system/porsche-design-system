import { vi } from 'vitest';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';
import { Tabs } from './tabs';

describe('componentWillLoad', () => {
  it('should call this.defineTabsItemElements()', () => {
    const component = new Tabs();
    component.host = document.createElement('p-tabs');
    component.host.attachShadow({ mode: 'open' });
    const spy = vi.spyOn(component, 'defineTabsItemElements' as any);

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith();
  });
});

describe('componentDidRender', () => {
  it('should call this.setAccessibilityAttributes()', () => {
    const component = new Tabs();
    const spy = vi.spyOn(component, 'setAccessibilityAttributes' as any);

    component.componentDidRender();
    expect(spy).toHaveBeenCalledWith();
  });
});

describe('this.defineTabsItemElements()', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = vi.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const component = new Tabs();
    component.host = document.createElement('p-tabs');

    component['defineTabsItemElements']();
    expect(spy).toHaveBeenCalledWith(component.host, 'p-tabs-item');
  });

  it("should set this.tabsItemElements with host's children", () => {
    const component = new Tabs();
    component.host = document.createElement('p-tabs');
    const child1 = document.createElement('p-tabs-item');
    child1.id = 'child1';
    const child2 = document.createElement('p-tabs-item');
    child2.id = 'child2';
    component.host.append(child1, child2);

    component['defineTabsItemElements']();
    expect(component['tabsItemElements']).toEqual([child1, child2]);
  });
});
