import { Tabs } from './tabs';
import * as tabsUtils from './tabs-utils';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';

describe('componentWillLoad', () => {
  it('should call this.defineTabsItemElements()', () => {
    const component = new Tabs();
    component.host = document.createElement('p-tabs');
    component.host.attachShadow({ mode: 'open' });
    const spy = jest.spyOn(component, 'defineTabsItemElements' as any);

    component.componentWillLoad();
    expect(spy).toBeCalledWith();
  });
});

describe('render', () => {
  it('should call syncTabsItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(tabsUtils, 'syncTabsItemsProps');

    const component = new Tabs();
    component.host = document.createElement('p-tabs');
    component.host.attachShadow({ mode: 'open' });
    component['tabsItemElements'] = [document.createElement('p-tabs-item'), document.createElement('p-tabs-item')];
    component.theme = 'dark';

    component.render();

    expect(spy).toBeCalledWith((component as any).tabsItemElements, component.theme);
  });
});

describe('componentDidRender', () => {
  it('should call this.setAccessibilityAttributes()', () => {
    const component = new Tabs();
    const spy = jest.spyOn(component, 'setAccessibilityAttributes' as any);

    component.componentDidRender();
    expect(spy).toBeCalledWith();
  });
});

describe('this.defineTabsItemElements()', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const component = new Tabs();
    component.host = document.createElement('p-tabs');

    component['defineTabsItemElements']();
    expect(spy).toBeCalledWith(component.host, 'p-tabs-item');
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
