import { Tabs } from './tabs';
import * as tabsUtils from './tabs-utils';
import * as throwIfChildrenAreNotOfKindUtils from '../../../utils/validation/throwIfChildrenAreNotOfKind';

describe('connectedCallback', () => {
  it('should call throwIfChildrenAreNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfChildrenAreNotOfKindUtils, 'throwIfChildrenAreNotOfKind');
    const component = new Tabs();
    component.host = document.createElement('p-tabs');

    component['connectedCallback']();
    expect(spy).toBeCalledWith(component.host, 'p-tabs-item');
  });
});

describe('render', () => {
  it('should call syncTabsItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(tabsUtils, 'syncTabsItemsProps');

    const component = new Tabs();
    component.host = document.createElement('p-tabs');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, component.theme);
  });
});
