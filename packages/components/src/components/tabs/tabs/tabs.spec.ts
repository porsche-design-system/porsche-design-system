import { Tabs } from './tabs';
import * as tabsUtils from './tabs-utils';

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
