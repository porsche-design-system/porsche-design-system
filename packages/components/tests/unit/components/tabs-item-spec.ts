import * as domUtils from '../../../src/utils/dom';
import { TabsItem } from '../../../src/components/content/tabs/tabs-item/tabs-item';

describe('tabs-item', () => {
  it('should call throwIfParentIsNotOfKind() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
    const tabsItem = new TabsItem();

    expect(spy).toBeCalledTimes(0);

    try {
      tabsItem.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
