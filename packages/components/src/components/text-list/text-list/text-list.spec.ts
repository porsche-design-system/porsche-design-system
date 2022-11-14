import { TextList } from './text-list';
import * as textListUtils from './text-list-utils';

describe('render', () => {
  it('should call syncTextListItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(textListUtils, 'syncTextListItemsProps');

    const component = new TextList();
    component.host = document.createElement('p-text-list');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, component.listType, component.orderType, false);
  });
});
